import Link from "next/link"
import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "NBO / NRT Learning Journey | Sararin.ai",
  description: "Four bounded experiments connecting business decisions, data conditions, machine learning, and reproducible engineering.",
}

const experiments = [
  {
    number: "01",
    title: "Build the lifecycle—and separate it from model quality",
    status: "Completed · bounded synthetic evidence",
    data: "10,000 synthetic observations prepared for a governed data-to-model lifecycle.",
    conditions: "Data validity, training, registration, prediction read-back, model quality, and business acceptance were evaluated as separate gates.",
    observed: "Training, model registration, and prediction/probability read-back were exercised. At the evaluated default decision setting, precision, recall, and F1 were 0 because no positives were predicted.",
    turningPoint: "The pipeline worked, but the model was not useful at the evaluated decision setting. Lifecycle success could not authorize deployment.",
    decision: "Preserve the failed model-quality result and redesign the next experiment around a more explicit decision world and evaluation path.",
  },
  {
    number: "02",
    title: "Make the decision world and evaluation credible",
    status: "Completed in two bounded phases · 2A and 2B",
    data: "A controlled synthetic world extended the observed seed structure with behavior simulation, offer enrichment, candidate actions, logged outcomes, and retained provenance.",
    conditions: "Experiment 2A established the shared preparation and readiness gates. Experiment 2B added a separate offline-policy-evaluation lane; its findings remained bounded to the synthetic logged environment.",
    observed: "The work showed that an offer model cannot be judged only as a classifier: candidate eligibility, action support, logged behavior, and the evaluation design determine what can be learned safely.",
    turningPoint: "A statistically supported offline result still did not establish operator truth, online-policy safety, or permission to reuse the same evidence for a new policy objective.",
    decision: "Keep 2A and 2B as two phases of one experiment, preserve their evidence boundary, and start a new TRAIN-only policy-learning investigation.",
  },
  {
    number: "03",
    title: "Prove data support before policy learning",
    status: "Paused · B1 incomplete · TEST untouched",
    data: "The retained TRAIN set contains 8,002 rows across 38,300 exact context–action pairs: 30,604 pairs have no example and 7,653 appear once.",
    conditions: "The lane was constrained to a one-step contextual decision. TRAIN/TEST isolation, action-by-context support classification, reproducible checkpoints, and claim boundaries had to pass before unrestricted policy learning.",
    observed: "The exact context–action view exposed substantial sparsity. This does not prove that the data cannot support every learning method; it proves that the required B1 support gate for this route is incomplete.",
    turningPoint: "Continuing to 3B would have optimized against a weakly supported formulation and risked turning synthetic assumptions into an apparently precise policy result.",
    decision: "Pause Experiment 3 without touching historical TEST, preserve its contract and evidence, and separate the redesigned business problem into Experiment 4.",
  },
  {
    number: "04",
    title: "Design backward from a real package-fit decision",
    status: "In progress · design and bounded controls only",
    data: "A new synthetic dataset is planned around usage context, remaining quota, package expiry, active add-ons, offer history, purchase eligibility, package compatibility, and NO_OFFER.",
    conditions: "Define the decision and end-state evidence first; separate the recommended action from the product actually purchased; allow self-purchase or purchase of another product; compare ML with a reasonable business-rule baseline; keep the oracle out of training data.",
    observed: "The business framing and backward-design roadmap are recorded. Ledger/contact controls passed 17 checks and action-filter controls passed 11 checks on the owner’s Mac; these are component checks, not simulator or ML results.",
    turningPoint: "The earlier route began with the available data and then asked what could be learned. This experiment reverses that order: define what good evidence must look like, then design data and tests backward from it.",
    decision: "Continue through the seven gated stages without requiring ML to beat the baseline. No new dataset, trained model, business uplift, or production readiness is claimed yet.",
  },
]

const lessons = [
  ["Business case", "Start with the decision, eligible actions, customer context, baseline, and outcome that matters. A technically learnable target is not automatically a useful or permissible offer decision."],
  ["Data", "Row count is not enough. Coverage across the context–action space, provenance, simulated assumptions, support, and TRAIN/TEST custody determine which conclusions the data can support."],
  ["Machine learning", "Model metrics, offline policy evidence, and policy learning answer different questions. ML may be better than, equal to, or worse than a sound business rule; the experiment must make every result interpretable."],
  ["Engineering", "A successful run is not end-to-end proof. Data gates, model behavior, artifact registration, read-back, recovery, reproducibility, and business acceptance need distinct evidence and stop conditions."],
]

export default function Page() {
  return <PageLayout>
    <header className="border-b bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-teal-300">Sararin.ai / Selected work</p>
        <div className="mt-5 flex flex-wrap gap-2"><Badge variant="secondary">4 experiments</Badge><Badge variant="secondary">Synthetic learning evidence</Badge><Badge variant="secondary">No production uplift claim</Badge></div>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">NBO / NRT Learning Journey</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">Four bounded experiments show how the work moved from a functioning model lifecycle to a business-grounded package-fit decision—using data conditions, failed gates, and observed evidence to decide what to change next.</p>
      </div>
    </header>

    <main className="mx-auto max-w-6xl space-y-12 px-6 py-12">
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Business question</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">What must be true before an offer decision is worth using?</h2></div>
        <div className="space-y-4 text-base leading-7 text-muted-foreground"><p>The case began by connecting synthetic data preparation, model evaluation, registration, and prediction read-back. Each experiment then exposed a different missing condition: usable model behavior, a credible decision world, sufficient context–action support, and finally a business-grounded definition of package fit.</p><p>The result is not a story of four increasingly successful models. It is a record of four evidence-led decisions: what the data allowed, what the test established, where the boundary failed, and why the next experiment changed direction.</p></div>
      </section>

      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Experiment path</p><h2 className="mt-2 text-3xl font-semibold">Data, conditions, evidence, and turning points</h2>
        <div className="mt-7 space-y-6">
          {experiments.map((experiment) => <Card key={experiment.number}>
            <CardHeader className="gap-3 border-b border-border sm:flex-row sm:items-start sm:justify-between"><div className="flex gap-4"><span className="text-3xl font-semibold text-primary">{experiment.number}</span><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Experiment {Number(experiment.number)}</p><CardTitle className="mt-2 text-2xl">{experiment.title}</CardTitle></div></div><Badge variant="outline" className="w-fit">{experiment.status}</Badge></CardHeader>
            <CardContent className="grid gap-5 pt-6 md:grid-cols-2 xl:grid-cols-3">
              {[["Data", experiment.data], ["Conditions", experiment.conditions], ["Observed evidence", experiment.observed], ["Turning point", experiment.turningPoint], ["Decision", experiment.decision]].map(([heading, body], index) => <div key={heading} className={index >= 3 ? "rounded-lg border border-teal-200 bg-teal-50/60 p-4 dark:border-teal-900 dark:bg-teal-950/20" : "rounded-lg border border-border p-4"}><h3 className="font-semibold text-foreground">{heading}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></div>)}
            </CardContent>
          </Card>)}
        </div>
      </section>

      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Key lessons across four experiments</p><h2 className="mt-2 text-3xl font-semibold">What changed in the way the problem is framed</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2">{lessons.map(([title, text]) => <Card key={title}><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent><p className="text-sm leading-7 text-muted-foreground">{text}</p></CardContent></Card>)}</div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card><CardHeader><CardTitle>Engineering evidence established</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-7 text-muted-foreground"><p>The bounded work exercised synthetic data preparation, model training, registration, prediction/probability read-back, gated evidence custody, and selected local continuity controls.</p><p>A completed pipeline remains separate from model quality, policy value, recovery proof, and business acceptance.</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Current claim boundary</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-7 text-muted-foreground"><p><strong className="text-foreground">SYNTHETIC_LEARNING_AND_MLOPS_EVIDENCE_ONLY.</strong> The case does not establish operator behavior, production uplift, online-policy safety, production model quality, or readiness to deploy.</p><p>Experiment 3 remains paused with B1 incomplete. Experiment 4 is in progress and has not yet produced a new dataset or trained model.</p></CardContent></Card>
      </section>

      <div className="flex flex-wrap gap-6 text-sm font-medium text-primary"><Link href="/case-studies">Explore case studies →</Link><Link href="/machine-learning-decision-systems">Explore ML decision systems →</Link><Link href="/contact">Discuss a project →</Link></div>
    </main>
  </PageLayout>
}
