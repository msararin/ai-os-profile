"use client"

import { useEffect } from "react"

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim()
}

function applyHeroStatusAndLegend() {
  const title = Array.from(document.querySelectorAll<HTMLHeadingElement>("h1")).find(
    (node) => normalizedText(node.textContent) === "NBO–NRT Telco on Azure Databricks",
  )
  const hero = title?.closest<HTMLElement>("section")
  if (!hero) return

  const statusBadge = Array.from(hero.querySelectorAll<HTMLElement>("span, [data-slot='badge']")).find(
    (node) => normalizedText(node.textContent) === "In Progress",
  )
  if (statusBadge) {
    statusBadge.className = "inline-flex items-center rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-800 dark:text-indigo-200"
  }

  if (!hero.querySelector("[data-nbo-status-legend]")) {
    const badgeRow = title?.previousElementSibling
    if (badgeRow instanceof HTMLElement) {
      const legend = document.createElement("div")
      legend.dataset.nboStatusLegend = "true"
      legend.className = "mt-3 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-border bg-muted/20 px-3 py-2 text-[11px] font-medium text-muted-foreground"
      legend.innerHTML = `
        <span class="font-semibold text-foreground">Status colors:</span>
        <span><span class="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-500"></span>Passed / completed</span>
        <span><span class="mr-1 inline-block h-2 w-2 rounded-full bg-indigo-500"></span>Active / in progress</span>
        <span><span class="mr-1 inline-block h-2 w-2 rounded-full bg-amber-500"></span>Caution / issue</span>
        <span><span class="mr-1 inline-block h-2 w-2 rounded-full bg-red-500"></span>Blocked / failed</span>
        <span><span class="mr-1 inline-block h-2 w-2 rounded-full bg-slate-500"></span>Parked / future</span>
      `
      badgeRow.insertAdjacentElement("afterend", legend)
    }
  }
}

function applyEvidenceDate() {
  const dateLine = Array.from(document.querySelectorAll<HTMLParagraphElement>("p")).find((node) =>
    normalizedText(node.textContent).startsWith("Evidence on this page reconciled through"),
  )
  if (dateLine) dateLine.textContent = "Evidence on this page reconciled through 27 Aug 2026"
}

function reconcileExperiment2A() {
  const heading = Array.from(document.querySelectorAll<HTMLHeadingElement>("h2")).find(
    (node) => normalizedText(node.textContent) === "Experiment 2 — Data Preparation Status",
  )
  const root = heading?.closest<HTMLDivElement>("div.space-y-10")
  if (!heading || !root) return

  const intro = heading.parentElement
  const prepBadge = intro?.querySelector<HTMLElement>("[data-exp2-current-status]")
  if (prepBadge) {
    prepBadge.textContent = "DATA PREPARATION / HANDOFF — COMPLETE"
    prepBadge.className = "inline-flex items-center rounded-full border border-emerald-600/35 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-900 dark:text-emerald-100"
  }

  const overall = root.querySelector<HTMLElement>("[data-exp2-overall-status]")
  if (overall) {
    const overallBadge = Array.from(overall.querySelectorAll<HTMLElement>("span")).find((node) =>
      normalizedText(node.textContent) === "BASELINE UNDER INVESTIGATION" || normalizedText(node.textContent) === "GENERALIZATION ISSUE CHARACTERIZED",
    )
    if (overallBadge) {
      overallBadge.textContent = "GENERALIZATION ISSUE CHARACTERIZED"
      overallBadge.className = "inline-flex items-center rounded-full border border-amber-600/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-900 dark:text-amber-100"
    }

    const evaluationHeading = Array.from(overall.querySelectorAll<HTMLElement>("p")).find((node) =>
      normalizedText(node.textContent).startsWith("3. Model evaluation —"),
    )
    if (evaluationHeading) evaluationHeading.textContent = "3. Model evaluation — Generalization issue characterized"

    const investigationHeading = Array.from(overall.querySelectorAll<HTMLElement>("p")).find((node) =>
      normalizedText(node.textContent) === "Investigation status",
    )
    if (investigationHeading) investigationHeading.textContent = "Investigation conclusion"

    const synthesisHeading = Array.from(overall.querySelectorAll<HTMLElement>("p")).find((node) =>
      normalizedText(node.textContent) === "Current synthesis",
    )
    const synthesisText = synthesisHeading?.nextElementSibling
    if (synthesisText instanceof HTMLElement) {
      synthesisText.innerHTML = "The held-out generalization failure is established and the main candidate explanations were screened, but no single causal mechanism was proven. The supervised baseline is therefore retained as <strong class=\"text-foreground\">diagnostic evidence rather than promoted</strong>. Its learning informed the move into the separate policy-learning lanes used in Experiment 2B and Experiment 3."
    }
  }

  const selector = document.querySelector<HTMLElement>("[data-experiment-card-selector]")
  const card = Array.from(selector?.querySelectorAll<HTMLButtonElement>("button[data-card-key]") ?? []).find((node) =>
    (node.dataset.cardKey ?? "").startsWith("Experiment 2A —"),
  )
  const description = card?.querySelector<HTMLElement>("p")
  if (description) {
    description.textContent = "Supervised-model lane with completed data preparation and a characterized held-out generalization issue; retained as diagnostic evidence rather than promoted."
  }
}

function applyExperiment3TradeoffTone() {
  const panel = document.querySelector<HTMLElement>("[data-experiment3-panel]")
  if (!panel) return

  const label = Array.from(panel.querySelectorAll<HTMLElement>("p")).find(
    (node) => normalizedText(node.textContent) === "The core trade-off",
  )
  const section = label?.closest<HTMLElement>("section")
  if (!label || !section) return

  section.className = "rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-5 sm:p-6"
  label.className = "text-xs font-bold uppercase tracking-[0.12em] text-indigo-800 dark:text-indigo-200"
  const arrow = Array.from(section.querySelectorAll<HTMLElement>("span")).find(
    (node) => normalizedText(node.textContent) === "↔",
  )
  if (arrow) arrow.className = "mx-2 text-indigo-700 dark:text-indigo-300"
}

export function NboStatusReconciliationInjector() {
  useEffect(() => {
    const apply = () => {
      applyEvidenceDate()
      applyHeroStatusAndLegend()
      reconcileExperiment2A()
      applyExperiment3TradeoffTone()
    }

    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [])

  return null
}
