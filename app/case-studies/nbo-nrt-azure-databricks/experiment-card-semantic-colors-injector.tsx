"use client"

import { useEffect } from "react"

type Tone = "foundation" | "investigation" | "complete" | "active"

const semanticCards: Array<{ keyPrefix: string; tone: Tone }> = [
  { keyPrefix: "Experiment 1 —", tone: "foundation" },
  { keyPrefix: "Experiment 2A —", tone: "investigation" },
  { keyPrefix: "Experiment 2B —", tone: "complete" },
  { keyPrefix: "Experiment 3 —", tone: "active" },
]

const toneClasses: Record<Tone, { idle: string; selected: string }> = {
  foundation: {
    idle: "border-slate-400/30 bg-slate-500/5 hover:border-slate-400/55 hover:bg-slate-500/10",
    selected: "border-slate-500 bg-slate-500/10 shadow-sm ring-1 ring-slate-500/20",
  },
  investigation: {
    idle: "border-amber-500/35 bg-amber-500/5 hover:border-amber-500/60 hover:bg-amber-500/10",
    selected: "border-amber-500 bg-amber-500/12 shadow-sm ring-1 ring-amber-500/25",
  },
  complete: {
    idle: "border-emerald-600/30 bg-emerald-500/5 hover:border-emerald-600/50 hover:bg-emerald-500/10",
    selected: "border-emerald-600 bg-emerald-500/10 shadow-sm ring-1 ring-emerald-600/20",
  },
  active: {
    idle: "border-indigo-500/35 bg-indigo-500/5 hover:border-indigo-500/60 hover:bg-indigo-500/10",
    selected: "border-indigo-500 bg-indigo-500/12 shadow-sm ring-1 ring-indigo-500/25",
  },
}

const baseClass = "group min-h-44 rounded-xl border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-primary/40"

export function ExperimentCardSemanticColorsInjector() {
  useEffect(() => {
    const install = () => {
      const selector = document.querySelector<HTMLElement>("[data-experiment-card-selector]")
      if (!selector) return

      const apply = () => {
        semanticCards.forEach(({ keyPrefix, tone }) => {
          const button = Array.from(selector.querySelectorAll<HTMLButtonElement>("button[data-card-key]"))
            .find((node) => (node.dataset.cardKey ?? "").startsWith(keyPrefix))
          if (!button) return

          const selected = button.getAttribute("aria-pressed") === "true"
          const desired = `${baseClass} ${selected ? toneClasses[tone].selected : toneClasses[tone].idle}`
          if (button.className !== desired) button.className = desired

          const eyebrow = button.querySelector<HTMLElement>("span.text-xs")
          if (!eyebrow) return
          const semanticText = tone === "foundation"
            ? "text-slate-600 dark:text-slate-300"
            : tone === "investigation"
              ? "text-amber-800 dark:text-amber-200"
              : tone === "complete"
                ? "text-emerald-800 dark:text-emerald-200"
                : "text-indigo-700 dark:text-indigo-200"
          const textBase = "text-xs font-bold uppercase tracking-[0.12em]"
          const desiredEyebrow = `${textBase} ${semanticText}`
          if (eyebrow.className !== desiredEyebrow) eyebrow.className = desiredEyebrow
        })
      }

      apply()
      if (selector.dataset.semanticColorsReady === "true") return
      selector.dataset.semanticColorsReady = "true"

      const observer = new MutationObserver(apply)
      observer.observe(selector, { attributes: true, subtree: true, attributeFilter: ["class", "aria-pressed"] })
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
