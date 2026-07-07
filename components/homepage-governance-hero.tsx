import Link from "next/link"

import { Button } from "@/components/ui/button"

const evidenceCards = [
  {
    label: "01",
    title: "POC to Production Gap",
    figure: "88%",
    text: "observed AI POCs did not reach widescale deployment. For every 33 AI POCs launched, only 4 graduated to production.",
    source: "IDC / Lenovo research, reported by CIO",
    why: "Governance and operational readiness determine whether pilots can scale.",
  },
  {
    label: "02",
    title: "POC Abandonment",
    figure: "30%+",
    text: "of GenAI projects were predicted to be abandoned after proof of concept due to poor data quality, inadequate risk controls, escalating costs, or unclear business value.",
    source: "Gartner",
    why: "Governance is not paperwork. It is part of how AI becomes viable.",
  },
  {
    label: "03",
    title: "Measurable Impact Gap",
    figure: "Only 5%",
    text: "of integrated AI pilots were reported to be extracting millions in value, while most remained without measurable P&L impact.",
    source: "MIT NANDA",
    why: "Without measurement, AI impact becomes a story, not evidence.",
  },
]

const governanceCapabilities = [
  "Readiness before scale",
  "Measurement before claims",
  "Cost/risk discipline before expansion",
  "Adoption inside real workflows",
]

const expectationSignals = [
  {
    value: "$2.6T–$4.4T",
    label: "potential annual value",
    source: "McKinsey potential value",
  },
  {
    value: "66%",
    label: "average throughput gain in realistic tasks",
    source: "NN/g task throughput",
  },
  {
    value: "25% faster / 40% higher-quality",
    label: "consultant outputs",
    source: "Harvard/BCG consultant tasks",
  },
]

export function HomepageGovernanceHero() {
  return (
    <section className="w-full max-w-[100vw] overflow-x-hidden border-b border-[#d8e3ee] bg-[#071827]">
      <div className="mx-auto w-full max-w-[100vw] px-4 py-14 sm:max-w-6xl sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        {/* Local homepage hero prototype: problem-first positioning for recruiters and hiring managers. */}
        <div className="min-w-0 max-w-[min(22rem,calc(100svw-2rem))] sm:max-w-4xl">
          <p className="mb-5 inline-flex max-w-full whitespace-normal break-words rounded-full border border-[#6ee7d8]/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase leading-relaxed tracking-[0.12em] text-[#a8fff3] sm:tracking-[0.18em]">
            Sararin Malaithong | AI Delivery Governance & Technical Program Leadership
          </p>

          <h1 className="break-words text-4xl font-semibold leading-tight text-white sm:text-5xl lg:leading-[1.04]">
            Organizations expect AI to create faster work, lower cost,
            better decisions, and new growth.
          </h1>

          <p className="mt-5 break-words text-lg leading-8 text-[#c9d7e6] sm:max-w-3xl sm:text-xl">
            I build AI delivery governance systems that close the gap between
            expected value and evidence-backed execution.
          </p>
        </div>

        <div className="mt-10 grid w-full min-w-0 max-w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:items-stretch">
          <div className="min-w-0 max-w-[min(22rem,calc(100svw-2rem))] overflow-hidden rounded-lg border border-[#5eead4] bg-white p-4 shadow-lg shadow-black/20 sm:max-w-full sm:p-5">
            <div className="border-b border-[#c8f7ef] pb-4">
              <p className="break-words text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                Expectation
              </p>
              <h2 className="mt-2 break-words text-2xl font-semibold text-[#10233f]">
                Faster work, lower cost, better decisions, new growth
              </h2>
            </div>

            <div className="mt-4 grid min-w-0 grid-cols-1 gap-3">
              {expectationSignals.map((signal) => (
                <div
                  key={signal.source}
                  className="min-w-0 rounded-md border border-[#c8f7ef] bg-[#f0fffb] p-4"
                >
                  <p className="break-words text-3xl font-semibold leading-tight text-[#0f766e]">
                    {signal.value}
                  </p>
                  <p className="mt-2 break-words text-sm font-medium leading-6 text-[#10233f]">
                    {signal.label}
                  </p>
                  <p className="mt-3 break-words border-t border-[#c8f7ef] pt-3 text-xs font-semibold uppercase leading-4 tracking-[0.08em] text-[#65758a]">
                    {signal.source}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 max-w-[min(22rem,calc(100svw-2rem))] justify-self-start overflow-hidden rounded-lg border border-[#f59e0b] bg-white p-4 shadow-lg shadow-black/20 sm:max-w-full sm:p-5">
            <div className="border-b border-[#fde3b0] pb-4">
              <p className="break-words text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
                Reality evidence
              </p>
              <h2 className="mt-2 break-words text-2xl font-semibold text-[#10233f]">
                Where expectation becomes a governance gap
              </h2>
            </div>

            <div className="mt-4 grid min-w-0 grid-cols-1 gap-3">
              {evidenceCards.map((card) => (
                <article
                  key={card.title}
                  className="min-w-0 max-w-full overflow-hidden rounded-md border border-[#fde3b0] bg-[#fffaf0] p-4"
                >
                  <p className="break-words text-xs font-semibold uppercase tracking-[0.14em] text-[#65758a]">
                    {card.label} / {card.title}
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-[#b45309]">
                    {card.figure}
                  </p>

                  <p className="mt-2 max-w-full break-words text-sm leading-6 text-[#46566a]">{card.text}</p>
                  <p className="mt-3 max-w-full break-words text-sm font-medium leading-6 text-[#10233f]">
                    {card.why}
                  </p>
                  <p className="mt-3 break-words border-t border-[#fde3b0] pt-3 text-xs font-semibold uppercase leading-4 tracking-[0.08em] text-[#65758a]">
                    {card.source}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 min-w-0 max-w-[min(22rem,calc(100svw-2rem))] overflow-hidden rounded-lg border border-white/15 bg-[#12324a] px-5 py-5 text-white shadow-lg shadow-black/20 sm:max-w-full sm:px-6">
          <p className="break-words text-sm font-semibold uppercase tracking-[0.16em] text-[#fbd38d]">
            What strong AI governance enables
          </p>
          <div className="mt-4 grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {governanceCapabilities.map((capability, index) => (
              <div
                key={capability}
                className="flex min-w-0 items-center gap-3 border-t border-white/15 pt-3 md:border-l md:border-t-0 md:pl-4 md:pt-0 first:md:border-l-0 first:md:pl-0"
              >
                <span className="text-sm font-semibold text-[#fbd38d]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 break-words text-sm font-medium sm:text-base">{capability}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex w-full min-w-0 max-w-[min(22rem,calc(100svw-2rem))] flex-col gap-3 sm:max-w-full sm:flex-row sm:flex-wrap">
          <Button asChild size="lg" className="h-auto max-w-full whitespace-normal bg-[#f59e0b] px-4 py-3 text-center font-semibold leading-snug text-[#071827] hover:bg-[#fbbf24] sm:w-auto sm:px-6 sm:py-2">
            <Link href="/architecture">View AIOS Governance Architecture</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-auto max-w-full whitespace-normal border-white/30 bg-white/10 px-4 py-3 text-center leading-snug text-white hover:bg-white/20 sm:w-auto sm:px-6 sm:py-2"
          >
            <Link href="/portfolio">See Case Studies</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
