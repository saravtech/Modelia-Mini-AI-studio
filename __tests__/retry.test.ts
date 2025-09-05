import { withRetry } from '@/utils/retry'

test('retries and succeeds', async () => {
  let attempts = 0
  const res = await withRetry(async () => {
    attempts++
    if (attempts < 2) throw new Error('fail')
    return 7
  }, { attempts: 3, baseMs: 1 })
  expect(res).toBe(7)
  expect(attempts).toBe(2)
})
