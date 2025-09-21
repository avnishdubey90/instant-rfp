"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X, Calendar, DollarSign, Bed, Settings } from "lucide-react"
import Link from "next/link"

interface RoomType {
  id: string
  type: string
  expectedRate: string
}

export default function CreateRFP() {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([{ id: "1", type: "", expectedRate: "" }])

  const addRoomType = () => {
    if (roomTypes.length < 3) {
      setRoomTypes([
        ...roomTypes,
        {
          id: Date.now().toString(),
          type: "",
          expectedRate: "",
        },
      ])
    }
  }

  const removeRoomType = (id: string) => {
    if (roomTypes.length > 1) {
      setRoomTypes(roomTypes.filter((room) => room.id !== id))
    }
  }

  const updateRoomType = (id: string, field: keyof RoomType, value: string) => {
    setRoomTypes(roomTypes.map((room) => (room.id === id ? { ...room, [field]: value } : room)))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/buyer/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Create New RFP</h1>
              <p className="text-sm text-muted-foreground">Set up your hotel procurement request</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form className="space-y-8">
          {/* Basic Information */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <CardTitle>Basic Information</CardTitle>
              </div>
              <CardDescription>Provide the fundamental details for your RFP campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">RFP Title</Label>
                  <Input id="title" placeholder="e.g., Q2 2025 Corporate Travel Program" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxRounds">Max Negotiation Rounds</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select rounds" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Round</SelectItem>
                      <SelectItem value="2">2 Rounds</SelectItem>
                      <SelectItem value="3">3 Rounds</SelectItem>
                      <SelectItem value="4">4 Rounds</SelectItem>
                      <SelectItem value="5">5 Rounds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide additional context about your travel program requirements..."
                  className="bg-background min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Program Start Date</Label>
                  <Input id="startDate" type="date" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Program End Date</Label>
                  <Input id="endDate" type="date" className="bg-background" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rate Configuration */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                <CardTitle>Rate Configuration</CardTitle>
              </div>
              <CardDescription>Configure rate type and availability requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Expected Rate Type</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select rate type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LRA">
                        <div className="flex flex-col items-start">
                          <span className="font-medium">Fixed LRA</span>
                          <span className="text-sm text-muted-foreground">Last Room Availability</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="NLRA">
                        <div className="flex flex-col items-start">
                          <span className="font-medium">Fixed NLRA</span>
                          <span className="text-sm text-muted-foreground">Non-Last Room Availability</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Room Types & Expected Rates */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <div>
                    <CardTitle>Room Types & Expected Rates</CardTitle>
                    <CardDescription>Define room categories and target rates (hidden from suppliers)</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <Bed className="w-3 h-3" />
                  {roomTypes.length}/3 Room Types
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {roomTypes.map((room, index) => (
                <div key={room.id} className="flex items-end gap-4 p-4 border border-border rounded-lg">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`roomType-${room.id}`}>Room Type</Label>
                    <Select value={room.type} onValueChange={(value) => updateRoomType(room.id, "type", value)}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Room</SelectItem>
                        <SelectItem value="deluxe">Deluxe Room</SelectItem>
                        <SelectItem value="suite">Suite</SelectItem>
                        <SelectItem value="executive">Executive Room</SelectItem>
                        <SelectItem value="junior-suite">Junior Suite</SelectItem>
                        <SelectItem value="presidential">Presidential Suite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`expectedRate-${room.id}`}>Expected Rate (USD)</Label>
                    <Input
                      id={`expectedRate-${room.id}`}
                      type="number"
                      placeholder="0.00"
                      value={room.expectedRate}
                      onChange={(e) => updateRoomType(room.id, "expectedRate", e.target.value)}
                      className="bg-background"
                    />
                  </div>

                  {roomTypes.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeRoomType(room.id)}
                      className="mb-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}

              {roomTypes.length < 3 && (
                <Button type="button" variant="outline" onClick={addRoomType} className="w-full gap-2 bg-transparent">
                  <Plus className="w-4 h-4" />
                  Add Room Type
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6">
            <Link href="/buyer/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="outline">Save as Draft</Button>
              <Button type="submit">Publish RFP</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
