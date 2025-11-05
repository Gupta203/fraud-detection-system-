"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, AlertTriangle, CheckCircle2 } from "lucide-react"

interface CustomerProfile {
  id: string
  name: string
  email: string
  accountAge: number
  transactions: number
  totalSpent: number
  riskScore: number
  lastTransaction: string
  status: "safe" | "flagged" | "blocked"
  avgTransactionAmount: number
  geographies: string[]
}

export function CustomerProfiles() {
  const [searchQuery, setSearchQuery] = useState("")
  const [customers, setCustomers] = useState<CustomerProfile[]>([
    {
      id: "CUST-001",
      name: "John Doe",
      email: "john@example.com",
      accountAge: 1250,
      transactions: 342,
      totalSpent: 145670,
      riskScore: 8,
      lastTransaction: "2024-01-15 14:30",
      status: "safe",
      avgTransactionAmount: 426,
      geographies: ["USA", "Canada"],
    },
    {
      id: "CUST-002",
      name: "Jane Smith",
      email: "jane@example.com",
      accountAge: 180,
      transactions: 12,
      totalSpent: 2800,
      riskScore: 72,
      lastTransaction: "2024-01-15 03:45",
      status: "flagged",
      avgTransactionAmount: 233,
      geographies: ["Nigeria", "USA", "UK"],
    },
    {
      id: "CUST-003",
      name: "Bob Wilson",
      email: "bob@example.com",
      accountAge: 2100,
      transactions: 856,
      totalSpent: 425680,
      riskScore: 12,
      lastTransaction: "2024-01-15 12:20",
      status: "safe",
      avgTransactionAmount: 497,
      geographies: ["USA"],
    },
  ])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.includes(searchQuery),
  )

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Customer Risk Profiles</h2>
        <p className="text-muted-foreground">Analyze customer behavior patterns and risk assessments</p>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              placeholder="Search by customer name, email, or ID..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-primary">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="border-border bg-card hover:bg-card/80 transition-colors">
            <CardContent className="pt-6">
              <div className="grid grid-cols-6 gap-4 items-start">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Customer</p>
                  <div>
                    <p className="font-semibold text-foreground">{customer.name}</p>
                    <p className="text-xs text-muted-foreground">{customer.id}</p>
                    <p className="text-xs text-muted-foreground">{customer.email}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Account Info</p>
                  <p className="text-sm font-semibold text-foreground">{customer.accountAge} days</p>
                  <p className="text-xs text-muted-foreground">{customer.transactions} transactions</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Spending</p>
                  <p className="text-sm font-semibold text-foreground">${customer.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Avg: ${customer.avgTransactionAmount}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Risk Score</p>
                  <div className="flex items-center gap-2">
                    <div className="relative w-12 h-12">
                      <svg className="transform -rotate-90" width="48" height="48">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="#374151" strokeWidth="3" />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke={customer.riskScore > 50 ? "#ef4444" : "#10b981"}
                          strokeWidth="3"
                          strokeDasharray={`${(customer.riskScore / 100) * 125.6} 125.6`}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
                        {customer.riskScore}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Geographies</p>
                  <div className="flex flex-wrap gap-1">
                    {customer.geographies.map((geo) => (
                      <span key={geo} className="px-2 py-1 text-xs bg-muted rounded-full text-foreground">
                        {geo}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between h-full">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      {customer.status === "safe" && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                      {customer.status === "flagged" && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                      {customer.status === "blocked" && <AlertTriangle className="w-4 h-4 text-red-400" />}
                      <span className="text-sm font-semibold text-foreground capitalize">{customer.status}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
