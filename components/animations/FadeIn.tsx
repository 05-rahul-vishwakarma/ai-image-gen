'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/utils/animations'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  className,
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
