"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertCircle } from "lucide-react"

export function RealTimeMonitoring() {
  const [liveTransactions, setLiveTransactions] = useState([
    { id: "TXN-001", amount: 1250, merchant: "Amazon", status: "legit", confidence: 99 },
    { id: "TXN-002", amount: 5800, merchant: "Jewelry Store", status: "flagged", confidence: 78 },
    { id: "TXN-003", amount: 45, merchant: "Coffee Shop", status: "legit", confidence: 99 },
    { id: "TXN-004", amount: 12500, merchant: "International Wire", status: "review", confidence: 65 },
    { id: "TXN-005", amount: 350, merchant: "Retail", status: "legit", confidence: 98 },
  ])

  const [metrics, setMetrics] = useState({
    transactionsPerSecond: 145,
    alertsActive: 23,
    fraudBlockedTotal: 2341,
    systemHealth: 99.7,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTransactions((prev) => [
        {
          id: `TXN-${String(Math.floor(Math.random() * 10000)).padStart(3, "0")}`,
          amount: Math.floor(Math.random() * 15000),
          merchant: ["Amazon", "Walmart", "Target", "Apple", "Jewelry", "Wire Service"][Math.floor(Math.random() * 6)],
          status: Math.random() > 0.95 ? "flagged" : Math.random() > 0.92 ? "review" : "legit",
          confidence: Math.floor(Math.random() * 40) + 60,
        },
        ...prev.slice(0, 9),
      ])

      setMetrics((prev) => ({
        transactionsPerSecond: Math.floor(140 + Math.random() * 20),
        alertsActive: Math.max(20, prev.alertsActive + Math.floor(Math.random() * 5) - 2),
        fraudBlockedTotal: prev.fraudBlockedTotal + Math.floor(Math.random() * 3),
        systemHealth: Math.min(100, prev.systemHealth + (Math.random() - 0.5) * 0.5),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Real-Time Monitoring</h2>
        <p className="text-muted-foreground">Live transaction streaming and system performance metrics</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-green-400">LIVE</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{metrics.transactionsPerSecond}</div>
            <p className="text-xs text-muted-foreground">Txn/Second</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-semibold text-orange-400">ACTIVE</span>
            </div>
            <div className="text-3xl font-bold text-orange-400 mb-1">{metrics.alertsActive}</div>
            <p className="text-xs text-muted-foreground">Alerts</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-red-400">BLOCKED</span>
            </div>
            <div className="text-3xl font-bold text-red-400 mb-1">{metrics.fraudBlockedTotal}</div>
            <p className="text-xs text-muted-foreground">Fraud Cases</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-green-400">HEALTH</span>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-1">{metrics.systemHealth.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">System</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Live Transaction Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {liveTransactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border/50 hover:border-border transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-xs font-mono text-primary">{txn.id}</code>
                    <span className="text-sm font-semibold text-foreground">${txn.amount.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">{txn.merchant}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Badge
                    className={`text-xs ${
                      txn.status === "legit"
                        ? "bg-green-500/20 text-green-400"
                        : txn.status === "flagged"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {txn.status === "legit" ? "Legitimate" : txn.status === "flagged" ? "Flagged" : "Review"}
                  </Badge>
                  <span className="text-xs font-semibold text-muted-foreground w-12 text-right">{txn.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
