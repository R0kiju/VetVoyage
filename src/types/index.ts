export interface Booking {
  id: number;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  created_at: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

export interface AuthResponse {
  token: string;
}
