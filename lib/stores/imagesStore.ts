import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GeneratedImage, PromptHistoryItem } from '@/types'

interface ImagesState {
  images: GeneratedImage[]
  history: PromptHistoryItem[]
  isGenerating: boolean
  currentPrompt: string
  addImage: (image: GeneratedImage) => void
  setImages: (images: GeneratedImage[]) => void
  addToHistory: (item: PromptHistoryItem) => void
  setCurrentPrompt: (prompt: string) => void
  setIsGenerating: (isGenerating: boolean) => void
  clearImages: () => void
  clearHistory: () => void
  removeImage: (id: string) => void
}

export const useImagesStore = create<ImagesState>()(
  persist(
    (set, get) => ({
      images: [],
      history: [],
      isGenerating: false,
      currentPrompt: '',

      addImage: (image: GeneratedImage) => {
        set((state) => ({
          images: [image, ...state.images],
        }))
      },

      setImages: (images: GeneratedImage[]) => {
        set({ images })
      },

      addToHistory: (item: PromptHistoryItem) => {
        set((state) => {
          // Check if prompt already exists in history
          const exists = state.history.some(h => h.prompt === item.prompt)
          if (exists) return state

          return {
            history: [item, ...state.history].slice(0, 50), // Keep last 50 items
          }
        })
      },

      setCurrentPrompt: (currentPrompt: string) => {
        set({ currentPrompt })
      },

      setIsGenerating: (isGenerating: boolean) => {
        set({ isGenerating })
      },

      clearImages: () => {
        set({ images: [] })
      },

      clearHistory: () => {
        set({ history: [] })
      },

      removeImage: (id: string) => {
        set((state) => ({
          images: state.images.filter((img) => img.id !== id),
        }))
      },
    }),
    {
      name: 'images-storage',
      partialize: (state) => ({
        images: state.images.slice(0, 20), // Only persist last 20 images
        history: state.history,
      }),
    }
  )
)
