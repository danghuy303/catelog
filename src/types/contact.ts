export type ContactStatus = 'new' | 'processing' | 'completed' | 'cancelled';

export interface ContactSubmission {
  id: string;
  name: string;
  address?: string;
  phone: string;
  email: string;
  subject?: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
}

export interface ContactFormInput {
  name: string;
  address?: string;
  phone: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string;
}
