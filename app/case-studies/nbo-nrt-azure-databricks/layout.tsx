import type { ReactNode } from "react"

export default function NboNrtPrivacySafeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`p:has(a[href*="robert-knowledge-base"]) { display: none !important; }`}</style>
      {children}
    </>
  )
}
