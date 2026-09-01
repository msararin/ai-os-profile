import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const proofRows = [
  ["Schema contract", "45/45 ledger · 13/13 projection", "PASS"],
  ["Append-only", "delta.appendOnly=true", "PASS"],
  ["Parent / child", "Separate rows with step and log linkage", "PASS"],
  ["Idempotency", "Replay no-op · changed digest rejected", "PASS"],
  ["Correction", "Supersede appended · prior event retained", "PASS"],
  ["Projection", "Version 1 → 2 · stale pointer rejected", "PASS"],
  ["Immutability", "UPDATE and DELETE rejected · row unchanged", "PASS"],
  ["Execution boundary", "Five TEST/model/artifact flags remain false", "PASS"],
]

export function RuntimeProof() {
  return (
    <section id="governance-runtime-proof" className="scroll-mt-24 border-y border-border bg-slate-500/[0.04] py-10" aria-labelledby="governance-runtime-proof-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-800 dark:text-sky-200">Governance Runtime Proof</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h2 id="governance-runtime-proof-heading" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Tested on Databricks. Preserved as reviewable evidence.</h2>
            <Badge className="border-emerald-600 bg-emerald-100 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-100">Runtime verified with boundaries</Badge>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            On 30 Aug 2026, the owner ran the controlled T8 SQL sequence in <code>adb_nbo_nrt_mlops_dev.governance</code>. The captured results were reconciled into Git so reviewers can inspect what passed without requiring Databricks access.
          </p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-3" aria-label="Evidence class separation">
          <Card className="border-indigo-500/25">
            <CardHeader><CardTitle className="text-base">ML / Decision Evidence</CardTitle></CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">Model formulation, training, ranking, policy evaluation, metrics, and experiment decisions live in Models &amp; Experiments.</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">LLM / Agent Assurance</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>Agent routing, reviewer roles, provider receipts, and human authority belong to the complementary AIOS domain—not to this ML runtime test.</p>
              <Link href="/ai-operating-system" className="font-semibold text-primary hover:underline">View LLM &amp; Agent Systems →</Link>
            </CardContent>
          </Card>
          <Card className="border-sky-500/30 bg-sky-500/[0.03]">
            <CardHeader><CardTitle className="text-base">Governance Runtime Proof</CardTitle></CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">Ledger append, replay, correction, projection, and immutability controls tested on the named Databricks environment. This is infrastructure evidence, not model-quality evidence.</CardContent>
          </Card>
        </div>

        <details className="mt-6 overflow-hidden rounded-xl border border-sky-500/30 bg-background">
          <summary className="cursor-pointer list-none p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500">
            <span className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span>
                <span className="block font-semibold text-foreground">View tested proof</span>
                <span className="mt-1 block text-sm leading-6 text-muted-foreground">Exact controls, retained identities, expected failures, and evidence boundaries</span>
              </span>
              <span className="text-sm font-semibold text-primary">Expand ↓</span>
            </span>
          </summary>
          <div className="border-t border-border p-5 sm:p-6">
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="min-w-[720px] w-full text-left text-sm">
                <thead className="bg-muted/50 text-foreground"><tr><th className="px-4 py-3 font-semibold">Control</th><th className="px-4 py-3 font-semibold">Captured result</th><th className="px-4 py-3 font-semibold">Verdict</th></tr></thead>
                <tbody className="divide-y divide-border">
                  {proofRows.map(([control, result, verdict]) => <tr key={control}><td className="px-4 py-3 font-medium text-foreground">{control}</td><td className="px-4 py-3 text-muted-foreground">{result}</td><td className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-300">{verdict}</td></tr>)}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm leading-7 text-muted-foreground">
                <p className="font-semibold text-foreground">Retained evidence identity</p>
                <p className="mt-2"><strong className="text-foreground">Parent:</strong> <code>T8-RUNTIME-PARENT-001</code></p>
                <p><strong className="text-foreground">Child:</strong> <code>T8-RUNTIME-CHILD-001</code></p>
                <p><strong className="text-foreground">Supersede:</strong> <code>T8-RUNTIME-SUPERSEDE-001</code></p>
                <p><strong className="text-foreground">Projection:</strong> version 2</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/20 p-4 text-sm leading-7 text-muted-foreground">
                <p className="font-semibold text-foreground">Expected failures captured</p>
                <p className="mt-2"><code>IDEMPOTENCY_KEY_COLLISION_REJECTED</code></p>
                <p><code>STALE_PROJECTION_POINTER_REJECTED</code></p>
                <p><code>DELTA_CANNOT_MODIFY_APPEND_ONLY</code></p>
                <p>Post-failure checks retained the original digest, timestamp, notes, and row count.</p>
              </div>
            </div>

            <Alert className="mt-6 border-amber-500/30 bg-amber-500/5">
              <AlertDescription className="text-sm leading-7">
                <strong>Evidence boundary.</strong> These are owner-operated Databricks results reconciled into a durable receipt—not a direct connector transcript. Statement IDs, screenshots, warehouse identity, and active-principal output were not captured. UPDATE and DELETE were runtime-tested; truncate, overwrite, and replace are static workflow exclusions only. Serialized single-writer behavior is verified; concurrent or multi-writer safety is not verified and remains prohibited.
              </AlertDescription>
            </Alert>

            <p className="mt-4 rounded-lg border border-border bg-muted/20 p-4 text-sm leading-7 text-muted-foreground">
              <strong className="text-foreground">Claim boundary:</strong> <code>SYNTHETIC_LEARNING_AND_MLOPS_EVIDENCE_ONLY</code>. No TEST access, model training, policy training, scoring, artifact persistence/load-back, production readiness, uplift, causal effect, operator truth, or online-policy safety is established by T8.
            </p>
          </div>
        </details>
      </div>
    </section>
  )
}
