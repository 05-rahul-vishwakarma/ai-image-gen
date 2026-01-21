'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, PlusCircle, Clock, Image as ImageIcon, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { useImagesStore } from '@/lib/stores/imagesStore'
import { useGenerationsList } from '@/hooks'
import { UserMenu } from './UserMenu'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onSettingsClick: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onSettingsClick }) => {
  const router = useRouter()
  const { setCurrentPrompt } = useImagesStore()
  const { generations, fetchGenerations, isLoading } = useGenerationsList()

  // Fetch generations on mount
  useEffect(() => {
    fetchGenerations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleHistoryClick = (id: string, prompt: string) => {
    setCurrentPrompt(prompt)
    router.push(`/dashboard/${id}`)
    if (window.innerWidth < 1024) {
      onClose()
    }
  }

  const handleNewChat = () => {
    setCurrentPrompt('')
    if (window.innerWidth < 1024) {
      onClose()
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - ChatGPT style */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        className={cn(
          'fixed lg:static top-0 left-0 h-screen w-[280px] bg-[var(--surface)] border-r border-[var(--border)] z-50',
          'flex flex-col overflow-hidden',
          'lg:translate-x-0'
        )}
      >
        {/* Top Actions */}
        <div className="p-3 border-b border-[var(--border)]">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--bg)] transition-colors text-[var(--text)] group"
          >
            <PlusCircle className="h-5 w-5 group-hover:text-primary-500 transition-colors" />
            <span className="font-medium">New Generation</span>
          </button>

          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-3 right-3 p-2 hover:bg-[var(--bg)] rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-[var(--muted)]" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-3 border-b border-[var(--border)] space-y-1">
          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--bg)] transition-colors text-[var(--text)]"
          >
            <ImageIcon className="h-4 w-4" />
            <span className="text-sm">Images</span>
          </button>
          <button
            onClick={onSettingsClick}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--bg)] transition-colors text-[var(--text)]"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm">Settings</span>
          </button>
        </div>

        {/* History Section */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="px-3 py-2 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
              Your History
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-2 space-y-1">
            {isLoading ? (
              <div className="text-center py-12 px-4">
                <Clock className="h-10 w-10 text-[var(--muted)] mx-auto mb-3 opacity-30 animate-spin" />
                <p className="text-[var(--muted)] text-xs">
                  Loading history...
                </p>
              </div>
            ) : generations.length === 0 ? (
              <div className="text-center py-12 px-4">
                <Clock className="h-10 w-10 text-[var(--muted)] mx-auto mb-3 opacity-30" />
                <p className="text-[var(--muted)] text-xs">
                  No history yet
                </p>
              </div>
            ) : (
              generations.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleHistoryClick(item.id, item.prompt)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--bg)] transition-colors group"
                  whileHover={{ x: 2 }}
                >
                  <p className="text-sm text-[var(--text)] line-clamp-2 mb-1 group-hover:text-primary-500 transition-colors">
                    {item.prompt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                    <span>{item.settings.width}x{item.settings.height}</span>
                    <span>•</span>
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </motion.button>
              ))
            )}
          </div>
        </div>

        {/* User Menu at Bottom */}
        <div className="p-3 border-t border-[var(--border)]">
          <UserMenu onSettingsClick={onSettingsClick} />
        </div>
      </motion.aside>
    </>
  )
}
