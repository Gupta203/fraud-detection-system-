"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap } from "lucide-react"

export function MLPipelineVisualizer() {
  const pipeline = [
    {
      stage: "Data Input",
      description: "Transaction data ingestion",
      status: "active",
      metrics: { processed: 10500, rate: "350/sec" },
    },
    {
      stage: "Feature Engineering",
      description: "Extract and normalize features",
      status: "active",
      metrics: { features: 48, quality: "99.2%" },
    },
    {
      stage: "Random Forest",
      description: "ML model prediction layer 1",
      status: "active",
      metrics: { accuracy: "98.5%", confidence: "94.2%" },
    },
    {
      stage: "XGBoost",
      description: "ML model prediction layer 2",
      status: "active",
      metrics: { accuracy: "97.8%", confidence: "93.1%" },
    },
    {
      stage: "Neural Network",
      description: "Deep learning model layer",
      status: "active",
      metrics: { accuracy: "96.9%", confidence: "91.5%" },
    },
    {
      stage: "Ensemble",
      description: "Combine predictions (voting)",
      status: "active",
      metrics: { accuracy: "98.7%", finalScore: "95.3%" },
    },
    {
      stage: "Output",
      description: "Classification & Risk Score",
      status: "active",
      metrics: { alerts: 847, blocked: 23 },
    },
  ]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">ML Pipeline Visualizer</h2>
        <p className="text-muted-foreground">Real-time visualization of data flow through fraud detection models</p>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="space-y-3">
            {pipeline.map((stage, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex-1 p-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg border border-primary/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{stage.stage}</h4>
                    <Badge
                      className={`${
                        stage.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {stage.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{stage.description}</p>
                  <div className="flex gap-4 text-xs">
                    {Object.entries(stage.metrics).map(([key, value]) => (
                      <span key={key} className="text-muted-foreground">
                        <span className="font-semibold text-foreground">{value}</span> {key}
                      </span>
                    ))}
                  </div>
                </div>
                {idx < pipeline.length - 1 && <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <h4 className="font-semibold text-blue-400">Pipeline Performance</h4>
            </div>
            <p className="text-sm text-blue-300">
              Total Throughput: 10,500 transactions/hour | Avg Latency: 12ms | System Uptime: 99.97%
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
