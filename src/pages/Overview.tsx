import { useMemo, useState } from 'react'
import { DollarSign, CreditCard, ArrowDownToLine, Wallet, Store, TrendingUp } from 'lucide-react'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { DualMetricCard } from '@/components/dashboard/DualMetricCard'
import { AreaChartCard } from '@/components/dashboard/AreaChartCard'
import { PieChartCard } from '@/components/dashboard/PieChartCard'
import { DateRangeSelector, DateRange } from '@/components/dashboard/DateRangeSelector'
import {
  last7DaysMetrics,
  last30DaysMetrics,
  last90DaysMetrics,
  merchantVolumeDistribution,
  totalActiveMerchants,
  formatCurrency,
  formatNumber,
  DailyMetrics,
} from '@/lib/mockData'
import { ChartConfig } from '@/components/ui/chart'

// Seeded random for consistent "previous period" values
// Uses a simple hash of the date range to ensure stability
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generatePreviousPeriodMultiplier(seed: number, index: number): number {
  // Generate a stable multiplier between 0.92 and 1.07 (roughly ±7% variation)
  return 0.92 + seededRandom(seed + index) * 0.15
}

// Calculate totals for a metrics array
function calculateTotals(data: DailyMetrics[]) {
  return {
    grossPaymentVolume: data.reduce((sum, day) => sum + day.grossPaymentVolume, 0),
    grossPaymentCount: data.reduce((sum, day) => sum + day.grossPaymentCount, 0),
    totalPaymentVolume: data.reduce((sum, day) => sum + day.totalPaymentVolume, 0),
    totalPaymentCount: data.reduce((sum, day) => sum + day.totalPaymentCount, 0),
    grossWithdrawalsVolume: data.reduce((sum, day) => sum + day.grossWithdrawalsVolume, 0),
    grossWithdrawalsCount: data.reduce((sum, day) => sum + day.grossWithdrawalsCount, 0),
    totalWithdrawalsVolume: data.reduce((sum, day) => sum + day.totalWithdrawalsVolume, 0),
    totalWithdrawalsCount: data.reduce((sum, day) => sum + day.totalWithdrawalsCount, 0),
  }
}

// Calculate percentage change
function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

// Chart configurations (defined outside component to prevent recreation)
const grossSuccessRateConfig: ChartConfig = {
  grossSuccessRate: {
    label: 'Gross Success Rate',
    color: 'hsl(var(--chart-1))',
  },
}

const netSuccessRateConfig: ChartConfig = {
  netSuccessRate: {
    label: 'Net Success Rate',
    color: 'hsl(var(--chart-2))',
  },
}

const merchantVolumeConfig: ChartConfig = {
  'TechStore Pro': { label: 'TechStore Pro', color: 'hsl(var(--chart-1))' },
  'Fashion Hub': { label: 'Fashion Hub', color: 'hsl(var(--chart-2))' },
  'Electronics World': { label: 'Electronics World', color: 'hsl(var(--chart-3))' },
  'Home Essentials': { label: 'Home Essentials', color: 'hsl(var(--chart-4))' },
  'Sports Gear Co': { label: 'Sports Gear Co', color: 'hsl(var(--chart-5))' },
  Others: { label: 'Others', color: 'hsl(221, 83%, 53%)' },
}

// Data map for quick lookup
const dataByRange: Record<DateRange, DailyMetrics[]> = {
  '7d': last7DaysMetrics,
  '30d': last30DaysMetrics,
  '90d': last90DaysMetrics,
  'custom': last30DaysMetrics, // Default to 30d for custom
}

// Seed map for consistent random values per range
const seedByRange: Record<DateRange, number> = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
  'custom': 30,
}

export function Overview() {
  const [dateRange, setDateRange] = useState<DateRange>('30d')

  // Memoize chart data selection
  const chartData = useMemo(() => dataByRange[dateRange], [dateRange])

  // Memoize current period calculations
  const currentPeriod = useMemo(() => calculateTotals(chartData), [chartData])

  // Memoize previous period calculations with seeded random for stability
  const previousPeriod = useMemo(() => {
    const seed = seedByRange[dateRange]
    return {
      grossPaymentVolume: currentPeriod.grossPaymentVolume * generatePreviousPeriodMultiplier(seed, 1),
      grossPaymentCount: currentPeriod.grossPaymentCount * generatePreviousPeriodMultiplier(seed, 2),
      totalPaymentVolume: currentPeriod.totalPaymentVolume * generatePreviousPeriodMultiplier(seed, 3),
      totalPaymentCount: currentPeriod.totalPaymentCount * generatePreviousPeriodMultiplier(seed, 4),
      grossWithdrawalsVolume: currentPeriod.grossWithdrawalsVolume * generatePreviousPeriodMultiplier(seed, 5),
      grossWithdrawalsCount: currentPeriod.grossWithdrawalsCount * generatePreviousPeriodMultiplier(seed, 6),
      totalWithdrawalsVolume: currentPeriod.totalWithdrawalsVolume * generatePreviousPeriodMultiplier(seed, 7),
      totalWithdrawalsCount: currentPeriod.totalWithdrawalsCount * generatePreviousPeriodMultiplier(seed, 8),
    }
  }, [currentPeriod, dateRange])

  // Memoize percentage changes
  const changes = useMemo(() => ({
    grossPaymentVolumeChange: calculatePercentageChange(currentPeriod.grossPaymentVolume, previousPeriod.grossPaymentVolume),
    grossPaymentCountChange: calculatePercentageChange(currentPeriod.grossPaymentCount, previousPeriod.grossPaymentCount),
    totalPaymentVolumeChange: calculatePercentageChange(currentPeriod.totalPaymentVolume, previousPeriod.totalPaymentVolume),
    totalPaymentCountChange: calculatePercentageChange(currentPeriod.totalPaymentCount, previousPeriod.totalPaymentCount),
    grossWithdrawalsVolumeChange: calculatePercentageChange(currentPeriod.grossWithdrawalsVolume, previousPeriod.grossWithdrawalsVolume),
    grossWithdrawalsCountChange: calculatePercentageChange(currentPeriod.grossWithdrawalsCount, previousPeriod.grossWithdrawalsCount),
    totalWithdrawalsVolumeChange: calculatePercentageChange(currentPeriod.totalWithdrawalsVolume, previousPeriod.totalWithdrawalsVolume),
    totalWithdrawalsCountChange: calculatePercentageChange(currentPeriod.totalWithdrawalsCount, previousPeriod.totalWithdrawalsCount),
  }), [currentPeriod, previousPeriod])

  // Determine trend direction based on amount change
  const getTrend = (change: number): 'up' | 'down' | 'neutral' => {
    if (change > 1) return 'up'
    if (change < -1) return 'down'
    return 'neutral'
  }

  // Get date range label for display
  const getDateRangeLabel = () => {
    switch (dateRange) {
      case '7d': return 'Last 7 days'
      case '30d': return 'Last 30 days'
      case '90d': return 'Last 90 days'
      default: return 'Custom period'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header with Date Range Selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground">
            Monitor your payment processing performance and key metrics
          </p>
        </div>
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>

      {/* Section 1: Volume Metrics - 4 Dual Metric Cards */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Volume Metrics</h3>
          <span className="text-sm text-muted-foreground">({getDateRangeLabel()})</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DualMetricCard
            title="Gross Payment Volume"
            amount={formatCurrency(currentPeriod.grossPaymentVolume)}
            count={formatNumber(currentPeriod.grossPaymentCount)}
            amountChange={changes.grossPaymentVolumeChange}
            countChange={changes.grossPaymentCountChange}
            changeLabel="All payments incl. declines & pending"
            icon={DollarSign}
            trend={getTrend(changes.grossPaymentVolumeChange)}
          />
          <DualMetricCard
            title="Total Payment Volume"
            amount={formatCurrency(currentPeriod.totalPaymentVolume)}
            count={formatNumber(currentPeriod.totalPaymentCount)}
            amountChange={changes.totalPaymentVolumeChange}
            countChange={changes.totalPaymentCountChange}
            changeLabel="SUCCESS payments only"
            icon={CreditCard}
            trend={getTrend(changes.totalPaymentVolumeChange)}
          />
          <DualMetricCard
            title="Gross Withdrawals Volume"
            amount={formatCurrency(currentPeriod.grossWithdrawalsVolume)}
            count={formatNumber(currentPeriod.grossWithdrawalsCount)}
            amountChange={changes.grossWithdrawalsVolumeChange}
            countChange={changes.grossWithdrawalsCountChange}
            changeLabel="All withdrawals incl. rejected & failed"
            icon={ArrowDownToLine}
            trend={getTrend(changes.grossWithdrawalsVolumeChange)}
          />
          <DualMetricCard
            title="Total Withdrawals Volume"
            amount={formatCurrency(currentPeriod.totalWithdrawalsVolume)}
            count={formatNumber(currentPeriod.totalWithdrawalsCount)}
            amountChange={changes.totalWithdrawalsVolumeChange}
            countChange={changes.totalWithdrawalsCountChange}
            changeLabel="PAID_FULL withdrawals only"
            icon={Wallet}
            trend={getTrend(changes.totalWithdrawalsVolumeChange)}
          />
        </div>
      </section>

      {/* Section 2: Success Rate Charts - 2 Area Charts */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Success Rate Analysis</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <AreaChartCard
            title="Gross Success Rate"
            description="Includes hard declines in calculation: successful / all_attempts"
            data={chartData}
            config={grossSuccessRateConfig}
            dataKeys={['grossSuccessRate']}
            xAxisKey="date"
            yAxisFormatter={(value) => `${value.toFixed(0)}%`}
            tooltipFormatter={(value) => `${value.toFixed(2)}%`}
            showLegend={false}
            height={280}
          />
          <AreaChartCard
            title="Net Success Rate"
            description="Excludes hard declines: successful / (all_attempts - hard_declines)"
            data={chartData}
            config={netSuccessRateConfig}
            dataKeys={['netSuccessRate']}
            xAxisKey="date"
            yAxisFormatter={(value) => `${value.toFixed(0)}%`}
            tooltipFormatter={(value) => `${value.toFixed(2)}%`}
            showLegend={false}
            height={280}
          />
        </div>
      </section>

      {/* Section 3: Merchant Metrics */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Store className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Merchant Metrics</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard
            title="Total Active Merchants"
            value={formatNumber(totalActiveMerchants)}
            change={3.2}
            changeLabel="vs last period"
            icon={Store}
            trend="up"
            className="md:col-span-1"
          />
          <PieChartCard
            title="Merchant Volume Distribution"
            description="Share of payment volume across top merchants"
            data={merchantVolumeDistribution}
            config={merchantVolumeConfig}
            dataKey="volume"
            nameKey="name"
            showLegend={true}
            height={280}
            className="md:col-span-2"
          />
        </div>
      </section>
    </div>
  )
}
