"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, CheckCircle, AlertCircle, Download } from "lucide-react"

export function ComplianceReporting() {
  const complianceReports = [
    {
      id: 1,
      name: "AML Compliance Report",
      standard: "FinCEN-AML",
      status: "compliant",
      dueDate: "2024-02-15",
      lastGenerated: "2024-01-15",
      coverage: "100%",
    },
    {
      id: 2,
      name: "KYC Verification Audit",
      standard: "ISO 9001",
      status: "compliant",
      dueDate: "2024-03-30",
      lastGenerated: "2024-01-14",
      coverage: "100%",
    },
    {
      id: 3,
      name: "Fraud Detection SLA",
      standard: "PCI-DSS",
      status: "review",
      dueDate: "2024-01-31",
      lastGenerated: "2024-01-14",
      coverage: "98%",
    },
    {
      id: 4,
      name: "Data Privacy Compliance",
      standard: "GDPR",
      status: "compliant",
      dueDate: "2024-04-15",
      lastGenerated: "2024-01-10",
      coverage: "100%",
    },
    {
      id: 5,
      name: "Transaction Monitoring",
      standard: "OFAC",
      status: "compliant",
      dueDate: "2024-02-28",
      lastGenerated: "2024-01-13",
      coverage: "99.8%",
    },
  ]

  const metrics = [
    { label: "Total Audits", value: 23, icon: FileText },
    { label: "Compliant", value: 21, icon: CheckCircle },
    { label: "Under Review", value: 2, icon: Clock },
    { label: "Non-Compliant", value: 0, icon: AlertCircle },
  ]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Compliance & Regulatory Reporting</h2>
        <p className="text-muted-foreground">Monitor regulatory compliance and generate audit reports</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon
          return (
            <Card key={idx} className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                    <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                  </div>
                  <Icon className="w-8 h-8 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Compliance Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {complianceReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border hover:border-border/80 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <h4 className="font-semibold text-foreground">{report.name}</h4>
                    <Badge
                      className={`text-xs ${
                        report.status === "compliant"
                          ? "bg-green-500/20 text-green-400"
                          : report.status === "review"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {report.status}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>
                      Standard: <span className="font-semibold text-foreground">{report.standard}</span>
                    </span>
                    <span>
                      Coverage: <span className="font-semibold text-foreground">{report.coverage}</span>
                    </span>
                    <span>
                      Last Generated: <span className="font-semibold text-foreground">{report.lastGenerated}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
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
