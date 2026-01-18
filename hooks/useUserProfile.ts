import { useState } from 'react';
import { getUserProfile, updateUserProfile } from '@/services';
import type {
  ProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '@/http';

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUserProfile();
      setProfile(data);
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
    profile,
    isLoading,
    error,
    fetchProfile,
  };
};

export const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<UpdateProfileResponse | null>(null);

  const updateProfile = async (profileData: UpdateProfileRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await updateUserProfile(profileData);
      setData(response);
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
    updateProfile,
    isLoading,
    error,
    data,
  };
};
