export async function withRetry<T>(
  fn: (attempt: number) => Promise<T>,
  opts: { attempts?: number; baseMs?: number; signal?: AbortSignal } = {},
): Promise<T> {
  const attempts = opts.attempts ?? 3
  const base = opts.baseMs ?? 500

  let lastErr: unknown
  for (let i = 1; i <= attempts; i++) {
    if (opts.signal?.aborted) throw new DOMException('Aborted', 'AbortError')
    try {
      return await fn(i)
    } catch (e) {
      lastErr = e
      if (i === attempts) break
      const delay = base * 2 ** (i - 1) + Math.floor(Math.random() * 100)
      await new Promise<void>((resolve, reject) => {
        const id = setTimeout(resolve, delay)
        opts.signal?.addEventListener('abort', () => {
          clearTimeout(id)
          reject(new DOMException('Aborted', 'AbortError'))
        }, { once: true })
      })
    }
  }
  throw lastErr
}
