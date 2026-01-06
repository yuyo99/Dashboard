import { useState } from 'react'
import { AreaChartCard } from '@/components/dashboard/AreaChartCard'
import { DateRangeSelector, DateRange } from '@/components/dashboard/DateRangeSelector'
import {
  last7DaysMetrics,
  last30DaysMetrics,
  last90DaysMetrics,
  formatCurrency,
  formatNumber,
} from '@/lib/mockData'
import { ChartConfig } from '@/components/ui/chart'

export function Trends() {
  const [dateRange, setDateRange] = useState<DateRange>('30d')

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
  const volumeAnalysisConfig: ChartConfig = {
    transactions: {
      label: 'Successful',
      color: 'hsl(var(--chart-1))',
    },
    failedTransactions: {
      label: 'Failed',
      color: 'hsl(var(--chart-5))',
    },
  }

  const revenueConfig: ChartConfig = {
    revenue: {
      label: 'Revenue',
      color: 'hsl(var(--chart-1))',
    },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Trends</h2>
          <p className="text-muted-foreground">
            Analyze payment trends and patterns over time
          </p>
        </div>
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>

      {/* Charts Grid - 2 columns */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Revenue Trend */}
        <AreaChartCard
          title="Revenue Growth"
          description="Track revenue performance over time"
          data={chartData}
          config={revenueConfig}
          dataKeys={['revenue']}
          xAxisKey="date"
          yAxisFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          tooltipFormatter={(value) => formatCurrency(value)}
          showLegend={false}
          height={320}
        />

        {/* Transaction Volume Analysis */}
        <AreaChartCard
          title="Transaction Volume Analysis"
          description="Compare successful vs failed transactions"
          data={chartData}
          config={volumeAnalysisConfig}
          dataKeys={['transactions', 'failedTransactions']}
          xAxisKey="date"
          yAxisFormatter={(value) => formatNumber(value)}
          tooltipFormatter={(value) => formatNumber(value)}
          showLegend={true}
          height={320}
        />
      </div>

      {/* Full-width charts */}
      <div className="space-y-4">
        {/* Average Transaction Amount Trend */}
        <AreaChartCard
          title="Average Transaction Amount Trend"
          description="Monitor the average value of transactions over time"
          data={chartData}
          config={{ avgTransactionAmount: { label: 'Avg Amount', color: 'hsl(var(--chart-3))' } }}
          dataKeys={['avgTransactionAmount']}
          xAxisKey="date"
          yAxisFormatter={(value) => `$${value.toFixed(0)}`}
          tooltipFormatter={(value) => formatCurrency(value)}
          showLegend={false}
          height={300}
        />

        {/* Success Rate Trend */}
        <AreaChartCard
          title="Payment Success Rate"
          description="Track the percentage of successful payments"
          data={chartData}
          config={{ successRate: { label: 'Success Rate', color: 'hsl(var(--chart-1))' } }}
          dataKeys={['successRate']}
          xAxisKey="date"
          yAxisFormatter={(value) => `${value.toFixed(0)}%`}
          tooltipFormatter={(value) => `${value.toFixed(2)}%`}
          showLegend={false}
          height={300}
        />
      </div>
    </div>
  )
}
