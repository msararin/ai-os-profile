"use client"

import { useState } from "react"

const aiosLayerSteps = [
  {
    label: "Human Decision",
    caption:
      "Sararin defines intent, priority, risk appetite, and approval boundaries.",
  },
  {
    label: "Executive Orchestration",
    caption:
      "GPT frames tradeoffs, protects context, and reviews evidence.",
  },
  {
    label: "Stage Management",
    caption:
      "Hermes coordinates execution through Codex and delegated specialist workers.",
  },
  {
    label: "Agentic Release Governance Control",
    caption:
      "Scope, risk, checkpoints, and stop conditions are checked before execution.",
  },
  {
    label: "Scoped Implementation + Validation",
    caption:
      "Codex and delegated workers make bounded changes with validation evidence.",
  },
  {
    label: "Evidence, Audit & Observability",
    caption:
      "Outputs, traces, usage evidence, and review records are captured.",
  },
  {
    label: "Source-of-Truth",
    caption: "Validated decisions update GPT KB and Git records.",
  },
  {
    label: "Business Runway / Capability",
    caption:
      "Learning informs offers, capability growth, and next business direction.",
  },
] as const

export function AIOSInteractionExplainer() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = aiosLayerSteps[activeIndex]

  const showPrevious = () => {
    setActiveIndex((current) => Math.max(0, current - 1))
  }

  const showNext = () => {
    setActiveIndex((current) =>
      Math.min(aiosLayerSteps.length - 1, current + 1),
    )
  }

  return (
    <section className="border-t border-border py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Interaction explainer
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          How the system works across layers
        </h2>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
          <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)]">
            <div className="relative border-b border-border p-4 lg:border-b-0 lg:border-r">
              <div
                aria-hidden="true"
                className="absolute bottom-7 left-[2.15rem] top-7 w-px bg-border"
              />

              <ol>
                {aiosLayerSteps.map((step, index) => {
                  const isActive = index === activeIndex
                  const isComplete = index < activeIndex

                  return (
                    <li key={step.label} className="relative">
                      <button
                        type="button"
                        aria-current={isActive ? "step" : undefined}
                        onClick={() => setActiveIndex(index)}
                        className={[
                          "group relative flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-left transition-all duration-200",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          isActive
                            ? "translate-x-1 border border-primary/40 bg-primary/5"
                            : "border border-transparent opacity-55 hover:opacity-85",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-background text-xs font-semibold transition-all duration-200",
                            isActive
                              ? "scale-110 border-primary text-primary"
                              : isComplete
                                ? "border-primary/40 text-foreground"
                                : "border-border text-muted-foreground",
                          ].join(" ")}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="min-w-0 pt-1">
                          <span
                            className={[
                              "block text-sm transition-colors",
                              isActive
                                ? "font-semibold text-foreground"
                                : "font-medium text-muted-foreground",
                            ].join(" ")}
                          >
                            {step.label}
                          </span>

                          {isActive ? (
                            <span className="mt-2 block text-xs leading-5 text-muted-foreground lg:hidden">
                              {step.caption}
                            </span>
                          ) : null}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>

            <div className="hidden min-h-[22rem] flex-col justify-between p-6 lg:flex">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Step {String(activeIndex + 1).padStart(2, "0")} of{" "}
                  {String(aiosLayerSteps.length).padStart(2, "0")}
                </p>
                <h3 className="mt-4 max-w-xl text-2xl font-semibold tracking-tight text-foreground">
                  {activeStep.label}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                  {activeStep.caption}
                </p>
              </div>

              <div className="border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
                <p>Manual governance support, not full automation.</p>
                <p>Public page is a presentation surface, not source of truth.</p>
                <p>GPT KB + Git remain durable truth records.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-border bg-muted/20 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Step {activeIndex + 1} of {aiosLayerSteps.length}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={showPrevious}
                disabled={activeIndex === 0}
                className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={showNext}
                disabled={activeIndex === aiosLayerSteps.length - 1}
                className="rounded-md border border-primary/40 bg-primary/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
