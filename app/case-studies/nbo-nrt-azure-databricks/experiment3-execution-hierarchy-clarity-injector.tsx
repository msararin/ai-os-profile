"use client"

import { useEffect } from "react"

function clarifiedHeader() {
  return `
    <div class="w-full">
      <div class="flex flex-wrap items-center gap-2">
        <p class="text-xs font-bold uppercase tracking-[0.12em] text-amber-800 dark:text-amber-200">Experiment 3 execution track</p>
        <span class="inline-flex rounded-full border border-slate-400/40 bg-slate-500/5 px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:text-slate-300">NOT PART OF STEP 01–07</span>
      </div>
      <p class="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">The STEP 01–07 section above is the investigation / reasoning journey. The hierarchy below is the separate modeling delivery track.</p>

      <div class="mt-4 space-y-3" aria-label="Experiment 3 execution hierarchy at section start">
        <div class="rounded-lg border border-emerald-600/30 bg-background p-3 text-sm">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <strong class="text-foreground">3.2A Feature Contract</strong>
            <span class="font-semibold text-emerald-700 dark:text-emerald-300">CLOSED / PASS</span>
          </div>
        </div>

        <div class="rounded-lg border border-indigo-500/30 bg-background p-3 text-sm">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <strong class="text-foreground">3.2B Training Formulation</strong>
            <span class="font-semibold text-indigo-700 dark:text-indigo-300">IN PROGRESS</span>
          </div>
          <div class="mt-3 space-y-2 border-l-2 border-indigo-500/20 pl-4">
            <div class="rounded-md border border-amber-500/35 bg-amber-500/5 p-3">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <strong class="text-foreground">↳ 3.2B.1 Action × Context Support</strong>
                <span class="font-semibold text-amber-700 dark:text-amber-300">GUARDRAIL REQUIRED</span>
              </div>
            </div>
            <div class="rounded-md border border-red-500/30 bg-red-500/5 p-3">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <strong class="text-foreground">↳ Candidate-policy training</strong>
                <span class="font-semibold text-red-700 dark:text-red-300">NOT YET AUTHORIZED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span class="mt-4 inline-flex rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-900 dark:text-amber-100">CONDITIONALLY ACCEPTABLE / GUARDRAIL REQUIRED</span>
    </div>
  `
}

export function Experiment3ExecutionHierarchyClarityInjector() {
  useEffect(() => {
    const install = () => {
      const section = document.querySelector<HTMLElement>("[data-experiment3-support-guardrail]")
      if (!section || section.dataset.executionHierarchyClarified === "true") return

      const header = section.querySelector<HTMLElement>(":scope > div")
      if (!header) return

      header.className = ""
      header.innerHTML = clarifiedHeader()

      const duplicateHierarchy = section.querySelector<HTMLElement>(
        '[aria-label="Experiment 3 execution hierarchy"]',
      )
      duplicateHierarchy?.remove()

      section.dataset.executionHierarchyClarified = "true"
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
