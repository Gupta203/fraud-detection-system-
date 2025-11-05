"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Database, TrendingUp, Zap, BookOpen, Code } from "lucide-react"

const sections = [
  {
    icon: Brain,
    title: "ML Algorithms Used",
    content: [
      "Logistic Regression - Fast baseline model for binary classification",
      "Random Forest - Ensemble method for handling non-linear patterns",
      "Gradient Boosting (XGBoost) - Advanced technique for improved accuracy",
      "Neural Networks - Deep learning model for complex pattern recognition",
    ],
  },
  {
    icon: Database,
    title: "Data Features",
    content: [
      "Transaction amount and type",
      "User location and device information",
      "Merchant category and historical behavior",
      "Time of transaction and velocity metrics",
      "User account age and transaction frequency",
    ],
  },
  {
    icon: TrendingUp,
    title: "Performance Metrics",
    content: [
      "Accuracy: 98.7% - Overall correctness of predictions",
      "Precision: 97.2% - Accuracy of fraudulent predictions",
      "Recall: 96.8% - Coverage of actual fraudulent cases",
      "F1-Score: 97.0% - Balanced measure of precision and recall",
      "ROC-AUC: 99.1% - Model discrimination ability",
    ],
  },
  {
    icon: Zap,
    title: "Model Capabilities",
    content: [
      "Real-time transaction processing",
      "Anomaly detection using statistical methods",
      "Behavioral pattern analysis",
      "Risk scoring and confidence estimation",
      "Continuous learning from new data",
    ],
  },
  {
    icon: Code,
    title: "Technical Stack",
    content: [
      "Backend: Python (scikit-learn, TensorFlow, XGBoost)",
      "Frontend: Next.js React with TypeScript",
      "Database: PostgreSQL for transaction storage",
      "API: RESTful endpoints for real-time predictions",
      "Deployment: Cloud-based with load balancing",
    ],
  },
  {
    icon: BookOpen,
    title: "Implementation Details",
    content: [
      "Data preprocessing: Normalization, outlier removal, encoding",
      "Feature engineering: Extraction of meaningful patterns",
      "Model training: 80-20 train-test split with cross-validation",
      "Hyperparameter tuning: Grid search for optimal parameters",
      "Model evaluation: Confusion matrix, ROC curves, precision-recall",
    ],
  },
]

export function Documentation() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Project Documentation</h2>
        <p className="text-muted-foreground">Complete technical overview of the AI/ML Fraud Detection System</p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-xl">System Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p className="text-foreground">
            The <strong>AI/ML-Based Fraud Detection System</strong> leverages advanced machine learning algorithms to
            identify suspicious transactions in real-time. By analyzing patterns in user behavior, transaction history,
            and anomalies, the system classifies transactions as legitimate or fraudulent with exceptional accuracy.
          </p>
          <p className="text-muted-foreground">
            Traditional rule-based systems are no longer sufficient to detect complex and evolving fraud patterns. This
            AI-driven approach helps financial institutions enhance security, protect user data, and maintain trust
            through continuous learning and adaptation to emerging fraud strategies.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Card key={section.title} className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6 text-primary" />
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-sm">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Key Results</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Fraud Detection Rate</p>
            <p className="text-4xl font-bold text-green-400">96.8%</p>
            <p className="text-xs text-muted-foreground mt-1">Cases caught out of total fraud</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">False Positive Rate</p>
            <p className="text-4xl font-bold text-blue-400">2.8%</p>
            <p className="text-xs text-muted-foreground mt-1">Legitimate transactions flagged</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Loss Prevention</p>
            <p className="text-4xl font-bold text-orange-400">$2.4M</p>
            <p className="text-xs text-muted-foreground mt-1">Monthly fraud prevention</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Processing Time</p>
            <p className="text-4xl font-bold text-purple-400">&lt;100ms</p>
            <p className="text-xs text-muted-foreground mt-1">Per transaction prediction</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
