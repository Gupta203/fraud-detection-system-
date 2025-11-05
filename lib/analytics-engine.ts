export class AnalyticsEngine {
  private events: Array<{
    type: string
    timestamp: Date
    data: Record<string, any>
  }> = []

  private metrics: Record<string, number> = {
    totalTransactions: 0,
    fraudDetected: 0,
    avgProcessingTime: 0,
    systemUptime: 99.97,
  }

  trackEvent(type: string, data: Record<string, any>): void {
    this.events.push({
      type,
      timestamp: new Date(),
      data,
    })
  }

  trackTransaction(amount: number, isFraud: boolean, processingTime: number): void {
    this.trackEvent("transaction", { amount, isFraud, processingTime })
    this.metrics.totalTransactions++
    if (isFraud) this.metrics.fraudDetected++
  }

  getMetrics() {
    const totalTime = this.events.reduce((sum, e) => sum + (e.data.processingTime || 0), 0)
    return {
      ...this.metrics,
      avgProcessingTime: this.metrics.totalTransactions ? totalTime / this.metrics.totalTransactions : 0,
      fraudRate: (this.metrics.fraudDetected / this.metrics.totalTransactions) * 100,
      eventCount: this.events.length,
    }
  }

  getEventHistory(limit = 100) {
    return this.events.slice(-limit)
  }

  exportReport() {
    return {
      metrics: this.getMetrics(),
      events: this.events,
      exportedAt: new Date().toISOString(),
    }
  }
}

export const analyticsEngine = new AnalyticsEngine()
