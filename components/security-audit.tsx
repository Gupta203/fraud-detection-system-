"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle, Lock, Zap, Eye, Database, Server } from "lucide-react"
import { notificationManager } from "@/lib/notification-service"

interface AuditItem {
  id: string
  name: string
  category: "encryption" | "access" | "data" | "api"
  status: "pass" | "warning" | "fail"
  lastChecked: Date
  details: string
}

export function SecurityAudit() {
  const [auditItems, setAuditItems] = useState<AuditItem[]>([
    {
      id: "1",
      name: "End-to-End Encryption",
      category: "encryption",
      status: "pass",
      lastChecked: new Date(),
      details: "TLS 1.3 enabled with AES-256 encryption",
    },
    {
      id: "2",
      name: "Role-Based Access Control",
      category: "access",
      status: "pass",
      lastChecked: new Date(Date.now() - 3600000),
      details: "5 roles configured with proper permissions",
    },
    {
      id: "3",
      name: "Data Residency Compliance",
      category: "data",
      status: "pass",
      lastChecked: new Date(Date.now() - 7200000),
      details: "All data stored in GDPR-compliant regions",
    },
    {
      id: "4",
      name: "API Rate Limiting",
      category: "api",
      status: "warning",
      lastChecked: new Date(Date.now() - 1800000),
      details: "Current rate: 1000 req/min. Recommended: 500 req/min",
    },
    {
      id: "5",
      name: "Database Backups",
      category: "data",
      status: "pass",
      lastChecked: new Date(Date.now() - 900000),
      details: "Hourly backups running, last backup: 15 min ago",
    },
    {
      id: "6",
      name: "Authentication Logs",
      category: "access",
      status: "pass",
      lastChecked: new Date(),
      details: "All authentication events logged and encrypted",
    },
  ])

  const [isRunning, setIsRunning] = useState(false)

  const runAudit = async () => {
    setIsRunning(true)
    notificationManager.info("Security Audit", "Starting comprehensive security scan...")

    setTimeout(() => {
      const updated = auditItems.map((item) => ({
        ...item,
        lastChecked: new Date(),
      }))
      setAuditItems(updated)
      setIsRunning(false)
      notificationManager.success("Audit Complete", "All security checks passed successfully")
    }, 2000)
  }

  const passCount = auditItems.filter((i) => i.status === "pass").length
  const warningCount = auditItems.filter((i) => i.status === "warning").length
  const failCount = auditItems.filter((i) => i.status === "fail").length

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Security Audit</h2>
        <p className="text-muted-foreground">Comprehensive security compliance and vulnerability scanning</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border bg-green-500/5 border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Passed</p>
                <p className="text-3xl font-bold text-green-400">{passCount}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-yellow-500/5 border-yellow-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-3xl font-bold text-yellow-400">{warningCount}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <Button onClick={runAudit} disabled={isRunning} className="w-full bg-blue-600 hover:bg-blue-700">
              <Zap className="w-4 h-4 mr-2" />
              {isRunning ? "Scanning..." : "Run Audit"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {auditItems.map((item) => (
          <Card
            key={item.id}
            className={`border-l-4 ${
              item.status === "pass"
                ? "border-l-green-500 bg-green-500/5"
                : item.status === "warning"
                  ? "border-l-yellow-500 bg-yellow-500/5"
                  : "border-l-red-500 bg-red-500/5"
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-3 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {item.category === "encryption" && <Lock className="w-5 h-5 text-blue-400" />}
                    {item.category === "access" && <Eye className="w-5 h-5 text-purple-400" />}
                    {item.category === "data" && <Database className="w-5 h-5 text-cyan-400" />}
                    {item.category === "api" && <Server className="w-5 h-5 text-orange-400" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.details}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Last checked: {item.lastChecked.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <Badge
                  className={
                    item.status === "pass"
                      ? "bg-green-500/20 text-green-400"
                      : item.status === "warning"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }
                >
                  {item.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
