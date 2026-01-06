import { useState } from 'react'
import { DollarSign, CreditCard, TrendingDown, Store } from 'lucide-react'
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
} from '@/lib/mockData'
import { ChartConfig } from '@/components/ui/chart'

export function Overview() {
  const [dateRange, setDateRange] = useState<DateRange>('30d')

  // Select data based on date range
  const getDataForRange = () => {
    switch (dateRange) {
      case '7d':
        return last7DaysMetrics
      case '30d':
        return last30DaysMetrics
      case '90d':
        return last90DaysMetrics
      default:
        return last30DaysMetrics
    }
  }

  const chartData = getDataForRange()

  // Calculate current period totals
  const currentPeriod = {
    grossPaymentVolume: chartData.reduce((sum, day) => sum + day.grossPaymentVolume, 0),
    grossPaymentCount: chartData.reduce((sum, day) => sum + day.grossPaymentCount, 0),
    totalPaymentVolume: chartData.reduce((sum, day) => sum + day.totalPaymentVolume, 0),
    totalPaymentCount: chartData.reduce((sum, day) => sum + day.totalPaymentCount, 0),
    grossWithdrawalsVolume: chartData.reduce((sum, day) => sum + day.grossWithdrawalsVolume, 0),
    grossWithdrawalsCount: chartData.reduce((sum, day) => sum + day.grossWithdrawalsCount, 0),
    totalWithdrawalsVolume: chartData.reduce((sum, day) => sum + day.totalWithdrawalsVolume, 0),
    totalWithdrawalsCount: chartData.reduce((sum, day) => sum + day.totalWithdrawalsCount, 0),
  }

  // Calculate previous period for comparison (mock - same length period before)
  const previousPeriod = {
    grossPaymentVolume: currentPeriod.grossPaymentVolume * (0.92 + Math.random() * 0.15),
    grossPaymentCount: currentPeriod.grossPaymentCount * (0.92 + Math.random() * 0.15),
    totalPaymentVolume: currentPeriod.totalPaymentVolume * (0.92 + Math.random() * 0.15),
    totalPaymentCount: currentPeriod.totalPaymentCount * (0.92 + Math.random() * 0.15),
    grossWithdrawalsVolume: currentPeriod.grossWithdrawalsVolume * (0.92 + Math.random() * 0.15),
    grossWithdrawalsCount: currentPeriod.grossWithdrawalsCount * (0.92 + Math.random() * 0.15),
    totalWithdrawalsVolume: currentPeriod.totalWithdrawalsVolume * (0.92 + Math.random() * 0.15),
    totalWithdrawalsCount: currentPeriod.totalWithdrawalsCount * (0.92 + Math.random() * 0.15),
  }

  // Calculate percentage changes
  const changes = {
    grossPaymentVolumeChange: ((currentPeriod.grossPaymentVolume - previousPeriod.grossPaymentVolume) / previousPeriod.grossPaymentVolume) * 100,
    grossPaymentCountChange: ((currentPeriod.grossPaymentCount - previousPeriod.grossPaymentCount) / previousPeriod.grossPaymentCount) * 100,
    totalPaymentVolumeChange: ((currentPeriod.totalPaymentVolume - previousPeriod.totalPaymentVolume) / previousPeriod.totalPaymentVolume) * 100,
    totalPaymentCountChange: ((currentPeriod.totalPaymentCount - previousPeriod.totalPaymentCount) / previousPeriod.totalPaymentCount) * 100,
    grossWithdrawalsVolumeChange: ((currentPeriod.grossWithdrawalsVolume - previousPeriod.grossWithdrawalsVolume) / previousPeriod.grossWithdrawalsVolume) * 100,
    grossWithdrawalsCountChange: ((currentPeriod.grossWithdrawalsCount - previousPeriod.grossWithdrawalsCount) / previousPeriod.grossWithdrawalsCount) * 100,
    totalWithdrawalsVolumeChange: ((currentPeriod.totalWithdrawalsVolume - previousPeriod.totalWithdrawalsVolume) / previousPeriod.totalWithdrawalsVolume) * 100,
    totalWithdrawalsCountChange: ((currentPeriod.totalWithdrawalsCount - previousPeriod.totalWithdrawalsCount) / previousPeriod.totalWithdrawalsCount) * 100,
  }

  // Chart configurations
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

  return (
    <div className="space-y-6">
      {/* Header with Date Range Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground">
            Monitor your payment processing performance and key metrics
          </p>
        </div>
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>

      {/* Section 1: Volume Metrics - 4 Dual Metric Cards */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Volume Metrics</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DualMetricCard
            title="Gross Payment Volume"
            amount={formatCurrency(currentPeriod.grossPaymentVolume)}
            count={formatNumber(currentPeriod.grossPaymentCount)}
            amountChange={changes.grossPaymentVolumeChange}
            countChange={changes.grossPaymentCountChange}
            changeLabel="vs last period"
            icon={DollarSign}
            trend={changes.grossPaymentVolumeChange > 0 ? 'up' : 'down'}
          />
          <DualMetricCard
            title="Total Payment Volume"
            amount={formatCurrency(currentPeriod.totalPaymentVolume)}
            count={formatNumber(currentPeriod.totalPaymentCount)}
            amountChange={changes.totalPaymentVolumeChange}
            countChange={changes.totalPaymentCountChange}
            changeLabel="vs last period (SUCCESS only)"
            icon={CreditCard}
            trend={changes.totalPaymentVolumeChange > 0 ? 'up' : 'down'}
          />
          <DualMetricCard
            title="Gross Withdrawals Volume"
            amount={formatCurrency(currentPeriod.grossWithdrawalsVolume)}
            count={formatNumber(currentPeriod.grossWithdrawalsCount)}
            amountChange={changes.grossWithdrawalsVolumeChange}
            countChange={changes.grossWithdrawalsCountChange}
            changeLabel="vs last period"
            icon={TrendingDown}
            trend={changes.grossWithdrawalsVolumeChange > 0 ? 'up' : 'down'}
          />
          <DualMetricCard
            title="Total Withdrawals Volume"
            amount={formatCurrency(currentPeriod.totalWithdrawalsVolume)}
            count={formatNumber(currentPeriod.totalWithdrawalsCount)}
            amountChange={changes.totalWithdrawalsVolumeChange}
            countChange={changes.totalWithdrawalsCountChange}
            changeLabel="vs last period (PAID_FULL only)"
            icon={TrendingDown}
            trend={changes.totalWithdrawalsVolumeChange > 0 ? 'up' : 'down'}
          />
        </div>
      </div>

      {/* Section 2: Success Rate Charts - 2 Area Charts */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Success Rate Analysis</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <AreaChartCard
            title="Gross Success Rate"
            description="Includes hard declines • successful / all_attempts"
            data={chartData}
            config={grossSuccessRateConfig}
            dataKeys={['grossSuccessRate']}
            xAxisKey="date"
            yAxisFormatter={(value) => `${value.toFixed(1)}%`}
            tooltipFormatter={(value) => `${value.toFixed(2)}%`}
            showLegend={false}
            height={300}
          />
          <AreaChartCard
            title="Net Success Rate"
            description="Excludes hard declines • successful / (all_attempts - hard_declines)"
            data={chartData}
            config={netSuccessRateConfig}
            dataKeys={['netSuccessRate']}
            xAxisKey="date"
            yAxisFormatter={(value) => `${value.toFixed(1)}%`}
            tooltipFormatter={(value) => `${value.toFixed(2)}%`}
            showLegend={false}
            height={300}
          />
        </div>
      </div>

      {/* Section 3: Merchant Metrics */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Merchant Metrics</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <MetricCard
            title="Total Active Merchants"
            value={formatNumber(totalActiveMerchants)}
            icon={Store}
            trend="neutral"
          />
          <PieChartCard
            title="Merchant Volume Distribution"
            description="Share of payment volume across merchants"
            data={merchantVolumeDistribution}
            config={merchantVolumeConfig}
            dataKey="volume"
            nameKey="name"
            showLegend={true}
            height={300}
          />
        </div>
      </div>
    </div>
  )
}
