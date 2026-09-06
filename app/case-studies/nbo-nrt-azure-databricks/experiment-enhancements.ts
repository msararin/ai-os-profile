import { enhanceDataPreparationInfographic } from "./data-preparation-infographic-injector"
import { createExperiment3Panel } from "./experiment-card-selector-injector"
import { enhanceExperiment2CandidateDecision } from "./experiment2-candidate-decision-injector"
import { enhanceExperiment2OverallStatus } from "./experiment2-overall-status-injector"
import { enhanceExperiment2Status } from "./experiment2-status-injector"
import { enhanceExperiment2BStructure } from "./experiment2b-structure-injector"
import { enhanceExperiment3InvestigationTrail } from "./experiment3-investigation-trail-injector"
import { enhanceExperiment3SupportGuardrail } from "./experiment3-support-guardrail-injector"
import { enhanceExperiment3ExecutionHierarchyClarity } from "./experiment3-execution-hierarchy-clarity-injector"
import { enhanceExperiment3RecoveryEvidence } from "./experiment3-recovery-evidence-injector"
import { enhanceExperiment3ModelTaxonomy } from "./experiment3-model-taxonomy-injector"
import { enhanceExperiment3DefaultView } from "./experiment3-default-view-injector"

/** Fresh, inert legacy subtree only. Never call after external translation. */
export function enhanceLegacyExperiment(root: HTMLElement) {
  if (root.dataset.enhancementComplete === "true") return
  enhanceExperiment2CandidateDecision(root)
  enhanceExperiment2OverallStatus(root)
  enhanceExperiment2Status(root)
  enhanceExperiment2BStructure(root)
  enhanceDataPreparationInfographic(root)
  root.dataset.enhancementComplete = "true"
}

/** Build detached: the wrapper makes the panel itself discoverable by scoped selectors. */
export function buildExperimentThree() {
  const root = document.createElement("div")
  const panel = createExperiment3Panel()
  root.appendChild(panel)
  enhanceExperiment3InvestigationTrail(root)
  enhanceExperiment3SupportGuardrail(root)
  enhanceExperiment3ExecutionHierarchyClarity(root)
  enhanceExperiment3RecoveryEvidence(root)
  enhanceExperiment3ModelTaxonomy(root)
  enhanceExperiment3DefaultView(root)
  for (const marker of [
    "[data-experiment3-investigation-trail]",
    "[data-experiment3-support-guardrail][data-execution-hierarchy-clarified]",
    "[data-experiment3-recovery-evidence]",
    "[data-experiment3-representational-capacity-evidence]",
    "[data-experiment3-recovery-execution-note]",
    "[data-experiment3-personalization-capacity-note]",
    "[data-experiment3-model-taxonomy]",
  ]) {
    if (!panel.querySelector(marker)) throw new Error(`Experiment 3 enhancement is incomplete: ${marker}`)
  }
  panel.hidden = false
  panel.dataset.enhancementComplete = "true"
  return panel
}
