import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from './api';

const TOKENS_KEY = '@canchaya_tokens';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export const authService = {
  register: async (email: string, password: string, name: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', {
      email,
      password,
      name,
    });
    await authService.saveTokens(response.accessToken, response.refreshToken);
    apiClient.setTokens(response.accessToken, response.refreshToken);
    return response;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    await authService.saveTokens(response.accessToken, response.refreshToken);
    apiClient.setTokens(response.accessToken, response.refreshToken);
    return response;
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    });
    await authService.saveTokens(response.accessToken, response.refreshToken);
    apiClient.setTokens(response.accessToken, response.refreshToken);
    return response;
  },

  logout: async (): Promise<void> => {
    apiClient.clearTokens();
    await AsyncStorage.removeItem(TOKENS_KEY);
  },

  saveTokens: async (accessToken: string, refreshToken: string): Promise<void> => {
    try {
      const tokens: AuthTokens = { accessToken, refreshToken };
      await AsyncStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
    } catch (error) {
      console.error('Failed to save tokens:', error);
    }
  },

  getStoredTokens: async (): Promise<AuthTokens | null> => {
    try {
      const tokens = await AsyncStorage.getItem(TOKENS_KEY);
      return tokens ? JSON.parse(tokens) : null;
    } catch (error) {
      console.error('Failed to retrieve tokens:', error);
      return null;
    }
  },

  restoreTokens: async (): Promise<boolean> => {
    try {
      const tokens = await authService.getStoredTokens();
      if (tokens) {
        apiClient.setTokens(tokens.accessToken, tokens.refreshToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to restore tokens:', error);
      return false;
    }
  },

  clearStoredTokens: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(TOKENS_KEY);
    } catch (error) {
      console.error('Failed to clear tokens:', error);
    }
  },
};
