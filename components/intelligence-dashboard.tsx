"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Brain, TrendingUp, AlertCircle, Target } from "lucide-react"

interface IntelligenceMetric {
  name: string
  value: number
  trend: number
  status: "improving" | "stable" | "declining"
}

export function IntelligenceDashboard() {
  const metrics: IntelligenceMetric[] = [
    { name: "Detection Accuracy", value: 98.7, trend: 2.3, status: "improving" },
    { name: "False Positive Rate", value: 1.2, trend: -0.5, status: "improving" },
    { name: "Response Time (ms)", value: 45, trend: -15, status: "improving" },
    { name: "Model Confidence", value: 96.5, trend: 1.8, status: "improving" },
  ]

  const trendData = [
    { time: "00:00", detected: 45, flagged: 8, blocked: 2 },
    { time: "04:00", detected: 52, flagged: 12, blocked: 3 },
    { time: "08:00", detected: 78, flagged: 18, blocked: 5 },
    { time: "12:00", detected: 95, flagged: 22, blocked: 7 },
    { time: "16:00", detected: 110, flagged: 28, blocked: 9 },
    { time: "20:00", detected: 88, flagged: 20, blocked: 6 },
    { time: "23:59", detected: 65, flagged: 14, blocked: 4 },
  ]

  const categoryData = [
    { name: "Card Fraud", value: 35, color: "#ef4444" },
    { name: "CNP", value: 28, color: "#f59e0b" },
    { name: "Account Takeover", value: 20, color: "#3b82f6" },
    { name: "Synthetic", value: 17, color: "#8b5cf6" },
  ]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Intelligence Dashboard</h2>
        <p className="text-muted-foreground">Advanced analytics and predictive insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.name} className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{metric.name}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value.toFixed(1)}</p>
                </div>
                <div className="flex-shrink-0">
                  {metric.status === "improving" && (
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
              </div>
              <p className={`text-xs mt-2 ${metric.trend > 0 ? "text-green-500" : "text-red-500"}`}>
                {metric.trend > 0 ? "+" : ""}
                {metric.trend}% this week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Detection Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                <Bar dataKey="detected" fill="#3b82f6" />
                <Bar dataKey="flagged" fill="#f59e0b" />
                <Bar dataKey="blocked" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Fraud Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">API Response Time</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-green-500 rounded-full" />
              </div>
              <span className="text-sm font-semibold">45ms</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Server Load</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-blue-500 rounded-full" />
              </div>
              <span className="text-sm font-semibold">50%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Model Uptime</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-full h-full bg-green-500 rounded-full" />
              </div>
              <Badge className="bg-green-500/20 text-green-400">99.99%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
