import { subDays, format } from 'date-fns'

// Types for our payment metrics data
export interface DailyMetrics {
  date: string
  revenue: number
  transactions: number
  successRate: number
  avgTransactionAmount: number
  failedTransactions: number
  // New metrics for optimized overview
  grossPaymentVolume: number
  grossPaymentCount: number
  totalPaymentVolume: number
  totalPaymentCount: number
  grossWithdrawalsVolume: number
  grossWithdrawalsCount: number
  totalWithdrawalsVolume: number
  totalWithdrawalsCount: number
  grossSuccessRate: number
  netSuccessRate: number
  allAttempts: number
  successfulAttempts: number
  hardDeclines: number
}

export interface MerchantVolumeShare {
  name: string
  volume: number
  percentage: number
}

export interface PaymentMethod {
  method: string
  count: number
  percentage: number
}

export interface TopMerchant {
  name: string
  revenue: number
  transactions: number
}

// Generate mock time-series data for the last N days
export const generateDailyMetrics = (days: number = 30): DailyMetrics[] => {
  const data: DailyMetrics[] = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(today, i)
    const baseRevenue = 45000 + Math.random() * 25000
    const baseTransactions = 800 + Math.random() * 400
    const successRate = 92 + Math.random() * 7
    const failedCount = Math.floor(baseTransactions * (1 - successRate / 100))

    // Generate new payment volume metrics
    const grossPaymentCount = Math.floor(1200 + Math.random() * 600)
    const totalPaymentCount = Math.floor(grossPaymentCount * (0.85 + Math.random() * 0.12)) // 85-97% success
    const grossPaymentVolume = Math.floor(grossPaymentCount * (150 + Math.random() * 100))
    const totalPaymentVolume = Math.floor(totalPaymentCount * (150 + Math.random() * 100))

    // Generate withdrawal metrics
    const grossWithdrawalsCount = Math.floor(300 + Math.random() * 200)
    const totalWithdrawalsCount = Math.floor(grossWithdrawalsCount * (0.88 + Math.random() * 0.10)) // 88-98% success
    const grossWithdrawalsVolume = Math.floor(grossWithdrawalsCount * (200 + Math.random() * 150))
    const totalWithdrawalsVolume = Math.floor(totalWithdrawalsCount * (200 + Math.random() * 150))

    // Generate success rate metrics
    const allAttempts = grossPaymentCount
    const successfulAttempts = totalPaymentCount
    const hardDeclines = Math.floor(allAttempts * (0.03 + Math.random() * 0.02)) // 3-5% hard declines
    const grossSuccessRate = (successfulAttempts / allAttempts) * 100
    const netSuccessRate = (successfulAttempts / (allAttempts - hardDeclines)) * 100

    data.push({
      date: format(date, 'yyyy-MM-dd'),
      revenue: Math.floor(baseRevenue),
      transactions: Math.floor(baseTransactions),
      successRate: Math.floor(successRate * 100) / 100,
      avgTransactionAmount: Math.floor(baseRevenue / baseTransactions * 100) / 100,
      failedTransactions: failedCount,
      // New metrics
      grossPaymentVolume,
      grossPaymentCount,
      totalPaymentVolume,
      totalPaymentCount,
      grossWithdrawalsVolume,
      grossWithdrawalsCount,
      totalWithdrawalsVolume,
      totalWithdrawalsCount,
      grossSuccessRate: Math.floor(grossSuccessRate * 100) / 100,
      netSuccessRate: Math.floor(netSuccessRate * 100) / 100,
      allAttempts,
      successfulAttempts,
      hardDeclines,
    })
  }

  return data
}

// Mock data for 7 days
export const last7DaysMetrics = generateDailyMetrics(7)

// Mock data for 30 days
export const last30DaysMetrics = generateDailyMetrics(30)

// Mock data for 90 days
export const last90DaysMetrics = generateDailyMetrics(90)

// Current period summary (last 30 days)
export const currentPeriodSummary = {
  totalRevenue: last30DaysMetrics.reduce((sum, day) => sum + day.revenue, 0),
  totalTransactions: last30DaysMetrics.reduce((sum, day) => sum + day.transactions, 0),
  avgSuccessRate: last30DaysMetrics.reduce((sum, day) => sum + day.successRate, 0) / last30DaysMetrics.length,
  avgTransactionAmount: last30DaysMetrics.reduce((sum, day) => sum + day.avgTransactionAmount, 0) / last30DaysMetrics.length,
}

// Previous period for comparison (30 days before current period)
const previous30DaysMetrics = generateDailyMetrics(60).slice(0, 30)
export const previousPeriodSummary = {
  totalRevenue: previous30DaysMetrics.reduce((sum, day) => sum + day.revenue, 0),
  totalTransactions: previous30DaysMetrics.reduce((sum, day) => sum + day.transactions, 0),
  avgSuccessRate: previous30DaysMetrics.reduce((sum, day) => sum + day.successRate, 0) / previous30DaysMetrics.length,
  avgTransactionAmount: previous30DaysMetrics.reduce((sum, day) => sum + day.avgTransactionAmount, 0) / previous30DaysMetrics.length,
}

// Calculate percentage changes
export const periodComparison = {
  revenueChange: ((currentPeriodSummary.totalRevenue - previousPeriodSummary.totalRevenue) / previousPeriodSummary.totalRevenue) * 100,
  transactionsChange: ((currentPeriodSummary.totalTransactions - previousPeriodSummary.totalTransactions) / previousPeriodSummary.totalTransactions) * 100,
  successRateChange: currentPeriodSummary.avgSuccessRate - previousPeriodSummary.avgSuccessRate,
  avgAmountChange: ((currentPeriodSummary.avgTransactionAmount - previousPeriodSummary.avgTransactionAmount) / previousPeriodSummary.avgTransactionAmount) * 100,
}

// Mock payment methods distribution
export const paymentMethods: PaymentMethod[] = [
  { method: 'Credit Card', count: 18420, percentage: 52.3 },
  { method: 'Debit Card', count: 10234, percentage: 29.1 },
  { method: 'Bank Transfer', count: 4521, percentage: 12.8 },
  { method: 'Digital Wallet', count: 2045, percentage: 5.8 },
]

// Mock top merchants
export const topMerchants: TopMerchant[] = [
  { name: 'TechStore Pro', revenue: 234500, transactions: 3421 },
  { name: 'Fashion Hub', revenue: 198300, transactions: 5234 },
  { name: 'Electronics World', revenue: 187600, transactions: 2987 },
  { name: 'Home Essentials', revenue: 156700, transactions: 4123 },
  { name: 'Sports Gear Co', revenue: 142300, transactions: 3456 },
]

// Mock merchant volume distribution for pie chart
export const merchantVolumeDistribution: MerchantVolumeShare[] = [
  { name: 'TechStore Pro', volume: 5234500, percentage: 28.5 },
  { name: 'Fashion Hub', volume: 4198300, percentage: 22.8 },
  { name: 'Electronics World', volume: 3187600, percentage: 17.3 },
  { name: 'Home Essentials', volume: 2756700, percentage: 15.0 },
  { name: 'Sports Gear Co', volume: 2142300, percentage: 11.6 },
  { name: 'Others', volume: 898600, percentage: 4.8 },
]

// Total active merchants
export const totalActiveMerchants = 247

// Recent transactions (mock)
export interface Transaction {
  id: string
  merchant: string
  amount: number
  status: 'success' | 'failed' | 'pending'
  paymentMethod: string
  timestamp: string
}

export const recentTransactions: Transaction[] = [
  {
    id: 'TXN-2024-00123',
    merchant: 'TechStore Pro',
    amount: 299.99,
    status: 'success',
    paymentMethod: 'Credit Card',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'TXN-2024-00122',
    merchant: 'Fashion Hub',
    amount: 89.50,
    status: 'success',
    paymentMethod: 'Debit Card',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 'TXN-2024-00121',
    merchant: 'Electronics World',
    amount: 1299.00,
    status: 'pending',
    paymentMethod: 'Bank Transfer',
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
  {
    id: 'TXN-2024-00120',
    merchant: 'Home Essentials',
    amount: 45.00,
    status: 'failed',
    paymentMethod: 'Credit Card',
    timestamp: new Date(Date.now() - 1000 * 60 * 23).toISOString(),
  },
  {
    id: 'TXN-2024-00119',
    merchant: 'Sports Gear Co',
    amount: 156.75,
    status: 'success',
    paymentMethod: 'Digital Wallet',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
]

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Helper function to format percentage
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`
}

// Helper function to format numbers with commas
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num)
}
