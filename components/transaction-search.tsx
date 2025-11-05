"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Eye } from "lucide-react"

interface Transaction {
  id: string
  amount: number
  merchant: string
  status: "legitimate" | "fraudulent" | "review"
  date: string
  customer: string
  location: string
  confidence: number
}

export function TransactionSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "legitimate" | "fraudulent" | "review">("all")
  const [results, setResults] = useState<Transaction[]>([
    {
      id: "TXN-001",
      amount: 125.5,
      merchant: "Amazon",
      status: "legitimate",
      date: "2024-01-15 14:30",
      customer: "John Doe",
      location: "New York, USA",
      confidence: 98.5,
    },
    {
      id: "TXN-002",
      amount: 45000,
      merchant: "Wire Transfer",
      status: "fraudulent",
      date: "2024-01-15 03:45",
      customer: "Jane Smith",
      location: "Lagos, Nigeria",
      confidence: 97.2,
    },
    {
      id: "TXN-003",
      amount: 850,
      merchant: "Online Retailer",
      status: "review",
      date: "2024-01-15 22:15",
      customer: "Bob Wilson",
      location: "London, UK",
      confidence: 72.1,
    },
  ])

  const handleSearch = () => {
    if (searchQuery) {
      const filtered = results.filter(
        (t) =>
          t.id.includes(searchQuery) ||
          t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.merchant.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setResults(filtered)
    }
  }

  const filteredResults = filterStatus === "all" ? results : results.filter((t) => t.status === filterStatus)

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Transaction Search</h2>
        <p className="text-muted-foreground">Search and filter transactions by ID, customer, or merchant</p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Search Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search by Transaction ID, Customer Name, or Merchant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} className="bg-primary">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear
            </Button>
          </div>

          <div className="flex gap-2">
            {(["all", "legitimate", "fraudulent", "review"] as const).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                onClick={() => setFilterStatus(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Transaction ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Merchant</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Location</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Confidence</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((txn) => (
              <tr key={txn.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 text-sm font-mono text-foreground">{txn.id}</td>
                <td className="px-4 py-3 text-sm text-foreground">{txn.customer}</td>
                <td className="px-4 py-3 text-sm text-foreground">{txn.merchant}</td>
                <td className="px-4 py-3 text-sm font-semibold text-foreground">${txn.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{txn.location}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{txn.date}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      txn.status === "legitimate"
                        ? "bg-green-500/20 text-green-400"
                        : txn.status === "fraudulent"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {txn.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-foreground">{txn.confidence}%</td>
                <td className="px-4 py-3 text-sm">
                  <Button size="sm" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
