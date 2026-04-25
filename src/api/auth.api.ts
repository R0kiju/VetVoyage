import { apiClient } from './api-client';
import type { AuthResponse } from '../types';

export const authApi = {
  login: (password: string) => 
    apiClient.post<AuthResponse>('/api/auth/login', { password }),
};
