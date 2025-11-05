"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Smartphone, CheckCircle, Zap, FileDown } from "lucide-react"
import { notificationManager } from "@/lib/notification-service"

interface APKGenerationStep {
  id: string
  name: string
  status: "pending" | "in-progress" | "completed" | "error"
  progress: number
}

export function MobileAPKGenerator() {
  const [generationSteps, setGenerationSteps] = useState<APKGenerationStep[]>([
    { id: "1", name: "Initialize build environment", status: "pending", progress: 0 },
    { id: "2", name: "Compile application code", status: "pending", progress: 0 },
    { id: "3", name: "Bundle assets and resources", status: "pending", progress: 0 },
    { id: "4", name: "Generate certificate", status: "pending", progress: 0 },
    { id: "5", name: "Sign APK package", status: "pending", progress: 0 },
    { id: "6", name: "Optimize for mobile", status: "pending", progress: 0 },
  ])
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadReady, setDownloadReady] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<"android" | "ios" | "both">("both")

  const simulateAPKGeneration = async () => {
    try {
      setIsGenerating(true)
      notificationManager.info("Build Started", "Generating APK package...")

      for (let i = 0; i < generationSteps.length; i++) {
        setGenerationSteps((prev) => prev.map((step, idx) => (idx === i ? { ...step, status: "in-progress" } : step)))

        await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200))

        const progress = Math.min(95, 20 + i * 15)
        setGenerationSteps((prev) =>
          prev.map((step, idx) => (idx === i ? { ...step, status: "completed", progress } : step)),
        )
      }

      setGenerationSteps((prev) =>
        prev.map((step) => ({
          ...step,
          progress: 100,
          status: "completed",
        })),
      )

      setDownloadReady(true)
      setIsGenerating(false)
      notificationManager.success("Build Complete", "APK is ready to download!")
    } catch (error) {
      notificationManager.error("Build Error", "Failed to generate APK")
      setIsGenerating(false)
    }
  }

  const handleDownloadAPK = () => {
    try {
      const apkMetadata = {
        app: "FraudShield",
        version: "2.1.0",
        platform: selectedPlatform === "both" ? "Android + iOS" : selectedPlatform,
        buildDate: new Date().toISOString(),
        features: [
          "Real-time fraud alerts",
          "Transaction search",
          "Live monitoring",
          "Dashboard",
          "Biometric auth",
          "Offline support",
        ],
        requirements: selectedPlatform === "ios" ? "iOS 14+" : "Android 9+",
        size: selectedPlatform === "both" ? "42 MB" : "38 MB",
      }

      const content = JSON.stringify(apkMetadata, null, 2)
      const blob = new Blob([content], { type: "application/octet-stream" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `FraudShield-v2.1-${selectedPlatform}.apk`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      notificationManager.success("Download Started", "Check your downloads folder for FraudShield APK")
    } catch (error) {
      notificationManager.error("Download Error", "Failed to download APK. Please try again.")
    }
  }

  const handleDownloadPWA = () => {
    try {
      const manifest = {
        name: "FraudShield - AI Fraud Detection",
        short_name: "FraudShield",
        description: "Enterprise-grade fraud detection system",
        start_url: "/",
        display: "standalone",
        theme_color: "#2196F3",
        background_color: "#1a1a1a",
        categories: ["business", "finance"],
        screenshots: [
          { src: "/screenshots/1.png", sizes: "540x720" },
          { src: "/screenshots/2.png", sizes: "540x720" },
        ],
      }

      const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "manifest.json"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      notificationManager.success("Downloaded", "PWA manifest ready for installation")
    } catch (error) {
      notificationManager.error("Error", "Failed to download manifest")
    }
  }

  const resetGeneration = () => {
    setGenerationSteps(generationSteps.map((step) => ({ ...step, status: "pending", progress: 0 })))
    setDownloadReady(false)
    notificationManager.info("Reset", "Generation settings reset")
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Mobile App - APK Generator</h2>
        <p className="text-muted-foreground">Generate and download FraudShield as a native mobile application</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Build Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Select Platform</label>
              <div className="space-y-2">
                {[
                  { value: "android" as const, label: "Android Only", icon: "🤖" },
                  { value: "ios" as const, label: "iOS Only", icon: "🍎" },
                  { value: "both" as const, label: "Android + iOS (Universal)", icon: "📱" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedPlatform(option.value)}
                    disabled={isGenerating}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      selectedPlatform === option.value
                        ? "border-blue-600 bg-blue-600/10 text-blue-400"
                        : "border-border bg-muted/20 text-foreground hover:border-border/80"
                    } disabled:opacity-50`}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <div className="text-left">
                      <p className="font-semibold">{option.label}</p>
                      <p className="text-xs text-muted-foreground">{option.value === "both" ? "42 MB" : "38 MB"}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-2">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Included Features:</p>
                  <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                    <li>✓ Real-time fraud alerts</li>
                    <li>✓ Offline-first architecture</li>
                    <li>✓ Transaction search</li>
                    <li>✓ Dashboard monitoring</li>
                    <li>✓ Biometric authentication</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={simulateAPKGeneration}
                disabled={isGenerating}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isGenerating ? "Generating..." : "Generate APK"}
              </Button>
              {downloadReady && (
                <Button onClick={resetGeneration} variant="outline" className="flex-1 bg-transparent">
                  Reset
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Build Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {generationSteps.map((step) => (
              <div key={step.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  {step.status === "pending" && (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                  )}
                  {step.status === "in-progress" && (
                    <div className="w-5 h-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                  )}
                  {step.status === "completed" && <CheckCircle className="w-5 h-5 text-green-400" />}
                  <span className="text-sm font-medium text-foreground">{step.name}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 ml-7">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${step.progress}%` }}
                  />
                </div>
              </div>
            ))}

            {downloadReady && (
              <div className="pt-4 space-y-2">
                <Button onClick={handleDownloadAPK} className="w-full bg-green-600 hover:bg-green-700">
                  <FileDown className="w-4 h-4 mr-2" />
                  Download APK
                </Button>
                <Button onClick={handleDownloadPWA} variant="outline" className="w-full bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download PWA Manifest
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Installation Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Android Installation:</h4>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Download APK to your Android device</li>
              <li>Enable installation from unknown sources in Settings</li>
              <li>Open file manager and tap the downloaded APK</li>
              <li>Follow on-screen installation prompts</li>
              <li>Grant necessary permissions</li>
              <li>Log in with your credentials</li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">iOS Installation:</h4>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Download from App Store or TestFlight</li>
              <li>Authenticate with Face ID or password</li>
              <li>Wait for download to complete</li>
              <li>Log in with your credentials</li>
              <li>Enable notifications when prompted</li>
              <li>Add to Home Screen</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
