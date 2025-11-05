"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

export function RiskScoring() {
  const riskFactorData = [
    { factor: "Amount Anomaly", weight: 25, impact: "High" },
    { factor: "Location Change", weight: 20, impact: "High" },
    { factor: "Device New", weight: 18, impact: "Medium" },
    { factor: "Time Pattern", weight: 15, impact: "Medium" },
    { factor: "Merchant Mismatch", weight: 12, impact: "Low" },
    { factor: "Velocity Check", weight: 10, impact: "Low" },
  ]

  const riskDistribution = [
    { name: "Low Risk", value: 72, color: "#10b981" },
    { name: "Medium Risk", value: 18, color: "#f59e0b" },
    { name: "High Risk", value: 7, color: "#ef4444" },
    { name: "Blocked", value: 3, color: "#8b5cf6" },
  ]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Risk Scoring Engine</h2>
        <p className="text-muted-foreground">Advanced ML-based transaction risk assessment</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {riskDistribution.map((item) => (
          <Card key={item.name} className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: item.color, opacity: 0.2 }}
                ></div>
                <p className="text-sm text-muted-foreground mb-1">{item.name}</p>
                <p className="text-2xl font-bold text-foreground">{item.value}%</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Risk Factor Weights</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskFactorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="factor" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
                <Bar dataKey="weight" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Risk Factor Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {riskFactorData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-semibold text-foreground">{item.factor}</p>
                  <p className="text-xs text-muted-foreground">Weight: {item.weight}%</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.impact === "High"
                      ? "bg-red-500/20 text-red-400"
                      : item.impact === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {item.impact}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
