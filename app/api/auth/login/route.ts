import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // TODO: Replace with actual database authentication
    // For now, using mock authentication logic
    const mockUsers = [
      { id: 1, email: "buyer@company.com", password: "password123", type: "buyer", name: "John Buyer" },
      { id: 2, email: "supplier@hotel.com", password: "password123", type: "supplier", name: "Jane Supplier" },
    ]

    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // In a real app, you would:
    // 1. Hash and compare passwords
    // 2. Generate JWT tokens
    // 3. Set secure cookies
    // 4. Query actual database

    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
