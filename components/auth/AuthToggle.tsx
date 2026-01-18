'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface AuthToggleProps {
  isLogin: boolean
  onToggle: (isLogin: boolean) => void
}

export const AuthToggle: React.FC<AuthToggleProps> = ({ isLogin, onToggle }) => {
  return (
    <div className="relative flex p-1 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
      <motion.div
        className="absolute inset-y-1 w-1/2 bg-primary-600 rounded-md"
        initial={false}
        animate={{ x: isLogin ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      <button
        onClick={() => onToggle(true)}
        className={cn(
          'relative z-10 flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md',
          isLogin ? 'text-white' : 'text-[var(--muted)]'
        )}
      >
        Login
      </button>
      <button
        onClick={() => onToggle(false)}
        className={cn(
          'relative z-10 flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md',
          !isLogin ? 'text-white' : 'text-[var(--muted)]'
        )}
      >
        Sign Up
      </button>
    </div>
  )
}
