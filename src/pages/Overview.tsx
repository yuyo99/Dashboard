import { useState } from 'react'
import { DollarSign, CreditCard, TrendingUp, Activity } from 'lucide-react'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { AreaChartCard } from '@/components/dashboard/AreaChartCard'
import { DateRangeSelector, DateRange } from '@/components/dashboard/DateRangeSelector'
import {
  last7DaysMetrics,
  last30DaysMetrics,
  last90DaysMetrics,
  currentPeriodSummary,
  periodComparison,
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

  // Chart configurations
  const revenueChartConfig: ChartConfig = {
    revenue: {
      label: 'Revenue',
      color: 'hsl(var(--chart-1))',
    },
  }

  const transactionsChartConfig: ChartConfig = {
    transactions: {
      label: 'Total Transactions',
      color: 'hsl(var(--chart-2))',
    },
    failedTransactions: {
      label: 'Failed Transactions',
      color: 'hsl(var(--chart-3))',
    },
  }

  const successRateChartConfig: ChartConfig = {
    successRate: {
      label: 'Success Rate',
      color: 'hsl(var(--chart-1))',
    },
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

      {/* KPI Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(currentPeriodSummary.totalRevenue)}
          change={periodComparison.revenueChange}
          changeLabel="vs last period"
          icon={DollarSign}
          trend={periodComparison.revenueChange > 0 ? 'up' : 'down'}
        />
        <MetricCard
          title="Total Transactions"
          value={formatNumber(currentPeriodSummary.totalTransactions)}
          change={periodComparison.transactionsChange}
          changeLabel="vs last period"
          icon={CreditCard}
          trend={periodComparison.transactionsChange > 0 ? 'up' : 'down'}
        />
        <MetricCard
          title="Success Rate"
          value={`${currentPeriodSummary.avgSuccessRate.toFixed(1)}%`}
          change={periodComparison.successRateChange}
          changeLabel="vs last period"
          icon={TrendingUp}
          trend={periodComparison.successRateChange > 0 ? 'up' : 'down'}
        />
        <MetricCard
          title="Avg Transaction"
          value={formatCurrency(currentPeriodSummary.avgTransactionAmount)}
          change={periodComparison.avgAmountChange}
          changeLabel="vs last period"
          icon={Activity}
          trend={periodComparison.avgAmountChange > 0 ? 'up' : 'down'}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Revenue Over Time */}
        <AreaChartCard
          title="Revenue Trend"
          description="Daily revenue over the selected period"
          data={chartData}
          config={revenueChartConfig}
          dataKeys={['revenue']}
          xAxisKey="date"
          yAxisFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          tooltipFormatter={(value) => formatCurrency(value)}
          showLegend={false}
          height={300}
        />

        {/* Success Rate Over Time */}
        <AreaChartCard
          title="Success Rate Trend"
          description="Payment success rate over the selected period"
          data={chartData}
          config={successRateChartConfig}
          dataKeys={['successRate']}
          xAxisKey="date"
          yAxisFormatter={(value) => `${value.toFixed(0)}%`}
          tooltipFormatter={(value) => `${value.toFixed(2)}%`}
          showLegend={false}
          height={300}
        />
      </div>

      {/* Transaction Volume Chart - Full Width */}
      <AreaChartCard
        title="Transaction Volume"
        description="Total and failed transactions over the selected period"
        data={chartData}
        config={transactionsChartConfig}
        dataKeys={['transactions', 'failedTransactions']}
        xAxisKey="date"
        yAxisFormatter={(value) => formatNumber(value)}
        tooltipFormatter={(value) => formatNumber(value)}
        showLegend={true}
        height={350}
      />
    </div>
  )
}
