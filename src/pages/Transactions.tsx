import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Download } from 'lucide-react'
import { recentTransactions, Transaction } from '@/lib/mockData'

const getStatusVariant = (status: Transaction['status']) => {
  switch (status) {
    case 'success':
      return 'default'
    case 'failed':
      return 'destructive'
    case 'pending':
      return 'secondary'
    default:
      return 'outline'
  }
}

const getStatusLabel = (status: Transaction['status']) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

export function Transactions() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTransactions = recentTransactions.filter(
    (txn) =>
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.merchant.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground">
            View and manage all payment transactions
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by transaction ID or merchant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left font-medium">Transaction ID</th>
                  <th className="pb-3 text-left font-medium">Merchant</th>
                  <th className="pb-3 text-left font-medium">Amount</th>
                  <th className="pb-3 text-left font-medium">Payment Method</th>
                  <th className="pb-3 text-left font-medium">Status</th>
                  <th className="pb-3 text-left font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="border-b last:border-0">
                    <td className="py-3 font-mono text-xs">{txn.id}</td>
                    <td className="py-3">{txn.merchant}</td>
                    <td className="py-3 font-semibold">
                      ${txn.amount.toFixed(2)}
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {txn.paymentMethod}
                    </td>
                    <td className="py-3">
                      <Badge variant={getStatusVariant(txn.status)}>
                        {getStatusLabel(txn.status)}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {new Date(txn.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
