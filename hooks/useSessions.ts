import { useState } from 'react';
import {
  getActiveSessions,
  revokeSession as revokeSessionService,
  revokeAllSessions as revokeAllSessionsService,
} from '@/services';
import type { SessionsResponse } from '@/http';

export const useSessions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [sessions, setSessions] = useState<SessionsResponse | null>(null);

  const fetchSessions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getActiveSessions();
      setSessions(data);
      return data;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sessions,
    isLoading,
    error,
    fetchSessions,
  };
};

export const useRevokeSession = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const revokeSession = async (sessionId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await revokeSessionService(sessionId);
      return response;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    revokeSession,
    isLoading,
    error,
  };
};

export const useRevokeAllSessions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const revokeAllSessions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await revokeAllSessionsService();
      return response;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    revokeAllSessions,
    isLoading,
    error,
  };
};
