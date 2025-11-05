export interface PDFReportData {
  title: string
  subtitle?: string
  dateRange?: { from: string; to: string }
  sections: {
    name: string
    title: string
    content: any
    type: "table" | "metrics" | "text" | "list"
  }[]
  metadata?: {
    generatedAt: string
    generatedBy: string
    version: string
  }
}

export async function generatePDFReport(reportData: PDFReportData, filename: string): Promise<void> {
  try {
    // Dynamic import for PDF generation
    const { default: jsPDF } = await import("jspdf")
    await import("jspdf-autotable")

    const doc = new jsPDF()
    let yPosition = 15

    // Header
    doc.setFillColor(33, 150, 243)
    doc.rect(0, 0, 210, 30, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.text(reportData.title, 15, 20)

    if (reportData.subtitle) {
      doc.setFontSize(12)
      doc.text(reportData.subtitle, 15, 27)
    }

    yPosition = 40

    // Metadata
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(10)
    if (reportData.dateRange) {
      doc.text(`Report Period: ${reportData.dateRange.from} to ${reportData.dateRange.to}`, 15, yPosition)
      yPosition += 6
    }
    if (reportData.metadata) {
      doc.text(`Generated: ${new Date(reportData.metadata.generatedAt).toLocaleString()}`, 15, yPosition)
      yPosition += 6
    }

    yPosition += 5

    // Process sections
    for (const section of reportData.sections) {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 15
      }

      doc.setTextColor(33, 150, 243)
      doc.setFontSize(14)
      doc.setFont(undefined, "bold")
      doc.text(section.title, 15, yPosition)
      yPosition += 10

      doc.setTextColor(0, 0, 0)
      doc.setFont(undefined, "normal")

      if (section.type === "table" && Array.isArray(section.content)) {
        const tableData = section.content.map((item: any) =>
          Object.values(item).map((v: any) => (typeof v === "number" ? v.toFixed(2) : String(v))),
        )
        const headers = section.content.length > 0 ? Object.keys(section.content[0]) : []

        const table = (doc as any).autoTable({
          head: [headers],
          body: tableData,
          startY: yPosition,
          margin: { left: 15, right: 15 },
          headStyles: { fillColor: [33, 150, 243], textColor: 255 },
          bodyStyles: { fontSize: 9 },
          alternateRowStyles: { fillColor: [245, 245, 245] },
        })
        yPosition = table.lastAutoTable.finalY + 10
      } else if (section.type === "metrics") {
        doc.setFontSize(11)
        for (const [key, value] of Object.entries(section.content)) {
          if (yPosition > 250) {
            doc.addPage()
            yPosition = 15
          }
          doc.setFont(undefined, "bold")
          doc.text(key, 15, yPosition)
          doc.setFont(undefined, "normal")
          doc.text(String(value), 100, yPosition)
          yPosition += 8
        }
        yPosition += 5
      } else if (section.type === "list") {
        doc.setFontSize(10)
        for (const item of section.content) {
          if (yPosition > 250) {
            doc.addPage()
            yPosition = 15
          }
          doc.text(`• ${item}`, 20, yPosition)
          yPosition += 6
        }
        yPosition += 5
      } else if (section.type === "text") {
        const lines = doc.splitTextToSize(section.content, 180)
        for (const line of lines) {
          if (yPosition > 250) {
            doc.addPage()
            yPosition = 15
          }
          doc.text(line, 15, yPosition)
          yPosition += 6
        }
        yPosition += 5
      }
    }

    // Footer with page numbers
    const pageCount = (doc as any).internal.pages.length - 1
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(9)
      doc.setTextColor(150, 150, 150)
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" },
      )
    }

    doc.save(filename)
  } catch (error) {
    console.error("[PDF Export Error]", error)
    throw new Error("Failed to generate PDF report. Please try again.")
  }
}

export function downloadFile(blob: Blob, filename: string) {
  try {
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error("[Download Error]", error)
    throw new Error("Failed to download file")
  }
}

export function exportToJSON(data: any, filename: string) {
  try {
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    downloadFile(blob, `${filename}.json`)
  } catch (error) {
    console.error("[JSON Export Error]", error)
    throw error
  }
}

export function exportToCSV(data: any[], filename: string) {
  try {
    if (!data || data.length === 0) throw new Error("No data to export")

    const headers = Object.keys(data[0])
    let csv = headers.join(",") + "\n"

    data.forEach((row) => {
      csv += headers.map((header) => `"${row[header] || ""}"`).join(",") + "\n"
    })

    const blob = new Blob([csv], { type: "text/csv" })
    downloadFile(blob, `${filename}.csv`)
  } catch (error) {
    console.error("[CSV Export Error]", error)
    throw error
  }
}
