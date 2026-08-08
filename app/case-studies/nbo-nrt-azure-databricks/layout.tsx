import type { ReactNode } from "react"
import { DataPreparationInfographicInjector } from "./data-preparation-infographic-injector"
import { Experiment2CandidateDecisionInjector } from "./experiment2-candidate-decision-injector"

export default function NboNrtAzureDatabricksLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DataPreparationInfographicInjector />
      <Experiment2CandidateDecisionInjector />
      {children}
    </>
  )
}
