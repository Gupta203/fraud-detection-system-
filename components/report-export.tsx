"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileJson, FileText, Download, Calendar, Filter } from "lucide-react"

export function ReportExport() {
  const [reportType, setReportType] = useState<"daily" | "weekly" | "monthly">("daily")
  const [dateRange, setDateRange] = useState({ from: "2024-01-01", to: "2024-01-15" })
  const [includeOptions, setIncludeOptions] = useState({
    transactions: true,
    alerts: true,
    metrics: true,
    modelPerformance: true,
    customerProfiles: true,
  })

  const [generatedReports, setGeneratedReports] = useState([
    {
      id: 1,
      name: "Daily Report - Jan 15",
      type: "daily",
      date: "2024-01-15 18:30",
      format: "PDF",
      size: "2.4 MB",
      transactions: 4250,
      fraudDetected: 87,
    },
    {
      id: 2,
      name: "Weekly Report - Jan 8-14",
      type: "weekly",
      date: "2024-01-14 23:45",
      format: "Excel",
      size: "5.8 MB",
      transactions: 28450,
      fraudDetected: 542,
    },
    {
      id: 3,
      name: "Monthly Report - December",
      type: "monthly",
      date: "2024-01-01 00:15",
      format: "PDF",
      size: "18.2 MB",
      transactions: 125600,
      fraudDetected: 2341,
    },
  ])

  const handleGenerateReport = () => {
    alert("Report generation started. This will be ready for download shortly.")
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Report Generation & Export</h2>
        <p className="text-muted-foreground">Generate comprehensive fraud detection reports in multiple formats</p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {(["daily", "weekly", "monthly"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setReportType(type)}
                className={`p-4 rounded-lg border-2 transition-colors capitalize font-semibold ${
                  reportType === type
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-muted/20 text-foreground hover:border-border/80"
                }`}
              >
                {type} Report
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">From Date</label>
              <Input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">To Date</label>
              <Input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="bg-input border-border"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-3">Include Sections</p>
            <div className="space-y-2">
              {Object.entries(includeOptions).map(([key, value]) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setIncludeOptions({ ...includeOptions, [key]: e.target.checked })}
                    className="w-4 h-4 rounded border-border bg-input cursor-pointer"
                  />
                  <span className="text-sm text-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button onClick={handleGenerateReport} className="bg-primary text-primary-foreground">
              <FileText className="w-4 h-4 mr-2" />
              Generate PDF
            </Button>
            <Button variant="outline">
              <FileJson className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Generated Reports</CardTitle>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {generatedReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border hover:border-border/80 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <p className="font-semibold text-foreground">{report.name}</p>
                    <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">{report.format}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{report.date}</p>
                  <div className="flex gap-6 text-sm">
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-foreground">{report.transactions.toLocaleString()}</span>{" "}
                      transactions
                    </span>
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-red-400">{report.fraudDetected}</span> fraud cases detected
                    </span>
                    <span className="text-muted-foreground">{report.size}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" className="bg-primary text-primary-foreground">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
