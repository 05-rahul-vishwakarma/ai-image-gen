import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Settings, ImageSize, ImageQuality, AIModel } from '@/types'

interface SettingsState extends Settings {
  setImageSize: (size: ImageSize) => void
  setImageQuality: (quality: ImageQuality) => void
  setAIModel: (model: AIModel) => void
  resetSettings: () => void
}

const defaultSettings: Settings = {
  theme: 'dark',
  imageSize: '1024x1024',
  imageQuality: 'standard',
  aiModel: 'dall-e-3',
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setImageSize: (imageSize: ImageSize) => {
        set({ imageSize })
      },

      setImageQuality: (imageQuality: ImageQuality) => {
        set({ imageQuality })
      },

      setAIModel: (aiModel: AIModel) => {
        set({ aiModel })
      },

      resetSettings: () => {
        set(defaultSettings)
      },
    }),
    {
      name: 'settings-storage',
    }
  )
)
