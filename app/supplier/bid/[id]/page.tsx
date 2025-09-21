import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, DollarSign, MessageSquare, Clock, CheckCircle, Building2, History } from "lucide-react"
import Link from "next/link"

export default function BidDetails({ params }: { params: { id: string } }) {
  // Mock bid data
  const bid = {
    id: params.id,
    rfpId: "rfp-001",
    rfpTitle: "Q2 2025 Corporate Travel Program",
    buyer: "Global Corp Inc.",
    status: "negotiating",
    currentRound: 1,
    maxRounds: 3,
    submittedAt: "2025-01-16T10:30:00Z",
    lastUpdate: "2025-01-18T14:20:00Z",
    rates: [
      { roomType: "Standard Room", rate: 160, originalRate: 165 },
      { roomType: "Deluxe Room", rate: 210, originalRate: 220 },
      { roomType: "Suite", rate: 370, originalRate: 380 },
    ],
    negotiationHistory: [
      {
        round: 0,
        timestamp: "2025-01-16T10:30:00Z",
        action: "Initial Submission",
        rates: [
          { roomType: "Standard Room", rate: 165 },
          { roomType: "Deluxe Room", rate: 220 },
          { roomType: "Suite", rate: 380 },
        ],
      },
      {
        round: 1,
        timestamp: "2025-01-17T09:15:00Z",
        action: "Negotiation Request",
        message: "Rates are above expected range. Please consider reducing by 5-8%.",
      },
      {
        round: 1,
        timestamp: "2025-01-18T14:20:00Z",
        action: "Counter Proposal",
        rates: [
          { roomType: "Standard Room", rate: 160 },
          { roomType: "Deluxe Room", rate: 210 },
          { roomType: "Suite", rate: 370 },
        ],
      },
    ],
  }

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
      default:
        return Clock
    }
  }

  const StatusIcon = getStatusIcon(bid.status)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/supplier/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-xl font-semibold text-foreground">{bid.rfpTitle}</h1>
                  <Badge variant="outline" className={`capitalize ${getStatusColor(bid.status)}`}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {bid.status}
                  </Badge>
                  {bid.currentRound > 0 && (
                    <Badge variant="secondary">
                      Round {bid.currentRound}/{bid.maxRounds}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Bid ID: {bid.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {bid.status === "negotiating" && <Button>Update Bid</Button>}
              <Button variant="outline">Export Details</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rates">Current Rates</TabsTrigger>
            <TabsTrigger value="history">Negotiation History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bid Summary */}
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    <CardTitle>Bid Summary</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Buyer</p>
                    <p className="text-foreground font-medium">{bid.buyer}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="text-foreground">{new Date(bid.submittedAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Update</p>
                      <p className="text-foreground">{new Date(bid.lastUpdate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Round</p>
                      <p className="text-foreground">
                        {bid.currentRound}/{bid.maxRounds}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant="outline" className={`capitalize ${getStatusColor(bid.status)}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {bid.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rate Summary */}
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <CardTitle>Rate Summary</CardTitle>
                  </div>
                  <CardDescription>Current rates in negotiation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bid.rates.map((rate, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-border rounded-lg"
                      >
                        <span className="text-foreground">{rate.roomType}</span>
                        <div className="flex items-center gap-2">
                          {rate.originalRate && rate.originalRate !== rate.rate && (
                            <span className="text-sm text-muted-foreground line-through">${rate.originalRate}</span>
                          )}
                          <span className="font-medium text-foreground">${rate.rate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Status Timeline */}
            {bid.status === "negotiating" && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Negotiation Status</CardTitle>
                  <CardDescription>
                    Your bid is currently under negotiation. The buyer has requested rate adjustments.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-orange-500" />
                    <div className="flex-1">
                      <p className="text-foreground font-medium">Action Required</p>
                      <p className="text-sm text-muted-foreground">
                        Please review the negotiation request and submit updated rates.
                      </p>
                    </div>
                    <Button>Update Rates</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="rates" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Current Room Rates</CardTitle>
                <CardDescription>Your latest submitted rates for this RFP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bid.rates.map((rate, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{rate.roomType}</p>
                          <p className="text-sm text-muted-foreground">Per night rate</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">${rate.rate}</p>
                        {rate.originalRate && rate.originalRate !== rate.rate && (
                          <p className="text-sm text-muted-foreground line-through">Originally ${rate.originalRate}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  <CardTitle>Negotiation Timeline</CardTitle>
                </div>
                <CardDescription>Complete history of all bid submissions and negotiations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {bid.negotiationHistory.map((entry, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          {entry.action === "Initial Submission" && <CheckCircle className="w-5 h-5 text-green-500" />}
                          {entry.action === "Negotiation Request" && (
                            <MessageSquare className="w-5 h-5 text-orange-500" />
                          )}
                          {entry.action === "Counter Proposal" && <DollarSign className="w-5 h-5 text-blue-500" />}
                        </div>
                        {index < bid.negotiationHistory.length - 1 && <div className="w-px h-12 bg-border mt-2"></div>}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-foreground">{entry.action}</h3>
                          {entry.round > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              Round {entry.round}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {new Date(entry.timestamp).toLocaleString()}
                        </p>

                        {entry.message && (
                          <div className="p-3 bg-muted/50 rounded-lg mb-3">
                            <p className="text-sm text-foreground">{entry.message}</p>
                          </div>
                        )}

                        {entry.rates && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {entry.rates.map((rate, rateIndex) => (
                              <div key={rateIndex} className="text-sm p-2 bg-muted/30 rounded">
                                <p className="text-muted-foreground">{rate.roomType}</p>
                                <p className="font-medium text-foreground">${rate.rate}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
