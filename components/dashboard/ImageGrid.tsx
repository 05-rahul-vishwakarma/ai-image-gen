'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Trash2, Image as ImageIcon } from 'lucide-react'
import { useImagesStore } from '@/lib/stores/imagesStore'
import { staggerContainer, staggerItem } from '@/lib/utils/animations'
import toast from 'react-hot-toast'
import Image from 'next/image'

export const ImageGrid: React.FC = () => {
  const { images, removeImage } = useImagesStore()

  const handleDownload = async (url: string, prompt: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `ai-generated-${Date.now()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
      toast.success('Image downloaded')
    } catch (error) {
      toast.error('Failed to download image')
    }
  }

  const handleDelete = (id: string) => {
    removeImage(id)
    toast.success('Image deleted')
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-24 h-24 rounded-full bg-[var(--surface)] flex items-center justify-center mb-6">
          <ImageIcon className="h-12 w-12 text-[var(--muted)] opacity-50" />
        </div>
        <h3 className="text-xl font-semibold text-[var(--text)] mb-2">
          No images yet
        </h3>
        <p className="text-[var(--muted)] text-center max-w-md">
          Start generating amazing images with AI. Enter a prompt above to get started!
        </p>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {images.map((image) => (
          <motion.div
            key={image.id}
            variants={staggerItem}
            layout
            exit={{ opacity: 0, scale: 0.9 }}
            className="group relative glass-card overflow-hidden rounded-xl"
          >
            {/* Image */}
            <div className="relative aspect-square">
              <Image
                src={image.url}
                alt={image.prompt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4">
                <p className="text-white text-sm line-clamp-3">
                  {image.prompt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-white/80">
                    {image.size} • {image.quality}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(image.url, image.prompt)}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    >
                      <Download className="h-4 w-4 text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info bar */}
            <div className="p-3 border-t border-[var(--border)]">
              <p className="text-xs text-[var(--muted)] truncate">
                {new Date(image.timestamp).toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
