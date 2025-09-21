import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function RFPDetails({ params }: { params: { id: string } }) {
  // Mock data for demonstration
  const rfp = {
    id: params.id,
    title: "Q2 2025 Corporate Travel Program",
    description:
      "Comprehensive hotel program for our global corporate travel needs covering major business destinations.",
    status: "active",
    programStartDate: "2025-04-01",
    programEndDate: "2025-06-30",
    rateType: "LRA",
    maxNegotiationRounds: 3,
    created: "2025-01-15",
    roomTypes: [
      { type: "Standard Room", expectedRate: 150 },
      { type: "Deluxe Room", expectedRate: 200 },
      { type: "Suite", expectedRate: 350 },
    ],
  }

  const bids = [
    {
      id: "bid-001",
      supplier: "Marriott International",
      status: "accepted",
      submittedAt: "2025-01-16T10:30:00Z",
      currentRound: 0,
      rates: [
        { roomType: "Standard Room", rate: 145 },
        { roomType: "Deluxe Room", rate: 195 },
        { roomType: "Suite", rate: 340 },
      ],
    },
    {
      id: "bid-002",
      supplier: "Hilton Worldwide",
      status: "negotiating",
      submittedAt: "2025-01-16T14:15:00Z",
      currentRound: 1,
      rates: [
        { roomType: "Standard Room", rate: 160 },
        { roomType: "Deluxe Room", rate: 210 },
        { roomType: "Suite", rate: 370 },
      ],
    },
    {
      id: "bid-003",
      supplier: "Hyatt Hotels",
      status: "submitted",
      submittedAt: "2025-01-17T09:45:00Z",
      currentRound: 0,
      rates: [
        { roomType: "Standard Room", rate: 155 },
        { roomType: "Deluxe Room", rate: 205 },
        { roomType: "Suite", rate: 360 },
      ],
    },
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
            <div className="flex items-center gap-4">
              <Link href="/buyer/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-xl font-semibold text-foreground">{rfp.title}</h1>
                  <Badge variant={rfp.status === "active" ? "default" : "secondary"} className="capitalize">
                    {rfp.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">RFP ID: {rfp.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">Export Report</Button>
              <Button>Manage RFP</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bids">Bids & Negotiations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* RFP Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <CardTitle>Program Details</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="text-foreground">{rfp.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="text-foreground">{rfp.programStartDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="text-foreground">{rfp.programEndDate}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Rate Type</p>
                      <p className="text-foreground">{rfp.rateType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Max Rounds</p>
                      <p className="text-foreground">{rfp.maxNegotiationRounds}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <CardTitle>Room Types & Target Rates</CardTitle>
                  </div>
                  <CardDescription>Internal target rates (hidden from suppliers)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rfp.roomTypes.map((room, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-border rounded-lg"
                      >
                        <span className="text-foreground">{room.type}</span>
                        <span className="font-medium text-foreground">${room.expectedRate}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Bids</p>
                      <p className="text-2xl font-bold text-foreground">{bids.length}</p>
                    </div>
                    <Building2 className="w-6 h-6 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Accepted</p>
                      <p className="text-2xl font-bold text-green-500">
                        {bids.filter((b) => b.status === "accepted").length}
                      </p>
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Negotiating</p>
                      <p className="text-2xl font-bold text-orange-500">
                        {bids.filter((b) => b.status === "negotiating").length}
                      </p>
                    </div>
                    <MessageSquare className="w-6 h-6 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold text-blue-500">
                        {bids.filter((b) => b.status === "submitted").length}
                      </p>
                    </div>
                    <Clock className="w-6 h-6 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bids" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Supplier Bids</CardTitle>
                <CardDescription>Track all supplier submissions and negotiation progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bids.map((bid) => {
                    const StatusIcon = getStatusIcon(bid.status)
                    return (
                      <div key={bid.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <h3 className="font-medium text-foreground">{bid.supplier}</h3>
                            <Badge variant="outline" className={`capitalize ${getStatusColor(bid.status)}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {bid.status}
                            </Badge>
                            {bid.currentRound > 0 && <Badge variant="secondary">Round {bid.currentRound}</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(bid.submittedAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {bid.rates.map((rate, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <span className="text-sm text-muted-foreground">{rate.roomType}</span>
                              <span className="font-medium text-foreground">${rate.rate}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>RFP Analytics</CardTitle>
                <CardDescription>Performance insights and market analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Analytics dashboard coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
