'use client'

import React from 'react'
import { Sparkles, Menu } from 'lucide-react'
import { UserMenu } from './UserMenu'

interface TopBarProps {
  onMenuClick: () => void
  onSettingsClick: () => void
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick, onSettingsClick }) => {
  return (
    <div className="sticky top-0 z-40 glass-card border-b border-[var(--border)]">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-[var(--surface)] rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6 text-[var(--text)]" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">
              AI Image Generator
            </span>
          </div>
        </div>

        <UserMenu onSettingsClick={onSettingsClick} />
      </div>
    </div>
  )
}
