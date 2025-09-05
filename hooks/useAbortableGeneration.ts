'use client'
import { useCallback, useMemo, useRef, useState } from 'react'
import { withRetry } from '@/utils/retry'
import type { Generation, GenerationRequest } from '@/types'

export function useAbortableGeneration() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<Generation | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  const abort = useCallback(() => {
    controllerRef.current?.abort()
  }, [])

  const generate = useCallback(async (req: GenerationRequest) => {
    setLoading(true)
    setError(null)
    setResult(null)
    const controller = new AbortController()
    controllerRef.current = controller

    try {
      const res = await withRetry(
        async () => {
          const r = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req),
            signal: controller.signal,
          })
          if (!r.ok) {
            const data = await r.json().catch(() => ({} as any))
            const msg = (data && data.message) || r.statusText
            throw new Error(String(msg))
          }
          return (await r.json()) as Generation
        },
        { attempts: 3, baseMs: 500, signal: controller.signal },
      )
      setResult(res)
      return res
    } catch (e: any) {
      if (e instanceof DOMException && e.name === 'AbortError') {
        setError('Request aborted')
      } else {
        setError(String(e?.message ?? 'Unknown error'))
      }
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  return useMemo(() => ({
    loading, error, result, generate, abort
  }), [loading, error, result, generate, abort])
}
