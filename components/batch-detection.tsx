"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Play, FileJson } from "lucide-react"

export function BatchDetection() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }

  const processBatch = () => {
    if (!file) return
    setLoading(true)
    setTimeout(() => {
      setResults({
        totalProcessed: 1500,
        fraudulent: 87,
        legitimate: 1413,
        pending: 12,
        avgConfidence: 96.8,
        processingTime: "2.3 seconds",
        accuracy: 98.7,
        flagged: 99,
      })
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Batch Fraud Detection</h2>
        <p className="text-muted-foreground">Process multiple transactions at once using ML models</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">1,500</div>
              <p className="text-sm text-muted-foreground">Transactions Processed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-400 mb-1">87</div>
              <p className="text-sm text-muted-foreground">Fraudulent Detected</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-1">98.7%</div>
              <p className="text-sm text-muted-foreground">Detection Accuracy</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Upload CSV or JSON File</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Input type="file" accept=".csv,.json" onChange={handleFileUpload} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground mb-1">
                {file ? file.name : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-muted-foreground">CSV or JSON files supported</p>
            </label>
          </div>

          <Button onClick={processBatch} disabled={!file || loading} className="w-full bg-primary">
            <Play className="w-4 h-4 mr-2" />
            {loading ? "Processing..." : "Process Batch"}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Batch Processing Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Total Processed</p>
                <p className="text-2xl font-bold text-foreground">{results.totalProcessed}</p>
              </div>
              <div className="p-4 bg-red-500/10 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Fraudulent</p>
                <p className="text-2xl font-bold text-red-400">{results.fraudulent}</p>
              </div>
              <div className="p-4 bg-green-500/10 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Legitimate</p>
                <p className="text-2xl font-bold text-green-400">{results.legitimate}</p>
              </div>
              <div className="p-4 bg-yellow-500/10 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-400">{results.pending}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Processing Speed</p>
                <p className="text-lg font-semibold text-foreground">{results.processingTime}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Average Confidence</p>
                <p className="text-lg font-semibold text-foreground">{results.avgConfidence}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Overall Accuracy</p>
                <p className="text-lg font-semibold text-foreground">{results.accuracy}%</p>
              </div>
            </div>

            <Button className="w-full bg-secondary text-secondary-foreground">
              <FileJson className="w-4 h-4 mr-2" />
              Download Results
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
