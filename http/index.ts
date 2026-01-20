// Export API client
export { apiClient, default as api } from './instance';

// Export endpoints
export {
  endpoints,
  authEndpoints,
  userEndpoints,
  generationsEndpoints,
  getBaseUrl,
  type Endpoints,
} from './endpoints';

// Export types
export type {
  ApiResponseWrapper,
  User,
  Session,
  LoginResponse,
  LogoutResponse,
  ProfileResponse,
  UpdateProfileResponse,
  SessionsResponse,
  RevokeSessionResponse,
  RevokeAllSessionsResponse,
  ErrorResponse,
  ValidationError,
  LoginRequest,
  UpdateProfileRequest,
  GenerationSettings,
  Generation,
  CreateGenerationRequest,
  CreateGenerationResponse,
  GenerationsListResponse,
} from './types';
