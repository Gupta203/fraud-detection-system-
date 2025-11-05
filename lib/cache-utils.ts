// <NEW> Cache utility for optimizing data fetching and state management
interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

class SimpleCache<T> {
  private cache = new Map<string, CacheEntry<T>>()
  private timers = new Map<string, NodeJS.Timeout>()

  set(key: string, data: T, ttlSeconds = 300) {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000,
    }
    this.cache.set(key, entry)

    // Clear old timer if exists
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key))
    }

    // Set new timer for TTL expiry
    const timer = setTimeout(() => {
      this.cache.delete(key)
      this.timers.delete(key)
    }, entry.ttl)

    this.timers.set(key, timer)
  }

  get(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    const now = Date.now()
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  clear() {
    this.cache.clear()
    this.timers.forEach((timer) => clearTimeout(timer))
    this.timers.clear()
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }
}

// Export singleton instances for different data types
export const transactionCache = new SimpleCache<any>()
export const alertCache = new SimpleCache<any>()
export const modelCache = new SimpleCache<any>()

export function getCacheStats() {
  return {
    transactionCacheSize: transactionCache["cache"].size,
    alertCacheSize: alertCache["cache"].size,
    modelCacheSize: modelCache["cache"].size,
  }
}
