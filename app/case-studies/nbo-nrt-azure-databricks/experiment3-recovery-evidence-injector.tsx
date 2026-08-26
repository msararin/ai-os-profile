"use client"

import { useEffect } from "react"

function createRecoveryEvidence() {
  const details = document.createElement("details")
  details.dataset.experiment3RecoveryEvidence = "true"
  details.className = "group rounded-lg border border-emerald-600/30 bg-background"
  details.open = true
  details.innerHTML = `
    <summary class="cursor-pointer list-none p-5">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.12em] text-emerald-800 dark:text-emerald-200">Proven evidence · execution continuity</p>
          <p class="mt-2 font-semibold text-foreground">00_RECOVERY_BOOTSTRAP — durable recovery from a clean notebook</p>
          <p class="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">The Experiment 3 reward-model execution path was reconstructed from durable artifacts without relying on prior notebook/Python memory.</p>
        </div>
        <span class="rounded-full border border-emerald-600/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-200">PASS</span>
      </div>
    </summary>
    <div class="space-y-5 border-t border-border p-5 text-sm leading-7 text-muted-foreground">
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <p><strong class="text-foreground">TRAIN recovery:</strong> <code>PASS</code> · <code>8,002</code> rows</p>
        <p><strong class="text-foreground">MLflow model load:</strong> <code>PASS</code></p>
        <p><strong class="text-foreground">Post-load scoring:</strong> <code>PASS</code> · <code>5</code> rows</p>
        <p><strong class="text-foreground">MLflow run:</strong> <code>c764041889644a68acf02339b0faae54</code></p>
        <p><strong class="text-foreground">Model artifact:</strong> <code>reward_model_v1</code></p>
        <p><strong class="text-foreground">Runtime:</strong> Azure Databricks Serverless · MLflow <code>3.8.1</code></p>
      </div>

      <div class="rounded-md border border-border bg-muted/20 p-4">
        <p class="font-semibold text-foreground">Recovered execution contract</p>
        <p class="mt-2 font-mono text-xs leading-6 sm:text-sm">Unity Catalog TRAIN → MLflow model artifact → UC Volume temp bridge → Spark ML model → scoring</p>
        <p class="mt-2">Serverless Spark ML recovery used <code>MLFLOW_DFS_TMP</code> / <code>dfs_tmpdir</code> at <code>/Volumes/adb_nbo_nrt_mlops_dev/models/mlflow_tmp</code>.</p>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <p class="font-semibold text-foreground">MLOps lesson</p>
          <p class="mt-1">Notebook variables are disposable execution state. Durable continuation comes from rebuilding data from Unity Catalog and reloading the persisted model from MLflow; a lost Python variable is therefore recoverable rather than a lost model.</p>
        </div>
        <div>
          <p class="font-semibold text-foreground">Evidence boundary</p>
          <p class="mt-1">This proves recoverable execution of the persisted Experiment 3 reward model in a clean notebook. It does not prove personalization quality, held-out TEST performance, candidate-policy value, online safety, production readiness, causal uplift, or operator validity. TEST was not touched and no retraining was performed.</p>
        </div>
      </div>

      <div class="rounded-md border border-indigo-500/25 bg-indigo-500/5 p-4">
        <p class="font-semibold text-foreground">Next execution boundary — unchanged</p>
        <p class="mt-1">Run the representational-capacity probe on TRAIN only: score the same context across <code>BUNDLE</code>, <code>DATA</code>, <code>LOYALTY</code>, <code>ROAMING</code>, and <code>VOICE</code>; rank predicted reward; then inspect winner counts and <code>distinct_winning_actions</code>. Recovery evidence does not authorize Candidate Generation or change the existing B1/B2 gates.</p>
      </div>
    </div>
  `
  return details
}

function createExecutionContinuityNote() {
  const note = document.createElement("details")
  note.dataset.experiment3RecoveryExecutionNote = "true"
  note.className = "rounded-md border border-emerald-600/30 bg-background"
  note.innerHTML = `
    <summary class="cursor-pointer list-none p-3">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <strong class="text-foreground">Execution continuity evidence — reward-model recovery</strong>
        <span class="font-semibold text-emerald-700 dark:text-emerald-300">PROVEN EVIDENCE</span>
      </div>
      <p class="mt-1 text-xs text-muted-foreground">Durability proof for the current Experiment 3 execution path; this is evidence under B, not a new A–F stage or a training-authorization change. <span class="font-semibold">Expand ↓</span></p>
    </summary>
    <div class="border-t border-border p-3 text-sm leading-6 text-muted-foreground">
      <p><strong class="text-foreground">Current result:</strong> a clean notebook recovered <code>8,002</code> TRAIN rows from Unity Catalog, loaded MLflow run <code>c764041889644a68acf02339b0faae54</code> / <code>reward_model_v1</code> through the UC Volume Serverless temp bridge, and scored <code>5</code> rows successfully.</p>
      <p class="mt-2"><strong class="text-foreground">Verdict:</strong> <code>00_RECOVERY_BOOTSTRAP = PASS</code> · TRAIN recovery PASS · model load PASS · post-load scoring PASS.</p>
      <p class="mt-2"><strong class="text-foreground">Taxonomy / boundary:</strong> proven execution-continuity evidence only. B1 remains guardrail-required, B2 remains not yet authorized, downstream C–F statuses are unchanged, TEST remains untouched, and no retraining or production claim is introduced.</p>
    </div>
  `
  return note
}

export function Experiment3RecoveryEvidenceInjector() {
  useEffect(() => {
    const install = () => {
      const experiment3Panel = document.querySelector<HTMLElement>("[data-experiment3-panel]")
      if (!experiment3Panel) return

      if (!experiment3Panel.querySelector("[data-experiment3-recovery-evidence]")) {
        const investigationTrail = experiment3Panel.querySelector<HTMLElement>("[data-experiment3-investigation-trail]")
        if (investigationTrail) {
          investigationTrail.insertAdjacentElement("afterend", createRecoveryEvidence())
        }
      }

      const executionSequence = experiment3Panel.querySelector<HTMLElement>(
        '[aria-label="Experiment 3 A-F modeling execution sequence"]',
      )
      if (!executionSequence || experiment3Panel.querySelector("[data-experiment3-recovery-execution-note]")) return

      const trainingFormulation = Array.from(executionSequence.querySelectorAll<HTMLDetailsElement>(":scope > details")).find(
        (details) => details.querySelector("summary")?.textContent?.includes("B — Training Formulation"),
      )
      const trainingBody = trainingFormulation?.querySelector<HTMLElement>(":scope > div")
      if (trainingBody) {
        trainingBody.insertAdjacentElement("afterbegin", createExecutionContinuityNote())
      }
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
