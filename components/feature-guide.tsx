"use client"

export const FEATURE_SUMMARY = {
  totalFeatures: 20,
  categories: {
    core: {
      count: 10,
      features: [
        "Dashboard",
        "Real-Time Alerts",
        "Transaction Search",
        "Risk Scoring",
        "Batch Detection",
        "Anomaly Detection",
        "Model Comparison",
        "Customer Profiles",
        "Report Export",
        "Documentation",
      ],
    },
    advanced: {
      count: 5,
      features: [
        "ML Pipeline Visualizer",
        "Predictive Analytics",
        "Real-Time Monitoring",
        "Advanced Filtering",
        "Compliance Reporting",
      ],
    },
    special: {
      count: 5,
      features: [
        "Smart Alerts",
        "Live Transaction Feed",
        "Intelligence Dashboard",
        "Fraud Prevention Simulator",
        "Team Collaboration Hub",
        "Security Audit",
        "Mobile App Preview",
      ],
    },
  },
  specialties: {
    "Smart Alerts": "AI-powered contextual alerts with automatic action suggestions",
    "Live Transaction Feed": "Real-time transaction streaming with millisecond updates",
    "Intelligence Dashboard": "Advanced analytics with predictive fraud trends",
    "Prevention Simulator": "Interactive testing of fraud scenarios with ensemble predictions",
    "Team Collaboration": "Unified workspace for case management and team discussions",
    "Security Audit": "Comprehensive compliance scanning (AML, KYC, GDPR, OFAC)",
    "Mobile App": "Native iOS/Android app with push notifications and offline mode",
  },
  notifications: {
    features: [
      "Toast notifications on all actions",
      "Smart alert notifications with context",
      "Real-time transaction alerts",
      "Audit completion notifications",
      "Download success/error notifications",
      "Team collaboration notifications",
    ],
  },
  performance: {
    accuracy: "98.7%",
    latency: "12-45ms",
    throughput: "10,500+ tx/hour",
    uptime: "99.99%",
    models: ["Random Forest", "XGBoost", "Neural Network", "Ensemble"],
  },
}
