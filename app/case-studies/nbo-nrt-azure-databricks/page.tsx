import Link from "next/link"
import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "NBO / NRT Learning Journey | Sararin.ai",
  description: "From Azure Databricks to local PySpark: four experiments, a completed package-fit learning loop, and an honest comparison of ML with business rules.",
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
    title: "Close the learning loop around a business decision",
    status: "Completed · G1–G7 · frozen local synthetic scope",
    data: "120,000 synthetic customers across PRIMARY/NULL and three seeds, separated into TRAIN, VALIDATION, and EVALUATION. Models use 38 decision-time features; purchase outcomes, oracle values, and latent variables stay outside the feature set.",
    conditions: "Choose an eligible package or NO_OFFER at a usage check. Separate recommendations from actual purchases, compare against business baselines, retain an equal-reward control, and freeze the rules and completion criteria before execution.",
    observed: "One Random Forest algorithm/configuration was fitted separately for six scenario/seed combinations. Held-out evaluation covered 30,000 customers. In PRIMARY, ML beat NO_OFFER and UNIFORM in all three seeds, but beat CHEAPEST_SUITABLE in only two.",
    turningPoint: "Exact reload and reproduction agreement established engineering repeatability. Sensitivity showed that the small average advantage over the business rule could reverse when consumption assumptions changed.",
    decision: "Close all seven gates within the frozen local synthetic scope. Preserve mixed results and failed runs rather than tune retrospectively to make ML win. No further experiment is required for this closure.",
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
        <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">From Azure Databricks to local PySpark, four bounded experiments connected business decisions, data, machine learning, and reproducible engineering. Experiment 4 completed the learning loop—with mixed results against a strong business baseline.</p>
      </div>
    </header>

    <main className="mx-auto max-w-6xl space-y-12 px-6 py-12">
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Business question</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">What must be true before an offer decision is worth using?</h2></div>
        <div className="space-y-4 text-base leading-7 text-muted-foreground"><p>The case began by connecting synthetic data preparation, model evaluation, registration, and prediction read-back. Each experiment then exposed a different missing condition: usable model behavior, a credible decision world, sufficient context–action support, and finally a business-grounded definition of package fit.</p><p>The result is not a story of four increasingly successful models. It is a record of four evidence-led decisions: what the data allowed, what the test established, where the boundary failed, and why the next experiment changed direction.</p></div>
      </section>

      <section id="azure-to-local" className="rounded-xl border border-teal-200 bg-teal-50/60 p-6 dark:border-teal-900 dark:bg-teal-950/20">
        <h2 className="text-2xl font-semibold">From Azure Databricks to local PySpark</h2>
        <p className="mt-3 leading-7 text-muted-foreground">Cloud costs made continued self-funded experimentation impractical. The work moved to PySpark on a Mac, retaining saved artifacts and evidence while making each local recovery and reproduction check explicit. Experiment 3 stayed paused; Experiment 4 became a separate package-fit problem with its own frozen scope.</p>
        <p lang="th" className="mt-3 leading-7 text-muted-foreground">ย้ายจาก Azure มาทดลองบน Mac เพื่อลดต้นทุน โดยรักษาข้อมูล โมเดล และหลักฐานเดิมไว้ แล้วออกแบบ Experiment 4 จากการตัดสินใจทางธุรกิจ ก่อนกำหนดข้อมูล วิธีเปรียบเทียบ และเกณฑ์จบการทดลอง</p>
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

      <section id="experiment-4-results" aria-labelledby="exp4-result-title">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Experiment 4 · Completed 24 October 2026 · G1–G7</p>
        <h2 id="exp4-result-title" className="mt-2 text-3xl font-semibold">Reproducible results. Assumption-dependent business advantage.</h2>
        <p lang="th" className="mt-4 leading-7 text-muted-foreground">ปิดวงจรการทดลองครบแล้ว แม้ ML ยังไม่ชนะกฎธุรกิจอย่างสม่ำเสมอ เป้าหมายคือสร้างระบบที่ตรวจสอบ ทำซ้ำ และอธิบายข้อจำกัดได้ โดยไม่เปลี่ยนเกณฑ์ย้อนหลังเพื่อให้โมเดลชนะ</p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <Card><CardHeader><CardTitle>30,000 held-out customers</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-muted-foreground">PRIMARY and NULL, three seeds each. NULL passed the equal-expected-reward control within tolerance. No retraining or tuning on EVALUATION.</CardContent></Card>
          <Card><CardHeader><CardTitle>2 wins, 1 loss</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-muted-foreground">Against CHEAPEST_SUITABLE across the three PRIMARY seeds. The pooled advantage was about 2.68 satang per customer; it does not establish consistent superiority.</CardContent></Card>
          <Card><CardHeader><CardTitle>Exact repeatability in scope</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-muted-foreground">Fresh-process reload of all six fitted instances matched saved predictions and actions. One PRIMARY seed was regenerated and refitted with the original configuration.</CardContent></Card>
        </div>
        <details className="group/results mt-6 rounded-xl border border-border p-5">
          <summary className="cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">Results and interpretation / ผลและการตีความ <span className="ml-2 text-sm font-normal text-primary"><span className="group-open/results:hidden">Expand / ขยาย</span><span className="hidden group-open/results:inline">Collapse / พับ</span></span></summary>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <caption className="mb-3 text-left leading-6 text-muted-foreground">PRIMARY ALL · 15,000 held-out customers · simulated expected contribution, THB/customer. These values are not realized profit or measured real-world uplift.</caption>
              <thead><tr><th className="p-3">Measure</th><th className="p-3">THB/customer</th></tr></thead>
              <tbody className="divide-y divide-border">
                <tr><td className="p-3">ML expected contribution</td><td className="p-3">31.72992953</td></tr>
                <tr><td className="p-3">ML − NO_OFFER</td><td className="p-3">+2.25837166</td></tr>
                <tr><td className="p-3">ML − UNIFORM</td><td className="p-3">+1.46933900</td></tr>
                <tr><td className="p-3">ML − CHEAPEST_SUITABLE</td><td className="p-3">+0.02684681</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">CHEAPEST_SUITABLE is a reasoned business rule that prioritizes package coverage and price within the allowed actions. All policies obey the same eligibility constraints. The comparison tests whether ML adds value beyond an existing decision method.</p>
          <h3 className="mt-6 font-semibold">What sensitivity changed</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Six pre-specified settings changed costs, recommendation effect, or consumption assumptions while keeping customers, features, constraints, and policy weights fixed. No retraining or policy reselection followed the results.</p>
          <ul className="mt-3 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
            <li>Reducing consumption assumptions by 20% reversed the pooled ML advantage to −0.02226381 THB/customer. Two seeds still favored ML; the third seed’s loss outweighed their gains.</li>
            <li>Lower recommendation effect reduced the average advantage to +0.00425835 THB/customer. At recommendation coefficient 1.8 and consumption ×1.2, ML beat cheapest in all three seeds.</li>
            <li>Costs moved the absolute reward most within the tested ranges, but changed the ML-versus-cheapest gap little. Different perturbation sizes and untested interactions prevent a universal ranking of factor importance.</li>
          </ul>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">ML exceeded NO_OFFER and UNIFORM in every tested PRIMARY seed and sensitivity setting. A larger advantage over a baseline does not necessarily mean a larger absolute reward.</p>
          <h3 className="mt-6 font-semibold">What engineering established</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Fresh-process reload checked 60,321 candidate predictions across 30,000 customers: maximum prediction difference 0.0, zero action/top-set mismatches, including 34 exact-tie customers. PRIMARY/101 reproduction matched 18 tables semantically, with prediction differences 0.0 and no evaluation action mismatches. This was the same deterministic population on the same Mac, not additional independent customers.</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Missing NumPy and a macOS path-alias guard failure were retained alongside their fixes and passing evidence. The learning was to test the dependencies and filesystem behavior of the actual execution environment, while keeping scientific rules unchanged.</p>
        </details>
      </section>

      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Key lessons across four experiments</p><h2 className="mt-2 text-3xl font-semibold">What changed in the way the problem is framed</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2">{lessons.map(([title, text]) => <Card key={title}><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent><p className="text-sm leading-7 text-muted-foreground">{text}</p></CardContent></Card>)}</div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card><CardHeader><CardTitle>Engineering evidence established</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-7 text-muted-foreground"><p>Across the journey, the work exercised synthetic data preparation, training, registration and prediction read-back. Experiment 4 completed data validation, business baselines, fixed training, held-out evaluation, fresh-process model reload, one-seed reproduction, sensitivity, and evidence review.</p><p>A completed pipeline remains separate from model quality, policy value, recovery proof, and business acceptance.</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Current claim boundary</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-7 text-muted-foreground"><p><strong className="text-foreground">SYNTHETIC_LEARNING_AND_MLOPS_EVIDENCE_ONLY.</strong> The case does not establish operator behavior, production uplift, online-policy safety, production model quality, or readiness to deploy.</p><p>Experiment 3 remains paused with B1 incomplete. Experiment 4 is complete within its frozen local synthetic scope. Same-Mac reproduction does not establish a clean independent restore; that boundary is not an unfinished gate or a requirement to extend this experiment.</p></CardContent></Card>
      </section>

      <div className="flex flex-wrap gap-6 text-sm font-medium text-primary"><Link href="/case-studies">Explore case studies →</Link><Link href="/machine-learning-decision-systems">Explore ML decision systems →</Link><Link href="/contact">Discuss a project →</Link></div>
    </main>
  </PageLayout>
}
