'use client'

import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from '@/lib/stores/themeStore'

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    // Apply theme on mount
    document.documentElement.classList.remove('dark', 'light', 'neon', 'glass')
    document.documentElement.classList.add(theme)
  }, [theme])

  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--surface)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: 'white',
            },
          },
        }}
      />
    </>
  )
}
