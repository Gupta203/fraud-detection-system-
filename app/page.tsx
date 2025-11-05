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
import { SmartAlerts } from "@/components/smart-alerts"
import { LiveTransactionFeed } from "@/components/live-transaction-feed"
import { IntelligenceDashboard } from "@/components/intelligence-dashboard"
import { FraudPreventionSimulator } from "@/components/fraud-prevention-simulator"
import { TeamCollaboration } from "@/components/team-collaboration"
import { SecurityAudit } from "@/components/security-audit"
import { MobileAppPreview } from "@/components/mobile-app-preview"
import { FeaturesDocumentation } from "@/components/features-documentation"
import { ToastProvider } from "@/components/toast-provider"
import { AIChatbot } from "@/components/ai-chatbot"
import { MobileAPKGenerator } from "@/components/mobile-apk-generator"

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
    <ToastProvider>
      <AIChatbot />
      <div className="flex h-screen bg-background">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header alertsCount={alerts.filter((a) => a.status === "active").length} />
          <main className="flex-1 overflow-y-auto">
            {activeTab === "features-doc" && <FeaturesDocumentation />}
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "alerts" && <AlertsPanel alerts={alerts} />}
            {activeTab === "smart-alerts" && <SmartAlerts />}
            {activeTab === "live-feed" && <LiveTransactionFeed />}
            {activeTab === "intelligence" && <IntelligenceDashboard />}
            {activeTab === "simulator" && <FraudPreventionSimulator />}
            {activeTab === "collaboration" && <TeamCollaboration />}
            {activeTab === "security" && <SecurityAudit />}
            {activeTab === "mobile" && <MobileAppPreview />}
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
            {activeTab === "chatbot" && (
              <div className="p-8 space-y-4">
                <h2 className="text-3xl font-bold text-foreground">AI Chatbot Assistant</h2>
                <p className="text-muted-foreground max-w-2xl">
                  The AI Chatbot is available as a floating button in the bottom-right corner. Click the message icon to
                  start asking questions about fraud detection, reports, algorithms, alerts, compliance, and more!
                </p>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 space-y-2">
                  <p className="font-semibold text-foreground">Available Topics:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ How fraud detection works and algorithms</li>
                    <li>✓ Risk scoring and model performance</li>
                    <li>✓ Alert management and actions</li>
                    <li>✓ Report generation and export formats</li>
                    <li>✓ Mobile app features and installation</li>
                    <li>✓ Security practices and compliance</li>
                    <li>✓ Batch detection and customer profiles</li>
                  </ul>
                </div>
              </div>
            )}
            {activeTab === "apk-generator" && <MobileAPKGenerator />}
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
