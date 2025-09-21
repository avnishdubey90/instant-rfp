import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Simple SVG icon components to replace lucide-react
const ArrowRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const Building2 = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-3a1 1 0 011-1h2a1 1 0 011 1v3m-4 0h4"
    />
  </svg>
)

const Hotel = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 2 2 2-2 2 2 3-2z"
    />
  </svg>
)

const Zap = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const Shield = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
)

const BarChart3 = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
)

const Users = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">Instant RFP</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
            Announcing AI-Powered RFP Automation
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6">
            Automate Your Hotel
            <span className="text-primary"> RFP Process</span>
          </h1>

          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Streamline negotiations between corporates and hotel suppliers with autonomous agents that handle rate
            analysis, negotiation, and bid disposition automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">85%</div>
              <div className="text-sm text-muted-foreground">Faster RFP Processing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Automated Negotiations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Hotel Chains Connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Platform Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Built for Enterprise Travel Management</h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Powerful automation tools designed for corporates, TMCs, and hotel suppliers to streamline the entire RFP
              lifecycle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardHeader>
                <Building2 className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Corporate Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive RFP management for corporates and TMCs with real-time tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Multi-property RFP creation</li>
                  <li>Rate comparison analytics</li>
                  <li>Automated bid evaluation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Hotel className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Supplier Portal</CardTitle>
                <CardDescription>Streamlined bid submission and negotiation interface for hotel chains</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Quick rate submissions</li>
                  <li>Real-time negotiation updates</li>
                  <li>Portfolio management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Zap className="w-10 h-10 text-primary mb-4" />
                <CardTitle>AI Agents</CardTitle>
                <CardDescription>
                  Autonomous agents handle rate analysis, negotiation, and bid disposition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Intelligent rate comparison</li>
                  <li>Automated negotiations</li>
                  <li>Smart bid disposition</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>Bank-grade security with audit trails and compliance features</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>End-to-end encryption</li>
                  <li>Complete audit trails</li>
                  <li>SOC 2 compliance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Analytics & Reporting</CardTitle>
                <CardDescription>Comprehensive insights into RFP performance and market trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Real-time dashboards</li>
                  <li>Market rate analysis</li>
                  <li>Performance metrics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Users className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>Multi-user access with role-based permissions and workflow management</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Role-based access control</li>
                  <li>Team notifications</li>
                  <li>Approval workflows</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-border">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-6">Ready to Transform Your RFP Process?</h2>
          <p className="text-lg text-muted-foreground text-balance mb-8">
            Join leading corporates and hotel chains who trust Instant RFP to automate their procurement workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                Start Your Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Instant RFP</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="hover:text-foreground transition-colors">
                Support
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 Instant RFP. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
