import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Theme } from '@/types'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',

      setTheme: (theme: Theme) => {
        set({ theme })

        // Update document class for theme
        if (typeof window !== 'undefined') {
          document.documentElement.classList.remove('dark', 'light', 'neon', 'glass')
          document.documentElement.classList.add(theme)
        }
      },

      toggleTheme: () => {
        const themes: Theme[] = ['dark', 'light', 'neon', 'glass']
        const currentIndex = themes.indexOf(get().theme)
        const nextTheme = themes[(currentIndex + 1) % themes.length]
        get().setTheme(nextTheme)
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        // Apply theme on load
        if (state && typeof window !== 'undefined') {
          document.documentElement.classList.add(state.theme)
        }
      },
    }
  )
)
