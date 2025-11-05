"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { FraudDemo } from "@/components/fraud-demo"
import { Documentation } from "@/components/documentation"
import { AnalyticsPage } from "@/components/analytics-page"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "analytics" && <AnalyticsPage />}
          {activeTab === "demo" && <FraudDemo />}
          {activeTab === "docs" && <Documentation />}
        </main>
      </div>
    </div>
  )
}
