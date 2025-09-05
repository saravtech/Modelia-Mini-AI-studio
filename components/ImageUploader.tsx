'use client'
import React, { useId, useState } from 'react'
import { downscaleIfNeeded } from '@/utils/image'

export default function ImageUploader({ onReady }: { onReady: (dataUrl: string) => void }) {
  const id = useId()
  const [error, setError] = useState<string | null>(null)

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const file = e.target.files?.[0]
    if (!file) return
    if (!/^image\/(png|jpe?g)$/i.test(file.type)) {
      setError('Please upload a PNG or JPG')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File too large (max 10MB). Tip: try a smaller image.')
      return
    }
    try {
      const dataUrl = await downscaleIfNeeded(file, 1920)
      onReady(dataUrl)
    } catch {
      setError('Failed to process image')
    } finally {
      e.currentTarget.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">Upload image (PNG/JPG, ≤10MB)</label>
      <input
        id={id}
        type="file"
        accept="image/png,image/jpeg"
        onChange={onChange}
        className="focus-ring file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-800 file:text-gray-100 file:cursor-pointer"
      />
      {error && <p role="alert" className="text-sm">{error}</p>}
    </div>
  )
}
