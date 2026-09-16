import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
export const metadata = { title: "LLM & Agent Systems | Sararin.ai", description: "Applied LLM workflows: contribution, architecture decisions, measured evidence and limitations." }
const capabilities = [
  ["LLM workflow design", "Turn a multi-step task into reviewable work with explicit context, outputs and decision boundaries."],
  ["Agent orchestration", "Coordinate capabilities and handoffs while preserving human authority over material decisions."],
  ["Evaluation and evidence", "Distinguish fluent output from a supported result. Keep validation, source limitations and uncertainty visible."],
  ["Reliability and recovery", "Test durable workflow state and recovery under bounded interruptions, keeping mechanical results separate from business value."],
]
export default function Page() { return <PageLayout>
  <section className="border-b border-border bg-gradient-to-b from-teal-500/10 to-background"><div className="mx-auto max-w-6xl px-6 py-16">
    <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Applied LLMs · Agent systems · Governed delivery</p>
    <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">LLM &amp; Agent Systems</h1>
    <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Multi-step AI work needs more than fluent output: reliable context, reviewable execution and decisions people can own. This portfolio shows how I connect those concerns in a working prototype.</p>
    <div className="mt-8 flex flex-wrap gap-5"><Link className="font-medium text-teal-700 underline" href="#contribution">My contribution</Link><Link className="font-medium text-teal-700 underline" href="/case-studies/evidence-discipline-ai-assisted-delivery">Read the evidence case study →</Link></div>
  </div></section>
  <section id="contribution" className="mx-auto max-w-6xl px-6 py-12"><h2 className="text-2xl font-semibold">My contribution and scope</h2>
    <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">I configured and combined existing LLM assistants, coding agents and local inference tools with a Git-backed context layer, evidence classification and a human-reviewed delivery workflow. The contribution is the operating design, integration and evaluation around those tools. This work does not claim authorship of the foundation models or agent products.</p>
    <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">Documented prototype work includes curated AI-readable context, a locally smoke-tested read-only MCP interface, and recovery testing. These demonstrate bounded engineering work; they do not establish enterprise adoption, general autonomy or production-scale performance.</p>
    <div className="mt-8 grid gap-5 md:grid-cols-2">{capabilities.map(([title,body])=><article key={title} className="rounded-xl border border-border bg-card p-6"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 leading-7 text-muted-foreground">{body}</p></article>)}</div>
  </section>
  <section className="border-y border-border bg-muted/30"><div className="mx-auto max-w-6xl px-6 py-12"><h2 className="text-2xl font-semibold">Architecture and trade-offs</h2>
    <ol className="mt-6 grid gap-4 sm:grid-cols-4">{["Frame the problem and context","Coordinate bounded execution","Evaluate outputs and evidence","Review results and decide"].map((label,i)=><li key={label} className="rounded-lg border border-border bg-background p-5"><span className="text-sm text-teal-700">0{i+1}</span><p className="mt-2 font-medium">{label}</p></li>)}</ol>
    <div className="mt-6 grid gap-5 md:grid-cols-2"><article><h3 className="font-semibold">Human review at material decisions</h3><p className="mt-2 leading-7 text-muted-foreground">Review adds time and limits autonomy, but preserves accountability when a plausible answer is not sufficient evidence to act.</p></article><article><h3 className="font-semibold">Bounded context access</h3><p className="mt-2 leading-7 text-muted-foreground">A curated read-only interface reduces what the system can access or change. Its narrower scope trades convenience for a more inspectable trust boundary.</p></article></div>
    <Link href="/architecture" className="mt-6 inline-block font-medium text-teal-700 underline">Explore the architecture principles →</Link>
  </div></section>
  <section className="mx-auto max-w-6xl px-6 py-12"><h2 className="text-2xl font-semibold">Selected evidence and limitations</h2>
    <div className="mt-6 grid gap-5 md:grid-cols-2"><article className="rounded-xl border border-border p-6"><h3 className="text-lg font-semibold">Workflow recovery</h3><p className="mt-3 leading-7 text-muted-foreground">Bounded interruption tests demonstrated recovery of workflow state across crashes and sessions. This supports the tested mechanism; continuous production reliability and human productivity gains remain unproven.</p></article><article className="rounded-xl border border-border p-6"><h3 className="text-lg font-semibold">Governance discovery</h3><p className="mt-3 leading-7 text-muted-foreground">Local discovery checks passed in 5 of 5 accepted repositories. Two stale or conflicting control scenarios failed closed. These are control-plane test results, not evidence of general agent autonomy.</p></article></div>
    <div className="mt-6 flex flex-wrap gap-5"><Link href="/achievements" className="font-medium text-teal-700 underline">Measured achievements →</Link><Link href="/how-we-build" className="font-medium text-teal-700 underline">How I work →</Link><Link href="/machine-learning-decision-systems" className="font-medium text-teal-700 underline">Explore ML &amp; Decision Systems →</Link></div>
  </section>
</PageLayout> }
