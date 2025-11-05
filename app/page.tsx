"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { FraudDemo } from "@/components/fraud-demo"
import { Documentation } from "@/components/documentation"
import { AnalyticsPage } from "@/components/analytics-page"
import { AlertsPanel } from "@/components/alerts-panel"
import { TransactionSearch } from "@/components/transaction-search"
import { RiskScoring } from "@/components/risk-scoring"
import { BatchDetection } from "@/components/batch-detection"
import { ModelComparison } from "@/components/model-comparison"
import { CustomerProfiles } from "@/components/customer-profiles"
import { SettingsPanel } from "@/components/settings-panel"
import { AnomalyDetection } from "@/components/anomaly-detection"
import { ReportExport } from "@/components/report-export"
import { MLPipelineVisualizer } from "@/components/ml-pipeline-visualizer"
import { PredictiveAnalytics } from "@/components/predictive-analytics"
import { RealTimeMonitoring } from "@/components/real-time-monitoring"
import { AdvancedFilters } from "@/components/advanced-filters"
import { ComplianceReporting } from "@/components/compliance-reporting"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [alerts, setAlerts] = useState([
    {
      id: "1",
      type: "critical" as const,
      message: "Multiple high-value transactions detected",
      status: "active" as const,
    },
    { id: "2", type: "warning" as const, message: "Card-not-present transaction detected", status: "active" as const },
  ])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header alertsCount={alerts.filter((a) => a.status === "active").length} />
        <main className="flex-1 overflow-y-auto">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "alerts" && <AlertsPanel alerts={alerts} />}
          {activeTab === "search" && <TransactionSearch />}
          {activeTab === "risk-scoring" && <RiskScoring />}
          {activeTab === "batch" && <BatchDetection />}
          {activeTab === "anomaly" && <AnomalyDetection />}
          {activeTab === "models" && <ModelComparison />}
          {activeTab === "customers" && <CustomerProfiles />}
          {activeTab === "pipeline" && <MLPipelineVisualizer />}
          {activeTab === "predictive" && <PredictiveAnalytics />}
          {activeTab === "monitoring" && <RealTimeMonitoring />}
          {activeTab === "filters" && <AdvancedFilters />}
          {activeTab === "compliance" && <ComplianceReporting />}
          {activeTab === "reports" && <ReportExport />}
          {activeTab === "analytics" && <AnalyticsPage />}
          {activeTab === "demo" && <FraudDemo />}
          {activeTab === "settings" && <SettingsPanel />}
          {activeTab === "docs" && <Documentation />}
        </main>
      </div>
    </div>
  )
}
