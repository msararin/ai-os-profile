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
          <p class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Wed, Aug 26, 2026 · Azure Databricks MLOps</p>
          <h3 class="mt-2 text-xl font-semibold leading-7 text-foreground">Clean-notebook reward-model recovery proven for NBO/NRT Experiment 3</h3>
          <p class="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">Recovered the Experiment 3 TRAIN execution path from durable Unity Catalog and MLflow artifacts without relying on prior notebook/Python memory, then completed post-load scoring successfully.</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <span class="rounded-full border border-emerald-600/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-200">PROVEN EXECUTION CONTINUITY</span>
            <span class="rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs font-semibold text-muted-foreground">Azure Databricks</span>
            <span class="rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs font-semibold text-muted-foreground">MLflow</span>
            <span class="rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs font-semibold text-muted-foreground">Recovery</span>
          </div>
        </div>
        <span class="text-xs font-semibold text-muted-foreground">Expand evidence ↓</span>
      </div>
    </summary>

    <div class="space-y-6 border-t border-border p-6 text-sm leading-7 text-muted-foreground">
      <div>
        <h4 class="font-semibold text-foreground">Why it matters</h4>
        <p class="mt-1">Notebook variables are disposable execution state. Durable continuation should come from governed data and persisted model artifacts, so a restarted session does not mean the model or training state has been lost.</p>
      </div>

      <div>
        <h4 class="font-semibold text-foreground">Evidence / artifacts</h4>
        <ul class="mt-2 list-disc space-y-1 pl-5">
          <li><code>00_RECOVERY_BOOTSTRAP = PASS</code></li>
          <li>TRAIN recovery: <code>PASS</code> · <code>8,002</code> rows</li>
          <li>MLflow model load: <code>PASS</code></li>
          <li>Post-load scoring: <code>PASS</code> · <code>5</code> rows</li>
          <li>MLflow run: <code>c764041889644a68acf02339b0faae54</code></li>
          <li>Model artifact: <code>reward_model_v1</code></li>
          <li>Recovery path: Unity Catalog TRAIN → MLflow artifact → UC Volume temp bridge → Spark ML model → scoring</li>
          <li>Serverless temp bridge: <code>/Volumes/adb_nbo_nrt_mlops_dev/models/mlflow_tmp</code></li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold text-foreground">Skills demonstrated</h4>
        <ul class="mt-2 list-disc space-y-1 pl-5">
          <li>Azure Databricks execution-state recovery</li>
          <li>Unity Catalog durable data handoff</li>
          <li>MLflow persisted-model recovery and read-back</li>
          <li>Serverless Spark ML troubleshooting</li>
          <li>MLOps continuity and claim-boundary discipline</li>
        </ul>
      </div>

      <div class="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
        <h4 class="font-semibold text-foreground">Evidence boundary</h4>
        <p class="mt-1">This proves recoverable execution of the persisted Experiment 3 reward model in a clean notebook. It does not prove personalization quality, held-out TEST performance, candidate-policy value, production policy safety, production readiness, causal uplift, or operator validity. TEST was not touched and no retraining was performed.</p>
      </div>

      <div>
        <h4 class="font-semibold text-foreground">Impact</h4>
        <p class="mt-1">Established a repeatable recovery path from governed data and persisted model artifacts so Experiment 3 work can continue after notebook/session loss without reconstructing the model from scratch or overstating what the recovery proves.</p>
      </div>
    </div>
  `
  return card
}

export function AchievementsExp3RecoveryInjector() {
  useEffect(() => {
    const install = () => {
      if (document.querySelector("[data-achievement-exp3-recovery]")) return

      const formatNote = Array.from(document.querySelectorAll<HTMLElement>("section div")).find((node) =>
        node.textContent?.includes("Format:") && node.textContent?.includes("evidence/artifacts"),
      )
      const timelineContainer = formatNote?.parentElement
      if (!timelineContainer) return

      formatNote.insertAdjacentElement("afterend", createRecoveryAchievement())
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
