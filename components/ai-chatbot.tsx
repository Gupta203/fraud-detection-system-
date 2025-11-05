"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, Minimize2, Trash2, Copy, CheckCircle } from "lucide-react"
import { notificationManager } from "@/lib/notification-service"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  status?: "loading" | "success" | "error"
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm FraudShield AI Assistant. I can help you with questions about fraud detection, transaction analysis, model performance, and system features. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const fraudDetectionQuestions = {
    "How does fraud detection work?":
      "Our AI-powered fraud detection system uses multiple machine learning algorithms (Random Forest, XGBoost, Neural Networks, and Ensemble methods) to analyze transaction patterns in real-time. It evaluates over 30 features including transaction amount, merchant type, location, time patterns, and historical behavior to identify suspicious activities with 98.7% accuracy.",

    "What is the risk scoring?":
      "Risk scoring is a numerical assessment (0-100) indicating likelihood of fraud. Higher scores = higher risk. Calculation: transaction amount deviation (25%), merchant risk level (20%), location anomaly (20%), time pattern deviation (15%), historical patterns (15%), device fingerprint (5%).",

    "How to interpret model performance?":
      "Key metrics: Accuracy (98.7% overall correctness), Precision (96.5% true fraud detection), Recall (94.2% fraud coverage), F1-Score (balance), ROC-AUC (0.989 discrimination ability). Higher values indicate better performance.",

    "What should I do with alerts?":
      "For alerts: 1) Review transaction details and risk factors, 2) Verify with customer if needed, 3) Block critical alerts immediately, 4) Document your decision, 5) Update blocklists as needed. Resolve alerts per your SLA.",

    "How do I generate reports?":
      "Go to Report Generation, select type (daily/weekly/monthly), set date range, select sections (transactions, alerts, metrics, model performance), download as PDF or JSON. Reports include fraud statistics and performance metrics.",

    "What is batch detection?":
      "Upload CSV or JSON files with multiple transactions. System analyzes all simultaneously and provides comprehensive report with individual fraud predictions, risk scores, and statistical summary.",

    "How to use the demo?":
      "Enter transaction parameters (amount, location, merchant, device) and click Predict to see real-time ML predictions including fraud probability, confidence score, and risk factors.",

    "What are compliance features?":
      "Coverage includes AML, KYC, PCI-DSS, GDPR, OFAC requirements. Generate compliance reports for audits and maintain audit trails automatically.",

    "How to access customer profiles?":
      "Customer Profiles provide individual risk assessments including behavioral patterns, transaction history, geographic data, device info, and fraud risk scores for personalized risk management.",

    "Can I customize alerts?":
      "Yes! Configure alert thresholds, severity levels, notification channels (email, SMS, in-app), alert types, and custom rules based on your fraud patterns.",
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    const loadingMessage: Message = {
      id: `loading-${Date.now()}`,
      type: "bot",
      content: "Analyzing your question...",
      timestamp: new Date(),
      status: "loading",
    }

    setMessages((prev) => [...prev, loadingMessage])

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const userQuery = inputValue.toLowerCase()
      let botResponse = ""

      const matchedQuestion = Object.entries(fraudDetectionQuestions).find(([question]) =>
        userQuery.includes(question.toLowerCase().split(" ").slice(0, 3).join(" ")),
      )

      if (matchedQuestion) {
        botResponse = matchedQuestion[1]
      } else if (
        userQuery.includes("transaction") &&
        (userQuery.includes("high") || userQuery.includes("suspicious"))
      ) {
        botResponse =
          "High-value transactions typically involve amounts exceeding $5,000 or significant pattern deviations. Review risk factors, verify with customer, and consider geographic location, timing, and merchant type before blocking."
      } else if (userQuery.includes("model") || userQuery.includes("algorithm")) {
        botResponse =
          "Ensemble approach: Random Forest (82%), XGBoost (94%), Neural Networks (89%), Logistic Regression (78%). Combined ensemble achieves 98.7% accuracy. Models retrain weekly with new fraud patterns."
      } else if (userQuery.includes("download") || userQuery.includes("export")) {
        botResponse =
          "Export options: PDF reports (formatted), JSON (raw data), CSV (spreadsheet analysis), batch results. All exports include metadata. Use Report Generation section for this."
      } else if (userQuery.includes("mobile") || userQuery.includes("app")) {
        botResponse =
          "Mobile app (iOS 14+, Android 9+) provides real-time alerts, transaction search, live monitoring, dashboard metrics. Download from Mobile App section. Instant sync with web platform."
      } else if (userQuery.includes("security") || userQuery.includes("safe")) {
        botResponse =
          "Security: 256-bit encryption, secure authentication, role-based access, audit logging, regular audits, PCI-DSS/GDPR compliance. All data encrypted at rest and in transit."
      } else if (userQuery.includes("false positive") || userQuery.includes("accuracy")) {
        botResponse =
          "False positive rate: 2.1%. Adjust sensitivity in Settings to balance detection vs. false positives. Review flagged transactions to improve model continuously."
      } else if (userQuery.includes("team") || userQuery.includes("collaboration")) {
        botResponse =
          "Team Hub enables case discussions, report sharing, coordinated responses, member assignment, and resolution tracking. All communications logged for compliance."
      } else if (userQuery.includes("report") || userQuery.includes("analytics")) {
        botResponse =
          "Analytics show fraud trends, detection rates by category, geographic patterns, model performance. Filter by date, merchant, amount, risk level. Generate comprehensive management reports."
      } else {
        botResponse =
          "Great question! I can help with: fraud mechanics, model performance, alerts, reports, customer profiles, compliance, mobile features, security, or exports. What would you like to know?"
      }

      setMessages((prev) =>
        prev.map((msg) => (msg.id === loadingMessage.id ? { ...msg, status: "success", content: botResponse } : msg)),
      )

      notificationManager.success("Answer Generated", "AI response received successfully")
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                status: "error",
                content: "Error processing your question. Please try again or contact support.",
              }
            : msg,
        ),
      )
      notificationManager.error("Error", "Failed to generate response")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    notificationManager.success("Copied", "Message copied to clipboard")
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        type: "bot",
        content: "Chat cleared! How can I help you now?",
        timestamp: new Date(),
      },
    ])
    notificationManager.success("Chat Cleared", "Conversation history cleared")
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-40 transition-all transform hover:scale-110"
        title="Open AI Chatbot"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 max-h-[600px] bg-card border border-border rounded-lg shadow-2xl z-40 flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <h3 className="font-bold">AI Assistant</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleClearChat}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title="Close"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.type === "user"
                  ? "bg-blue-600 text-white"
                  : `bg-card border border-border text-foreground ${message.status === "loading" ? "opacity-70" : ""}`
              }`}
            >
              <p className="text-sm">{message.content}</p>
              {message.type === "bot" && (
                <div className="flex gap-2 mt-2 text-xs opacity-70">
                  {message.status === "loading" && <span className="animate-pulse">Thinking...</span>}
                  {message.status === "success" && <CheckCircle className="w-3 h-3" />}
                  <button
                    onClick={() => handleCopyMessage(message.id, message.content)}
                    className="hover:opacity-100 transition-opacity"
                  >
                    {copiedId === message.id ? (
                      <CheckCircle className="w-3 h-3 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border p-3 space-y-2">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="bg-input border-border text-sm"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">AI Assistant • Verify information</p>
      </div>
    </div>
  )
}
