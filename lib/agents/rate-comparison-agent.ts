import type { AgentActivityLog, BidAnalysisResult, RoomRateComparison } from "@/lib/types/agents"

export class RateComparisonAgent {
  /**
   * Main entry point for rate comparison analysis
   * Compares supplier rates against buyer expectations and determines next action
   */
  static async analyzeBid(bidData: {
    bidId: string
    rfpId: string
    supplierId: string
    supplierRates: Array<{ roomType: string; rate: number }>
    expectedRates: Array<{ roomType: string; expectedRate: number }>
    currentRound: number
    maxRounds: number
  }): Promise<BidAnalysisResult> {
    console.log(`[v0] Rate Comparison Agent analyzing bid ${bidData.bidId}`)

    // Parse and compare rates
    const rateComparisons = this.compareRates(bidData.supplierRates, bidData.expectedRates)

    // Determine overall decision
    const decision = this.determineDecision(rateComparisons, bidData.currentRound, bidData.maxRounds)

    // Log agent activity
    const activityLog: AgentActivityLog = {
      bidId: bidData.bidId,
      agentType: "rate_comparison",
      action: `Rate analysis completed - Decision: ${decision.action}`,
      details: {
        rateComparisons,
        decision: decision.action,
        reasoning: decision.reasoning,
        round: bidData.currentRound,
      },
      timestamp: new Date().toISOString(),
    }

    console.log(`[v0] Rate Comparison Agent decision: ${decision.action}`, decision.reasoning)

    // In a real implementation, this would save to database
    await this.logActivity(activityLog)

    return {
      bidId: bidData.bidId,
      decision: decision.action,
      reasoning: decision.reasoning,
      rateComparisons,
      nextAgent: decision.nextAgent,
      activityLog,
    }
  }

  /**
   * Compare supplier rates against expected rates for each room type
   */
  private static compareRates(
    supplierRates: Array<{ roomType: string; rate: number }>,
    expectedRates: Array<{ roomType: string; expectedRate: number }>,
  ): RoomRateComparison[] {
    const comparisons: RoomRateComparison[] = []

    for (const expected of expectedRates) {
      const supplierRate = supplierRates.find((r) => r.roomType === expected.roomType)

      if (supplierRate) {
        const difference = supplierRate.rate - expected.expectedRate
        const percentageDiff = (difference / expected.expectedRate) * 100

        comparisons.push({
          roomType: expected.roomType,
          supplierRate: supplierRate.rate,
          expectedRate: expected.expectedRate,
          difference,
          percentageDifference: Math.round(percentageDiff * 100) / 100,
          meetsExpectation: supplierRate.rate <= expected.expectedRate,
        })
      }
    }

    return comparisons
  }

  /**
   * Determine the appropriate action based on rate comparisons
   * Business Rules:
   * - Auto-Accept: All rates <= expected rates
   * - Negotiate: Some rates > expected rates AND rounds remaining
   * - Decline: Some rates > expected rates AND no rounds remaining
   */
  private static determineDecision(
    rateComparisons: RoomRateComparison[],
    currentRound: number,
    maxRounds: number,
  ): {
    action: "auto_accept" | "negotiate" | "decline"
    reasoning: string
    nextAgent: "bid_disposition" | "negotiation" | null
  } {
    const allRatesMeetExpectation = rateComparisons.every((comp) => comp.meetsExpectation)
    const hasRatesAboveExpectation = rateComparisons.some((comp) => !comp.meetsExpectation)
    const hasRoundsRemaining = currentRound < maxRounds

    // Rule 1: Auto-Accept - All rates meet or beat expectations
    if (allRatesMeetExpectation) {
      return {
        action: "auto_accept",
        reasoning: "All submitted rates meet or exceed buyer expectations. Triggering automatic acceptance.",
        nextAgent: "bid_disposition",
      }
    }

    // Rule 2: Negotiate - Some rates above expectation but rounds remaining
    if (hasRatesAboveExpectation && hasRoundsRemaining) {
      const aboveExpectationRooms = rateComparisons
        .filter((comp) => !comp.meetsExpectation)
        .map((comp) => `${comp.roomType} (${comp.percentageDifference}% above)`)
        .join(", ")

      return {
        action: "negotiate",
        reasoning: `Rates above expectation for: ${aboveExpectationRooms}. Initiating negotiation (Round ${currentRound + 1}/${maxRounds}).`,
        nextAgent: "negotiation",
      }
    }

    // Rule 3: Decline - Rates above expectation and no rounds remaining
    if (hasRatesAboveExpectation && !hasRoundsRemaining) {
      return {
        action: "decline",
        reasoning: `Maximum negotiation rounds (${maxRounds}) reached. Rates still above expectation. Declining bid.`,
        nextAgent: "bid_disposition",
      }
    }

    // Fallback (should not reach here)
    return {
      action: "decline",
      reasoning: "Unable to determine appropriate action. Declining as safety measure.",
      nextAgent: "bid_disposition",
    }
  }

  /**
   * Log agent activity for audit trail
   */
  private static async logActivity(activityLog: AgentActivityLog): Promise<void> {
    // In a real implementation, this would save to the agent_activities table
    console.log(`[v0] Logging Rate Comparison Agent activity:`, activityLog)

    // Simulate database save
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[v0] Activity logged successfully for bid ${activityLog.bidId}`)
        resolve()
      }, 100)
    })
  }

  /**
   * Generate summary statistics for rate analysis
   */
  static generateRateSummary(rateComparisons: RoomRateComparison[]): {
    totalRooms: number
    roomsMeetingExpectation: number
    averagePercentageDifference: number
    totalPotentialSavings: number
  } {
    const totalRooms = rateComparisons.length
    const roomsMeetingExpectation = rateComparisons.filter((comp) => comp.meetsExpectation).length

    const avgPercentageDiff = rateComparisons.reduce((sum, comp) => sum + comp.percentageDifference, 0) / totalRooms
    const totalSavings = rateComparisons.reduce((sum, comp) => sum + Math.abs(Math.min(comp.difference, 0)), 0)

    return {
      totalRooms,
      roomsMeetingExpectation,
      averagePercentageDifference: Math.round(avgPercentageDiff * 100) / 100,
      totalPotentialSavings: Math.round(totalSavings * 100) / 100,
    }
  }
}
