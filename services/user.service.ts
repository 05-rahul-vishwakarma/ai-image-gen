import { apiClient, endpoints } from '@/http';
import type {
  ProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  SessionsResponse,
  RevokeSessionResponse,
  RevokeAllSessionsResponse,
} from '@/http';

/**
 * Get user profile including active session information
 */
export const getUserProfile = async (): Promise<ProfileResponse> => {
  const response = await apiClient.get<ProfileResponse>(endpoints.user.profile);
  return response.data;
};

/**
 * Update user profile (name, avatar)
 */
export const updateUserProfile = async (
  data: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
  const response = await apiClient.patch<UpdateProfileResponse>(
    endpoints.user.profile,
    data
  );
  return response.data;
};

/**
 * Get all active sessions for current user
 */
export const getActiveSessions = async (): Promise<SessionsResponse> => {
  const response = await apiClient.get<SessionsResponse>(endpoints.user.sessions);
  return response.data;
};

/**
 * Revoke a specific session by ID
 */
export const revokeSession = async (
  sessionId: string
): Promise<RevokeSessionResponse> => {
  const response = await apiClient.delete<RevokeSessionResponse>(
    endpoints.user.session(sessionId)
  );
  return response.data;
};

/**
 * Revoke all active sessions except the current one
 */
export const revokeAllSessions = async (): Promise<RevokeAllSessionsResponse> => {
  const response = await apiClient.delete<RevokeAllSessionsResponse>(
    endpoints.user.sessions
  );
  return response.data;
};
