import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Hotel, Search, Clock, CheckCircle, MessageSquare, XCircle, BarChart3, FileText } from "lucide-react"
import Link from "next/link"

export default function SupplierDashboard() {
  // Mock data for demonstration
  const availableRfps = [
    {
      id: "rfp-001",
      title: "Q2 2025 Corporate Travel Program",
      buyer: "Global Corp Inc.",
      programStartDate: "2025-04-01",
      programEndDate: "2025-06-30",
      rateType: "LRA",
      roomTypes: ["Standard Room", "Deluxe Room", "Suite"],
      deadline: "2025-01-25",
      status: "open",
    },
    {
      id: "rfp-002",
      title: "European Hotels RFP",
      buyer: "Euro Travel Management",
      programStartDate: "2025-03-15",
      programEndDate: "2025-09-15",
      rateType: "NLRA",
      roomTypes: ["Standard Room", "Executive Room"],
      deadline: "2025-01-30",
      status: "open",
    },
  ]

  const myBids = [
    {
      id: "bid-001",
      rfpId: "rfp-001",
      rfpTitle: "Q2 2025 Corporate Travel Program",
      buyer: "Global Corp Inc.",
      status: "accepted",
      submittedAt: "2025-01-16",
      currentRound: 0,
      lastUpdate: "2025-01-17",
    },
    {
      id: "bid-002",
      rfpId: "rfp-002",
      rfpTitle: "European Hotels RFP",
      buyer: "Euro Travel Management",
      status: "negotiating",
      submittedAt: "2025-01-16",
      currentRound: 1,
      lastUpdate: "2025-01-18",
    },
    {
      id: "bid-003",
      rfpId: "rfp-003",
      rfpTitle: "Asia Pacific Program",
      buyer: "APAC Business Travel",
      status: "submitted",
      submittedAt: "2025-01-17",
      currentRound: 0,
      lastUpdate: "2025-01-17",
    },
  ]

  const stats = [
    { label: "Active Bids", value: "8", icon: FileText, color: "text-blue-500" },
    { label: "Accepted Bids", value: "12", icon: CheckCircle, color: "text-green-500" },
    { label: "Win Rate", value: "73%", icon: BarChart3, color: "text-emerald-500" },
    { label: "Avg Response", value: "4.2h", icon: Clock, color: "text-orange-500" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "text-green-500"
      case "negotiating":
        return "text-orange-500"
      case "submitted":
        return "text-blue-500"
      case "rejected":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return CheckCircle
      case "negotiating":
        return MessageSquare
      case "submitted":
        return Clock
      case "rejected":
        return XCircle
      default:
        return Clock
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Hotel className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Supplier Portal</h1>
                <p className="text-sm text-muted-foreground">Manage your RFP responses</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search RFPs..." className="pl-10 w-64 bg-background" />
              </div>
            </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available RFPs */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Available RFPs</CardTitle>
              <CardDescription>New procurement opportunities from buyers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableRfps.map((rfp) => (
                  <div key={rfp.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{rfp.title}</h3>
                        <p className="text-sm text-muted-foreground">{rfp.buyer}</p>
                      </div>
                      <Badge variant="outline" className="text-green-500">
                        Open
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Program Period</p>
                        <p className="text-foreground">
                          {rfp.programStartDate} - {rfp.programEndDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Rate Type</p>
                        <p className="text-foreground">{rfp.rateType}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground mb-1">Room Types</p>
                      <div className="flex flex-wrap gap-1">
                        {rfp.roomTypes.map((type, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Deadline: {rfp.deadline}</p>
                      <Link href={`/supplier/rfp/${rfp.id}/submit`}>
                        <Button size="sm">Submit Bid</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* My Bids */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>My Bids</CardTitle>
              <CardDescription>Track your submitted bids and negotiations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myBids.map((bid) => {
                  const StatusIcon = getStatusIcon(bid.status)
                  return (
                    <div key={bid.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-foreground mb-1">{bid.rfpTitle}</h3>
                          <p className="text-sm text-muted-foreground">{bid.buyer}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {bid.currentRound > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              Round {bid.currentRound}
                            </Badge>
                          )}
                          <Badge variant="outline" className={`capitalize ${getStatusColor(bid.status)}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {bid.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Submitted</p>
                          <p className="text-foreground">{bid.submittedAt}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Update</p>
                          <p className="text-foreground">{bid.lastUpdate}</p>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Link href={`/supplier/bid/${bid.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
