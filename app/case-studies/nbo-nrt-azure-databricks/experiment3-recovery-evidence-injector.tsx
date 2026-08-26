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
        <p class="font-semibold text-foreground">Execution handoff</p>
        <p class="mt-1">Recovery is now proven. The next TRAIN-only step was the representational-capacity probe: score each fixed context across <code>BUNDLE</code>, <code>DATA</code>, <code>LOYALTY</code>, <code>ROAMING</code>, and <code>VOICE</code> and inspect whether the winning action changes with context. That probe is recorded immediately below.</p>
      </div>
    </div>
  `
  return details
}

function createRepresentationalCapacityEvidence() {
  const details = document.createElement("details")
  details.dataset.experiment3RepresentationalCapacityEvidence = "true"
  details.className = "group rounded-lg border border-amber-600/30 bg-background"
  details.open = true
  details.innerHTML = `
    <summary class="cursor-pointer list-none p-5">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.12em] text-amber-800 dark:text-amber-200">Diagnostic evidence · personalization capacity</p>
          <p class="mt-2 font-semibold text-foreground">01_REPRESENTATIONAL_CAPACITY_PROBE — action preference does not change with context</p>
          <p class="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">The persisted baseline reward model was tested on TRAIN only by holding each context fixed, scoring all five actions, and ranking predicted reward within that same context.</p>
        </div>
        <span class="rounded-full border border-amber-600/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-800 dark:text-amber-200">FORMULATION LIMITATION FOUND</span>
      </div>
    </summary>
    <div class="space-y-5 border-t border-border p-5 text-sm leading-7 text-muted-foreground">
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <p><strong class="text-foreground">TRAIN contexts:</strong> <code>8,002</code></p>
        <p><strong class="text-foreground">Actions scored:</strong> <code>5</code> per context</p>
        <p><strong class="text-foreground">Distinct winning actions:</strong> <code>1</code></p>
        <p><strong class="text-foreground">Dominant action:</strong> <code>LOYALTY</code></p>
        <p><strong class="text-foreground">LOYALTY winning contexts:</strong> <code>8,002</code></p>
        <p><strong class="text-foreground">Dominant winner share:</strong> <code>100.0000%</code></p>
        <p><strong class="text-foreground">TEST:</strong> <code>NOT TOUCHED</code></p>
        <p><strong class="text-foreground">Retraining in probe:</strong> <code>NO</code></p>
      </div>

      <div class="rounded-md border border-amber-600/30 bg-amber-500/5 p-4">
        <p class="font-semibold text-foreground">What the result means</p>
        <p class="mt-2">The baseline reward model does <strong class="text-foreground">not personalize action preference across context</strong>. Predicted reward probabilities may still change when customer/context features change, but the ranking of the five actions does not: <code>LOYALTY</code> wins for every one of the <code>8,002</code> TRAIN contexts.</p>
        <p class="mt-2">This distinction matters: <strong class="text-foreground">personalization requires the preferred action to change with context, not merely the probability score to change.</strong></p>
      </div>

      <div class="rounded-md border border-border bg-muted/20 p-4">
        <p class="font-semibold text-foreground">Why the main-effects formulation produces this limitation</p>
        <p class="mt-2">The persisted Spark Logistic Regression pipeline contains context main effects plus a <code>chosen_action</code> main effect, but no explicit <code>context × action</code> interaction terms. Conceptually, its score can be written as:</p>
        <p class="mt-2 font-mono text-xs sm:text-sm">score(x, a) = β_context · x + β_action · a + b</p>
        <p class="mt-2">When five actions are compared for the <strong class="text-foreground">same context</strong>, the context contribution <code>β_context · x</code> is shared across all five alternatives. The action ordering is therefore driven by the learned action contribution rather than by context-specific action preference. The observed result — <code>LOYALTY</code> winning <code>100%</code> of contexts — is consistent with that representational constraint.</p>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <p class="font-semibold text-foreground">Do not confuse this with model accuracy</p>
          <p class="mt-1">This probe is not a held-out predictive-performance verdict. It diagnoses whether the current formulation can express different best actions for different contexts. A model can vary its predicted probabilities and still fail this personalization-capacity test.</p>
        </div>
        <div>
          <p class="font-semibold text-foreground">Evidence boundary</p>
          <p class="mt-1">The result is bounded to the synthetic TRAIN environment and the persisted baseline formulation. It does not establish TEST performance, production uplift, causal effectiveness, online policy safety, operator validity, or production readiness.</p>
        </div>
      </div>

      <div class="rounded-md border border-indigo-500/25 bg-indigo-500/5 p-4">
        <p class="font-semibold text-foreground">Next formulation step</p>
        <p class="mt-1">Repair personalization capacity before Candidate Generation by introducing controlled <code>context × action</code> interactions, then retrain on TRAIN only and rerun the same probe. The purpose is to test whether winner identity begins to vary meaningfully across context. Existing B1/B2 gates and downstream C–F statuses remain unchanged until that evidence exists.</p>
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
      <p class="mt-2"><strong class="text-foreground">Taxonomy / boundary:</strong> proven execution-continuity evidence only. B1 remains guardrail-required, B2 remains not yet authorized, downstream C–F statuses are unchanged, TEST remains untouched, and no production claim is introduced.</p>
    </div>
  `
  return note
}

function createPersonalizationCapacityNote() {
  const note = document.createElement("details")
  note.dataset.experiment3PersonalizationCapacityNote = "true"
  note.className = "rounded-md border border-amber-600/30 bg-background"
  note.open = true
  note.innerHTML = `
    <summary class="cursor-pointer list-none p-3">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <strong class="text-foreground">Personalization-capacity evidence — main-effects baseline</strong>
        <span class="font-semibold text-amber-700 dark:text-amber-300">LIMITATION FOUND</span>
      </div>
      <p class="mt-1 text-xs text-muted-foreground"><code>LOYALTY</code> wins all <code>8,002</code> TRAIN contexts; the current formulation changes scores but not the identity of the best action. <span class="font-semibold">Expand ↓</span></p>
    </summary>
    <div class="space-y-3 border-t border-border p-3 text-sm leading-6 text-muted-foreground">
      <p><strong class="text-foreground">Observed probe:</strong> distinct winning actions = <code>1</code>; dominant action = <code>LOYALTY</code>; winning contexts = <code>8,002</code>; dominant winner share = <code>100.0000%</code>.</p>
      <p><strong class="text-foreground">Interpretation:</strong> the baseline reward model does not personalize action preference across context. Probability values can move with context while action ranking remains fixed.</p>
      <p><strong class="text-foreground">Why:</strong> the persisted Logistic Regression uses context main effects plus a <code>chosen_action</code> main effect, with no explicit <code>context × action</code> interactions. For a fixed context, <code>β_context · x</code> is common to every candidate action, so the action term drives the ordering. This is a representational-capacity limitation, not a held-out accuracy verdict.</p>
      <p><strong class="text-foreground">Next:</strong> introduce controlled context × action interactions, retrain on TRAIN only, and rerun the same probe before Candidate Generation. TEST remains untouched; B1/B2 and C–F statuses do not change from this evidence alone.</p>
    </div>
  `
  return note
}

export function Experiment3RecoveryEvidenceInjector() {
  useEffect(() => {
    const install = () => {
      const experiment3Panel = document.querySelector<HTMLElement>("[data-experiment3-panel]")
      if (!experiment3Panel) return

      let recoveryEvidence = experiment3Panel.querySelector<HTMLElement>("[data-experiment3-recovery-evidence]")
      if (!recoveryEvidence) {
        const investigationTrail = experiment3Panel.querySelector<HTMLElement>("[data-experiment3-investigation-trail]")
        if (investigationTrail) {
          recoveryEvidence = createRecoveryEvidence()
          investigationTrail.insertAdjacentElement("afterend", recoveryEvidence)
        }
      }

      if (recoveryEvidence && !experiment3Panel.querySelector("[data-experiment3-representational-capacity-evidence]")) {
        recoveryEvidence.insertAdjacentElement("afterend", createRepresentationalCapacityEvidence())
      }

      const executionSequence = experiment3Panel.querySelector<HTMLElement>(
        '[aria-label="Experiment 3 A-F modeling execution sequence"]',
      )
      if (!executionSequence) return

      const trainingFormulation = Array.from(executionSequence.querySelectorAll<HTMLDetailsElement>(":scope > details")).find(
        (details) => details.querySelector("summary")?.textContent?.includes("B — Training Formulation"),
      )
      const trainingBody = trainingFormulation?.querySelector<HTMLElement>(":scope > div")
      if (!trainingBody) return

      let continuityNote = experiment3Panel.querySelector<HTMLElement>("[data-experiment3-recovery-execution-note]")
      if (!continuityNote) {
        continuityNote = createExecutionContinuityNote()
        trainingBody.insertAdjacentElement("afterbegin", continuityNote)
      }

      if (!experiment3Panel.querySelector("[data-experiment3-personalization-capacity-note]")) {
        continuityNote.insertAdjacentElement("afterend", createPersonalizationCapacityNote())
      }
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
