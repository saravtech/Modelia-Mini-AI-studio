'use client'
import React, { useEffect, useMemo, useState } from 'react'
import ImageUploader from '@/components/ImageUploader'
import PromptStyleForm from '@/components/PromptStyleForm'
import Spinner from '@/components/Spinner'
import History from '@/components/History'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useAbortableGeneration } from '@/hooks/useAbortableGeneration'
import type { Generation, StyleOption } from '@/types'
import { loadHistory, pushHistory } from '@/utils/storage'

export default function Page() {
  const [imageDataUrl, setImageDataUrl] = useState<string>('')
  const [prompt, setPrompt] = useState<string>('')
  const [style, setStyle] = useState<StyleOption>('Editorial')
  const [history, setHistory] = useState<Generation[]>([])
  const { loading, error, result, generate, abort } = useAbortableGeneration()

  useEffect(() => { setHistory(loadHistory()) }, [])
  useEffect(() => { if (result) setHistory(pushHistory(result)) }, [result])

  const hasReady = imageDataUrl && prompt.trim().length > 0
  const summary = useMemo(() => ({ imageDataUrl, prompt, style }), [imageDataUrl, prompt, style])

  const onGenerate = async () => {
    if (!hasReady) return
    try {
      await generate(summary)
    } catch {}
  }

  const onRestore = (g: Generation) => {
    setImageDataUrl(g.imageUrl)
    setPrompt(g.prompt)
    setStyle(g.style)
  }

  return (
    <ErrorBoundary>
      <main className="mx-auto max-w-5xl p-4 sm:p-8 space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold">Modelia – Mini AI Studio (Next.js)</h1>
          <a className="focus-ring rounded-md px-3 py-1 bg-gray-900" href="https://github.com/saravtech/Modelia-Mini-AI-studio" target="_blank" rel="noreferrer">Repo</a>
        </header>

        <section aria-labelledby="uploader" className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <h2 id="uploader" className="text-lg font-medium">Upload & Settings</h2>
            <ImageUploader onReady={setImageDataUrl} />
            <PromptStyleForm prompt={prompt} style={style} onPrompt={setPrompt} onStyle={setStyle} />
            <div className="flex gap-3">
              <button
                disabled={!hasReady || loading}
                onClick={onGenerate}
                className="focus-ring rounded-md px-4 py-2 bg-gray-900 disabled:opacity-40"
              >
                {loading ? <span className="inline-flex items-center gap-2"><Spinner /> Generating…</span> : 'Generate (Mock)'}
              </button>
              {loading && (
                <button onClick={abort} className="focus-ring rounded-md px-4 py-2 bg-gray-900">Abort</button>
              )}
            </div>
            {error && <div role="status" aria-live="polite" className="text-sm">{error}</div>}
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-medium">Live Summary</h2>
            <div className="rounded-lg bg-gray-900 p-3 space-y-3">
              <div className="aspect-video rounded-md bg-gray-800 grid place-items-center overflow-hidden">
                {imageDataUrl ? (
                  <img src={imageDataUrl} alt="Uploaded preview" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-sm opacity-70">Upload an image to preview</span>
                )}
              </div>
              <div className="text-sm">
                <div><span className="opacity-70">Prompt:</span> {prompt || '—'}</div>
                <div><span className="opacity-70">Style:</span> {style}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-medium">History (last 5)</h3>
              <History items={history} onSelect={onRestore} />
            </div>
          </div>
        </section>
      </main>
    </ErrorBoundary>
  )
}
