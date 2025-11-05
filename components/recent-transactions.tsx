"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertTriangle, User, DollarSign } from "lucide-react"

const transactions = [
  {
    id: "TXN001",
    user: "Alice Johnson",
    amount: "$1,250.00",
    type: "Online Purchase",
    status: "legitimate",
    confidence: 99.2,
  },
  {
    id: "TXN002",
    user: "Bob Smith",
    amount: "$52,500.00",
    type: "International Transfer",
    status: "fraudulent",
    confidence: 98.7,
  },
  {
    id: "TXN003",
    user: "Carol Davis",
    amount: "$3,200.00",
    type: "Payment",
    status: "legitimate",
    confidence: 97.4,
  },
  {
    id: "TXN004",
    user: "Diana Wilson",
    amount: "$8,900.00",
    type: "Card Payment",
    status: "fraudulent",
    confidence: 96.8,
  },
  {
    id: "TXN005",
    user: "Eve Martinez",
    amount: "$450.00",
    type: "Subscription",
    status: "legitimate",
    confidence: 99.8,
  },
]

export function RecentTransactions() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Transaction</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">User</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 text-sm text-foreground font-medium">{txn.id}</td>
                  <td className="py-4 px-4 text-sm text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    {txn.user}
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-foreground flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    {txn.amount}
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{txn.type}</td>
                  <td className="py-4 px-4">
                    <Badge
                      className={`${
                        txn.status === "legitimate" ? "bg-green-400/20 text-green-300" : "bg-red-400/20 text-red-300"
                      }`}
                    >
                      <span className="mr-1">
                        {txn.status === "legitimate" ? (
                          <CheckCircle2 className="w-3 h-3 inline" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 inline" />
                        )}
                      </span>
                      {txn.status === "legitimate" ? "Legitimate" : "Fraudulent"}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-foreground">{txn.confidence}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
