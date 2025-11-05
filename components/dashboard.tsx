"use client"

import { MetricsGrid } from "./metrics-grid"
import { RecentTransactions } from "./recent-transactions"
import { ModelPerformance } from "./model-performance"
import { FraudTrends } from "./fraud-trends"

export function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Fraud Detection Dashboard</h2>
        <p className="text-muted-foreground">Real-time AI/ML-based transaction monitoring</p>
      </div>

      <MetricsGrid />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <FraudTrends />
        </div>
        <div>
          <ModelPerformance />
        </div>
      </div>

      <RecentTransactions />
    </div>
  )
}
