"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileJson, FileText, Download, Calendar, Filter, AlertCircle } from "lucide-react"
import { generatePDFReport, exportToJSON, exportToCSV } from "@/lib/pdf-export-utils"
import { notificationManager } from "@/lib/notification-service"

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
  const [isExporting, setIsExporting] = useState(false)

  const [generatedReports] = useState([
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

  const handleGenerateReport = async (format: "pdf" | "json" | "csv") => {
    try {
      setIsExporting(true)
      notificationManager.info("Exporting", `Generating ${format.toUpperCase()} report...`)

      const reportData = {
        transactions: Array.from({ length: 50 }).map((_, i) => ({
          id: `TXN-${i + 1}`,
          amount: Math.random() * 10000,
          merchant: ["Amazon", "Walmart", "Target", "Best Buy"][Math.floor(Math.random() * 4)],
          timestamp: new Date().toISOString(),
          status: Math.random() > 0.95 ? ("fraudulent" as const) : ("legitimate" as const),
          confidence: Math.random() * 100,
        })),
        alerts: [
          { id: "1", type: "critical", message: "High-value transaction", severity: "critical" as const },
          { id: "2", type: "warning", message: "Unusual pattern", severity: "warning" as const },
        ],
        metrics: {
          totalTransactions: 4250,
          fraudDetected: 87,
          accuracy: 98.7,
          precision: 96.5,
          recall: 94.2,
        },
        metadata: {
          generatedAt: new Date().toISOString(),
          dateRange,
          reportType,
        },
      }

      if (format === "pdf") {
        await generatePDFReport(
          {
            title: "Fraud Detection Report",
            subtitle: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Analysis`,
            dateRange,
            sections: [
              {
                name: "metrics",
                title: "Key Metrics",
                content: reportData.metrics,
                type: "metrics",
              },
              {
                name: "transactions",
                title: "Transaction Details",
                content: reportData.transactions.slice(0, 10),
                type: "table",
              },
              {
                name: "alerts",
                title: "Recent Alerts",
                content: reportData.alerts.map((a) => a.message),
                type: "list",
              },
            ],
            metadata: {
              generatedAt: new Date().toISOString(),
              generatedBy: "FraudShield System",
              version: "2.2",
            },
          },
          `fraud-report-${reportType}-${dateRange.from}`,
        )
      } else if (format === "json") {
        exportToJSON(reportData, `fraud-report-${reportType}-${dateRange.from}`)
      } else {
        exportToCSV(reportData.transactions, `fraud-transactions-${reportType}-${dateRange.from}`)
      }

      notificationManager.success("Export Successful", `Report downloaded as ${format.toUpperCase()}`)
    } catch (error) {
      notificationManager.error("Export Failed", "Failed to generate report. Please try again.")
      console.error("Export error:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleDownloadReport = async (report: any) => {
    try {
      setIsExporting(true)
      notificationManager.info("Downloading", `Getting ${report.name}...`)

      const reportData = {
        id: report.id,
        name: report.name,
        date: report.date,
        transactions: report.transactions,
        fraudDetected: report.fraudDetected,
        downloadedAt: new Date().toISOString(),
      }

      exportToJSON(reportData, `${report.name.replace(/\s+/g, "-").toLowerCase()}`)
      notificationManager.success("Downloaded", `${report.name} ready in downloads folder`)
    } catch (error) {
      notificationManager.error("Download Failed", "Failed to download report")
    } finally {
      setIsExporting(false)
    }
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
                disabled={isExporting}
                className={`p-4 rounded-lg border-2 transition-colors capitalize font-semibold ${
                  reportType === type
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-muted/20 text-foreground hover:border-border/80"
                } disabled:opacity-50`}
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
                disabled={isExporting}
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">To Date</label>
              <Input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                disabled={isExporting}
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
                    disabled={isExporting}
                    className="w-4 h-4 rounded border-border bg-input cursor-pointer"
                  />
                  <span className="text-sm text-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button
              onClick={() => handleGenerateReport("pdf")}
              disabled={isExporting}
              className="bg-primary text-primary-foreground"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate PDF
            </Button>
            <Button onClick={() => handleGenerateReport("json")} disabled={isExporting} variant="outline">
              <FileJson className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
            <Button onClick={() => handleGenerateReport("csv")} disabled={isExporting} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Generated Reports</CardTitle>
          <Button variant="outline" size="sm" disabled={isExporting}>
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
                      <span className="font-semibold text-red-400">{report.fraudDetected}</span> fraud cases
                    </span>
                    <span className="text-muted-foreground">{report.size}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    onClick={() => handleDownloadReport(report)}
                    disabled={isExporting}
                    className="bg-primary text-primary-foreground"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-300">
          <p className="font-semibold">Export Tips:</p>
          <ul className="list-disc list-inside text-xs mt-2 space-y-1">
            <li>PDF: Formatted report for presentations and printing</li>
            <li>JSON: Raw data for programmatic processing</li>
            <li>CSV: Transaction data for spreadsheet analysis</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
