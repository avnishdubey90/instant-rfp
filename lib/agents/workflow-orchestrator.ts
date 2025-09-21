import { RateComparisonAgent } from "./rate-comparison-agent"
import { NegotiationAgent } from "./negotiation-agent"
import { BidDispositionAgent } from "./bid-disposition-agent"
import type { BidProcessingWorkflow } from "@/lib/types/agents"

export class WorkflowOrchestrator {
  /**
   * Main entry point for processing a supplier bid submission
   * Orchestrates the entire workflow through all three agents
   */
  static async processBidSubmission(bidSubmission: {
    bidId: string
    rfpId: string
    supplierId: string
    supplierRates: Array<{ roomType: string; rate: number }>
    expectedRates: Array<{ roomType: string; expectedRate: number }>
    rateType: "LRA" | "NLRA"
    currentRound: number
    maxRounds: number
    allRoomTypes: string[]
  }): Promise<BidProcessingWorkflow> {
    console.log(`[v0] Workflow Orchestrator processing bid submission ${bidSubmission.bidId}`)

    const workflow: BidProcessingWorkflow = {
      bidId: bidSubmission.bidId,
      rfpId: bidSubmission.rfpId,
      supplierId: bidSubmission.supplierId,
      currentStep: "rate_comparison",
      status: "processing",
      results: {},
    }

    try {
      // Step 1: Rate Comparison Agent
      console.log(`[v0] Step 1: Running Rate Comparison Agent`)
      const rateAnalysis = await RateComparisonAgent.analyzeBid({
        bidId: bidSubmission.bidId,
        rfpId: bidSubmission.rfpId,
        supplierId: bidSubmission.supplierId,
        supplierRates: bidSubmission.supplierRates,
        expectedRates: bidSubmission.expectedRates,
        currentRound: bidSubmission.currentRound,
        maxRounds: bidSubmission.maxRounds,
      })

      workflow.results.rateComparison = rateAnalysis

      // Step 2: Route to appropriate next agent based on decision
      if (rateAnalysis.nextAgent === "bid_disposition") {
        // Auto-accept or final decline path
        workflow.currentStep = "bid_disposition"
        console.log(`[v0] Step 2: Running Bid Disposition Agent (${rateAnalysis.decision})`)

        const dispositionResult = await BidDispositionAgent.executeBidDisposition({
          bidId: bidSubmission.bidId,
          rfpId: bidSubmission.rfpId,
          supplierId: bidSubmission.supplierId,
          action: rateAnalysis.decision === "auto_accept" ? "accept" : "decline",
          reason: rateAnalysis.reasoning,
          rateType: bidSubmission.rateType,
          finalRates: bidSubmission.supplierRates,
          allRoomTypes: bidSubmission.allRoomTypes,
        })

        workflow.results.bidDisposition = dispositionResult
        workflow.currentStep = "completed"
        workflow.status = "completed"
      } else if (rateAnalysis.nextAgent === "negotiation") {
        // Negotiation path
        workflow.currentStep = "negotiation"
        console.log(`[v0] Step 2: Running Negotiation Agent`)

        const negotiationResult = await NegotiationAgent.initiateNegotiation({
          bidId: bidSubmission.bidId,
          rfpId: bidSubmission.rfpId,
          supplierId: bidSubmission.supplierId,
          currentRound: bidSubmission.currentRound,
          maxRounds: bidSubmission.maxRounds,
          rateComparisons: rateAnalysis.rateComparisons,
        })

        workflow.results.negotiation = negotiationResult
        workflow.currentStep = "completed"
        workflow.status = "completed"
      }

      console.log(`[v0] Workflow completed successfully for bid ${bidSubmission.bidId}`)
    } catch (error) {
      console.error(`[v0] Workflow failed for bid ${bidSubmission.bidId}:`, error)
      workflow.status = "failed"
      workflow.error = error instanceof Error ? error.message : "Unknown error"
    }

    return workflow
  }

  /**
   * Process supplier response to negotiation
   * Continues the workflow after supplier submits updated rates
   */
  static async processNegotiationResponse(negotiationResponse: {
    bidId: string
    rfpId: string
    supplierId: string
    newRates: Array<{ roomType: string; rate: number }>
    expectedRates: Array<{ roomType: string; expectedRate: number }>
    rateType: "LRA" | "NLRA"
    currentRound: number
    maxRounds: number
    allRoomTypes: string[]
  }): Promise<BidProcessingWorkflow> {
    console.log(`[v0] Workflow Orchestrator processing negotiation response ${negotiationResponse.bidId}`)

    // Process the response through negotiation agent first
    const responseCheck = await NegotiationAgent.processNegotiationResponse({
      bidId: negotiationResponse.bidId,
      rfpId: negotiationResponse.rfpId,
      supplierId: negotiationResponse.supplierId,
      newRates: negotiationResponse.newRates,
      currentRound: negotiationResponse.currentRound,
      maxRounds: negotiationResponse.maxRounds,
    })

    // Then run the updated rates through rate comparison again
    return await this.processBidSubmission({
      bidId: negotiationResponse.bidId,
      rfpId: negotiationResponse.rfpId,
      supplierId: negotiationResponse.supplierId,
      supplierRates: negotiationResponse.newRates,
      expectedRates: negotiationResponse.expectedRates,
      rateType: negotiationResponse.rateType,
      currentRound: negotiationResponse.currentRound,
      maxRounds: negotiationResponse.maxRounds,
      allRoomTypes: negotiationResponse.allRoomTypes,
    })
  }

  /**
   * Get workflow status for a specific bid
   */
  static async getWorkflowStatus(bidId: string): Promise<BidProcessingWorkflow | null> {
    // In a real implementation, this would query the database for workflow status
    console.log(`[v0] Getting workflow status for bid ${bidId}`)

    // Simulate database query
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return mock status - in real implementation would query actual data
        resolve(null)
      }, 100)
    })
  }
}
