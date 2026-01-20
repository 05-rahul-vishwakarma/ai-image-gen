'use client'

import React from 'react'
import { PromptInput } from '@/components/dashboard/PromptInput'
import { ImageGrid } from '@/components/dashboard/ImageGrid'
import { PageTransition } from '@/components/animations/PageTransition'

export default function DashboardPage() {
  return (
    <PageTransition>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <ImageGrid />
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
