export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  createdAt: number
}

export interface GeneratedImage {
  id: string
  prompt: string
  url: string
  timestamp: number
  size: ImageSize
  quality: ImageQuality
  model: AIModel
}

export type Theme = 'dark' | 'light' | 'neon' | 'glass'

export type ImageSize = '512x512' | '1024x1024' | '1536x1536'

export type ImageQuality = 'standard' | 'hd'

export type AIModel = 'dall-e-3' | 'stable-diffusion' | 'midjourney'

export interface Settings {
  theme: Theme
  imageSize: ImageSize
  imageQuality: ImageQuality
  aiModel: AIModel
}

export interface PromptHistoryItem {
  id: string
  prompt: string
  timestamp: number
  imageCount: number
}

export interface AuthFormData {
  email: string
  password: string
  confirmPassword?: string
  name?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface GenerateImageRequest {
  prompt: string
  size: ImageSize
  quality: ImageQuality
  model: AIModel
}

export interface GenerateImageResponse {
  images: GeneratedImage[]
}
