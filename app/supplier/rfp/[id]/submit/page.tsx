"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, DollarSign, Building2, Bed } from "lucide-react"
import Link from "next/link"

interface RoomRate {
  roomType: string
  rate: string
}

export default function SubmitBid({ params }: { params: { id: string } }) {
  // Mock RFP data
  const rfp = {
    id: params.id,
    title: "Q2 2025 Corporate Travel Program",
    buyer: "Global Corp Inc.",
    description:
      "Comprehensive hotel program for our global corporate travel needs covering major business destinations.",
    programStartDate: "2025-04-01",
    programEndDate: "2025-06-30",
    rateType: "LRA",
    maxNegotiationRounds: 3,
    deadline: "2025-01-25",
    roomTypes: ["Standard Room", "Deluxe Room", "Suite"],
  }

  const [roomRates, setRoomRates] = useState<RoomRate[]>(rfp.roomTypes.map((type) => ({ roomType: type, rate: "" })))

  const updateRate = (roomType: string, rate: string) => {
    setRoomRates((prev) => prev.map((room) => (room.roomType === roomType ? { ...room, rate } : room)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle bid submission
    console.log("Submitting bid:", { rfpId: rfp.id, roomRates })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/supplier/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Submit Bid</h1>
              <p className="text-sm text-muted-foreground">Respond to RFP with your rates</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* RFP Details Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-border sticky top-8">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">RFP Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-1">{rfp.title}</h3>
                  <p className="text-sm text-muted-foreground">{rfp.buyer}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Program Period</p>
                    <p className="text-sm text-foreground">
                      {rfp.programStartDate} - {rfp.programEndDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Rate Type</p>
                    <Badge variant="outline">{rfp.rateType}</Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Max Negotiation Rounds</p>
                    <p className="text-sm text-foreground">{rfp.maxNegotiationRounds}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Submission Deadline</p>
                    <p className="text-sm text-foreground font-medium text-orange-500">{rfp.deadline}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Required Room Types</p>
                  <div className="space-y-1">
                    {rfp.roomTypes.map((type, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Bed className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm text-foreground">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bid Submission Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Room Rates */}
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <CardTitle>Room Rates</CardTitle>
                  </div>
                  <CardDescription>Provide your competitive rates for each room type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {roomRates.map((room, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <Label className="text-sm font-medium text-foreground">{room.roomType}</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">$</span>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={room.rate}
                          onChange={(e) => updateRate(room.roomType, e.target.value)}
                          className="w-24 bg-background"
                          step="0.01"
                          min="0"
                          required
                        />
                        <span className="text-sm text-muted-foreground">per night</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                  <CardDescription>Provide any additional details or special terms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="terms">Special Terms & Conditions</Label>
                      <Textarea
                        id="terms"
                        placeholder="Include any special terms, amenities, or conditions..."
                        className="bg-background min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact">Primary Contact</Label>
                      <Input id="contact" placeholder="Contact person for this bid" className="bg-background" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submission */}
              <div className="flex items-center justify-between pt-6">
                <Link href="/supplier/dashboard">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <div className="flex items-center gap-3">
                  <Button variant="outline" type="button">
                    Save Draft
                  </Button>
                  <Button type="submit">Submit Bid</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
