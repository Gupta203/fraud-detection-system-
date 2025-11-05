"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const fraudByCategory = [
  { category: "Online Purchase", frauds: 45, total: 1200 },
  { category: "International", frauds: 82, total: 450 },
  { category: "Card Payment", frauds: 28, total: 980 },
  { category: "Transfer", frauds: 115, total: 340 },
  { category: "ATM", frauds: 12, total: 520 },
]

const fraudByLocation = [
  { name: "US", value: 142, fill: "oklch(0.62 0.22 30)" },
  { name: "EU", value: 89, fill: "oklch(0.6 0.2 280)" },
  { name: "ASIA", value: 76, fill: "oklch(0.58 0.18 200)" },
  { name: "OTHER", value: 35, fill: "oklch(0.55 0.16 150)" },
]

const timeSeriesData = [
  { day: "Mon", frauds: 34, prevented: 2100 },
  { day: "Tue", frauds: 41, prevented: 2210 },
  { day: "Wed", frauds: 28, prevented: 2290 },
  { day: "Thu", frauds: 52, prevented: 2000 },
  { day: "Fri", frauds: 38, prevented: 2181 },
  { day: "Sat", frauds: 45, prevented: 2500 },
  { day: "Sun", frauds: 31, prevented: 2100 },
]

export function AnalyticsPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Advanced Analytics</h2>
        <p className="text-muted-foreground">Deep dive into fraud patterns and system performance</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Fraud by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fraudByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" />
                <XAxis dataKey="category" stroke="oklch(0.7 0 0)" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="oklch(0.7 0 0)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.15 0 0)",
                    border: "1px solid oklch(0.22 0 0)",
                  }}
                  labelStyle={{ color: "oklch(0.95 0 0)" }}
                />
                <Legend />
                <Bar dataKey="frauds" fill="oklch(0.62 0.22 15)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="total" fill="oklch(0.6 0.2 280)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Fraud Distribution by Location</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fraudByLocation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fraudByLocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.15 0 0)",
                    border: "1px solid oklch(0.22 0 0)",
                  }}
                  labelStyle={{ color: "oklch(0.95 0 0)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Weekly Fraud Trends & Loss Prevention</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" />
              <XAxis dataKey="day" stroke="oklch(0.7 0 0)" />
              <YAxis stroke="oklch(0.7 0 0)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.15 0 0)",
                  border: "1px solid oklch(0.22 0 0)",
                }}
                labelStyle={{ color: "oklch(0.95 0 0)" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="frauds"
                stroke="oklch(0.62 0.22 15)"
                strokeWidth={2}
                dot={{ fill: "oklch(0.62 0.22 15)", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="prevented"
                stroke="oklch(0.6 0.2 280)"
                strokeWidth={2}
                dot={{ fill: "oklch(0.6 0.2 280)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base">Top Risk Country</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent mb-2">US</p>
            <p className="text-sm text-muted-foreground">142 fraudulent cases this week</p>
            <p className="text-xs text-muted-foreground mt-2">38.2% of total fraud</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base">Highest Risk Category</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary mb-2">Transfer</p>
            <p className="text-sm text-muted-foreground">115 cases, 33.8% fraud rate</p>
            <p className="text-xs text-muted-foreground mt-2">Average amount: $8,500</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base">Peak Risk Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-400 mb-2">11 PM</p>
            <p className="text-sm text-muted-foreground">41 fraudulent transactions</p>
            <p className="text-xs text-muted-foreground mt-2">2.3x higher than average</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
