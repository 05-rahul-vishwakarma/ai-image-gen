'use client'

import { use, useEffect } from 'react'
import { PromptInput } from '@/components/dashboard/PromptInput'
import { ImageGrid } from '@/components/dashboard/ImageGrid'
import { PageTransition } from '@/components/animations/PageTransition'
import { useImagesStore } from '@/lib/stores/imagesStore'
import { useGenerationById } from '@/hooks'
import { GeneratedImage, ImageSize, AIModel } from '@/types'

interface DynamicDashboardPageProps {
  params: Promise<{
    id: string
  }>
}

// Helper function to map size string to ImageSize type
const mapToImageSize = (width: number, height: number): ImageSize => {
  const sizeStr = `${width}x${height}`
  if (sizeStr === '512x512' || sizeStr === '1024x1024' || sizeStr === '1536x1536') {
    return sizeStr as ImageSize
  }
  return '1024x1024' // default fallback
}

export default function DynamicDashboardPage({ params }: DynamicDashboardPageProps) {
  // Unwrap the params Promise
  const { id } = use(params)

  const { setCurrentPrompt, setImages } = useImagesStore()
  const { isLoading, fetchGeneration } = useGenerationById()

  useEffect(() => {
    const loadGeneration = async () => {
      try {
        const gen = await fetchGeneration(id)

        // Update the current prompt
        setCurrentPrompt(gen.prompt)

        // Map the generation to GeneratedImage format and update store
        const mappedImage: GeneratedImage = {
          id: gen.id,
          prompt: gen.prompt,
          url: gen.image_url,
          timestamp: new Date(gen.created_at).getTime(),
          size: mapToImageSize(gen.settings.width, gen.settings.height),
          quality: 'standard',
          model: 'dall-e-3' as AIModel,
        }

        setImages([mappedImage])
      } catch (error) {
        console.error('Failed to load generation:', error)
      }
    }

    loadGeneration()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <PageTransition>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-[var(--muted)]">Loading generation...</div>
              </div>
            ) : (
              <ImageGrid />
            )}
          </div>
        </div>

        <div className="bg-[var(--bg)]">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <PromptInput />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
