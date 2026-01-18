'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/utils/animations'

interface PageTransitionProps {
  children: React.ReactNode
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  )
}
