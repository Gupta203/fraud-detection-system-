"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingUp, AlertCircle, Zap } from "lucide-react"
import { notificationManager } from "@/lib/notification-service"

interface SmartAlert {
  id: string
  type: "fraud-detected" | "anomaly" | "threshold" | "trend"
  title: string
  description: string
  severity: "critical" | "high" | "medium"
  action: string
  timestamp: Date
  read: boolean
}

export function SmartAlerts() {
  const [alerts, setAlerts] = useState<SmartAlert[]>([
    {
      id: "1",
      type: "fraud-detected",
      title: "Critical Fraud Detected",
      description: "3 fraudulent transactions flagged in last 5 minutes from IP 192.168.1.1",
      severity: "critical",
      action: "Review Transactions",
      timestamp: new Date(),
      read: false,
    },
    {
      id: "2",
      type: "anomaly",
      title: "Unusual Customer Behavior",
      description: "Customer #4521 made 15 transactions in 10 minutes (3x normal)",
      severity: "high",
      action: "Analyze Pattern",
      timestamp: new Date(Date.now() - 300000),
      read: false,
    },
  ])

  const handleAlertAction = (alert: SmartAlert) => {
    notificationManager.warning(alert.title, alert.description, 0)
    setAlerts(alerts.map((a) => (a.id === alert.id ? { ...a, read: true } : a)))
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Smart Alert System</h2>
        <p className="text-muted-foreground">AI-powered alerts with contextual actions</p>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card
            key={alert.id}
            className={`border-l-4 cursor-pointer hover:bg-muted/50 transition-colors ${
              alert.severity === "critical"
                ? "border-l-red-500 bg-red-500/5"
                : alert.severity === "high"
                  ? "border-l-yellow-500 bg-yellow-500/5"
                  : "border-l-blue-500 bg-blue-500/5"
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-3 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {alert.type === "fraud-detected" && <AlertTriangle className="w-5 h-5 text-red-500" />}
                    {alert.type === "anomaly" && <TrendingUp className="w-5 h-5 text-yellow-500" />}
                    {alert.type === "threshold" && <AlertCircle className="w-5 h-5 text-blue-500" />}
                    {alert.type === "trend" && <Zap className="w-5 h-5 text-orange-500" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{alert.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{alert.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleAlertAction(alert)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {alert.action}
                  </Button>
                  {!alert.read && <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
