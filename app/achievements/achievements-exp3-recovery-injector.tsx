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
          <p class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Sat, Sep 5, 2026 · Azure Databricks MLOps</p>
          <h3 class="mt-2 text-xl font-semibold leading-7 text-foreground">Made Experiment 3 pause-safe, resumable, and traceable from one clean repository</h3>
          <p class="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">Completed the bounded Phase 1 control plane for Experiment 3: durable contracts and checkpoints now reconnect Git source, Databricks validation runs, and review receipts without relying on notebook memory.</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <span class="rounded-full border border-emerald-600/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-200">PHASE 1 ACCEPTED WITH LIMITATIONS</span>
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
        <p class="mt-1">Long-running ML work should survive a paused notebook, a new session, or a handoff. The experiment can now resume from versioned source and durable evidence, while drift and unsupported scientific claims fail closed.</p>
      </div>

      <div>
        <h4 class="font-semibold text-foreground">Evidence / artifacts</h4>
        <ul class="mt-2 list-disc space-y-1 pl-5">
          <li>Reward Model V2 recovery: <code>CLOSED / PASS</code> · TRAIN <code>8,002</code> rows</li>
          <li>Resume contract: <code>7,660</code> context states · <code>5</code> actions · <code>38,300</code> candidate rows</li>
          <li>Durable checkpoint: <code>EXP3-B1-PAUSED-SAFE-001</code></li>
          <li>Fail-closed control: expected <code>38,301</code> correctly returned <code>DRIFT_DETECTED</code></li>
          <li>Repository validation: <code>18/18 PASS</code>; canonical <code>main</code> clean and synchronized after reviewed merge</li>
          <li>Independent Checker (role-separated, evidence-only): <code>CHECK_PASS_WITH_LIMITATIONS</code></li>
          <li>Prime Gate: <code>PHASE1_ACCEPT_WITH_LIMITATIONS</code></li>
          <li>Role separation retained: Codex executed; deterministic Enforcement controlled; Checker reviewed minimized evidence; Prime Gate set the claim ceiling; Owner retained custody authority.</li>
        </ul>
      </div>

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
        <p class="mt-1">This is an MLOps control-plane achievement, not completion of Experiment 3. Scientific gate B1 remains active. The historical <code>THIN_SUPPORT</code> rule is not durably preserved and the source-table version was not captured. TEST was untouched; no model or policy training, greedy policy construction, deployment-readiness, production, or uplift claim is made.</p>
      </div>

      <div>
        <h4 class="font-semibold text-foreground">Impact</h4>
        <p class="mt-1">Experiment 3 can now pause and resume at B1 from a clean canonical repository with durable checkpoints, reproducible validation, recovery backup, and role-separated governance evidence—making the next scientific step safer without claiming that step is finished.</p>
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
