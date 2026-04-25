export interface Booking {
  id: number;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  created_at: string;
}

export interface User {
  id: number;
  username: string;
  password_hash: string;
}

export interface AuthResponse {
  token: string;
}

export interface ErrorResponse {
  message: string;
}
