import { create } from 'zustand'
import type { ProfileResponse } from '@/http'

interface ProfileDataState {
  profileData: ProfileResponse | null
  setProfileData: (data: ProfileResponse | null) => void
  getProfileData: () => ProfileResponse | null
}

export const useProfileDataStore = create<ProfileDataState>((set, get) => ({
  profileData: null,

  setProfileData: (data: ProfileResponse | null) => {
    set({ profileData: data })
  },

  getProfileData: () => {
    return get().profileData
  },
}))
