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
    try {
      if (import.meta.env.VITE_API_URL) {
        const response = await api.post('/contact', data);
        return response.data;
      }
    } catch {
      console.warn('API Worker unavailable, using fallback mock submission handler');
    }

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
    
    await new Promise(res => setTimeout(res, 400));

    return {
      success: true,
      message: 'Gửi thông tin thành công. Đội ngũ Kiot Thiên Thanh sẽ liên hệ lại với bạn trong thời gian sớm nhất!'
    };
  },

  async getContacts(): Promise<ContactSubmission[]> {
    return getLocalContacts();
  },

  async updateContactStatus(id: string, status: ContactStatus): Promise<ContactSubmission> {
    const list = getLocalContacts();
    const index = list.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Không tìm thấy liên hệ');
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
