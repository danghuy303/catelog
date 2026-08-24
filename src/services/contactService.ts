import { ContactSubmission, ContactFormInput, ContactStatus } from '../types/contact';
import { MOCK_CONTACTS } from '../mock/contactsData';
import { api } from './api';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'thienthanh_contacts_db';

function getLocalContacts(): ContactSubmission[] {
  return loadFromStorage<ContactSubmission[]>(STORAGE_KEY, MOCK_CONTACTS);
}

function saveLocalContacts(contacts: ContactSubmission[]): void {
  saveToStorage(STORAGE_KEY, contacts);
}

export const contactService = {
  async submitContact(data: ContactFormInput): Promise<{ success: boolean; message: string }> {
    const appsScriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

    // 1. Save to local storage for Admin CMS view on current device
    const currentList = getLocalContacts();
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
    currentList.unshift(newSubmission);
    saveLocalContacts(currentList);

    // 2. Send to Google Sheets & Gmail or Central API
    if (appsScriptUrl) {
      try {
        await fetch(appsScriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
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
    const appsScriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

    // Try fetching central submissions from Google Sheets if configured
    if (appsScriptUrl) {
      try {
        const res = await fetch(appsScriptUrl);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const local = getLocalContacts();
          // Merge central Google Sheets data with local data
          const merged = [...json.data];
          local.forEach(l => {
            if (!merged.some(m => m.phone === l.phone && m.name === l.name)) {
              merged.push(l);
            }
          });
          return merged;
        }
      } catch (e) {
        console.warn('Could not fetch contacts from Google Sheets API, using local storage fallback:', e);
      }
    }

    return getLocalContacts();
  },

  async updateContactStatus(id: string, status: ContactStatus): Promise<ContactSubmission> {
    const list = getLocalContacts();
    const index = list.findIndex(c => c.id === id);
    if (index === -1) {
      return {
        id,
        name: 'Khách hàng',
        phone: '',
        email: '',
        message: '',
        status,
        createdAt: new Date().toISOString()
      };
    }
    list[index].status = status;
    saveLocalContacts(list);
    return list[index];
  },

  async deleteContact(id: string): Promise<boolean> {
    let list = getLocalContacts();
    list = list.filter(c => c.id !== id);
    saveLocalContacts(list);
    return true;
  }
};
