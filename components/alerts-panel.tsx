"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Check, Trash2 } from "lucide-react"

interface Alert {
  id: string
  type: "critical" | "warning" | "info"
  message: string
  timestamp: string
  transaction?: string
  amount?: number
  status: "active" | "resolved"
}

export function AlertsPanel({ alerts: initialAlerts }: { alerts: Alert[] }) {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "critical",
      message: "Multiple high-value transactions detected from same IP",
      timestamp: new Date().toISOString(),
      transaction: "TXN-2024-0001",
      amount: 45000,
      status: "active",
    },
    {
      id: "2",
      type: "warning",
      message: "Card-not-present transaction with new device",
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      transaction: "TXN-2024-0002",
      amount: 8500,
      status: "active",
    },
    {
      id: "3",
      type: "info",
      message: "Geographical anomaly detected - transaction from unusual location",
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      transaction: "TXN-2024-0003",
      amount: 2100,
      status: "resolved",
    },
  ])

  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "active">("all")

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true
    if (filter === "active") return alert.status === "active"
    return alert.type === filter
  })

  const resolveAlert = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, status: "resolved" } : alert)))
  }

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Real-Time Alerts</h2>
        <p className="text-muted-foreground">Instant notifications for suspicious transactions and anomalies</p>
      </div>

      <div className="flex gap-2">
        {(["all", "critical", "warning", "active"] as const).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "default" : "outline"}
            onClick={() => setFilter(type)}
            className="capitalize"
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No alerts found</p>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`border-l-4 ${
                alert.type === "critical"
                  ? "border-l-red-500 bg-red-500/5"
                  : alert.type === "warning"
                    ? "border-l-yellow-500 bg-yellow-500/5"
                    : "border-l-blue-500 bg-blue-500/5"
              } border-border`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-orange-400" />
                      <span className="text-sm font-medium text-foreground capitalize">{alert.type}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          alert.status === "resolved" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {alert.status}
                      </span>
                    </div>
                    <p className="text-foreground mb-2">{alert.message}</p>
                    {alert.transaction && (
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Transaction ID: {alert.transaction}</p>
                        {alert.amount && <p>Amount: ${alert.amount.toLocaleString()}</p>}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    {alert.status === "active" && (
                      <Button size="sm" variant="outline" onClick={() => resolveAlert(alert.id)}>
                        <Check className="w-4 h-4 mr-1" />
                        Resolve
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteAlert(alert.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
