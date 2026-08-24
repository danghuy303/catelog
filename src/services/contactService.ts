import { ContactSubmission, ContactFormInput, ContactStatus } from '../types/contact';
import { MOCK_CONTACTS } from '../mock/contactsData';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'thienthanh_contacts_db';
const PUBLIC_REST_API = 'https://api.restful-api.dev/objects';
const OBJECT_PREFIX = 'TT_CONTACT_RECORD_V1';

// BroadcastChannel for instant multi-tab sync on the same machine
const contactChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('thienthanh_contacts_channel')
  : null;

function getLocalContacts(): ContactSubmission[] {
  return loadFromStorage<ContactSubmission[]>(STORAGE_KEY, MOCK_CONTACTS);
}

function saveLocalContacts(contacts: ContactSubmission[]): void {
  saveToStorage(STORAGE_KEY, contacts);
  if (contactChannel) {
    contactChannel.postMessage({ type: 'CONTACTS_UPDATED' });
  }
}

export const contactService = {
  async submitContact(data: ContactFormInput): Promise<{ success: boolean; message: string }> {
    const appsScriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

    const newSubmission: ContactSubmission = {
      id: `ct-${Date.now()}`,
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
      subject: data.subject || 'Liên hệ tư vấn website',
      message: data.message,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    // 1. Save to local storage cache immediately
    const currentList = getLocalContacts();
    currentList.unshift(newSubmission);
    saveLocalContacts(currentList);

    // 2. Post to Universal REST Cloud API (Works across ALL browsers, devices & profiles, 100% CORS enabled)
    try {
      await fetch(PUBLIC_REST_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: OBJECT_PREFIX,
          data: newSubmission
        })
      });
    } catch (e) {
      console.warn('REST Cloud API push warning:', e);
    }

    // 3. Post to Vercel native /api/contact endpoint if available
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (e) {
      // Vercel serverless function fallback
    }

    // 4. Post to Google Apps Script if URL provided
    if (appsScriptUrl) {
      try {
        await fetch(appsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.warn('Google Apps Script submission warning:', err);
      }
    }

    return {
      success: true,
      message: 'Gửi thông tin thành công. Đội ngũ Kiot Thiên Thanh sẽ liên hệ lại với bạn trong thời gian sớm nhất!'
    };
  },

  async getContacts(): Promise<ContactSubmission[]> {
    const local = getLocalContacts();

    // 1. Try fetching from Vercel native /api/contact endpoint
    try {
      const vercelRes = await fetch('/api/contact');
      if (vercelRes.ok) {
        const vJson = await vercelRes.json();
        if (vJson.success && Array.isArray(vJson.data) && vJson.data.length > 0) {
          const merged = [...vJson.data];
          local.forEach(l => {
            if (!merged.some(m => m.id === l.id || (m.phone === l.phone && m.name === l.name))) {
              merged.push(l);
            }
          });
          saveLocalContacts(merged);
          return merged;
        }
      }
    } catch {
      // fallback
    }

    // 2. Try fetching from Universal REST Cloud API (Cross-browser / Cross-device)
    try {
      const res = await fetch(PUBLIC_REST_API);
      if (res.ok) {
        const rawObjects = await res.json();
        if (Array.isArray(rawObjects)) {
          const cloudItems: ContactSubmission[] = rawObjects
            .filter((obj: any) => obj && obj.name === OBJECT_PREFIX && obj.data)
            .map((obj: any) => ({
              ...obj.data,
              id: obj.id || obj.data.id
            }))
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

          if (cloudItems.length > 0) {
            const merged = [...cloudItems];
            local.forEach(l => {
              if (!merged.some(m => m.phone === l.phone && m.name === l.name)) {
                merged.push(l);
              }
            });
            saveLocalContacts(merged);
            return merged;
          }
        }
      }
    } catch (e) {
      console.warn('Could not fetch from REST Cloud API:', e);
    }

    return local;
  },

  async updateContactStatus(id: string, status: ContactStatus): Promise<ContactSubmission> {
    const list = await this.getContacts();
    const index = list.findIndex(c => c.id === id);
    if (index !== -1) {
      list[index].status = status;
      saveLocalContacts(list);
      return list[index];
    }
    return {
      id,
      name: 'Khách hàng',
      phone: '',
      email: '',
      message: '',
      status,
      createdAt: new Date().toISOString()
    };
  },

  async deleteContact(id: string): Promise<boolean> {
    let list = await this.getContacts();
    list = list.filter(c => c.id !== id);
    saveLocalContacts(list);
    try {
      await fetch(`${PUBLIC_REST_API}/${id}`, { method: 'DELETE' });
    } catch {
      // ignore
    }
    return true;
  }
};
