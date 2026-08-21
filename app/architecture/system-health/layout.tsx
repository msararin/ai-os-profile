import type { ReactNode } from "react"
import { SystemHealthStatusColorNormalizer } from "./status-color-normalizer"

export default function SystemHealthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SystemHealthStatusColorNormalizer />
      {children}
    </>
  )
}
