"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"

export function AdvancedFilters() {
  const [filters, setFilters] = useState({
    amountMin: 0,
    amountMax: 50000,
    confidenceMin: 0,
    merchant: "",
    location: "",
    status: "all",
    dateFrom: "",
    dateTo: "",
    timeZone: "UTC",
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const applyFilter = (filterName: string) => {
    if (!activeFilters.includes(filterName)) {
      setActiveFilters([...activeFilters, filterName])
    }
  }

  const removeFilter = (filterName: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filterName))
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setFilters({
      amountMin: 0,
      amountMax: 50000,
      confidenceMin: 0,
      merchant: "",
      location: "",
      status: "all",
      dateFrom: "",
      dateTo: "",
      timeZone: "UTC",
    })
  }

  const filterGroups = [
    {
      title: "Amount Range",
      filters: [
        { id: "amount-small", label: "< $100", min: 0, max: 100 },
        { id: "amount-medium", label: "$100 - $1000", min: 100, max: 1000 },
        { id: "amount-large", label: "$1000 - $5000", min: 1000, max: 5000 },
        { id: "amount-xlarge", label: "> $5000", min: 5000, max: 50000 },
      ],
    },
    {
      title: "Status",
      filters: [
        { id: "status-legit", label: "Legitimate" },
        { id: "status-fraud", label: "Fraudulent" },
        { id: "status-review", label: "Under Review" },
      ],
    },
    {
      title: "Confidence Score",
      filters: [
        { id: "conf-high", label: "High (>90%)" },
        { id: "conf-medium", label: "Medium (70-90%)" },
        { id: "conf-low", label: "Low (<70%)" },
      ],
    },
  ]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Advanced Transaction Filters</h2>
        <p className="text-muted-foreground">Powerful filtering system to find specific transactions</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filterGroups.map((group, idx) => (
          <Card key={idx} className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-sm">{group.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {group.filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilters.includes(filter.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => (activeFilters.includes(filter.id) ? removeFilter(filter.id) : applyFilter(filter.id))}
                  className="w-full justify-start"
                >
                  <Filter className="w-3 h-3 mr-2" />
                  {filter.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Custom Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Merchant Name</label>
              <Input
                placeholder="Search merchant..."
                value={filters.merchant}
                onChange={(e) => setFilters({ ...filters, merchant: e.target.value })}
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Location</label>
              <Input
                placeholder="City, Country..."
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">From Date</label>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">To Date</label>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                className="bg-input border-border"
              />
            </div>
          </div>

          <Button onClick={clearAllFilters} variant="outline" className="w-full bg-transparent">
            <X className="w-4 h-4 mr-2" />
            Clear All Filters
          </Button>
        </CardContent>
      </Card>

      {activeFilters.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Applied Filters ({activeFilters.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="outline" className="cursor-pointer" onClick={() => removeFilter(filter)}>
                  {filter}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Filter Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">
              {activeFilters.length === 0
                ? "Apply filters to see results"
                : `Showing results for ${activeFilters.length} active filter(s)`}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
