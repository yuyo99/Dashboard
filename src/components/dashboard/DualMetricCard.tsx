import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface DualMetricCardProps {
  title: string
  amount: string | number
  count: string | number
  amountChange?: number
  countChange?: number
  changeLabel?: string
  icon?: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function DualMetricCard({
  title,
  amount,
  count,
  amountChange,
  countChange,
  changeLabel,
  icon: Icon,
  trend = 'neutral',
  className,
}: DualMetricCardProps) {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600 dark:text-green-400'
    if (trend === 'down') return 'text-red-600 dark:text-red-400'
    return 'text-muted-foreground'
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    if (change < 0) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  }

  return (
    <Card className={cn('transition-all hover:shadow-md', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className={cn('h-4 w-4', getTrendColor())} />
        )}
      </CardHeader>
      <CardContent>
        {/* Amount */}
        <div className="mb-3">
          <div className="text-2xl font-bold">{amount}</div>
          {amountChange !== undefined && (
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="outline" className={cn('text-xs', getChangeColor(amountChange))}>
                {amountChange >= 0 ? '+' : ''}{amountChange.toFixed(1)}%
              </Badge>
              <span className="text-xs text-muted-foreground">amount</span>
            </div>
          )}
        </div>

        {/* Count */}
        <div className="border-t pt-3">
          <div className="text-xl font-semibold text-muted-foreground">{count}</div>
          {countChange !== undefined && (
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="outline" className={cn('text-xs', getChangeColor(countChange))}>
                {countChange >= 0 ? '+' : ''}{countChange.toFixed(1)}%
              </Badge>
              <span className="text-xs text-muted-foreground">count</span>
            </div>
          )}
        </div>

        {changeLabel && (
          <div className="mt-2 text-xs text-muted-foreground">{changeLabel}</div>
        )}
      </CardContent>
    </Card>
  )
}
