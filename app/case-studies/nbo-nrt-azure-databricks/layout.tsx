import type { ReactNode } from "react"
import { DataPreparationInfographicInjector } from "./data-preparation-infographic-injector"
import { ExperimentCardSelectorInjector } from "./experiment-card-selector-injector"
import { Experiment2CandidateDecisionInjector } from "./experiment2-candidate-decision-injector"
import { Experiment2OverallStatusInjector } from "./experiment2-overall-status-injector"
import { Experiment2StatusInjector } from "./experiment2-status-injector"
import { Experiment2BStructureInjector } from "./experiment2b-structure-injector"
import { Experiment3InvestigationTrailInjector } from "./experiment3-investigation-trail-injector"
import { Experiment3DefaultViewInjector } from "./experiment3-default-view-injector"
import { Experiment3SupportGuardrailInjector } from "./experiment3-support-guardrail-injector"
import { Experiment3ExecutionHierarchyClarityInjector } from "./experiment3-execution-hierarchy-clarity-injector"
import { Experiment3RecoveryEvidenceInjector } from "./experiment3-recovery-evidence-injector"

export default function NboNrtAzureDatabricksLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DataPreparationInfographicInjector />
      <ExperimentCardSelectorInjector />
      <Experiment2CandidateDecisionInjector />
      <Experiment2OverallStatusInjector />
      <Experiment2StatusInjector />
      <Experiment2BStructureInjector />
      <Experiment3InvestigationTrailInjector />
      <Experiment3DefaultViewInjector />
      <Experiment3SupportGuardrailInjector />
      <Experiment3ExecutionHierarchyClarityInjector />
      <Experiment3RecoveryEvidenceInjector />
      {children}
    </>
  )
}
