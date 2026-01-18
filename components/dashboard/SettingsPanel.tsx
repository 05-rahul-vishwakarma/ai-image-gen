'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Palette, Image as ImageIcon, Sparkles } from 'lucide-react'
import { useThemeStore } from '@/lib/stores/themeStore'
import { useSettingsStore } from '@/lib/stores/settingsStore'
import { Theme, ImageSize, ImageQuality, AIModel } from '@/types'
import { Select } from '@/components/ui/Select'
import { slideFromRight } from '@/lib/utils/animations'
import toast from 'react-hot-toast'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const { theme, setTheme } = useThemeStore()
  const { imageSize, imageQuality, aiModel, setImageSize, setImageQuality, setAIModel } =
    useSettingsStore()

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    toast.success(`Theme changed to ${newTheme}`)
  }

  const themes: { value: Theme; label: string; description: string }[] = [
    { value: 'dark', label: 'Dark', description: 'Classic dark theme' },
    { value: 'light', label: 'Light', description: 'Clean light theme' },
    { value: 'neon', label: 'Neon', description: 'Vibrant neon colors' },
    { value: 'glass', label: 'Glass', description: 'Glassmorphism effect' },
  ]

  const imageSizes: ImageSize[] = ['512x512', '1024x1024', '1536x1536']
  const imageQualities: ImageQuality[] = ['standard', 'hd']
  const aiModels: AIModel[] = ['dall-e-3', 'stable-diffusion', 'midjourney']

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 h-screen w-full max-w-md glass-card border-l border-[var(--border)] z-50 overflow-y-auto custom-scrollbar"
          >
            {/* Header */}
            <div className="sticky top-0 glass-card border-b border-[var(--border)] p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[var(--text)]">
                  Settings
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-[var(--muted)]" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Theme Settings */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="h-5 w-5 text-primary-500" />
                  <h3 className="text-lg font-semibold text-[var(--text)]">
                    Theme
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => handleThemeChange(t.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === t.value
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-[var(--border)] hover:border-primary-500/50'
                      }`}
                    >
                      <div className="text-left">
                        <p className="font-medium text-[var(--text)] mb-1">
                          {t.label}
                        </p>
                        <p className="text-xs text-[var(--muted)]">
                          {t.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Settings */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="h-5 w-5 text-primary-500" />
                  <h3 className="text-lg font-semibold text-[var(--text)]">
                    Image Settings
                  </h3>
                </div>
                <div className="space-y-4">
                  <Select
                    label="Image Size"
                    value={imageSize}
                    onChange={(e) => setImageSize(e.target.value as ImageSize)}
                    options={imageSizes.map((size) => ({
                      value: size,
                      label: size,
                    }))}
                  />
                  <Select
                    label="Image Quality"
                    value={imageQuality}
                    onChange={(e) =>
                      setImageQuality(e.target.value as ImageQuality)
                    }
                    options={imageQualities.map((quality) => ({
                      value: quality,
                      label: quality.charAt(0).toUpperCase() + quality.slice(1),
                    }))}
                  />
                </div>
              </div>

              {/* AI Model Settings */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary-500" />
                  <h3 className="text-lg font-semibold text-[var(--text)]">
                    AI Model
                  </h3>
                </div>
                <Select
                  label="Select Model"
                  value={aiModel}
                  onChange={(e) => setAIModel(e.target.value as AIModel)}
                  options={aiModels.map((model) => ({
                    value: model,
                    label: model
                      .split('-')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' '),
                  }))}
                />
                <p className="mt-2 text-xs text-[var(--muted)]">
                  Different models may produce varying results and have different strengths
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
