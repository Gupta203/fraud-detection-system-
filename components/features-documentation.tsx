"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Zap, TrendingUp } from "lucide-react"

interface Feature {
  name: string
  category: "core" | "advanced" | "special"
  description: string
  benefits: string[]
  status: "stable" | "beta" | "new"
}

export function FeaturesDocumentation() {
  const [selectedCategory, setSelectedCategory] = useState<"core" | "advanced" | "special">("core")

  const features: Feature[] = [
    // Core Features (10)
    {
      name: "Main Dashboard",
      category: "core",
      description: "Real-time overview with key fraud metrics and KPIs",
      benefits: ["Quick insights", "Real-time updates", "Visual analytics"],
      status: "stable",
    },
    {
      name: "Real-Time Alerts",
      category: "core",
      description: "Instant notifications for suspicious activities",
      benefits: ["99.99% uptime", "Sub-100ms latency", "Multi-channel alerts"],
      status: "stable",
    },
    {
      name: "Transaction Search",
      category: "core",
      description: "Advanced search with filtering and sorting",
      benefits: ["Full-text search", "Advanced filters", "Export results"],
      status: "stable",
    },
    {
      name: "Risk Scoring",
      category: "core",
      description: "Multi-factor risk assessment engine",
      benefits: ["98.7% accuracy", "40+ risk factors", "Real-time scoring"],
      status: "stable",
    },
    {
      name: "Batch Detection",
      category: "core",
      description: "Process multiple transactions simultaneously",
      benefits: ["10,500+ tx/hour", "CSV/JSON support", "Progress tracking"],
      status: "stable",
    },
    {
      name: "Anomaly Detection",
      category: "core",
      description: "Statistical pattern detection engine",
      benefits: ["Outlier detection", "Time-series analysis", "Visualization"],
      status: "stable",
    },
    {
      name: "Model Comparison",
      category: "core",
      description: "Compare 4 ML algorithms side-by-side",
      benefits: ["RF, XGBoost, NN, Ensemble", "Performance metrics", "Recommendations"],
      status: "stable",
    },
    {
      name: "Customer Profiles",
      category: "core",
      description: "Individual customer behavioral analysis",
      benefits: ["Risk profiles", "Transaction history", "Spending patterns"],
      status: "stable",
    },
    {
      name: "Report Export",
      category: "core",
      description: "Generate comprehensive fraud reports",
      benefits: ["PDF/JSON export", "Custom date ranges", "Compliance-ready"],
      status: "stable",
    },
    {
      name: "Documentation",
      category: "core",
      description: "Complete system documentation and guides",
      benefits: ["API docs", "Best practices", "Troubleshooting"],
      status: "stable",
    },
    // Advanced Features (5)
    {
      name: "ML Pipeline Visualizer",
      category: "advanced",
      description: "Real-time visualization of ML data flow",
      benefits: ["Stage-by-stage metrics", "Performance tracking", "Debug insights"],
      status: "stable",
    },
    {
      name: "Predictive Analytics",
      category: "advanced",
      description: "7-day fraud trend forecasting",
      benefits: ["Trend analysis", "Category predictions", "Risk forecasting"],
      status: "stable",
    },
    {
      name: "Real-Time Monitoring",
      category: "advanced",
      description: "Live system health and metrics dashboard",
      benefits: ["System metrics", "Health checks", "Performance alerts"],
      status: "stable",
    },
    {
      name: "Advanced Filtering",
      category: "advanced",
      description: "Comprehensive transaction filtering system",
      benefits: ["15+ filter types", "Date range picker", "Saved filters"],
      status: "stable",
    },
    {
      name: "Compliance Reporting",
      category: "advanced",
      description: "Regulatory audit trails and compliance tracking",
      benefits: ["AML/KYC/GDPR/OFAC", "Audit logs", "Compliance status"],
      status: "stable",
    },
    // New Special Features (5)
    {
      name: "Smart Alerts",
      category: "special",
      description: "AI-powered contextual alerts with actions",
      benefits: ["Intelligent filtering", "Context-aware", "Action buttons"],
      status: "new",
    },
    {
      name: "Live Transaction Feed",
      category: "special",
      description: "Real-time streaming of all transactions",
      benefits: ["Millisecond updates", "Risk indicators", "Status tracking"],
      status: "new",
    },
    {
      name: "Intelligence Dashboard",
      category: "special",
      description: "Advanced analytics with predictive insights",
      benefits: ["AI analytics", "Trend detection", "System health"],
      status: "new",
    },
    {
      name: "Fraud Prevention Simulator",
      category: "special",
      description: "Test scenarios and see real-time predictions",
      benefits: ["Interactive testing", "Ensemble predictions", "Risk scoring"],
      status: "new",
    },
    {
      name: "Team Collaboration Hub",
      category: "special",
      description: "Unified team workspace for case management",
      benefits: ["Discussion threads", "Team messaging", "Report sharing"],
      status: "new",
    },
    {
      name: "Security Audit",
      category: "special",
      description: "Comprehensive security compliance scanning",
      benefits: ["6+ security checks", "Compliance status", "Auto audit runs"],
      status: "beta",
    },
    {
      name: "Mobile App Preview",
      category: "special",
      description: "Native mobile application for iOS/Android",
      benefits: ["4 main screens", "Push notifications", "Offline mode"],
      status: "new",
    },
  ]

  const coreFeatures = features.filter((f) => f.category === "core")
  const advancedFeatures = features.filter((f) => f.category === "advanced")
  const specialFeatures = features.filter((f) => f.category === "special")

  const renderFeatures = (featureList: Feature[]) => (
    <div className="space-y-3">
      {featureList.map((feature, i) => (
        <Card key={i} className="border-border hover:border-primary/50 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{feature.name}</h3>
                  <Badge
                    className={
                      feature.status === "stable"
                        ? "bg-green-500/20 text-green-400"
                        : feature.status === "beta"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                    }
                  >
                    {feature.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.benefits.map((benefit, j) => (
                    <span
                      key={j}
                      className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
              <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">FraudShield v2.1 - Complete Feature Set</h2>
        <p className="text-muted-foreground">
          20 advanced features organized by category for comprehensive fraud detection
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border bg-blue-500/5 border-blue-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Core Features</p>
                <p className="text-3xl font-bold text-blue-400">{coreFeatures.length}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-purple-500/5 border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Advanced Features</p>
                <p className="text-3xl font-bold text-purple-400">{advancedFeatures.length}</p>
              </div>
              <Zap className="w-10 h-10 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-green-500/5 border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Special Features</p>
                <p className="text-3xl font-bold text-green-400">{specialFeatures.length}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="core" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="core">Core ({coreFeatures.length})</TabsTrigger>
          <TabsTrigger value="advanced">Advanced ({advancedFeatures.length})</TabsTrigger>
          <TabsTrigger value="special">Special ({specialFeatures.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="core" className="space-y-4">
          <p className="text-muted-foreground text-sm">Foundation features for core fraud detection capabilities</p>
          {renderFeatures(coreFeatures)}
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <p className="text-muted-foreground text-sm">Enhanced analytics and monitoring capabilities</p>
          {renderFeatures(advancedFeatures)}
        </TabsContent>

        <TabsContent value="special" className="space-y-4">
          <p className="text-muted-foreground text-sm">Cutting-edge features with latest innovations</p>
          {renderFeatures(specialFeatures)}
        </TabsContent>
      </Tabs>
    </div>
  )
}
