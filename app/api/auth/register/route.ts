import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, company, role, password } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !company || !role || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // TODO: In a real app, you would:
    // 1. Hash the password using bcrypt
    // 2. Check if user already exists in database
    // 3. Save user to database
    // 4. Send welcome email
    // 5. Create session/JWT token

    // For now, simulate successful registration
    console.log("[v0] User registration attempt:", { firstName, lastName, email, company, role })

    // Simulate database save delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check for duplicate email (simulated)
    if (email === "test@example.com") {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 })
    }

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: Math.random().toString(36).substr(2, 9),
          firstName,
          lastName,
          email,
          company,
          role,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
