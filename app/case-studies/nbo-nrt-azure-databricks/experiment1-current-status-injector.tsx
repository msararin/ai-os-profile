"use client"

import { useEffect } from "react"

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim()
}

function createStatusSection() {
  const section = document.createElement("section")
  section.dataset.exp1CurrentStatus = "true"
  section.className = "rounded-xl border border-amber-600/30 bg-amber-500/5 p-5 sm:p-6"
  section.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h3 class="text-xl font-semibold text-foreground">Experiment 1 — Current Status</h3>
      <span class="inline-flex items-center rounded-full border border-amber-600/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-900 dark:text-amber-100">COMPLETED WITH QUALITY GAP</span>
    </div>
    <div class="mt-4 grid gap-4 text-sm leading-7 text-muted-foreground md:grid-cols-3">
      <div class="rounded-lg border border-emerald-600/25 bg-background p-4">
        <p class="font-semibold text-foreground">MLOps lifecycle objective — PASS</p>
        <p class="mt-2">Training, MLflow tracking, model registration and registered-model read-back were demonstrated successfully.</p>
      </div>
      <div class="rounded-lg border border-amber-600/25 bg-background p-4">
        <p class="font-semibold text-foreground">Model-quality objective — QUALITY GAP</p>
        <p class="mt-2">The baseline contained some predictive signal, but discrimination was weak-to-moderate and the default 0.50 threshold produced no positive predictions.</p>
      </div>
      <div class="rounded-lg border border-slate-500/30 bg-background p-4">
        <p class="font-semibold text-foreground">Data suitability — NOT FULLY ESTABLISHED</p>
        <p class="mt-2">The observed limitation may reflect model specification, synthetic data-generating assumptions, feature signal, or their interaction. Causal attribution was not established in Experiment 1.</p>
      </div>
    </div>
    <p class="mt-4 rounded-lg border border-border bg-background p-4 text-sm leading-7 text-muted-foreground"><strong class="text-foreground">Decision:</strong> close Experiment 1 as a bounded baseline experiment rather than continue threshold or model tuning. Its findings feed the currently active Experiment 2 investigation.</p>
  `
  return section
}

export function Experiment1CurrentStatusInjector() {
  useEffect(() => {
    const install = () => {
      const heading = Array.from(document.querySelectorAll<HTMLHeadingElement>("h2")).find(
        (node) => normalizedText(node.textContent) === "Data Preparation — From Multi-Agent Research to Model-Ready Volume",
      )
      if (!heading) return

      const root = heading.closest<HTMLDivElement>("div.space-y-10")
      if (!root || root.querySelector("[data-exp1-current-status]")) return

      root.insertBefore(createStatusSection(), root.firstElementChild)
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
