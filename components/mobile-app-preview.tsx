"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smartphone, Download, Share2, BarChart3, Bell, Search, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { notificationManager } from "@/lib/notification-service"

interface MobileScreen {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  features: string[]
}

export function MobileAppPreview() {
  const [selectedScreen, setSelectedScreen] = useState<string>("dashboard")

  const screens: MobileScreen[] = [
    {
      id: "dashboard",
      name: "Dashboard",
      description: "Quick overview of fraud metrics and alerts",
      icon: <BarChart3 className="w-5 h-5" />,
      features: ["Real-time metrics", "Alert summary", "Quick actions", "Status indicators"],
    },
    {
      id: "alerts",
      name: "Alerts",
      description: "Push notifications for suspicious activities",
      icon: <Bell className="w-5 h-5" />,
      features: ["Real-time alerts", "Action buttons", "Alert history", "Filtering options"],
    },
    {
      id: "search",
      name: "Transaction Search",
      description: "Search and filter transactions on-the-go",
      icon: <Search className="w-5 h-5" />,
      features: ["Fast search", "Advanced filters", "Transaction details", "Risk indicators"],
    },
    {
      id: "activity",
      name: "Live Activity",
      description: "Monitor live transaction stream",
      icon: <Activity className="w-5 h-5" />,
      features: ["Real-time feed", "Status updates", "Risk scores", "Merchant info"],
    },
  ]

  const handleDownload = () => {
    notificationManager.success("App Download Started", "FraudShield Mobile v2.1 is downloading. Check your device.")
  }

  const handleShare = () => {
    notificationManager.success("Link Copied", "App download link has been copied to your clipboard")
  }

  const currentScreen = screens.find((s) => s.id === selectedScreen)

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Mobile App Preview</h2>
        <p className="text-muted-foreground">FraudShield mobile application features and availability</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-8 min-h-96 flex flex-col items-center justify-center relative">
              {/* Phone frame */}
              <div className="w-full max-w-sm bg-black rounded-3xl p-1 shadow-2xl">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-4 min-h-96">
                  {/* Status bar */}
                  <div className="flex items-center justify-between text-white text-xs mb-4">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <span>📶</span>
                      <span>📡</span>
                      <span>🔋</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-card rounded-2xl p-4 space-y-3">
                    <h3 className="text-lg font-bold text-foreground">{currentScreen?.name}</h3>
                    <p className="text-sm text-muted-foreground">{currentScreen?.description}</p>

                    <div className="space-y-2">
                      {currentScreen?.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span className="text-xs text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Badge className="bg-green-500/20 text-green-400">Available</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Available Screens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {screens.map((screen) => (
                <button
                  key={screen.id}
                  onClick={() => setSelectedScreen(screen.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-left text-sm ${
                    selectedScreen === screen.id
                      ? "bg-blue-600 text-white"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  {screen.icon}
                  {screen.name}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Get the App</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={handleDownload} className="w-full bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Download App
              </Button>
              <Button onClick={handleShare} variant="outline" className="w-full bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                Share Link
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">App Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">Version</p>
                <p className="font-semibold">2.1.0</p>
              </div>
              <div>
                <p className="text-muted-foreground">Platforms</p>
                <p className="font-semibold">iOS 14+ / Android 9+</p>
              </div>
              <div>
                <p className="text-muted-foreground">Size</p>
                <p className="font-semibold">42 MB</p>
              </div>
              <div>
                <p className="text-muted-foreground">Rating</p>
                <p className="font-semibold">4.8 / 5.0</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
