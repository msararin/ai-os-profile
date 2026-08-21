import type { ReactNode } from "react"
import { ArchitectureStatusColorNormalizer } from "./status-color-normalizer"

export default function ArchitectureLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ArchitectureStatusColorNormalizer />
      {children}
    </>
  )
}
