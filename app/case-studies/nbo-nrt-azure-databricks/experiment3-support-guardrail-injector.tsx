"use client"

import { useEffect } from "react"

function learningTerm(label: string, mean: string, why: string, principle: string) {
  return `
    <span class="group relative inline-flex">
      <button type="button" class="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground underline decoration-dotted underline-offset-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/40" aria-label="${label} learning explanation">
        ${label}
      </button>
      <span role="tooltip" class="pointer-events-none invisible absolute left-0 top-full z-20 mt-2 w-[min(22rem,80vw)] rounded-lg border border-border bg-background p-3 text-left text-xs font-normal leading-5 text-muted-foreground opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <strong class="text-foreground">Mean:</strong> ${mean}<br/>
        <strong class="text-foreground">Why:</strong> ${why}<br/>
        <strong class="mt-2 block text-foreground">“${principle}”</strong>
      </span>
    </span>
  `
}

function createSupportSection() {
  const section = document.createElement("section")
  section.dataset.experiment3SupportGuardrail = "true"
  section.className = "rounded-xl border border-amber-500/35 bg-amber-500/5 p-5 sm:p-6"
  section.innerHTML = `
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.12em] text-amber-800 dark:text-amber-200">Experiment 3 execution path</p>
        <h3 class="mt-2 text-xl font-semibold text-foreground">Training Formulation → 3.2B.1 Action × Context Support</h3>
        <p class="mt-2 max-w-3xl text-xs leading-5 text-muted-foreground">Execution hierarchy — separate from the 7-step investigation trail above. The numbered investigation trail explains the reasoning journey; 3.2A / 3.2B / 3.2B.1 shows the modeling delivery hierarchy.</p>
      </div>
      <span class="inline-flex rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-900 dark:text-amber-100">CONDITIONALLY ACCEPTABLE / GUARDRAIL REQUIRED</span>
    </div>

    <p class="mt-5 max-w-4xl text-lg font-semibold leading-8 text-foreground">Coverage is broad, but evidence strength is uneven across context-action combinations. Unrestricted policy learning is not yet authorized.</p>
    <div class="mt-3 max-w-4xl space-y-2 text-sm leading-7 text-muted-foreground">
      <p><strong class="text-foreground">The data is usable for learning, but not every possible decision is equally supported.</strong></p>
      <p>The policy can learn across most customer-context/action combinations, but it should not be allowed to make unrestricted decisions where historical support is absent or very thin.</p>
    </div>

    <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Experiment 3.2B.1 status hierarchy">
      <div class="rounded-lg border border-emerald-600/30 bg-emerald-500/10 p-3">
        <p class="text-[11px] font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-200">DATA_USABLE</p>
        <p class="mt-1 text-sm font-bold text-emerald-900 dark:text-emerald-100">YES</p>
      </div>
      <div class="rounded-lg border border-amber-500/35 bg-amber-500/10 p-3">
        <p class="text-[11px] font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-200">CONDITIONAL_SUPPORT_IMBALANCE</p>
        <p class="mt-1 text-sm font-bold text-amber-900 dark:text-amber-100">DETECTED</p>
      </div>
      <div class="rounded-lg border border-red-500/35 bg-red-500/10 p-3">
        <p class="text-[11px] font-semibold uppercase tracking-wide text-red-800 dark:text-red-200">UNRESTRICTED_POLICY_LEARNING</p>
        <p class="mt-1 text-sm font-bold text-red-900 dark:text-red-100">NOT_YET_AUTHORIZED</p>
      </div>
      <div class="rounded-lg border border-amber-500/35 bg-amber-500/10 p-3">
        <p class="text-[11px] font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-200">SUPPORT_GUARDRAIL</p>
        <p class="mt-1 text-sm font-bold text-amber-900 dark:text-amber-100">REQUIRED</p>
      </div>
    </div>

    <div class="mt-5 flex flex-wrap gap-2" aria-label="Learning hover terms">
      ${learningTerm(
        "Action × Context Support",
        "จำนวน historical observations ที่รองรับว่า action หนึ่งเคยเกิดขึ้นจริงภายใต้ customer/context แบบนั้น",
        "model สามารถสร้าง prediction ได้แม้ข้อมูลรองรับน้อยมาก แต่ prediction ที่สร้างได้ไม่ได้แปลว่ามี evidence แข็งแรงพอให้ policy ตัดสินใจ",
        "Prediction availability is not the same as evidence strength.",
      )}
      ${learningTerm(
        "Support Guardrail",
        "กติกาที่จำกัดไม่ให้ policy เลือก action อย่างอิสระใน context ที่ historical evidence ไม่มีหรือบางเกินไป",
        "ป้องกัน policy จากการดูเหมือนมั่นใจในพื้นที่ที่จริง ๆ model กำลัง extrapolate มากกว่าการเรียนจาก evidence โดยตรง",
        "The policy should respect the strength of the evidence behind each decision.",
      )}
    </div>

    <div class="mt-6">
      <p class="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Experiment 3 business sequence</p>
      <div class="mt-3 grid gap-2 text-xs font-semibold sm:grid-cols-2 lg:grid-cols-6">
        <div class="rounded-md border border-emerald-600/30 bg-emerald-500/10 px-3 py-2 text-center text-emerald-800 dark:text-emerald-200">Feature Contract</div>
        <div class="rounded-md border border-indigo-500/40 bg-indigo-500/10 px-3 py-2 text-center text-indigo-800 dark:text-indigo-200">Training Formulation</div>
        <div class="rounded-md border border-slate-400/40 bg-slate-500/5 px-3 py-2 text-center text-slate-700 dark:text-slate-300">Candidate Generation</div>
        <div class="rounded-md border border-slate-400/40 bg-slate-500/5 px-3 py-2 text-center text-slate-700 dark:text-slate-300">Candidate Policy</div>
        <div class="rounded-md border border-slate-400/40 bg-slate-500/5 px-3 py-2 text-center text-slate-700 dark:text-slate-300">Held-out OPE</div>
        <div class="rounded-md border border-slate-400/40 bg-slate-500/5 px-3 py-2 text-center text-slate-700 dark:text-slate-300">Compare</div>
      </div>
    </div>

    <div class="mt-6" aria-label="Experiment 3 execution hierarchy">
      <p class="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Current execution hierarchy</p>
      <div class="mt-3 space-y-3">
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
    </div>

    <details class="group mt-6 rounded-lg border border-border bg-background">
      <summary class="cursor-pointer list-none p-4 font-semibold text-foreground">Technical evidence — support counts and Candidate Policy v1 guardrail <span class="ml-2 text-xs font-normal text-muted-foreground">Expand evidence ↓</span></summary>
      <div class="space-y-5 border-t border-border p-4 text-sm leading-6 text-muted-foreground">
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <p><strong class="text-foreground">Observed context-action cells:</strong> <code>109</code></p>
          <p><strong class="text-foreground">Possible observed-context × action cells:</strong> <code>110</code></p>
          <p><strong class="text-foreground">Minimum support:</strong> <code>1</code></p>
          <p><strong class="text-foreground">Average support:</strong> <code>91.74</code></p>
          <p><strong class="text-foreground">Maximum support:</strong> <code>684</code></p>
          <p><strong class="text-foreground">Zero-support cells:</strong> <code>1</code></p>
          <p><strong class="text-foreground">&lt;5 rows:</strong> <code>10 cells / 9.2%</code></p>
          <p><strong class="text-foreground">&lt;10 rows:</strong> <code>23 cells / 21.1%</code></p>
          <p><strong class="text-foreground">&lt;20 rows:</strong> <code>40 cells / 36.7%</code></p>
          <p><strong class="text-foreground">&lt;30 rows:</strong> <code>58 cells / 53.2%</code></p>
        </div>

        <div class="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
          <p class="font-semibold text-foreground">Zero-support combination</p>
          <p class="mt-1"><code>DIGITAL + APP_OPEN + WEB → ROAMING</code></p>
        </div>

        <div>
          <p class="font-semibold text-foreground">Candidate Policy v1 support guardrail</p>
          <div class="mt-3 overflow-x-auto">
            <table class="w-full min-w-[620px] text-left text-sm">
              <thead><tr class="border-b border-border"><th class="py-2 pr-4">Historical support</th><th class="py-2">Candidate Policy v1 treatment</th></tr></thead>
              <tbody>
                <tr class="border-b border-border"><td class="py-2 pr-4"><code>0 rows</code></td><td class="py-2 font-semibold text-red-700 dark:text-red-300">BLOCK</td></tr>
                <tr class="border-b border-border"><td class="py-2 pr-4"><code>1–9 rows</code></td><td class="py-2 font-semibold text-red-700 dark:text-red-300">RESTRICTED / INSUFFICIENT SUPPORT</td></tr>
                <tr class="border-b border-border"><td class="py-2 pr-4"><code>10–29 rows</code></td><td class="py-2 font-semibold text-amber-700 dark:text-amber-300">CAUTION / LOW CONFIDENCE</td></tr>
                <tr><td class="py-2 pr-4"><code>30+ rows</code></td><td class="py-2 font-semibold text-emerald-700 dark:text-emerald-300">NORMAL ELIGIBILITY</td></tr>
              </tbody>
            </table>
          </div>
          <p class="mt-3 text-xs leading-5">These thresholds are bounded Candidate Policy v1 learning guardrails for the current synthetic evidence environment. They do not prove production policy safety.</p>
        </div>
      </div>
    </details>

    <div class="mt-6 rounded-lg border border-amber-500/30 bg-background p-4 text-sm leading-6 text-muted-foreground">
      <p><strong class="text-foreground">Claim boundary:</strong> <code>SYNTHETIC_LEARNING_AND_MLOPS_EVIDENCE_ONLY</code></p>
      <p class="mt-2">Do not claim production uplift, causal business impact, production policy safety, unrestricted policy readiness, or that a model prediction is trustworthy merely because the model can produce it.</p>
    </div>
  `
  return section
}

export function Experiment3SupportGuardrailInjector() {
  useEffect(() => {
    const install = () => {
      const panel = document.querySelector<HTMLElement>("[data-experiment3-panel]")
      if (!panel || panel.querySelector("[data-experiment3-support-guardrail]")) return

      const trail = panel.querySelector<HTMLElement>("[data-experiment3-investigation-trail]")
      if (!trail) return

      trail.insertAdjacentElement("afterend", createSupportSection())
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
