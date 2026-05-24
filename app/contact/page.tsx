import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Contact
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Currently exploring senior roles in AI/data transformation, delivery governance, 
            and enterprise technology modernization.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl">
            {/* Email */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href="mailto:msararin@gmail.com"
                  className="text-primary hover:underline text-base"
                >
                  msararin@gmail.com
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  Preferred for professional inquiries
                </p>
              </CardContent>
            </Card>

            {/* LinkedIn */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">LinkedIn</CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href="https://www.linkedin.com/in/sararin-malaithong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-base"
                >
                  linkedin.com/in/sararin-malaithong
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  Connect for opportunities
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Resume Download */}
          <Card className="mt-8 max-w-3xl">
            <CardHeader>
              <CardTitle className="text-lg">Resume / CV</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Download my complete professional background and experience.
              </p>
              <Button asChild size="lg">
                <a href="/resume/Sararin-Malaithong-Resume.pdf" download>
                  Download Resume (PDF)
                </a>
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Last updated: May 2026
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Professional Focus */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-6">What I'm Looking For</h2>
          
          <div className="max-w-3xl space-y-4 text-base text-muted-foreground">
            <p>
              I'm exploring senior roles where my AI/data transformation governance experience 
              can create value. I specialize in turning ambiguous transformation goals into 
              executable systems of work.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-foreground mb-2">Role Focus</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Senior Program Manager</li>
                    <li>• Transformation Lead</li>
                    <li>• AI/Data Governance Lead</li>
                    <li>• Delivery Governance</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-foreground mb-2">Domain Interest</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Financial Services</li>
                    <li>• Enterprise Technology</li>
                    <li>• AI/Data Transformation</li>
                    <li>• Cloud Modernization</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Note */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="max-w-3xl border-primary/20">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Privacy:</span> I respect confidentiality. 
                All case studies on this portfolio are anonymized with no client names, vendor details, 
                or confidential information disclosed.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
