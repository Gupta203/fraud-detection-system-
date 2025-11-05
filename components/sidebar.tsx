"use client"
import {
  BarChart3,
  Settings,
  FileText,
  Brain,
  TrendingUp,
  Bell,
  Search,
  Target,
  Zap,
  GitCompare,
  Users,
  Activity,
  FileJson,
} from "lucide-react"

const navigationItems = [
  { icon: BarChart3, label: "Dashboard", id: "dashboard" },
  { icon: TrendingUp, label: "Analytics", id: "analytics" },
  { icon: Bell, label: "Real-Time Alerts", id: "alerts" },
  { icon: Search, label: "Transaction Search", id: "search" },
  { icon: Target, label: "Risk Scoring", id: "risk-scoring" },
  { icon: Zap, label: "Batch Detection", id: "batch" },
  { icon: Activity, label: "Anomaly Detection", id: "anomaly" },
  { icon: GitCompare, label: "Model Comparison", id: "models" },
  { icon: Users, label: "Customer Profiles", id: "customers" },
  { icon: FileJson, label: "Export Reports", id: "reports" },
  { icon: Brain, label: "Fraud Demo", id: "demo" },
  { icon: FileText, label: "Documentation", id: "docs" },
  { icon: Settings, label: "Settings", id: "settings" },
]

export function Sidebar({ activeTab, onTabChange }) {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col overflow-y-auto">
      <div className="p-6 border-b border-sidebar-border sticky top-0 bg-sidebar">
        <h1 className="text-2xl font-bold text-sidebar-foreground flex items-center gap-2">
          <Brain className="w-8 h-8 text-sidebar-accent" />
          FraudShield
        </h1>
        <p className="text-sm text-muted-foreground mt-1">AI Detection System</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = item.id === activeTab
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-left text-sm ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/10"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent/10 rounded-lg p-4 text-sm">
          <p className="font-semibold text-sidebar-foreground mb-1">System Status</p>
          <p className="text-muted-foreground">Online & Monitoring</p>
          <div className="mt-2 flex gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Active</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
