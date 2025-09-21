import { type NextRequest, NextResponse } from "next/server"
import { WorkflowOrchestrator } from "@/lib/agents/workflow-orchestrator"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Webhook received: Bid submission")

    // Parse the webhook payload
    const payload = await request.json()

    // Validate required fields
    const requiredFields = [
      "bidId",
      "rfpId",
      "supplierId",
      "supplierRates",
      "expectedRates",
      "rateType",
      "currentRound",
      "maxRounds",
      "allRoomTypes",
    ]
    for (const field of requiredFields) {
      if (!payload[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    console.log(`[v0] Processing bid submission for bid ${payload.bidId}`)

    // Process the bid through the autonomous agent workflow
    const workflowResult = await WorkflowOrchestrator.processBidSubmission({
      bidId: payload.bidId,
      rfpId: payload.rfpId,
      supplierId: payload.supplierId,
      supplierRates: payload.supplierRates,
      expectedRates: payload.expectedRates,
      rateType: payload.rateType,
      currentRound: payload.currentRound || 0,
      maxRounds: payload.maxRounds,
      allRoomTypes: payload.allRoomTypes,
    })

    console.log(`[v0] Workflow completed with status: ${workflowResult.status}`)

    // Return the workflow result
    return NextResponse.json({
      success: true,
      workflowResult,
      message: `Bid ${payload.bidId} processed successfully`,
    })
  } catch (error) {
    console.error("[v0] Webhook processing failed:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ message: "Bid submission webhook endpoint. Use POST to submit bids." }, { status: 200 })
}
