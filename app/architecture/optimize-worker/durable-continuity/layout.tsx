import type { ReactNode } from "react"
import { DurableContinuityStatusColorNormalizer } from "./status-color-normalizer"

export default function DurableContinuityLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DurableContinuityStatusColorNormalizer />
      {children}
    </>
  )
}
