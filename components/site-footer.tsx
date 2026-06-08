export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
          <p>Evidence-backed public archive</p>
          <p>Page freshness is stated within each section where applicable</p>
          <p>Release scope: Architecture, Achievements, Knowledge Sharing</p>
          <p>Source: GPT KB + Git</p>
          <p>Evidence dates shown in page content where applicable</p>
          <p>Release: AIOS profile v0.2 + Governance layer update</p>
        </div>
        <p className="mt-4 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          © 2026 AI Orchestration Governance — A portfolio case study by Sararin (msararin). Source of truth: GPT KB + Git.
        </p>
      </div>
    </footer>
  )
}
