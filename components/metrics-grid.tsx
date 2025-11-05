"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, AlertTriangle, CheckCircle2, TrendingUp, Zap } from "lucide-react"

const metrics = [
  {
    label: "Total Transactions",
    value: "156,843",
    change: "+12.5%",
    icon: Zap,
    trend: "up",
  },
  {
    label: "Fraudulent Cases",
    value: "342",
    change: "-2.3%",
    icon: AlertTriangle,
    trend: "down",
  },
  {
    label: "Detection Accuracy",
    value: "98.7%",
    change: "+0.4%",
    icon: CheckCircle2,
    trend: "up",
  },
  {
    label: "Prevented Loss",
    value: "$2.4M",
    change: "+18.2%",
    icon: TrendingUp,
    trend: "up",
  },
]

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const isUp = metric.trend === "up"
        const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight
        const trendColor = isUp ? "text-green-400" : "text-red-400"
        const bgColor = isUp ? "bg-green-400/10" : "bg-red-400/10"

        return (
          <Card key={metric.label} className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${bgColor}`}>
                  <Icon className={`w-5 h-5 ${isUp ? "text-green-400" : "text-red-400"}`} />
                </div>
              </div>
              <div className={`flex items-center gap-1 ${trendColor}`}>
                <TrendIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
