'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useImagesStore } from '@/lib/stores/imagesStore'
import { useSettingsStore } from '@/lib/stores/settingsStore'
import { useCreateGeneration } from '@/hooks'
import { GeneratedImage } from '@/types'
import toast from 'react-hot-toast'

export const PromptInput: React.FC = () => {
  const {
    currentPrompt,
    setCurrentPrompt,
    addImage,
    addToHistory,
  } = useImagesStore()

  const { imageSize, imageQuality, aiModel } = useSettingsStore()
  const { generate, isLoading: isGenerating } = useCreateGeneration()
  const [prompt, setPrompt] = useState(currentPrompt)

  useEffect(() => {
    setPrompt(currentPrompt)
  }, [currentPrompt])

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      return
    }

    setCurrentPrompt(prompt)

    try {
      const sizeDimensions = imageSize === '1024x1024' ? 1024 : 512

      const response = await generate({
        prompt: prompt,
        settings: {
          width: sizeDimensions,
          height: sizeDimensions,
        },
      })

      const generatedImage: GeneratedImage = {
        id: response.data.id,
        prompt: prompt,
        url: response.data.image_url,
        timestamp: Date.now(),
        size: imageSize,
        quality: imageQuality,
        model: aiModel,
      }

      addImage(generatedImage)
      addToHistory({
        id: Date.now().toString(),
        prompt: prompt,
        timestamp: Date.now(),
        imageCount: 1,
      })

      toast.success('Image generated successfully!')

      // Clear the prompt after successful generation
      setPrompt('')
      setCurrentPrompt('')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Failed to generate image')
    }
  }

  const suggestions = [
    'A futuristic city at sunset',
    'Cyberpunk cat with neon lights',
    'Abstract art with vibrant colors',
    'Fantasy landscape with mountains',
  ]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card p-8 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <Wand2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text)]">
                Generate Image
              </h2>
              <p className="text-sm text-[var(--muted)]">
                Describe what you want to create
              </p>
            </div>
          </div>

          <div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.metaKey) {
                  handleGenerate()
                }
              }}
              placeholder="A beautiful sunset over the ocean with vibrant colors..."
              className="w-full h-32 px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)] resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              disabled={isGenerating}
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-[var(--muted)]">
                {prompt.length} / 1000 characters
              </p>
              <p className="text-xs text-[var(--muted)]">
                Press ⌘ + Enter to generate
              </p>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isGenerating}
            disabled={!prompt.trim()}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {isGenerating ? 'Generating...' : 'Generate Image'}
          </Button>
        </div>

        <div className="mt-6 lg:block hidden  ">
          <p className="text-sm font-medium text-[var(--muted)] mb-3">
            Try these prompts:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setPrompt(suggestion)}
                className="px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text)] hover:bg-opacity-80 hover:border-primary-500 transition-all"
                disabled={isGenerating}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
