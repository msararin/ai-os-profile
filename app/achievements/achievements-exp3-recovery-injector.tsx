"use client"

import { useEffect } from "react"

function createRecoveryAchievement() {
  const card = document.createElement("details")
  card.dataset.achievementExp3Recovery = "true"
  card.open = true
  card.className = "group mb-6 rounded-xl border border-[#1F3A60]/20 bg-card text-card-foreground shadow-sm transition-colors hover:border-[#00B494]"
  card.innerHTML = `
    <summary class="cursor-pointer list-none p-6">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div class="min-w-0 flex-1">
          <p class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Sep 7, 2026 · AI-assisted coordination × MLOps</p>
          <h3 class="mt-2 text-xl font-semibold leading-7 text-foreground">Recovered Experiment 3 from durable artifacts and blocked resume on drift</h3>
          <p class="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">A separate Databricks notebook read versioned contracts, recovered 8,002 TRAIN rows, reproduced all four resume counts, and stopped a deliberately mismatched test. The exported code and outputs preserve the evidence.</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <span class="rounded-full border border-emerald-600/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-200">NOTEBOOK RECOVERY &amp; DRIFT TESTS PASSED</span>
            <span class="rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs font-semibold text-muted-foreground">Azure Databricks</span>
            <span class="rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs font-semibold text-muted-foreground">MLflow</span>
            <span class="rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs font-semibold text-muted-foreground">Governed Resume</span>
          </div>
        </div>
        <span class="text-xs font-semibold text-muted-foreground">Expand evidence ↓</span>
      </div>
    </summary>

    <div class="space-y-6 border-t border-border p-6 text-sm leading-7 text-muted-foreground">
      <div>
        <h4 class="font-semibold text-foreground">Why it matters</h4>
        <p class="mt-1">The recovery recipe and workflow position are stored outside notebook variables. The test demonstrated how to restore the TRAIN frame and block continuation when an asserted count differs.</p>
        <p class="mt-2">Two workstreams meet here: MLOps supplies the durable artifacts and runtime tests; AI-assisted coordination connects implementation, repository checks, information architecture and evidence review. The owner ran the notebook acceptance steps and retained scientific decision authority.</p>
      </div>

      <div>
        <h4 class="font-semibold text-foreground">Evidence / artifacts</h4>
        <ul class="mt-2 list-disc space-y-1 pl-5">
          <li>Versioned Contract and Recovery Recipe discovered and hash-checked; TRAIN recovered: <code>8,002</code> rows</li>
          <li>Resume contract: <code>7,660</code> context states · <code>5</code> actions · <code>38,300</code> candidate rows</li>
          <li>Durable checkpoint: <code>EXP3-B1-PAUSED-SAFE-001</code></li>
          <li>Positive assertions: <code>VALID</code>, no mismatches. Negative test: expected <code>38,301</code> versus observed <code>38,300</code> returned <code>DRIFT_DETECTED</code>; resume blocked and original expectations unchanged.</li>
        </ul>
        <p class="mt-3"><a class="font-semibold text-primary underline underline-offset-4" href="/case-studies/nbo-nrt-azure-databricks#exp3-durable-acceptance">Read the test sequence and evidence boundary in the use case →</a></p>
        <p class="mt-2"><a class="font-semibold text-primary underline underline-offset-4" href="/evidence/exp3-notebook-acceptance-20260907.json">View the evidence summary and source fingerprint →</a></p>
      </div>

      <details class="rounded-lg border border-border p-4">
        <summary class="cursor-pointer font-semibold text-foreground">Earlier Phase 1 implementation review · Sep 5, 2026</summary>
        <p class="mt-2">Historical disposition: PHASE 1 ACCEPTED WITH LIMITATIONS. These earlier reviews do not certify this notebook acceptance round or close every Phase 1 DoD item.</p>
        <ul class="mt-2 list-disc space-y-1 pl-5">
          <li>Reward Model V2 recovery: <code>CLOSED / PASS</code></li>
          <li>Repository validation: <code>18/18 PASS</code>; canonical <code>main</code> clean and synchronized after reviewed merge</li>
          <li>Independent Checker (role-separated, evidence-only): <code>CHECK_PASS_WITH_LIMITATIONS</code></li>
          <li>Prime Gate: <code>PHASE1_ACCEPT_WITH_LIMITATIONS</code></li>
          <li>Role separation retained: Codex executed; deterministic Enforcement controlled; Checker reviewed minimized evidence; Prime Gate set the claim ceiling; Owner retained custody authority.</li>
        </ul>
      </details>

      <div>
        <h4 class="font-semibold text-foreground">Skills demonstrated</h4>
        <ul class="mt-2 list-disc space-y-1 pl-5">
          <li>Durable MLOps checkpoint and resume architecture</li>
          <li>Git-to-Databricks evidence traceability</li>
          <li>Fail-closed drift validation</li>
          <li>Repository custody, backup, and clean source-of-truth management</li>
          <li>Role-separated AIOS governance with attributable receipts</li>
        </ul>
      </div>

      <div class="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
        <h4 class="font-semibold text-foreground">Evidence boundary</h4>
        <p class="mt-1">Scientific gate B1 remains active. The historical <code>THIN_SUPPORT</code> rule is not durably preserved. The export does not directly establish a runtime reset event, source-table version, or a full acceptance trace envelope; full Phase 1 DoD completion is not established. Inspected cells filter TRAIN and contain no TEST evaluation, no model or policy training, and no greedy action selection. No production readiness or uplift is claimed.</p>
      </div>

      <div>
        <h4 class="font-semibold text-foreground">Impact</h4>
        <p class="mt-1">The notebook test provides inspectable evidence for artifact discovery, data recovery and drift blocking. B1 support reconstruction and localization remain the next scientific work after the outstanding Phase 1 acceptance requirements are addressed.</p>
      </div>
    </div>
  `
  return card
}

export function AchievementsExp3RecoveryInjector() {
  useEffect(() => {
    const install = () => {
      if (document.querySelector("[data-achievement-exp3-recovery]")) return

      const formatNote = Array.from(document.querySelectorAll<HTMLElement>("section div"))
        .filter((node) => node.textContent?.includes("Format:") && node.textContent?.includes("evidence/artifacts"))
        .sort((left, right) => (left.textContent?.length ?? 0) - (right.textContent?.length ?? 0))[0]
      const formatPanel = formatNote?.closest<HTMLElement>(".rounded-lg") ?? formatNote
      if (!formatPanel) return

      formatPanel.insertAdjacentElement("afterend", createRecoveryAchievement())
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
