"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { time: "00:00", frauds: 12, legitimate: 480 },
  { time: "04:00", frauds: 15, legitimate: 520 },
  { time: "08:00", frauds: 8, legitimate: 580 },
  { time: "12:00", frauds: 22, legitimate: 640 },
  { time: "16:00", frauds: 18, legitimate: 610 },
  { time: "20:00", frauds: 25, legitimate: 720 },
  { time: "24:00", frauds: 19, legitimate: 690 },
]

export function FraudTrends() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Transaction Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" />
            <XAxis dataKey="time" stroke="oklch(0.7 0 0)" />
            <YAxis stroke="oklch(0.7 0 0)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.15 0 0)",
                border: "1px solid oklch(0.22 0 0)",
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "oklch(0.95 0 0)" }}
            />
            <Line type="monotone" dataKey="frauds" stroke="oklch(0.62 0.22 15)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="legitimate" stroke="oklch(0.6 0.2 280)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-sm text-muted-foreground">Fraudulent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Legitimate</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
