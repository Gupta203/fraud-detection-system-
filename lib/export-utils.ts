export interface ReportData {
  transactions: Array<{
    id: string
    amount: number
    merchant: string
    timestamp: string
    status: "fraudulent" | "legitimate" | "pending"
    confidence: number
  }>
  alerts: Array<{
    id: string
    type: string
    message: string
    severity: "critical" | "warning" | "info"
  }>
  metrics: {
    totalTransactions: number
    fraudDetected: number
    accuracy: number
    precision: number
    recall: number
  }
  metadata: {
    generatedAt: string
    dateRange: { from: string; to: string }
    reportType: "daily" | "weekly" | "monthly"
  }
}

// JSON Export
export const exportToJSON = (data: ReportData, filename: string) => {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: "application/json" })
  downloadFile(blob, `${filename}.json`)
}

// CSV Export
export const exportToCSV = (transactions: ReportData["transactions"], filename: string) => {
  const headers = ["ID", "Amount", "Merchant", "Timestamp", "Status", "Confidence"]
  const rows = transactions.map((t) => [t.id, t.amount, t.merchant, t.timestamp, t.status, t.confidence])

  let csvContent = headers.join(",") + "\n"
  rows.forEach((row) => {
    csvContent += row.map((cell) => `"${cell}"`).join(",") + "\n"
  })

  const blob = new Blob([csvContent], { type: "text/csv" })
  downloadFile(blob, `${filename}.csv`)
}

// Generic file download helper
export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

// Batch results export
export const exportBatchResults = (
  results: {
    totalProcessed: number
    fraudulent: number
    legitimate: number
    pending: number
    avgConfidence: number
    processingTime: string
    accuracy: number
    flagged: number
  },
  filename: string,
) => {
  const data = {
    ...results,
    exportedAt: new Date().toISOString(),
    timestamp: new Date().toLocaleString(),
  }
  exportToJSON(
    {
      transactions: [],
      alerts: [],
      metrics: {
        totalTransactions: results.totalProcessed,
        fraudDetected: results.fraudulent,
        accuracy: results.accuracy,
        precision: (results.fraudulent / results.flagged) * 100,
        recall: (results.fraudulent / results.totalProcessed) * 100,
      },
      metadata: {
        generatedAt: new Date().toISOString(),
        dateRange: { from: "", to: "" },
        reportType: "daily",
      },
    } as ReportData,
    filename,
  )
}

// Parse uploaded files
export const parseUploadedFile = async (file: File): Promise<any[]> => {
  const text = await file.text()

  if (file.name.endsWith(".csv")) {
    return parseCSV(text)
  } else if (file.name.endsWith(".json")) {
    return JSON.parse(text)
  }
  throw new Error("Unsupported file format")
}

const parseCSV = (text: string): any[] => {
  const lines = text.split("\n")
  const headers = lines[0].split(",").map((h) => h.trim())
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim())
    return headers.reduce(
      (obj, header, index) => {
        obj[header] = values[index]
        return obj
      },
      {} as Record<string, string>,
    )
  })
}
