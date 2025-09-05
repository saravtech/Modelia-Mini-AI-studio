import type { Generation } from '@/types'

const KEY = 'modelia-history-v1'

export function loadHistory(): Generation[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const items = JSON.parse(raw) as Generation[]
    return Array.isArray(items) ? items.slice(0, 5) : []
  } catch {
    return []
  }
}

export function saveHistory(items: Generation[]) {
  localStorage.setItem(KEY, JSON.stringify(items.slice(0, 5)))
}

export function pushHistory(item: Generation) {
  const items = loadHistory()
  const next = [item, ...items.filter((i) => i.id !== item.id)]
  saveHistory(next)
  return next
}
