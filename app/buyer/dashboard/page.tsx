import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Clock, CheckCircle, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function BuyerDashboard() {
  // Mock data for demonstration
  const rfps = [
    {
      id: "rfp-001",
      title: "Q2 2025 Corporate Travel Program",
      status: "active",
      created: "2025-01-15",
      bids: 12,
      accepted: 8,
      pending: 4,
    },
    {
      id: "rfp-002",
      title: "European Hotels RFP",
      status: "negotiating",
      created: "2025-01-10",
      bids: 8,
      accepted: 3,
      pending: 5,
    },
    {
      id: "rfp-003",
      title: "Asia Pacific Program",
      status: "closed",
      created: "2025-01-05",
      bids: 15,
      accepted: 12,
      pending: 0,
    },
  ]

  const stats = [
    { label: "Active RFPs", value: "12", icon: FileText, color: "text-blue-500" },
    { label: "Total Bids", value: "156", icon: BarChart3, color: "text-green-500" },
    { label: "Avg Response Time", value: "2.4h", icon: Clock, color: "text-orange-500" },
    { label: "Success Rate", value: "87%", icon: CheckCircle, color: "text-emerald-500" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Buyer Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage your RFP portfolio</p>
              </div>
            </div>
            <Link href="/buyer/rfp/create">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create RFP
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* RFPs Table */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Recent RFPs</CardTitle>
            <CardDescription>Track the status and performance of your active RFP campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rfps.map((rfp) => (
                <div key={rfp.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-foreground">{rfp.title}</h3>
                      <Badge
                        variant={
                          rfp.status === "active" ? "default" : rfp.status === "negotiating" ? "secondary" : "outline"
                        }
                        className="capitalize"
                      >
                        {rfp.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Created on {rfp.created}</p>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-medium text-foreground">{rfp.bids}</p>
                      <p className="text-muted-foreground">Total Bids</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-green-500">{rfp.accepted}</p>
                      <p className="text-muted-foreground">Accepted</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-orange-500">{rfp.pending}</p>
                      <p className="text-muted-foreground">Pending</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-6">
                    <Link href={`/buyer/rfp/${rfp.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
