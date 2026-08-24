"use client"

import { useEffect } from "react"

function clarifiedHeader() {
  return `
    <div class="w-full">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.12em] text-indigo-800 dark:text-indigo-200">Modeling Execution Track</p>
        <h3 class="mt-2 text-xl font-semibold text-foreground">What we are building and where we are now</h3>
        <p class="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">This is the delivery view of Experiment 3. It is separate from the STEP 01–07 investigation trail, which explains how we reasoned and validated the approach.</p>
      </div>

      <div class="mt-4 space-y-3" aria-label="Experiment 3 modeling execution track">
        <div class="rounded-lg border border-emerald-600/30 bg-background p-3 text-sm">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <strong class="text-foreground">Feature Contract</strong>
            <span class="font-semibold text-emerald-700 dark:text-emerald-300">CLOSED / PASS</span>
          </div>
        </div>

        <div class="rounded-lg border border-indigo-500/30 bg-background p-3 text-sm">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <strong class="text-foreground">Training Formulation</strong>
            <span class="font-semibold text-indigo-700 dark:text-indigo-300">IN PROGRESS</span>
          </div>
          <div class="mt-3 space-y-2 border-l-2 border-indigo-500/20 pl-4">
            <div class="rounded-md border border-amber-500/35 bg-amber-500/5 p-3">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <strong class="text-foreground">↳ Action × Context Support</strong>
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
