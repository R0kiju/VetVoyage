import { apiClient } from './api-client';
import type { Booking, BookingFormData } from '../types';

export const bookingApi = {
  create: (data: BookingFormData) => 
    apiClient.post<Booking>('/api/bookings', data),
  
  getAll: () => 
    apiClient.get<Booking[]>('/api/bookings'),
  
  delete: (id: number) => 
    apiClient.delete<{ message: string }>(`/api/bookings/${id}`),
};
