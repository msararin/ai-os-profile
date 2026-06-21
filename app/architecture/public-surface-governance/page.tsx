import { PageLayout } from "@/components/page-layout"

const fullFlowTriggers = [
  "A new public claim",
  "A role-positioning statement",
  "A case study conclusion",
  "A production or deployment statement",
  "An automation or orchestration claim",
  "A public achievement",
  "A claim involving evidence, monitoring, governance, or readiness",
]

export default function PublicSurfaceGovernancePage() {
  return (
    <PageLayout>
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Public surface governance
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          How We Update Public Surfaces
        </h1>
        <p className="mt-4 text-muted-foreground">
          Public surface updates carry story, terminology, evidence, claim boundaries,
          audience interpretation, role-positioning signal, and implementation impact at
          the same time.
        </p>

        <section className="mt-8 rounded-lg border border-border bg-card p-5">
          <h2 className="text-xl font-semibold text-foreground">Operating flow</h2>
          <ol className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
            <li>
              <strong className="text-foreground">Surface Story Guild:</strong> creates and
              critiques story, term map, narrative order, and claim wording.
            </li>
            <li>
              <strong className="text-foreground">Prime Gate:</strong> checks claim
              boundary, evidence sufficiency, and public-safe wording.
            </li>
            <li>
              <strong className="text-foreground">Public Surface Runner Team:</strong>
              implements and validates actual public page changes.
            </li>
            <li>
              <strong className="text-foreground">Lyn:</strong> approves positioning and
              publish decision.
            </li>
          </ol>
        </section>

        <section className="mt-6 rounded-lg border border-border bg-card p-5">
          <h2 className="text-xl font-semibold text-foreground">Public Surface Governance Structure</h2>
          <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground">Surface Story Guild</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Surface Narrative Lead</li>
                <li>Term Impact Analyst</li>
                <li>Audience Translator</li>
                <li>Claim Boundary Reviewer</li>
                <li>Surface Consistency QA</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground">Prime Gate</p>
              <p>High-risk claim validation.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Public Surface Runner Team</p>
              <p>Implementation, validation, and publish support.</p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-border bg-card p-5 text-sm leading-6 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">Role Boundaries</h2>
          <p className="mt-3">
            Surface Story Guild owns communication coherence. Prime Gate owns claim
            safety. Public Surface Runner Team owns implementation and validation support.
            Lyn owns final positioning.
          </p>
          <p className="mt-3">
            Public Surface Runner Team does not approve go-live, certify production
            readiness, or upgrade public claims.
          </p>
        </section>

        <section className="mt-6 rounded-lg border border-border bg-card p-5 text-sm leading-6 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">Lightweight Rule</h2>
          <p className="mt-3">
            This governance model should remain lightweight. Minor typo fixes,
            formatting changes, and low-risk copy edits do not require the full flow.
          </p>
          <p className="mt-4 font-semibold text-foreground">
            Use the full flow when a surface update changes or introduces:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {fullFlowTriggers.map((trigger) => (
              <li key={trigger}>{trigger}</li>
            ))}
          </ul>
        </section>
      </main>
    </PageLayout>
  )
}
