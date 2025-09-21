import type { AgentActivityLog, BidDispositionResult } from "@/lib/types/agents"

export class BidDispositionAgent {
  /**
   * Execute final bid disposition (accept or decline)
   * Handles both auto-accept scenarios and final decline after failed negotiations
   */
  static async executeBidDisposition(dispositionData: {
    bidId: string
    rfpId: string
    supplierId: string
    action: "accept" | "decline"
    reason: string
    rateType: "LRA" | "NLRA"
    finalRates: Array<{ roomType: string; rate: number }>
    allRoomTypes: string[]
  }): Promise<BidDispositionResult> {
    console.log(`[v0] Bid Disposition Agent executing ${dispositionData.action} for bid ${dispositionData.bidId}`)

    let acceptedRoomTypes: string[] = []
    const emailType: "accept" | "decline" = dispositionData.action

    // Apply room type logic based on rate type
    if (dispositionData.action === "accept") {
      acceptedRoomTypes = this.applyRoomTypeLogic(dispositionData.rateType, dispositionData.allRoomTypes)
    }

    // Generate email content
    const emailContent = this.generateEmailContent(
      dispositionData.action,
      dispositionData.reason,
      acceptedRoomTypes,
      dispositionData.finalRates,
    )

    // Log agent activity
    const activityLog: AgentActivityLog = {
      bidId: dispositionData.bidId,
      agentType: "bid_disposition",
      action: `Bid ${dispositionData.action}ed`,
      details: {
        action: dispositionData.action,
        reason: dispositionData.reason,
        acceptedRoomTypes,
        finalRates: dispositionData.finalRates,
        emailType,
        rateType: dispositionData.rateType,
      },
      timestamp: new Date().toISOString(),
    }

    console.log(`[v0] Bid Disposition Agent ${dispositionData.action}ing bid with reason: ${dispositionData.reason}`)

    // Execute disposition actions
    await this.logActivity(activityLog)
    await this.updateBidStatus(dispositionData.bidId, dispositionData.action, acceptedRoomTypes)
    await this.sendDispositionEmail(dispositionData.supplierId, emailType, emailContent)

    return {
      bidId: dispositionData.bidId,
      finalAction: dispositionData.action,
      acceptedRoomTypes,
      emailSent: true,
      activityLog,
    }
  }

  /**
   * Apply room type acceptance logic based on rate type
   * Business Rule: Both LRA and NLRA accept all room types when accepting
   */
  private static applyRoomTypeLogic(rateType: "LRA" | "NLRA", allRoomTypes: string[]): string[] {
    // According to specification:
    // - If LRA → Accept all room types
    // - If NLRA → Accept all room types
    console.log(`[v0] Applying room type logic for ${rateType}: accepting all room types`)

    return [...allRoomTypes]
  }

  /**
   * Generate email content for disposition notification
   */
  private static generateEmailContent(
    action: "accept" | "decline",
    reason: string,
    acceptedRoomTypes: string[],
    finalRates: Array<{ roomType: string; rate: number }>,
  ): {
    subject: string
    content: string
  } {
    if (action === "accept") {
      const ratesList = finalRates.map((rate) => `• ${rate.roomType}: $${rate.rate} per night`).join("\n")

      return {
        subject: "Congratulations! Your RFP Bid Has Been Accepted",
        content: `Dear Partner,

We are pleased to inform you that your bid has been accepted!

ACCEPTED RATES:
${ratesList}

ACCEPTED ROOM TYPES:
${acceptedRoomTypes.map((type) => `• ${type}`).join("\n")}

REASON: ${reason}

Next steps:
1. You will receive a formal contract within 2 business days
2. Please confirm your acceptance of these terms
3. Our procurement team will contact you to finalize details

Thank you for your competitive proposal. We look forward to working with you.

Best regards,
RFP Automation System`,
      }
    } else {
      return {
        subject: "RFP Bid Decision - Not Selected",
        content: `Dear Partner,

Thank you for your interest and the time you invested in responding to our RFP.

After careful consideration, we have decided not to move forward with your proposal at this time.

REASON: ${reason}

We appreciate your participation in our procurement process and encourage you to respond to future opportunities that may be a better fit.

Thank you again for your time and effort.

Best regards,
RFP Automation System`,
      }
    }
  }

  /**
   * Update bid status in database
   */
  private static async updateBidStatus(
    bidId: string,
    action: "accept" | "decline",
    acceptedRoomTypes: string[],
  ): Promise<void> {
    console.log(`[v0] Updating bid ${bidId} status to ${action}ed`)
    console.log(`[v0] Accepted room types:`, acceptedRoomTypes)

    // In a real implementation, this would update the bids table
    // UPDATE bids SET status = action, processed_at = NOW() WHERE id = bidId

    // Simulate database update
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[v0] Bid status updated successfully for bid ${bidId}`)
        resolve()
      }, 150)
    })
  }

  /**
   * Send disposition email notification
   */
  private static async sendDispositionEmail(
    supplierId: string,
    emailType: "accept" | "decline",
    emailContent: { subject: string; content: string },
  ): Promise<void> {
    console.log(`[v0] Sending ${emailType} email to supplier ${supplierId}`)
    console.log(`[v0] Email subject: ${emailContent.subject}`)

    // In a real implementation, this would:
    // 1. Insert into email_notifications table
    // 2. Send via email service (SendGrid, AWS SES, etc.)
    // 3. Create in-app notification

    // Simulate email sending
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[v0] ${emailType} email sent successfully to supplier ${supplierId}`)
        resolve()
      }, 200)
    })
  }

  /**
   * Log agent activity for audit trail
   */
  private static async logActivity(activityLog: AgentActivityLog): Promise<void> {
    console.log(`[v0] Logging Bid Disposition Agent activity:`, activityLog)

    // Simulate database save
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[v0] Disposition activity logged successfully for bid ${activityLog.bidId}`)
        resolve()
      }, 100)
    })
  }
}
