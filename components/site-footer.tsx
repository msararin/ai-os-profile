export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
          <p>Last updated: 2026-05-24 04:00 ICT</p>
          <p>Source: Robert KB + Git</p>
          <p>Version: v1.1</p>
          <p>Release: v3.1.0</p>
        </div>
        <p className="mt-4 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          © 2026 AI Orchestration Governance — A portfolio case study by Lyn (msararin). Source of truth: Robert KB + Git.
        </p>
      </div>
    </footer>
  )
}
