import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const evidence = [
  "Public Surface Governance structure defined under the Architecture surface.",
  "Surface Story Guild, Prime Gate, Public Surface Runner Team, and Lyn approval boundaries are separated.",
  "Public Surface Runner Team wording is limited to implementation and validation support.",
  "Lightweight rule keeps minor typo, formatting, and low-risk copy edits outside the full governance flow.",
]

const skills = [
  "Public-surface operating-model design",
  "Claim-boundary role separation",
  "Technical term and narrative-risk awareness",
  "Lightweight governance design",
  "Owner-approved positioning boundary",
]

export default function PublicSurfaceGovernanceAchievementPage() {
  return (
    <PageLayout>
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/achievements"
          className="mb-5 inline-flex text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          ← Back to Achievements
        </Link>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Public Surface Governance</Badge>
          <Badge variant="outline">Claim Safety</Badge>
          <Badge variant="outline">Architecture Surface</Badge>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
          Public Surface Governance Operating Model Defined
        </h1>
        <p className="mt-4 text-muted-foreground">
          AIOS now has a defined public-surface update model that separates story
          coherence, high-risk claim validation, implementation support, and owner
          positioning approval before stronger public interpretation is made.
        </p>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Public-safe result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
            <p>
              Public-surface updates now have a clearer operating structure: Surface Story
              Guild reviews communication coherence, Prime Gate validates high-risk claim
              safety, Public Surface Runner Team supports implementation and validation,
              and Lyn owns final positioning and publish decisions.
            </p>
            <p>
              This improves public-surface consistency without claiming automated release
              governance or production-readiness certification.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Evidence / artifacts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
              {evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Skills demonstrated</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-6 border-amber-500/40 bg-amber-500/5">
          <CardHeader>
            <CardTitle>Caveat / status</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-muted-foreground">
            This is a public governance and architecture-surface milestone. It is not a
            claim that the flow has been used for every historical page, that releases are
            automated, or that production readiness is certified.
          </CardContent>
        </Card>
      </main>
    </PageLayout>
  )
}
