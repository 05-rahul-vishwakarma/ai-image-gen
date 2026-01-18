'use client'

import React from 'react'
import { PromptInput } from '@/components/dashboard/PromptInput'
import { ImageGrid } from '@/components/dashboard/ImageGrid'
import { PageTransition } from '@/components/animations/PageTransition'

export default function DashboardPage() {
  return (
    <PageTransition>
      <div className="h-full flex flex-col">
        {/* Main content area - ChatGPT style centered layout */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            <ImageGrid />
          </div>
        </div>

        {/* Bottom prompt input - fixed at bottom like ChatGPT */}
        <div className="border-t border-[var(--border)] bg-[var(--bg)]">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <PromptInput />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
