import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Clock, Users, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Play className="w-3 h-3 mr-2" />
              Interactive Demo
            </Badge>
            <h1 className="text-4xl font-bold mb-4">See Instant RFP in Action</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience how our AI-powered platform automates the entire RFP process from creation to final bid
              disposition.
            </p>
          </div>

          {/* Demo Video Placeholder */}
          <Card className="mb-12">
            <CardContent className="p-0">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Interactive Product Demo</h3>
                  <p className="text-muted-foreground mb-4">
                    Watch how Instant RFP transforms your procurement workflow
                  </p>
                  <Button size="lg">
                    <Play className="w-4 h-4 mr-2" />
                    Start Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Clock className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">5-Minute Overview</CardTitle>
                <CardDescription>Quick walkthrough of key features and capabilities</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Multi-User Workflow</CardTitle>
                <CardDescription>See how buyers and suppliers interact through the platform</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">AI Agent Actions</CardTitle>
                <CardDescription>Watch autonomous agents handle negotiations in real-time</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="text-center">
            <CardContent className="py-12">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start your free trial and experience the power of automated RFP management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg">Start Free Trial</Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Schedule a Call
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
