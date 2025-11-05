"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import { notificationManager } from "@/lib/notification-service"

interface LiveTransaction {
  id: string
  amount: number
  merchant: string
  status: "processing" | "completed" | "flagged"
  riskScore: number
  timestamp: Date
  location: string
  cardLast4: string
}

export function LiveTransactionFeed() {
  const [transactions, setTransactions] = useState<LiveTransaction[]>([
    {
      id: "TXN-2024-0001",
      amount: 250.5,
      merchant: "Amazon",
      status: "completed",
      riskScore: 12,
      timestamp: new Date(),
      location: "New York, USA",
      cardLast4: "4242",
    },
    {
      id: "TXN-2024-0002",
      amount: 45000,
      merchant: "International Wire",
      status: "flagged",
      riskScore: 92,
      timestamp: new Date(Date.now() - 60000),
      location: "Lagos, Nigeria",
      cardLast4: "5555",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const newTxn: LiveTransaction = {
        id: `TXN-2024-${Date.now()}`,
        amount: Math.random() * 10000,
        merchant: ["Uber", "Netflix", "Starbucks", "Apple", "Walmart"][Math.floor(Math.random() * 5)],
        status: Math.random() > 0.9 ? "flagged" : Math.random() > 0.2 ? "completed" : "processing",
        riskScore: Math.floor(Math.random() * 100),
        timestamp: new Date(),
        location: ["New York", "London", "Tokyo", "Dubai"][Math.floor(Math.random() * 4)],
        cardLast4: String(Math.floor(1000 + Math.random() * 9000)),
      }

      setTransactions((prev) => [newTxn, ...prev.slice(0, 19)])

      if (newTxn.status === "flagged") {
        notificationManager.warning(
          "Suspicious Transaction Detected",
          `$${newTxn.amount.toFixed(2)} at ${newTxn.merchant} (Risk: ${newTxn.riskScore}%)`,
        )
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Live Transaction Stream</h2>
        <p className="text-muted-foreground">Real-time monitoring of all transactions</p>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {transactions.map((txn) => (
          <Card
            key={txn.id}
            className="border-l-4 hover:bg-muted/50 transition-all"
            style={{
              borderLeftColor:
                txn.status === "flagged" ? "#ef4444" : txn.status === "processing" ? "#f59e0b" : "#10b981",
            }}
          >
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <Activity className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground truncate">{txn.merchant}</p>
                      <Badge
                        variant={
                          txn.status === "flagged" ? "destructive" : txn.status === "completed" ? "default" : "outline"
                        }
                      >
                        {txn.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {txn.location} • Card: ****{txn.cardLast4}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-lg text-foreground">${txn.amount.toFixed(2)}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    {txn.riskScore > 70 ? (
                      <TrendingUp className="w-4 h-4 text-red-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-green-500" />
                    )}
                    <span className="text-xs text-muted-foreground">Risk: {txn.riskScore}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
