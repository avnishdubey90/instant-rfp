// Type definitions for the autonomous agents system

export interface AgentActivityLog {
  bidId: string
  agentType: "rate_comparison" | "negotiation" | "bid_disposition"
  action: string
  details: Record<string, any>
  timestamp: string
}

export interface RoomRateComparison {
  roomType: string
  supplierRate: number
  expectedRate: number
  difference: number
  percentageDifference: number
  meetsExpectation: boolean
}

export interface BidAnalysisResult {
  bidId: string
  decision: "auto_accept" | "negotiate" | "decline"
  reasoning: string
  rateComparisons: RoomRateComparison[]
  nextAgent: "bid_disposition" | "negotiation" | null
  activityLog: AgentActivityLog
}

export interface NegotiationResult {
  bidId: string
  newRound: number
  negotiationMessage: string
  counterProposal: Array<{ roomType: string; targetRate: number; currentRate: number }>
  status: "negotiation_sent"
  activityLog: AgentActivityLog
}

export interface BidDispositionResult {
  bidId: string
  finalAction: "accept" | "decline"
  acceptedRoomTypes: string[]
  emailSent: boolean
  activityLog: AgentActivityLog
}

export interface BidProcessingWorkflow {
  bidId: string
  rfpId: string
  supplierId: string
  currentStep: "rate_comparison" | "negotiation" | "bid_disposition" | "completed"
  status: "processing" | "completed" | "failed"
  results: {
    rateComparison?: BidAnalysisResult
    negotiation?: NegotiationResult
    bidDisposition?: BidDispositionResult
  }
  error?: string
}
