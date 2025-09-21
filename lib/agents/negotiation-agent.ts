import type { AgentActivityLog, NegotiationResult } from "@/lib/types/agents"

export class NegotiationAgent {
  /**
   * Initiate negotiation with supplier
   * Sends counter-proposal with expected rates and tracks negotiation rounds
   */
  static async initiateNegotiation(negotiationData: {
    bidId: string
    rfpId: string
    supplierId: string
    currentRound: number
    maxRounds: number
    rateComparisons: Array<{
      roomType: string
      supplierRate: number
      expectedRate: number
      difference: number
      percentageDifference: number
      meetsExpectation: boolean
    }>
  }): Promise<NegotiationResult> {
    console.log(`[v0] Negotiation Agent initiating negotiation for bid ${negotiationData.bidId}`)

    // Generate negotiation message
    const negotiationMessage = this.generateNegotiationMessage(
      negotiationData.rateComparisons,
      negotiationData.currentRound,
      negotiationData.maxRounds,
    )

    // Create counter-proposal with target rates
    const counterProposal = this.generateCounterProposal(negotiationData.rateComparisons)

    // Update negotiation round
    const newRound = negotiationData.currentRound + 1

    // Log agent activity
    const activityLog: AgentActivityLog = {
      bidId: negotiationData.bidId,
      agentType: "negotiation",
      action: `Negotiation initiated - Round ${newRound}`,
      details: {
        round: newRound,
        maxRounds: negotiationData.maxRounds,
        message: negotiationMessage,
        counterProposal,
        ratesRequiringNegotiation: negotiationData.rateComparisons.filter((comp) => !comp.meetsExpectation).length,
      },
      timestamp: new Date().toISOString(),
    }

    console.log(`[v0] Negotiation Agent sending counter-proposal for round ${newRound}`)

    // In a real implementation, this would:
    // 1. Update negotiation status in database
    // 2. Send notification to supplier
    // 3. Update bid status to 'negotiating'
    await this.logActivity(activityLog)
    await this.sendNegotiationNotification(negotiationData.supplierId, negotiationMessage, counterProposal)

    return {
      bidId: negotiationData.bidId,
      newRound,
      negotiationMessage,
      counterProposal,
      status: "negotiation_sent",
      activityLog,
    }
  }

  /**
   * Generate human-readable negotiation message
   */
  private static generateNegotiationMessage(
    rateComparisons: Array<{
      roomType: string
      supplierRate: number
      expectedRate: number
      difference: number
      percentageDifference: number
      meetsExpectation: boolean
    }>,
    currentRound: number,
    maxRounds: number,
  ): string {
    const problematicRates = rateComparisons.filter((comp) => !comp.meetsExpectation)
    const roundsRemaining = maxRounds - currentRound

    let message = `Thank you for your bid submission. After review, we found that some rates exceed our budget expectations:\n\n`

    problematicRates.forEach((rate) => {
      message += `• ${rate.roomType}: $${rate.supplierRate} (${rate.percentageDifference}% above target)\n`
    })

    message += `\nWe would appreciate if you could consider adjusting these rates to be more competitive. `
    message += `This is round ${currentRound + 1} of ${maxRounds} negotiation rounds.\n\n`

    if (roundsRemaining === 1) {
      message += `Please note this is the final negotiation round. `
    }

    message += `We look forward to your revised proposal.`

    return message
  }

  /**
   * Generate counter-proposal with target rates
   */
  private static generateCounterProposal(
    rateComparisons: Array<{
      roomType: string
      supplierRate: number
      expectedRate: number
      difference: number
      percentageDifference: number
      meetsExpectation: boolean
    }>,
  ): Array<{ roomType: string; targetRate: number; currentRate: number }> {
    return rateComparisons.map((comp) => ({
      roomType: comp.roomType,
      targetRate: comp.expectedRate,
      currentRate: comp.supplierRate,
    }))
  }

  /**
   * Send negotiation notification to supplier
   */
  private static async sendNegotiationNotification(
    supplierId: string,
    message: string,
    counterProposal: Array<{ roomType: string; targetRate: number; currentRate: number }>,
  ): Promise<void> {
    console.log(`[v0] Sending negotiation notification to supplier ${supplierId}`)
    console.log(`[v0] Negotiation message:`, message)
    console.log(`[v0] Counter-proposal:`, counterProposal)

    // In a real implementation, this would:
    // 1. Send email notification to supplier
    // 2. Create in-app notification
    // 3. Update supplier dashboard with negotiation request

    // Simulate notification sending
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[v0] Negotiation notification sent successfully to supplier ${supplierId}`)
        resolve()
      }, 200)
    })
  }

  /**
   * Process supplier's response to negotiation
   */
  static async processNegotiationResponse(responseData: {
    bidId: string
    rfpId: string
    supplierId: string
    newRates: Array<{ roomType: string; rate: number }>
    currentRound: number
    maxRounds: number
  }): Promise<{ shouldContinueNegotiation: boolean; reason: string }> {
    console.log(`[v0] Negotiation Agent processing response for bid ${responseData.bidId}`)

    // Log the response
    const activityLog: AgentActivityLog = {
      bidId: responseData.bidId,
      agentType: "negotiation",
      action: `Supplier response received - Round ${responseData.currentRound}`,
      details: {
        round: responseData.currentRound,
        newRates: responseData.newRates,
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    }

    await this.logActivity(activityLog)

    // Check if we've reached max rounds
    if (responseData.currentRound >= responseData.maxRounds) {
      return {
        shouldContinueNegotiation: false,
        reason: `Maximum negotiation rounds (${responseData.maxRounds}) reached`,
      }
    }

    return {
      shouldContinueNegotiation: true,
      reason: "Negotiation can continue",
    }
  }

  /**
   * Log agent activity for audit trail
   */
  private static async logActivity(activityLog: AgentActivityLog): Promise<void> {
    console.log(`[v0] Logging Negotiation Agent activity:`, activityLog)

    // Simulate database save
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[v0] Negotiation activity logged successfully for bid ${activityLog.bidId}`)
        resolve()
      }, 100)
    })
  }
}
