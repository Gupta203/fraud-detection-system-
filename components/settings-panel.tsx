"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Settings, Save, RotateCcw } from "lucide-react"

export function SettingsPanel() {
  const [settings, setSettings] = useState({
    alertThreshold: 75,
    enableRealTimeAlerts: true,
    enableEmailNotifications: true,
    enableSMSAlerts: false,
    autoRetraining: true,
    retrainingFrequency: "weekly",
    maxBatchSize: 5000,
    enableAnomalyDetection: true,
    confidenceThreshold: 85,
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">System Settings</h2>
        <p className="text-muted-foreground">Configure FraudShield AI/ML detection system</p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Alert Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Alert Threshold (%)</label>
            <Input
              type="number"
              min="0"
              max="100"
              value={settings.alertThreshold}
              onChange={(e) => setSettings({ ...settings, alertThreshold: Number(e.target.value) })}
              className="max-w-xs"
            />
            <p className="text-xs text-muted-foreground mt-1">Trigger alerts for transactions above this risk score</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Real-Time Alerts</p>
              <p className="text-xs text-muted-foreground">Enable immediate fraud detection alerts</p>
            </div>
            <Switch
              checked={settings.enableRealTimeAlerts}
              onCheckedChange={(checked) => setSettings({ ...settings, enableRealTimeAlerts: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Send alerts via email</p>
            </div>
            <Switch
              checked={settings.enableEmailNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, enableEmailNotifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">SMS Alerts</p>
              <p className="text-xs text-muted-foreground">Send critical alerts via SMS</p>
            </div>
            <Switch
              checked={settings.enableSMSAlerts}
              onCheckedChange={(checked) => setSettings({ ...settings, enableSMSAlerts: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Model Training Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Auto Retraining</p>
              <p className="text-xs text-muted-foreground">Automatically retrain models with new data</p>
            </div>
            <Switch
              checked={settings.autoRetraining}
              onCheckedChange={(checked) => setSettings({ ...settings, autoRetraining: checked })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Retraining Frequency</label>
            <select
              value={settings.retrainingFrequency}
              onChange={(e) => setSettings({ ...settings, retrainingFrequency: e.target.value })}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
            >
              <option>daily</option>
              <option>weekly</option>
              <option>monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Confidence Threshold (%)</label>
            <Input
              type="number"
              min="0"
              max="100"
              value={settings.confidenceThreshold}
              onChange={(e) => setSettings({ ...settings, confidenceThreshold: Number(e.target.value) })}
              className="max-w-xs"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Batch Processing Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Max Batch Size (transactions)</label>
            <Input
              type="number"
              min="100"
              max="50000"
              step="100"
              value={settings.maxBatchSize}
              onChange={(e) => setSettings({ ...settings, maxBatchSize: Number(e.target.value) })}
              className="max-w-xs"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Enable Anomaly Detection</p>
              <p className="text-xs text-muted-foreground">Detect unusual transaction patterns</p>
            </div>
            <Switch
              checked={settings.enableAnomalyDetection}
              onCheckedChange={(checked) => setSettings({ ...settings, enableAnomalyDetection: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleSave} className="bg-primary text-primary-foreground">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
        <Button variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset to Default
        </Button>
      </div>

      {saved && (
        <div className="fixed bottom-4 right-4 bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg">
          Settings saved successfully!
        </div>
      )}
    </div>
  )
}
