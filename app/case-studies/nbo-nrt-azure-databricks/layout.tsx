import type { ReactNode } from "react"
import { CockpitCurrentStatusInjector } from "./cockpit-current-status-injector"
import { DataPreparationInfographicInjector } from "./data-preparation-infographic-injector"
import { Experiment1CurrentStatusInjector } from "./experiment1-current-status-injector"
import { Experiment2CandidateDecisionInjector } from "./experiment2-candidate-decision-injector"
import { Experiment2OverallStatusInjector } from "./experiment2-overall-status-injector"
import { Experiment2StatusInjector } from "./experiment2-status-injector"

export default function NboNrtAzureDatabricksLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CockpitCurrentStatusInjector />
      <DataPreparationInfographicInjector />
      <Experiment1CurrentStatusInjector />
      <Experiment2CandidateDecisionInjector />
      <Experiment2OverallStatusInjector />
      <Experiment2StatusInjector />
      {children}
    </>
  )
}
