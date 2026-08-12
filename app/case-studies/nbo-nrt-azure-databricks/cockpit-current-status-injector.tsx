"use client"

import { useEffect } from "react"

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim()
}

function createProgramStatus() {
  const section = document.createElement("section")
  section.dataset.cockpitCurrentStatus = "true"
  section.className = "border-b border-border bg-muted/10 py-8"
  section.innerHTML = `
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-2xl font-semibold tracking-tight text-foreground">Current experiment status</h2>
          <p class="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">Experiment 1 is closed as a bounded baseline with a quality gap. Experiment 2 is the currently active investigation lane.</p>
        </div>
        <span class="inline-flex items-center rounded-full border border-amber-600/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-900 dark:text-amber-100">EXPERIMENT 2 CURRENTLY ACTIVE</span>
      </div>
      <div class="mt-5 grid gap-4 md:grid-cols-2">
        <div class="rounded-xl border border-border bg-background p-5">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="font-semibold text-foreground">Experiment 1 — Volume-expanded synthetic baseline</p>
            <span class="inline-flex items-center rounded-full border border-amber-600/35 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-900 dark:text-amber-100">COMPLETED WITH QUALITY GAP</span>
          </div>
          <p class="mt-3 text-sm leading-6 text-muted-foreground">MLOps lifecycle execution passed. Model quality and the default operating threshold were insufficient for business use. Data suitability was not fully established, so the limitation is not attributed to the model alone.</p>
        </div>
        <div class="rounded-xl border border-amber-600/30 bg-amber-500/5 p-5">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="font-semibold text-foreground">Experiment 2 — Post-Silver low-volume baseline</p>
            <span class="inline-flex items-center rounded-full border border-amber-600/40 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-900 dark:text-amber-100">BASELINE UNDER INVESTIGATION</span>
          </div>
          <p class="mt-3 text-sm leading-6 text-muted-foreground">Data preparation, temporal split, Spark-native preprocessing, baseline training and TEST scoring are complete. Generalization failure is under investigation; temporal concept drift is not yet established as the cause.</p>
        </div>
      </div>
    </div>
  `
  return section
}

export function CockpitCurrentStatusInjector() {
  useEffect(() => {
    const install = () => {
      const dateLine = Array.from(document.querySelectorAll<HTMLParagraphElement>("p")).find((node) =>
        normalizedText(node.textContent).startsWith("Evidence on this page reconciled through"),
      )
      if (dateLine && normalizedText(dateLine.textContent) !== "Evidence on this page reconciled through 12 Aug 2026") {
        dateLine.textContent = "Evidence on this page reconciled through 12 Aug 2026"
      }

      const title = Array.from(document.querySelectorAll<HTMLHeadingElement>("h1")).find(
        (node) => normalizedText(node.textContent) === "NBO–NRT Telco on Azure Databricks",
      )
      const hero = title?.closest<HTMLElement>("section")
      if (!hero) return

      const main = hero.parentElement
      if (!main || main.querySelector("[data-cockpit-current-status]")) return
      hero.insertAdjacentElement("afterend", createProgramStatus())
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
