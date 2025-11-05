"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { predictWithEnsemble, type Transaction } from "@/lib/fraud-detection-engine"
import { Zap, Shield, AlertTriangle } from "lucide-react"
import { notificationManager } from "@/lib/notification-service"

export function FraudPreventionSimulator() {
  const [formData, setFormData] = useState({
    amount: "1000",
    location: "domestic",
    deviceType: "known",
    merchantCategory: "retail",
    timeOfDay: "14",
  })

  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handlePredict = async () => {
    setLoading(true)
    try {
      const transaction: Transaction = {
        amount: Number.parseFloat(formData.amount),
        location: formData.location as any,
        deviceType: formData.deviceType as any,
        merchantCategory: formData.merchantCategory as any,
        timeOfDay: Number.parseInt(formData.timeOfDay),
        dayOfWeek: new Date().getDay(),
        isWeekend: [0, 6].includes(new Date().getDay()),
        transactionFrequency: 3,
        customerAge: 35,
        previousFraudFlag: false,
      }

      const prediction = predictWithEnsemble(transaction)
      setResult(prediction)

      if (prediction.isFraud) {
        notificationManager.error(
          "High Fraud Risk Detected",
          `Risk Score: ${prediction.riskScore} | Confidence: ${prediction.confidence}%`,
        )
      } else {
        notificationManager.success(
          "Transaction Approved",
          `Risk Score: ${prediction.riskScore} | Confidence: ${prediction.confidence}%`,
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Fraud Prevention Simulator</h2>
        <p className="text-muted-foreground">Test transaction scenarios and see real-time predictions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Configure Transaction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Amount ($)</label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="bg-input border-border"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Location</label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Device Type</label>
              <Select
                value={formData.deviceType}
                onValueChange={(value) => setFormData({ ...formData, deviceType: value })}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="known">Known Device</SelectItem>
                  <SelectItem value="new">New Device</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Merchant Category</label>
              <Select
                value={formData.merchantCategory}
                onValueChange={(value) => setFormData({ ...formData, merchantCategory: value })}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="gambling">Gambling</SelectItem>
                  <SelectItem value="adult">Adult</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Time of Day (0-23)</label>
              <Input
                type="number"
                min="0"
                max="23"
                value={formData.timeOfDay}
                onChange={(e) => setFormData({ ...formData, timeOfDay: e.target.value })}
                className="bg-input border-border"
              />
            </div>

            <Button onClick={handlePredict} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
              <Zap className="w-4 h-4 mr-2" />
              {loading ? "Analyzing..." : "Predict Fraud Risk"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card
            className={`border-l-4 ${result.isFraud ? "border-l-red-500 bg-red-500/5" : "border-l-green-500 bg-green-500/5"}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.isFraud ? (
                  <>
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Fraud Detected
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 text-green-500" />
                    Safe Transaction
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Risk Score</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${result.riskScore > 70 ? "bg-red-500" : result.riskScore > 40 ? "bg-yellow-500" : "bg-green-500"}`}
                      style={{ width: `${result.riskScore}%` }}
                    />
                  </div>
                  <span className="font-bold text-lg text-foreground">{result.riskScore}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Model Confidence</p>
                <p className="font-bold text-lg text-foreground">{result.confidence}%</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Model Used</p>
                <p className="text-sm font-medium text-blue-400">{result.modelUsed}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Risk Factors</p>
                <div className="space-y-1">
                  {result.riskFactors.map((factor: string, i: number) => (
                    <p key={i} className="text-sm text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full" />
                      {factor}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
