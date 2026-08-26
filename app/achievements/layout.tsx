import type { ReactNode } from "react"
import { AchievementsExp3RecoveryInjector } from "./achievements-exp3-recovery-injector"

export default function AchievementsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AchievementsExp3RecoveryInjector />
      {children}
    </>
  )
}
