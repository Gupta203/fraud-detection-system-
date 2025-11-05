"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const metrics = [
  { label: "Precision", value: 97.2, color: "bg-green-400" },
  { label: "Recall", value: 96.8, color: "bg-blue-400" },
  { label: "F1-Score", value: 97.0, color: "bg-purple-400" },
  { label: "ROC-AUC", value: 99.1, color: "bg-orange-400" },
]

export function ModelPerformance() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Model Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <span className="text-sm font-semibold text-foreground">{metric.value}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className={`h-full rounded-full ${metric.color}`} style={{ width: `${metric.value}%` }}></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
