import type { ReactNode } from "react"
import { DataPreparationInfographicInjector } from "./data-preparation-infographic-injector"
import { Experiment2CandidateDecisionInjector } from "./experiment2-candidate-decision-injector"
import { Experiment2OverallStatusInjector } from "./experiment2-overall-status-injector"
import { Experiment2StatusInjector } from "./experiment2-status-injector"
import { Experiment2BStructureInjector } from "./experiment2b-structure-injector"

export default function NboNrtAzureDatabricksLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DataPreparationInfographicInjector />
      <Experiment2CandidateDecisionInjector />
      <Experiment2OverallStatusInjector />
      <Experiment2StatusInjector />
      <Experiment2BStructureInjector />
      {children}
    </>
  )
}
