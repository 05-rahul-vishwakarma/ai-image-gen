import { apiClient, endpoints } from '@/http';
import type {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  User,
} from '@/http';

/**
 * Login or register a new user
 * If the email doesn't exist, a new user will be created automatically
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(endpoints.auth.login, data);
  return response.data;
};

/**
 * Logout current user and invalidate session
 */
export const logout = async (): Promise<LogoutResponse> => {
  const response = await apiClient.post<LogoutResponse>(endpoints.auth.logout);
  return response.data;
};

/**
 * Get currently authenticated user's information
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<User>(endpoints.auth.me);
  return response.data;
};
