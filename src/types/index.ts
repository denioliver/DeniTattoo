export interface Appointment {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: Date | { toDate(): Date };
}

export interface TattooWork {
  id?: string;
  title: string;
  imageUrl: string;
  style: TattooStyle;
  description?: string;
  createdAt: Date;
}

export type TattooStyle =
  | 'traditional'
  | 'realism'
  | 'blackwork'
  | 'minimal'
  | 'geometric'
  | 'watercolor'
  | 'tribal'
  | 'japanese'
  | 'oldschool'
  | 'newschool';

export interface User {
  uid: string;
  email: string;
  role: 'admin' | 'client';
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  instagram: string;
  googleMapsUrl: string;
}
