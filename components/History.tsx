'use client'
import React from 'react'
import type { Generation } from '@/types'

export default function History({ items, onSelect }: { items: Generation[]; onSelect: (g: Generation) => void }) {
  if (!items.length) return <div className="text-sm opacity-70">No history yet.</div>
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((g) => (
        <li key={g.id}>
          <button
            className="focus-ring w-full rounded-lg bg-gray-900 p-2 text-left"
            onClick={() => onSelect(g)}
            aria-label={`Restore generation from ${new Date(g.createdAt).toLocaleString()}`}
          >
            <div className="flex gap-3 items-center">
              <img src={g.imageUrl} alt="" className="h-16 w-16 object-cover rounded-md" />
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{g.prompt}</div>
                <div className="text-xs opacity-70">{g.style} · {new Date(g.createdAt).toLocaleString()}</div>
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}
