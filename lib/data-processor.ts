export interface StreamedData {
  id: string
  timestamp: Date
  value: number
  status: "active" | "completed" | "failed"
}

// Real-time data streaming simulator
export const createDataStream = (callback: (data: StreamedData) => void, interval = 1000) => {
  let id = 0
  const intervalId = setInterval(() => {
    callback({
      id: `stream-${id++}`,
      timestamp: new Date(),
      value: Math.random() * 100,
      status: "active",
    })
  }, interval)

  return () => clearInterval(intervalId)
}

// Batch process transactions
export const processBatch = async (transactions: any[], batchSize = 100): Promise<Array<any>> => {
  const results = []
  for (let i = 0; i < transactions.length; i += batchSize) {
    const batch = transactions.slice(i, i + batchSize)
    const processed = await Promise.all(batch.map((t) => processTransaction(t)))
    results.push(...processed)
  }
  return results
}

// Process single transaction
const processTransaction = async (transaction: any): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...transaction,
        processed: true,
        timestamp: new Date(),
      })
    }, 10)
  })
}

// Aggregate statistics
export const aggregateStats = (data: any[]): any => {
  return {
    total: data.length,
    average: data.reduce((sum, d) => sum + (d.value || 0), 0) / data.length,
    min: Math.min(...data.map((d) => d.value || 0)),
    max: Math.max(...data.map((d) => d.value || 0)),
  }
}
