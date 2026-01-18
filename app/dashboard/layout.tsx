'use client'

import React from 'react'
import { useAuthGuard, useSidebar, useToggle } from '@/hooks'
import { AuthProvider } from '@/context'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { SettingsPanel } from '@/components/dashboard/SettingsPanel'
import { MobileMenuButton } from '@/components/dashboard/MobileMenuButton'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Prevent hydration mismatch
  const { isReady } = useAuthGuard()

  // Sidebar state with auto-responsive behavior
  const sidebar = useSidebar()

  // Settings panel state
  const settings = useToggle(false)

  // Show loading while checking authentication
  if (!isReady) {
    return <LoadingSpinner fullScreen message="Loading..." />
  }

  return (
    <AuthProvider>
      <div className="h-screen flex bg-[var(--bg)] overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebar.isOpen}
          onClose={sidebar.close}
          onSettingsClick={settings.setTrue}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile menu button */}
          <MobileMenuButton onClick={sidebar.open} />

          {/* Main content */}
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            {children}
          </main>
        </div>

        {/* Settings Panel */}
        <SettingsPanel isOpen={settings.value} onClose={settings.setFalse} />
      </div>
    </AuthProvider>
  )
}
