"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { TrendingUp, AlertTriangle } from "lucide-react"

export function PredictiveAnalytics() {
  const forecastData = [
    { day: "Today", current: 450, forecast: 450, confidence: 98 },
    { day: "Tomorrow", current: null, forecast: 520, confidence: 94 },
    { day: "+2 Days", current: null, forecast: 580, confidence: 91 },
    { day: "+3 Days", current: null, forecast: 610, confidence: 88 },
    { day: "+4 Days", current: null, forecast: 640, confidence: 85 },
    { day: "+5 Days", current: null, forecast: 700, confidence: 82 },
    { day: "+6 Days", current: null, forecast: 750, confidence: 79 },
  ]

  const riskTrends = [
    { category: "High-Value Txn", riskIncrease: 23, forecast: "Increasing" },
    { category: "Card-Not-Present", riskIncrease: 18, forecast: "Stable" },
    { category: "International", riskIncrease: 35, forecast: "Rising" },
    { category: "New Merchants", riskIncrease: 12, forecast: "Decreasing" },
    { category: "Mobile Devices", riskIncrease: 8, forecast: "Stable" },
  ]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Predictive Analytics Engine</h2>
        <p className="text-muted-foreground">AI-powered forecasting of fraud trends and risk patterns</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-orange-400 mb-1">+18.5%</div>
              <p className="text-sm text-muted-foreground">Predicted Increase (7 days)</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-red-400 mb-1">4</div>
              <p className="text-sm text-muted-foreground">High-Risk Alerts</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">89%</div>
              <p className="text-sm text-muted-foreground">Forecast Confidence</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>7-Day Fraud Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
              <Legend />
              <Line type="monotone" dataKey="current" stroke="#10b981" strokeWidth={2} name="Current" connectNulls />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#f97316"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Forecast"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Risk Category Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={riskTrends} layout="vertical" margin={{ top: 5, right: 30, left: 200, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis dataKey="category" type="category" stroke="#9ca3af" width={190} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
              <Bar dataKey="riskIncrease" fill="#ef4444" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Category-Specific Forecasts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {riskTrends.map((risk, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border"
              >
                <div>
                  <p className="font-semibold text-foreground">{risk.category}</p>
                  <p className="text-xs text-muted-foreground">Risk increase: +{risk.riskIncrease}%</p>
                </div>
                <div className="text-right">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      risk.forecast === "Rising"
                        ? "bg-red-500/20 text-red-400"
                        : risk.forecast === "Increasing"
                          ? "bg-orange-500/20 text-orange-400"
                          : risk.forecast === "Decreasing"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {risk.forecast}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
