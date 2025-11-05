"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts"
import { AlertTriangle, Download } from "lucide-react"

export function AnomalyDetection() {
  const anomalyData = [
    { time: "00:00", normal: 1200, anomaly: 45, alerts: 2 },
    { time: "04:00", normal: 1100, anomaly: 52, alerts: 3 },
    { time: "08:00", normal: 2100, anomaly: 28, alerts: 1 },
    { time: "12:00", normal: 2800, anomaly: 85, alerts: 5 },
    { time: "16:00", normal: 3200, anomaly: 145, alerts: 8 },
    { time: "20:00", normal: 2400, anomaly: 95, alerts: 4 },
    { time: "23:59", normal: 1600, anomaly: 32, alerts: 1 },
  ]

  const scatterData = [
    { x: 100, y: 500, type: "normal", size: 5 },
    { x: 120, y: 520, type: "normal", size: 5 },
    { x: 150, y: 550, type: "normal", size: 5 },
    { x: 180, y: 580, type: "normal", size: 5 },
    { x: 200, y: 600, type: "normal", size: 5 },
    { x: 250, y: 1200, type: "anomaly", size: 8 },
    { x: 300, y: 1500, type: "anomaly", size: 8 },
    { x: 350, y: 2000, type: "anomaly", size: 8 },
    { x: 400, y: 800, type: "anomaly", size: 8 },
  ]

  const detectedAnomalies = [
    {
      id: 1,
      description: "Spike in transaction velocity",
      timestamp: "2024-01-15 16:45:30",
      severity: "high",
      confidence: 94.2,
    },
    {
      id: 2,
      description: "Unusual geographic pattern detected",
      timestamp: "2024-01-15 15:22:15",
      severity: "medium",
      confidence: 78.5,
    },
    {
      id: 3,
      description: "Device fingerprint mismatch",
      timestamp: "2024-01-15 14:18:50",
      severity: "medium",
      confidence: 71.3,
    },
    {
      id: 4,
      description: "Merchant category anomaly",
      timestamp: "2024-01-15 12:05:22",
      severity: "low",
      confidence: 65.8,
    },
  ]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Anomaly Detection Engine</h2>
        <p className="text-muted-foreground">
          Real-time detection of unusual transaction patterns and behavioral deviations
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">847</div>
              <p className="text-sm text-muted-foreground">Anomalies Detected (24h)</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-1">24</div>
              <p className="text-sm text-muted-foreground">Active Anomalies</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-1">96.2%</div>
              <p className="text-sm text-muted-foreground">Detection Accuracy</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-1">12ms</div>
              <p className="text-sm text-muted-foreground">Avg Detection Time</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Anomaly Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={anomalyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
                <Legend />
                <Line type="monotone" dataKey="normal" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="anomaly" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Pattern Space Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  type="number"
                  dataKey="x"
                  stroke="#9ca3af"
                  label={{ value: "Feature 1", position: "insideBottomRight", offset: -5 }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  stroke="#9ca3af"
                  label={{ value: "Feature 2", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }}
                  cursor={{ strokeDasharray: "3 3" }}
                />
                <Scatter name="Normal" data={scatterData.filter((d) => d.type === "normal")} fill="#10b981" />
                <Scatter name="Anomaly" data={scatterData.filter((d) => d.type === "anomaly")} fill="#ef4444" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recently Detected Anomalies</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {detectedAnomalies.map((anomaly) => (
              <div
                key={anomaly.id}
                className="flex items-start justify-between p-4 bg-muted/20 rounded-lg border border-border hover:border-border/80 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    <p className="font-semibold text-foreground">{anomaly.description}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{anomaly.timestamp}</p>
                </div>
                <div className="text-right ml-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      anomaly.severity === "high"
                        ? "bg-red-500/20 text-red-400"
                        : anomaly.severity === "medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {anomaly.severity}
                  </span>
                  <p className="text-sm font-semibold text-foreground mt-1">{anomaly.confidence}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
