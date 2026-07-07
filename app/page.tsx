import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  GitBranch,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const evidenceGroups = [
  {
    title: "What organizations expect from AI",
    cards: [
      {
        value: "$2.6T–$4.4T",
        label: "potential annual value",
        support: "across analyzed generative AI use cases",
        source: "McKinsey",
        boundary: "potential / estimated, not guaranteed ROI",
      },
      {
        value: "66%",
        label: "average throughput gain",
        support: "across realistic business-user tasks",
        source: "Nielsen Norman Group",
        boundary: "average / task-level, not organization-wide speed guarantee",
      },
      {
        value: "25% faster / 40% higher-quality",
        label: "consultant outputs",
        support: "within the AI capability frontier",
        source: "Harvard Business School / BCG field study",
        boundary: "structured consultant tasks, not all work",
      },
    ],
  },
  {
    title: "What organizations actually face",
    cards: [
      {
        value: "88%",
        label: "pilots do not scale",
        support: "observed AI POCs not reaching widescale deployment",
        source: "IDC / Lenovo, reported by CIO",
        boundary: "observed POCs, not “AI projects fail 88%”",
      },
      {
        value: "30%+",
        label: "readiness gaps kill POCs",
        support: "GenAI projects predicted to be abandoned after POC due to data, risk, cost, or value issues",
        source: "Gartner",
        boundary: "predicted, not universal actual failure rate",
      },
      {
        value: "Only 5%",
        label: "impact is hard to prove",
        support: "integrated AI pilots reported to extract major value",
        source: "MIT NANDA",
        boundary: "reported study result, not Sararin’s own proof",
      },
    ],
  },
]

const novicePositioningRows = [
  {
    is: "AI work people can trust",
    isNot: "Not a chatbot - because chatting is not governance",
    matters: "Can we trust it?",
  },
  {
    is: "AI work you can measure",
    isNot: "Not a prompt library - because prompts alone do not prove what happened",
    matters: "Can we review it?",
  },
  {
    is: "AI work you can audit",
    isNot: "Not an automation script - because automation can run without accountability",
    matters: "Can we prove it?",
  },
  {
    is: "AI work with review gates",
    isNot:
      "Not just a workflow diagram - because diagrams show intended steps, not whether the work was evidenced, reviewed, stopped, or safe to claim",
    matters: "Can we stop it safely?",
  },
  {
    is: "AI work with role separation",
    isNot:
      "Not just an Agent SDK - because SDKs help agents act, but AIOS governs whether the work is trusted, reviewed, and allowed to be claimed",
    matters: "Can we say this is done without overclaiming?",
  },
  {
    is: "AI work safe to operationalize",
    isNot:
      "Not just a tool that lets agents work for humans - because real AI operations need control, evidence, and human authority",
    matters: "Can this survive real governance?",
  },
]

const operatingModel = [
  {
    title: "Frame the work",
    description: "Turn ambiguous AI ambition into a clear outcome, role map, and decision boundary.",
    icon: Route,
  },
  {
    title: "Govern execution",
    description: "Route work through controls for source truth, evidence quality, cost, and human judgment.",
    icon: ShieldCheck,
  },
  {
    title: "Prove the result",
    description: "Keep delivery legible with validation, measured outcomes, and public-safe storytelling.",
    icon: BarChart3,
  },
]

const capabilities = [
  {
    title: "AI Delivery Governance",
    description:
      "Design the operating rules, gates, and evidence standards that let AI work move fast without becoming opaque.",
  },
  {
    title: "Transformation Leadership",
    description:
      "Translate strategy into executable programs across data reliability, modernization, cloud, and AI-enabled change.",
  },
  {
    title: "Evidence-Based Storytelling",
    description:
      "Convert complex systems work into recruiter-readable proof: what changed, how it was controlled, and why it matters.",
  },
]

const exploreLinks = [
  {
    href: "/architecture",
    title: "AIOS Architecture",
    description:
      "How the operating model separates intent, routing, execution, validation, evidence, and human judgment.",
  },
  {
    href: "/achievements",
    title: "Measured Results",
    description:
      "Selected outcomes with baselines, date context, and scope boundaries instead of unsupported claims.",
  },
  {
    href: "/portfolio",
    title: "Portfolio & Case Studies",
    description:
      "Anonymized transformation work, AI systems, governance patterns, and public-safe delivery evidence.",
  },
  {
    href: "/about",
    title: "Professional Background",
    description:
      "The career path behind the work: data reliability, banking modernization, cloud governance, and AI orchestration.",
  },
]

export default function HomePage() {
  return (
    <PageLayout>
      <section
        className="relative overflow-hidden border-b border-border"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--background)) 0%, #f4fbff 42%, #eaf4ff 72%, #f8fbfd 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "linear-gradient(90deg, rgba(16, 35, 63, 0.06) 0%, rgba(20, 184, 166, 0.08) 48%, rgba(37, 99, 235, 0.06) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pb-16 lg:px-8">
          <div className="max-w-4xl">
            <Badge variant="secondary" className="mb-5">
              Sararin Malaithong | AI Delivery Governance & Technical Program Leadership
            </Badge>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Organizations expect AI to create faster work, lower cost, better decisions, and new growth.
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-muted-foreground">
              {"What they often face instead: pilots that don't scale, impact that can't be measured, costs that are hard to control, and adoption that stalls in real workflows."}
            </p>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-foreground">
              {"I build AI delivery governance systems that close this gap—structured readiness assessment, impact measurement, cost and risk controls, and governed execution paths."}
            </p>
          </div>

          <div className="mt-8 flex max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="min-w-0 justify-between whitespace-normal sm:justify-center">
              <Link href="/architecture">
                <span className="min-w-0 break-words">View AIOS Governance Architecture</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-0 justify-between whitespace-normal sm:justify-center">
              <Link href="/portfolio">
                <span className="min-w-0 break-words">See Case Studies</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid max-w-full gap-5">
            {evidenceGroups.map((group) => (
              <section
                key={group.title}
                aria-labelledby={group.title.replaceAll(" ", "-").toLowerCase()}
                className="min-w-0 border border-border bg-card/90 shadow-sm backdrop-blur"
              >
                <div
                  className={
                    group.title.includes("actually")
                      ? "border-b border-blue-950/20 bg-gradient-to-r from-slate-950 via-blue-900 to-teal-800 px-5 py-4 text-white shadow-sm"
                      : "border-b border-teal-900/20 bg-gradient-to-r from-blue-950 via-cyan-800 to-teal-700 px-5 py-4 text-white shadow-sm"
                  }
                >
                  <h2
                    id={group.title.replaceAll(" ", "-").toLowerCase()}
                    className="break-words text-base font-semibold text-white"
                  >
                    {group.title}
                  </h2>
                </div>
                <div className="grid max-w-full gap-0 md:grid-cols-3">
                  {group.cards.map((item) => (
                    <div
                      key={`${group.title}-${item.value}`}
                      data-evidence-card
                      className="min-w-0 border-b border-border p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
                    >
                      <p className="max-w-full break-words text-3xl font-semibold leading-tight text-primary sm:text-4xl">
                        {item.value}
                      </p>
                      <p className="mt-3 break-words text-base font-semibold text-foreground">
                        {item.label}
                      </p>
                      <p className="mt-2 break-words text-sm leading-6 text-muted-foreground">
                        {item.support}
                      </p>
                      <p className="mt-4 break-words text-xs font-semibold uppercase tracking-normal text-primary/90">
                        Source: {item.source}
                      </p>
                      <p className="mt-1 break-words text-xs leading-5 text-muted-foreground">
                        Boundary: {item.boundary}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-10 overflow-hidden border border-amber-300 bg-white shadow-sm">
            <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="border-b border-amber-200 bg-gradient-to-br from-slate-950 via-blue-950 to-teal-900 p-6 text-white lg:border-b-0 lg:border-r lg:p-8">
                <p className="text-sm font-medium uppercase text-amber-200">
                  Novice guide
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  AIOS makes agentic AI trustworthy.
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-200">
                  Agent SDKs help AI do the work. AIOS governs whether the work is evidenced,
                  reviewed, controlled, and safe to claim.
                </p>
                <p className="mt-5 border-l-4 border-amber-300 pl-4 text-sm font-medium leading-6 text-amber-100">
                  It turns AI execution into measurable, auditable, governance-ready operations.
                </p>
              </div>

              <div className="grid min-w-0 gap-0 lg:grid-cols-3">
                <div className="min-w-0 border-b border-border lg:border-b-0 lg:border-r">
                  <div className="border-b border-teal-200 bg-teal-50 px-4 py-3">
                    <h3 className="break-words text-sm font-semibold uppercase tracking-normal text-teal-800">
                      What is AIOS
                    </h3>
                  </div>
                  <div className="divide-y divide-border">
                    {novicePositioningRows.map((row) => (
                      <p key={row.is} className="min-h-20 break-words px-4 py-4 text-sm font-medium leading-6 text-foreground">
                        {row.is}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="min-w-0 border-b border-border lg:border-b-0 lg:border-r">
                  <div className="border-b border-amber-200 bg-amber-50 px-4 py-3">
                    <h3 className="break-words text-sm font-semibold uppercase tracking-normal text-amber-800">
                      What AIOS is not
                    </h3>
                  </div>
                  <div className="divide-y divide-border">
                    {novicePositioningRows.map((row) => (
                      <p key={row.isNot} className="min-h-20 break-words px-4 py-4 text-sm leading-6 text-muted-foreground">
                        {row.isNot}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="border-b border-blue-200 bg-blue-50 px-4 py-3">
                    <h3 className="break-words text-sm font-semibold uppercase tracking-normal text-blue-900">
                      Why AIOS matters
                    </h3>
                  </div>
                  <div className="divide-y divide-border">
                    {novicePositioningRows.map((row) => (
                      <p key={row.matters} className="min-h-20 break-words px-4 py-4 text-sm font-medium leading-6 text-foreground">
                        {row.matters}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-10 overflow-hidden border border-border bg-card/90 shadow-sm backdrop-blur">
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-border p-6 lg:border-b-0 lg:border-r lg:p-8">
                <p className="text-sm font-medium uppercase text-muted-foreground">
                  What I make visible
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                  AI delivery is not only prompts and output. It is a managed system of decisions.
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  This portfolio shows the governance layer most AI demos hide: how work is framed,
                  routed, checked, measured, and translated into a story a hiring team can trust.
                </p>
              </div>

              <div className="grid gap-0 sm:grid-cols-3 lg:grid-cols-1">
                {operatingModel.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <div
                      key={item.title}
                      className="border-b border-border p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b lg:border-r-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center border border-primary/20 bg-primary/5 text-primary">
                          <Icon className="size-5" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            0{index + 1}
                          </p>
                          <h3 className="mt-1 text-base font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Badge variant="outline">Positioning</Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
                From transformation complexity to governed AI delivery.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                My background connects delivery leadership with hands-on AI operating design.
                The through-line is practical governance: making complex work executable, observable,
                and explainable without slowing it into bureaucracy.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="border border-border bg-muted/30 p-5">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      The public story is about capability, not hype.
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      AIOS is presented as a working proof-of-concept and professional evidence trail,
                      not a commercial product, production claim, or private-system reveal.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-border bg-muted/30 p-5">
                <div className="flex items-start gap-3">
                  <GitBranch className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      The work connects executive intent to delivery evidence.
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Visitors can quickly see the bridge from strategy, governance, and role routing
                      to validation, learning loops, and measurable outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary">Core capabilities</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
              The value is the operating system around the AI.
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {capabilities.map((item) => (
              <Card key={item.title} className="rounded-lg">
                <CardHeader>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  {item.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Badge variant="outline">Evidence trail</Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
                Explore the proof, then the person behind it.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Start with the operating model if you want the system view. Start with results if you
                want business impact. Start with background if you want the career arc.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {exploreLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block border border-border bg-card p-5 transition-colors hover:border-primary/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <ArrowRight
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Open to senior AI and transformation roles
              </Badge>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground">
                Useful where AI ambition needs delivery discipline, not another demo.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                I am exploring senior roles in AI/data transformation, delivery governance,
                and enterprise technology modernization.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild size="lg" className="justify-between">
                <Link href="https://www.linkedin.com/in/msararin" target="_blank">
                  Connect on LinkedIn
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">
                  View full profile
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
