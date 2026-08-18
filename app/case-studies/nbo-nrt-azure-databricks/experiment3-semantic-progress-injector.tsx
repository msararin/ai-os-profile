"use client"

import { useEffect } from "react"

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim()
}

export function Experiment3SemanticProgressInjector() {
  useEffect(() => {
    const apply = () => {
      const panel = document.querySelector<HTMLElement>("[data-experiment3-panel]")
      if (!panel) return

      const activeBadge = Array.from(panel.querySelectorAll<HTMLElement>("span")).find(
        (node) => normalizedText(node.textContent) === "CURRENTLY ACTIVE",
      )
      if (activeBadge) {
        activeBadge.className = "inline-flex items-center rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-800 dark:text-indigo-200"
      }

      const tradeoffLabel = Array.from(panel.querySelectorAll<HTMLElement>("p")).find(
        (node) => normalizedText(node.textContent) === "The core trade-off",
      )
      const tradeoffSection = tradeoffLabel?.closest<HTMLElement>("section")
      if (tradeoffSection) {
        tradeoffSection.className = "rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-5 sm:p-6"
        tradeoffLabel!.className = "text-xs font-bold uppercase tracking-[0.12em] text-indigo-800 dark:text-indigo-200"
        const arrow = Array.from(tradeoffSection.querySelectorAll<HTMLElement>("span")).find(
          (node) => normalizedText(node.textContent) === "↔",
        )
        if (arrow) arrow.className = "mx-2 text-indigo-700 dark:text-indigo-300"
      }

      const trail = panel.querySelector<HTMLDetailsElement>("[data-experiment3-investigation-trail]")
      if (!trail) return

      const trailBadge = Array.from(trail.querySelectorAll<HTMLElement>("span")).find(
        (node) => normalizedText(node.textContent) === "7 STEPS · VALUES INSIDE",
      )
      if (trailBadge) {
        trailBadge.className = "rounded-full border border-indigo-500/30 bg-indigo-500/5 px-3 py-1 text-xs font-semibold text-indigo-800 dark:text-indigo-200"
      }

      const progressCells = Array.from(trail.querySelectorAll<HTMLElement>("summary > div + div > span"))
      progressCells.forEach((cell) => {
        const text = normalizedText(cell.textContent)
        if (/^(01|02|03|04|05|06)\b/.test(text)) {
          cell.className = "rounded-md border border-emerald-600/30 bg-emerald-500/10 px-2 py-2 text-center text-emerald-800 dark:text-emerald-200"
        } else if (/^07\b/.test(text)) {
          cell.className = "rounded-md border border-indigo-500/40 bg-indigo-500/10 px-2 py-2 text-center text-indigo-800 ring-1 ring-indigo-500/20 dark:text-indigo-200"
        }
      })

      Array.from(trail.querySelectorAll<HTMLDetailsElement>(":scope > div > details")).forEach((step) => {
        const badge = step.querySelector<HTMLElement>("summary span")
        const text = normalizedText(badge?.textContent)
        if (!badge) return
        if (/^STEP 0[1-6]$/.test(text)) {
          badge.className = "inline-flex min-w-16 justify-center rounded-md bg-emerald-600 px-2 py-1 text-xs font-bold text-white"
        } else if (text === "STEP 07") {
          badge.className = "inline-flex min-w-16 justify-center rounded-md bg-indigo-600 px-2 py-1 text-xs font-bold text-white"
          step.className = "group rounded-lg border border-indigo-500/30 bg-indigo-500/5"
        }
      })
    }

    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "open"] })
    return () => observer.disconnect()
  }, [])

  return null
}
