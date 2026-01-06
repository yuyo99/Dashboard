import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from '@/components/ui/chart'
import { Pie, PieChart, Cell } from 'recharts'

interface PieChartCardProps {
  title: string
  description?: string
  data: any[]
  config: ChartConfig
  dataKey: string
  nameKey: string
  showLegend?: boolean
  height?: number
  className?: string
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(221, 83%, 53%)',
]

export function PieChartCard({
  title,
  description,
  data,
  config,
  dataKey,
  nameKey,
  showLegend = true,
  height = 350,
  className,
}: PieChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="w-full" style={{ height: `${height}px` }}>
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name) => {
                    const item = data.find((d) => d[nameKey] === name)
                    return (
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-muted-foreground">{name}</span>
                          <span className="font-mono font-medium">
                            {typeof value === 'number'
                              ? value.toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                                  minimumFractionDigits: 0,
                                })
                              : value}
                          </span>
                        </div>
                        {item?.percentage && (
                          <span className="text-xs text-muted-foreground">
                            {item.percentage}% of total
                          </span>
                        )}
                      </div>
                    )
                  }}
                />
              }
            />
            {showLegend && (
              <ChartLegend
                content={<ChartLegendContent nameKey={nameKey} />}
                verticalAlign="bottom"
              />
            )}
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ percentage }) => `${percentage}%`}
              labelLine={false}
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
