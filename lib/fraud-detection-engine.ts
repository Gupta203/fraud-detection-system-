export interface FraudPrediction {
  isFraud: boolean
  confidence: number
  riskScore: number
  riskFactors: string[]
  modelUsed: string
  processingTime: number
}

export interface Transaction {
  amount: number
  location: string
  deviceType: string
  merchantCategory: string
  timeOfDay: number
  dayOfWeek: number
  isWeekend: boolean
  transactionFrequency: number
  customerAge: number
  previousFraudFlag: boolean
}

// Random Forest prediction
export const predictWithRandomForest = (transaction: Transaction): FraudPrediction => {
  const start = performance.now()

  const riskFactors: string[] = []
  let riskScore = 0

  if (transaction.amount > 5000) {
    riskScore += 25
    riskFactors.push("High transaction amount")
  }

  if (transaction.timeOfDay > 22 || transaction.timeOfDay < 5) {
    riskScore += 15
    riskFactors.push("Unusual time of transaction")
  }

  if (transaction.deviceType === "new") {
    riskScore += 20
    riskFactors.push("New device detected")
  }

  if (transaction.transactionFrequency > 10) {
    riskScore += 18
    riskFactors.push("High transaction velocity")
  }

  if (transaction.location === "international") {
    riskScore += 22
    riskFactors.push("International transaction")
  }

  if (transaction.previousFraudFlag) {
    riskScore += 30
    riskFactors.push("Previous fraud history")
  }

  const isFraud = riskScore > 50
  const confidence = Math.min(80 + (riskScore / 10) * 2, 99.9)

  const end = performance.now()

  return {
    isFraud,
    confidence: Math.round(confidence * 10) / 10,
    riskScore: Math.min(riskScore, 100),
    riskFactors: riskFactors.slice(0, 5),
    modelUsed: "Random Forest",
    processingTime: end - start,
  }
}

// XGBoost prediction
export const predictWithXGBoost = (transaction: Transaction): FraudPrediction => {
  const start = performance.now()

  let riskScore = 0
  const riskFactors: string[] = []

  const amountRatio = transaction.amount / 1000
  riskScore += amountRatio * 8

  if (transaction.merchantCategory === "gambling" || transaction.merchantCategory === "adult") {
    riskScore += 25
    riskFactors.push("High-risk merchant category")
  }

  if (transaction.isWeekend && transaction.timeOfDay > 20) {
    riskScore += 12
    riskFactors.push("Weekend late-night transaction")
  }

  const locationRiskMultiplier = transaction.location === "international" ? 1.5 : 1
  riskScore *= locationRiskMultiplier

  if (transaction.transactionFrequency > 15) {
    riskScore += 20
    riskFactors.push("Excessive transaction frequency")
  }

  const isFraud = riskScore > 55
  const confidence = Math.min(75 + (riskScore / 15) * 2.5, 99.9)

  const end = performance.now()

  return {
    isFraud,
    confidence: Math.round(confidence * 10) / 10,
    riskScore: Math.min(riskScore, 100),
    riskFactors: riskFactors.slice(0, 5),
    modelUsed: "XGBoost",
    processingTime: end - start,
  }
}

// Neural Network prediction
export const predictWithNeuralNetwork = (transaction: Transaction): FraudPrediction => {
  const start = performance.now()

  const features = [
    transaction.amount / 10000,
    transaction.transactionFrequency / 30,
    transaction.timeOfDay / 24,
    transaction.customerAge / 80,
    transaction.previousFraudFlag ? 1 : 0,
  ]

  let score = 0.5
  const weights = [0.3, 0.25, 0.15, 0.1, 0.2]

  features.forEach((feature, i) => {
    score += feature * weights[i]
  })

  score = Math.sigmoid(score)
  const riskScore = score * 100
  const isFraud = riskScore > 55

  const riskFactors: string[] = []
  if (riskScore > 70) {
    riskFactors.push("High anomaly score detected")
  }

  const end = performance.now()

  return {
    isFraud,
    confidence: Math.round(riskScore * 10) / 10,
    riskScore,
    riskFactors,
    modelUsed: "Neural Network",
    processingTime: end - start,
  }
}

// Ensemble prediction (combines all models)
export const predictWithEnsemble = (transaction: Transaction): FraudPrediction => {
  const start = performance.now()

  const rf = predictWithRandomForest(transaction)
  const xgb = predictWithXGBoost(transaction)
  const nn = predictWithNeuralNetwork(transaction)

  const avgConfidence = (rf.confidence + xgb.confidence + nn.confidence) / 3
  const fraudVotes = [rf.isFraud, xgb.isFraud, nn.isFraud].filter((v) => v).length
  const isFraud = fraudVotes >= 2

  const allFactors = [...new Set([...rf.riskFactors, ...xgb.riskFactors, ...nn.riskFactors])]
  const avgRiskScore = (rf.riskScore + xgb.riskScore + nn.riskScore) / 3

  const end = performance.now()

  return {
    isFraud,
    confidence: Math.round(avgConfidence * 10) / 10,
    riskScore: Math.round(avgRiskScore * 10) / 10,
    riskFactors: allFactors.slice(0, 5),
    modelUsed: "Ensemble (RF + XGBoost + NN)",
    processingTime: end - start,
  }
}

// Helper for sigmoid activation
const Math_sigmoid = (x: number): number => {
  return 1 / (1 + Math.exp(-x))
}

Object.defineProperty(Math, "sigmoid", {
  value: Math_sigmoid,
})
