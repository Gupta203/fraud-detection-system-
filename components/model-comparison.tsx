"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export function ModelComparison() {
  const performanceData = [
    { metric: "Accuracy", RandomForest: 98.7, XGBoost: 98.9, NeuralNet: 97.5, LogisticReg: 92.3 },
    { metric: "Precision", RandomForest: 97.2, XGBoost: 97.8, NeuralNet: 96.1, LogisticReg: 90.5 },
    { metric: "Recall", RandomForest: 96.5, XGBoost: 97.3, NeuralNet: 98.2, LogisticReg: 88.7 },
    { metric: "F1-Score", RandomForest: 96.8, XGBoost: 97.5, NeuralNet: 97.1, LogisticReg: 89.5 },
    { metric: "ROC-AUC", RandomForest: 99.1, XGBoost: 99.3, NeuralNet: 98.7, LogisticReg: 94.2 },
  ]

  const trainingData = [
    { epoch: 1, RandomForest: 85, XGBoost: 87, NeuralNet: 72 },
    { epoch: 10, RandomForest: 92, XGBoost: 93, NeuralNet: 85 },
    { epoch: 20, RandomForest: 95, XGBoost: 96, NeuralNet: 92 },
    { epoch: 30, RandomForest: 97, XGBoost: 98, NeuralNet: 95 },
    { epoch: 50, RandomForest: 98.7, XGBoost: 98.9, NeuralNet: 97.5 },
  ]

  const models = [
    {
      name: "XGBoost",
      accuracy: 98.9,
      precision: 97.8,
      recall: 97.3,
      trainingTime: "2.1s",
      inferenceTime: "12ms",
      recommended: true,
    },
    {
      name: "Random Forest",
      accuracy: 98.7,
      precision: 97.2,
      recall: 96.5,
      trainingTime: "1.8s",
      inferenceTime: "8ms",
      recommended: false,
    },
    {
      name: "Neural Network",
      accuracy: 97.5,
      precision: 96.1,
      recall: 98.2,
      trainingTime: "5.2s",
      inferenceTime: "25ms",
      recommended: false,
    },
    {
      name: "Logistic Regression",
      accuracy: 92.3,
      precision: 90.5,
      recall: 88.7,
      trainingTime: "0.5s",
      inferenceTime: "2ms",
      recommended: false,
    },
  ]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Model Comparison</h2>
        <p className="text-muted-foreground">Compare performance metrics across different ML algorithms</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="metric" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
                <Legend />
                <Bar dataKey="RandomForest" fill="#6366f1" />
                <Bar dataKey="XGBoost" fill="#10b981" />
                <Bar dataKey="NeuralNet" fill="#f59e0b" />
                <Bar dataKey="LogisticReg" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Training Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trainingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="epoch" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
                <Legend />
                <Line type="monotone" dataKey="RandomForest" stroke="#6366f1" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="XGBoost" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="NeuralNet" stroke="#f59e0b" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Detailed Model Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Model</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Accuracy</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Precision</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Recall</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Training Time</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Inference</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr key={model.name} className="border-b border-border hover:bg-muted/20">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{model.name}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-foreground">{model.accuracy}%</td>
                    <td className="px-4 py-3 text-sm font-semibold text-foreground">{model.precision}%</td>
                    <td className="px-4 py-3 text-sm font-semibold text-foreground">{model.recall}%</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{model.trainingTime}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{model.inferenceTime}</td>
                    <td className="px-4 py-3 text-sm">
                      {model.recommended && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                          Recommended
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
