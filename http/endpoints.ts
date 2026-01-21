const BASE_URL = 'http://localhost:8000';

export const endpoints = {
  // Authentication APIs
  auth: {
    login: `${BASE_URL}/api/auth/login`,
    logout: `${BASE_URL}/api/auth/logout`,
    me: `${BASE_URL}/api/auth/me`,
  },

  // Profile APIs
  user: {
    profile: `${BASE_URL}/api/user/profile`,
    sessions: `${BASE_URL}/api/user/sessions`,
    session: (sessionId: string) => `${BASE_URL}/api/user/sessions/${sessionId}`,
  },

  // Generation APIs
  generations: {
    list: `${BASE_URL}/api/generations`,
    create: `${BASE_URL}/api/generations`,
    byId: (id: string) => `${BASE_URL}/api/generations/${id}`,
  },
} as const;

export const {
  auth: authEndpoints,
  user: userEndpoints,
  generations: generationsEndpoints,
} = endpoints;

export const getBaseUrl = () => BASE_URL;

export type Endpoints = typeof endpoints;
