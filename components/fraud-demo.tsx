"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, Zap } from "lucide-react"

interface PredictionResult {
  status: "legitimate" | "fraudulent"
  confidence: number
  riskFactors: string[]
}

export function FraudDemo() {
  const [formData, setFormData] = useState({
    amount: "",
    merchantType: "online",
    location: "US",
    timeOfDay: "day",
    deviceNew: "no",
  })
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)

  const analyzeFraud = () => {
    setLoading(true)

    // Simulate ML model prediction
    setTimeout(() => {
      const amount = Number.parseFloat(formData.amount) || 0
      let isFraudulent = false
      const riskFactors: string[] = []

      if (amount > 10000) {
        riskFactors.push("High transaction amount")
        isFraudulent = true
      }
      if (amount < 50 && formData.merchantType === "online") {
        riskFactors.push("Unusual merchant pattern")
      }
      if (formData.timeOfDay === "night") {
        riskFactors.push("Unusual time of transaction")
      }
      if (formData.location !== "US") {
        riskFactors.push("International transaction")
        if (formData.deviceNew === "yes") {
          isFraudulent = true
          riskFactors.push("New device detected")
        }
      }
      if (formData.deviceNew === "yes" && amount > 5000) {
        isFraudulent = true
      }

      const baseConfidence = 75 + Math.random() * 20
      const confidence = isFraudulent ? baseConfidence : 100 - Math.random() * 10

      setPrediction({
        status: isFraudulent ? "fraudulent" : "legitimate",
        confidence: Math.min(99.9, Math.max(50, confidence)),
        riskFactors,
      })
      setLoading(false)
    }, 800)
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Interactive Fraud Detection Demo</h2>
        <p className="text-muted-foreground">Test the ML model with custom transaction parameters</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <Card className="border-border bg-card h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Transaction Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Transaction Amount ($)</label>
              <Input
                type="number"
                placeholder="1000"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="bg-input border-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Merchant Type</label>
              <select
                value={formData.merchantType}
                onChange={(e) => setFormData({ ...formData, merchantType: e.target.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
              >
                <option>online</option>
                <option>retail</option>
                <option>atm</option>
                <option>international</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Location</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
              >
                <option>US</option>
                <option>EU</option>
                <option>ASIA</option>
                <option>OTHER</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Time of Transaction</label>
              <select
                value={formData.timeOfDay}
                onChange={(e) => setFormData({ ...formData, timeOfDay: e.target.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
              >
                <option value="day">Day (6 AM - 6 PM)</option>
                <option value="night">Night (6 PM - 6 AM)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">New Device</label>
              <select
                value={formData.deviceNew}
                onChange={(e) => setFormData({ ...formData, deviceNew: e.target.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            <Button
              onClick={analyzeFraud}
              disabled={loading || !formData.amount}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Zap className="w-4 h-4 mr-2" />
              {loading ? "Analyzing..." : "Analyze Transaction"}
            </Button>
          </CardContent>
        </Card>

        {prediction && (
          <Card className="border-border bg-card h-fit">
            <CardHeader>
              <CardTitle className="text-lg">Prediction Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center p-6 rounded-lg bg-muted">
                {prediction.status === "legitimate" ? (
                  <>
                    <CheckCircle2 className="w-12 h-12 text-green-400 mr-4" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">Legitimate</p>
                      <p className="text-sm text-muted-foreground">Safe to process</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-12 h-12 text-red-400 mr-4" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">Fraudulent</p>
                      <p className="text-sm text-muted-foreground">Flag for review</p>
                    </div>
                  </>
                )}
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Confidence Score</span>
                  <span className="text-lg font-bold text-foreground">{prediction.confidence.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className={`h-full rounded-full transition-all ${
                      prediction.status === "legitimate" ? "bg-green-400" : "bg-red-400"
                    }`}
                    style={{ width: `${prediction.confidence}%` }}
                  ></div>
                </div>
              </div>

              {prediction.riskFactors.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Risk Factors Detected:</p>
                  <div className="space-y-2">
                    {prediction.riskFactors.map((factor, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-red-400/10 rounded">
                        <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-red-300">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={() => setPrediction(null)}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                Clear Results
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
