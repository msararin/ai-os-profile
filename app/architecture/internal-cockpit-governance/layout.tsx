import type { ReactNode } from "react"
import { InternalCockpitStatusColorNormalizer } from "./status-color-normalizer"

export default function InternalCockpitGovernanceLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <InternalCockpitStatusColorNormalizer />
      {children}
    </>
  )
}
