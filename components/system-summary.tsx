"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  MessageCircle,
  Download,
  AlertCircle,
  Activity,
  Lightbulb,
  Zap,
  MessageSquare,
  Shield,
  Smartphone,
  Bell,
  Search,
  Target,
  Workflow,
  Gauge,
  Filter,
  BookOpen,
  FileJson,
  FileText,
  CheckCircle,
} from "lucide-react"

export function SystemSummary() {
  const features = [
    {
      name: "AI Chatbot",
      description: "Intelligent assistant powered by ChatGPT for answering fraud detection questions",
      icon: MessageCircle,
      category: "NEW",
      status: "Active",
    },
    {
      name: "APK Generator",
      description: "Generate and download mobile app as APK for Android & iOS devices",
      icon: Download,
      category: "NEW",
      status: "Active",
    },
    {
      name: "Dashboard",
      description: "Real-time fraud metrics and system overview",
      icon: Brain,
      category: "Core",
      status: "Active",
    },
    {
      name: "Smart Alerts",
      description: "AI-powered contextual alerts with risk severity levels",
      icon: AlertCircle,
      category: "Core",
      status: "Active",
    },
    {
      name: "Live Feed",
      description: "Real-time transaction streaming with fraud classification",
      icon: Activity,
      category: "Core",
      status: "LIVE",
    },
    {
      name: "Intelligence Hub",
      description: "Advanced analytics and fraud pattern analysis",
      icon: Lightbulb,
      category: "Advanced",
      status: "Active",
    },
    {
      name: "Fraud Simulator",
      description: "Interactive ML model testing and prediction demo",
      icon: Zap,
      category: "Advanced",
      status: "Active",
    },
    {
      name: "Team Collaboration",
      description: "Multi-user case management and discussion threads",
      icon: MessageSquare,
      category: "Advanced",
      status: "Active",
    },
    {
      name: "Security Audit",
      description: "System security compliance checking and validation",
      icon: Shield,
      category: "Advanced",
      status: "Active",
    },
    {
      name: "Mobile App",
      description: "Mobile app preview and feature showcase",
      icon: Smartphone,
      category: "Core",
      status: "Active",
    },
    {
      name: "Real-Time Alerts",
      description: "Immediate notification system for critical fraud events",
      icon: Bell,
      category: "Core",
      status: "Active",
    },
    {
      name: "Transaction Search",
      description: "Advanced search and filtering of transaction history",
      icon: Search,
      category: "Core",
      status: "Active",
    },
    {
      name: "Risk Scoring",
      description: "Multi-factor fraud risk assessment engine",
      icon: Target,
      category: "Advanced",
      status: "Active",
    },
    {
      name: "ML Pipeline",
      description: "Visualization of data flowing through all ML models",
      icon: Workflow,
      category: "Advanced",
      status: "Active",
    },
    {
      name: "Predictive Analytics",
      description: "7-day fraud forecasting and trend analysis",
      icon: Gauge,
      category: "Advanced",
      status: "Active",
    },
    {
      name: "Advanced Filters",
      description: "Comprehensive transaction filtering capabilities",
      icon: Filter,
      category: "Core",
      status: "Active",
    },
    {
      name: "Compliance",
      description: "Regulatory compliance tracking (AML, KYC, PCI-DSS, GDPR, OFAC)",
      icon: BookOpen,
      category: "Enterprise",
      status: "Active",
    },
    {
      name: "Report Export",
      description: "PDF, JSON, and CSV report generation and downloads",
      icon: FileJson,
      category: "Enterprise",
      status: "Active",
    },
    {
      name: "Batch Detection",
      description: "Process multiple transactions with CSV/JSON upload",
      icon: FileText,
      category: "Advanced",
      status: "Active",
    },
    {
      name: "Anomaly Detection",
      description: "Real-time detection of unusual transaction patterns",
      icon: Activity,
      category: "Advanced",
      status: "Active",
    },
    {
      name: "Model Comparison",
      description: "Performance comparison across ML algorithms",
      icon: CheckCircle,
      category: "Advanced",
      status: "Active",
    },
    {
      name: "Customer Profiles",
      description: "Individual customer risk assessment and behavioral analysis",
      icon: Brain,
      category: "Enterprise",
      status: "Active",
    },
  ]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">FraudShield v2.2 - Complete System</h2>
        <p className="text-muted-foreground">22 Advanced Features • Enterprise-Grade Security • Real-Time Monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card key={feature.name} className="border-border bg-card hover:border-border/80 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-2">
                  <Icon className="w-5 h-5 text-blue-600" />
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      feature.category === "NEW"
                        ? "bg-green-500/20 text-green-400"
                        : feature.category === "LIVE"
                          ? "bg-red-500/20 text-red-400"
                          : feature.category === "Enterprise"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {feature.category}
                  </Badge>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{feature.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Status:</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      feature.status === "LIVE"
                        ? "bg-red-500/20 text-red-400 animate-pulse"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {feature.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>System Capabilities</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">98.7%</p>
            <p className="text-sm text-muted-foreground">Detection Accuracy</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">22</p>
            <p className="text-sm text-muted-foreground">Advanced Features</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">Real-Time</p>
            <p className="text-sm text-muted-foreground">Monitoring</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">4</p>
            <p className="text-sm text-muted-foreground">ML Algorithms</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
