'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserProfile } from '@/services';
import { useProfileDataStore } from '@/lib/stores/profileDataStore';
import type { User, ProfileResponse } from '@/http';

interface AuthContextType {
  user: User | null;
  profile: ProfileResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  fetchProfile: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { profileData, setProfileData } = useProfileDataStore();

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUserProfile();
      setProfileData(data);
      setUser(data.data.user);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = () => {
    setUser(null);
    setProfileData(null);
  };

  const value: AuthContextType = {
    user,
    profile: profileData,
    isAuthenticated: !!user,
    isLoading,
    error,
    fetchProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
