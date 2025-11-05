// Performance monitoring and optimization utilities

export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map()

  measure(key: string, fn: () => void) {
    const start = performance.now()
    fn()
    const end = performance.now()
    const duration = end - start

    if (!this.metrics.has(key)) {
      this.metrics.set(key, [])
    }
    this.metrics.get(key)!.push(duration)

    console.log(`[Performance] ${key}: ${duration.toFixed(2)}ms`)
  }

  async measureAsync(key: string, fn: () => Promise<void>) {
    const start = performance.now()
    await fn()
    const end = performance.now()
    const duration = end - start

    if (!this.metrics.has(key)) {
      this.metrics.set(key, [])
    }
    this.metrics.get(key)!.push(duration)

    console.log(`[Performance] ${key}: ${duration.toFixed(2)}ms`)
  }

  getStats(key: string) {
    const measurements = this.metrics.get(key) || []
    if (measurements.length === 0) return null

    const avg = measurements.reduce((a, b) => a + b) / measurements.length
    const max = Math.max(...measurements)
    const min = Math.min(...measurements)

    return { avg, max, min, count: measurements.length }
  }

  clear() {
    this.metrics.clear()
  }
}

export const performanceMonitor = new PerformanceMonitor()

// Debounce utility for reducing function calls
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle utility for rate limiting
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Memoization for expensive computations
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map()

  return function memoized(...args: Parameters<T>) {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn(...args)
    cache.set(key, result)

    return result
  } as T
}
