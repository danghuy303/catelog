import { ContactSubmission, ContactFormInput, ContactStatus } from '../types/contact';
import { MOCK_CONTACTS } from '../mock/contactsData';
import { api } from './api';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'thienthanh_contacts_db';
const CENTRAL_KV_URL = 'https://kvdb.io/8xK43sK2gP9vWqN1mR7z/contacts_v1';

function getLocalContacts(): ContactSubmission[] {
  return loadFromStorage<ContactSubmission[]>(STORAGE_KEY, MOCK_CONTACTS);
}

function saveLocalContacts(contacts: ContactSubmission[]): void {
  saveToStorage(STORAGE_KEY, contacts);
}

// Background sync helper to save central list
async function syncToCentralStore(contacts: ContactSubmission[]): Promise<void> {
  try {
    await fetch(CENTRAL_KV_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contacts),
    });
  } catch (err) {
    console.warn('Central store sync warning:', err);
  }
}

export const contactService = {
  async submitContact(data: ContactFormInput): Promise<{ success: boolean; message: string }> {
    const appsScriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

    // 1. Create submission object
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

    // 2. Try fetching central list first to keep all device records merged
    let currentList = getLocalContacts();
    try {
      const res = await fetch(CENTRAL_KV_URL);
      if (res.ok) {
        const centralData = await res.json();
        if (Array.isArray(centralData) && centralData.length > 0) {
          currentList = centralData;
        }
      }
    } catch {
      // fallback to local
    }

    currentList.unshift(newSubmission);
    saveLocalContacts(currentList);

    // Sync to central cloud store for cross-device real-time sync
    syncToCentralStore(currentList);

    // 3. Optional Google Apps Script or Worker dispatch
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
    } else if (import.meta.env.VITE_API_URL) {
      try {
        await api.post('/contact', data);
      } catch (err) {
        console.warn('API Worker submission warning:', err);
      }
    }

    return {
      success: true,
      message: 'Gửi thông tin thành công. Đội ngũ Kiot Thiên Thanh sẽ liên hệ lại với bạn trong thời gian sớm nhất!'
    };
  },

  async getContacts(): Promise<ContactSubmission[]> {
    const local = getLocalContacts();

    try {
      const res = await fetch(CENTRAL_KV_URL);
      if (res.ok) {
        const centralData = await res.json();
        if (Array.isArray(centralData) && centralData.length > 0) {
          // Merge local submissions that might not have been pushed yet
          const merged = [...centralData];
          local.forEach(l => {
            if (!merged.some(m => m.id === l.id || (m.phone === l.phone && m.name === l.name))) {
              merged.push(l);
            }
          });
          saveLocalContacts(merged);
          return merged;
        }
      }
    } catch (e) {
      console.warn('Could not fetch contacts from central cloud store, using local cache:', e);
    }

    return local;
  },

  async updateContactStatus(id: string, status: ContactStatus): Promise<ContactSubmission> {
    const list = await this.getContacts();
    const index = list.findIndex(c => c.id === id);
    if (index !== -1) {
      list[index].status = status;
      saveLocalContacts(list);
      syncToCentralStore(list);
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
    syncToCentralStore(list);
    return true;
  }
};
