/**
 * API Response Types
 *
 * Define your API response types here for better TypeScript support
 */

// Base response wrapper
export interface ApiResponseWrapper<T> {
  success: boolean;
  message: string;
  data: T;
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  created_at: string;
}

// Session types
export interface Session {
  id: string;
  ip_address: string;
  user_agent: string;
  device_info: string | null;
  is_active: boolean;
  last_activity: string;
  created_at: string;
}

// Auth responses
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    token_type: string;
    user: User;
  };
}

export interface LogoutResponse {
  message: string;
  detail: string;
}

// Profile responses
export interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    session: Session;
  };
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: User;
}

// Session responses
export type SessionsResponse = Session[];

export interface RevokeSessionResponse {
  message: string;
}

export interface RevokeAllSessionsResponse {
  message: string;
}

// Error responses
export interface ValidationError {
  type: string;
  loc: (string | number)[];
  msg: string;
}

export interface ErrorResponse {
  detail: string | ValidationError[];
}

// Request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  name?: string;
  avatar?: string;
}
