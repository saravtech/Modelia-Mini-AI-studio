'use client'
import React, { useId } from 'react'
import type { StyleOption } from '@/types'

export default function PromptStyleForm({
  prompt, style, onPrompt, onStyle
}: { prompt: string; style: StyleOption; onPrompt: (v: string) => void; onStyle: (v: StyleOption) => void }) {
  const promptId = useId()
  const styleId = useId()
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="flex flex-col gap-1">
        <label htmlFor={promptId} className="text-sm font-medium">Prompt</label>
        <input
          id={promptId}
          value={prompt}
          onChange={(e) => onPrompt(e.target.value)}
          placeholder="Describe your idea…"
          className="focus-ring rounded-md bg-gray-900 px-3 py-2"
          aria-describedby="prompt-help"
        />
        <span id="prompt-help" className="text-xs">Keep it short; e.g., “cinematic portrait, soft lighting”.</span>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={styleId} className="text-sm font-medium">Style</label>
        <select
          id={styleId}
          value={style}
          onChange={(e) => onStyle(e.target.value as StyleOption)}
          className="focus-ring rounded-md bg-gray-900 px-3 py-2"
        >
          <option value="Editorial">Editorial</option>
          <option value="Streetwear">Streetwear</option>
          <option value="Vintage">Vintage</option>
        </select>
      </div>
    </div>
  )
}
