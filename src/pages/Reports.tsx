import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download, Calendar } from 'lucide-react'

export function Reports() {
  const reportTypes = [
    {
      title: 'Revenue Report',
      description: 'Detailed breakdown of revenue by period, merchant, and payment method',
      icon: FileText,
    },
    {
      title: 'Transaction Summary',
      description: 'Comprehensive transaction statistics and success rates',
      icon: FileText,
    },
    {
      title: 'Monthly Statement',
      description: 'Monthly financial statement with all payment activities',
      icon: Calendar,
    },
    {
      title: 'Merchant Analytics',
      description: 'Performance metrics for individual merchants',
      icon: FileText,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">
          Generate and download detailed payment reports
        </p>
      </div>

      {/* Report Types Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {reportTypes.map((report, index) => (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <report.icon className="h-5 w-5" />
                    {report.title}
                  </CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="default" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle>Report Settings</CardTitle>
          <CardDescription>
            Configure default settings for report generation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <h4 className="mb-2 font-semibold">Scheduled Reports</h4>
            <p className="mb-4 text-sm text-muted-foreground">
              Automatically generate and email reports on a schedule
            </p>
            <Button variant="outline">Configure Schedule</Button>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="mb-2 font-semibold">Export Preferences</h4>
            <p className="mb-4 text-sm text-muted-foreground">
              Set default format and recipients for report exports
            </p>
            <Button variant="outline">Manage Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
