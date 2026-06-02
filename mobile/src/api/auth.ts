import apiClient from './client';
import { User } from '../types';

export interface AuthResponse {
  user: User;
  token: string;
  refresh_token: string;
}

export const authApi = {
  register: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/register', { email, password }),

  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/login', { email, password }),

  refresh: (refreshToken: string) =>
    apiClient.post<{ token: string; refresh_token: string }>('/auth/refresh', {
      refresh_token: refreshToken,
    }),

  me: () => apiClient.get<User>('/auth/me'),

  registerBiometric: (biometricKey: string) =>
    apiClient.post('/auth/biometric', { biometric_key: biometricKey }),
};
