import { ContactSubmission, ContactFormInput, ContactStatus } from '../types/contact';
import { MOCK_CONTACTS } from '../mock/contactsData';
import { api } from './api';

let localContacts: ContactSubmission[] = [...MOCK_CONTACTS];

export const contactService = {
  async submitContact(data: ContactFormInput): Promise<{ success: boolean; message: string }> {
    try {
      // Attempt API call if VITE_API_URL is configured
      if (import.meta.env.VITE_API_URL) {
        const response = await api.post('/contact', data);
        return response.data;
      }
    } catch {
      console.warn('API Worker unavailable, using fallback mock submission handler');
    }

    // Fallback simulation
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

    localContacts.unshift(newSubmission);
    
    // Simulate network delay
    await new Promise(res => setTimeout(res, 600));

    return {
      success: true,
      message: 'Gửi thông tin thành công. Đội ngũ Kiot Thiên Thanh sẽ liên hệ lại với bạn trong thời gian sớm nhất!'
    };
  },

  async getContacts(): Promise<ContactSubmission[]> {
    return localContacts;
  },

  async updateContactStatus(id: string, status: ContactStatus): Promise<ContactSubmission> {
    const index = localContacts.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Không tìm thấy liên hệ');
    localContacts[index].status = status;
    return localContacts[index];
  },

  async deleteContact(id: string): Promise<boolean> {
    localContacts = localContacts.filter(c => c.id !== id);
    return true;
  }
};
