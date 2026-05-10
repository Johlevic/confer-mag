const stores = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(key: string, max: number = 5, windowMs: number = 60000) {
  const now = Date.now()
  const entry = stores.get(key)

  if (!entry || now > entry.resetAt) {
    stores.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: max - 1 }
  }

  if (entry.count >= max) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: max - entry.count }
}
