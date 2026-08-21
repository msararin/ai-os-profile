"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

type StatusTone = "pass" | "active" | "caution" | "fail" | "neutral"

const palettes = {
  light: {
    pass: { background: "rgb(16 185 129 / 0.10)", color: "#047857", border: "rgb(5 150 105 / 0.45)" },
    active: { background: "rgb(99 102 241 / 0.10)", color: "#4338CA", border: "rgb(99 102 241 / 0.50)" },
    caution: { background: "rgb(245 158 11 / 0.10)", color: "#92400E", border: "rgb(217 119 6 / 0.45)" },
    fail: { background: "rgb(239 68 68 / 0.10)", color: "#B91C1C", border: "rgb(220 38 38 / 0.45)" },
    neutral: { background: "rgb(100 116 139 / 0.08)", color: "#475569", border: "rgb(100 116 139 / 0.40)" },
  },
  dark: {
    pass: { background: "rgb(6 78 59 / 0.30)", color: "#A7F3D0", border: "rgb(16 185 129 / 0.45)" },
    active: { background: "rgb(49 46 129 / 0.30)", color: "#C7D2FE", border: "rgb(99 102 241 / 0.50)" },
    caution: { background: "rgb(120 53 15 / 0.28)", color: "#FDE68A", border: "rgb(245 158 11 / 0.45)" },
    fail: { background: "rgb(127 29 29 / 0.28)", color: "#FECACA", border: "rgb(239 68 68 / 0.45)" },
    neutral: { background: "rgb(51 65 85 / 0.30)", color: "#CBD5E1", border: "rgb(100 116 139 / 0.45)" },
  },
} as const

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim().toUpperCase()
}

function classifyStatus(label: string): StatusTone | null {
  if (!label) return null

  if (
    label === "FAIL" ||
    label === "FAILED" ||
    label === "ESCALATE" ||
    label === "BLOCKED" ||
    label.includes("BLOCKED") ||
    label === "CLAIM_BLOCKED" ||
    label === "NOT_APPROVED" ||
    label === "NOT APPROVED" ||
    label === "INVALID"
  ) return "fail"

  if (
    label === "RCA OPEN" ||
    label.includes("RCA OPEN") ||
    label === "UNDER CONSTRUCTION" ||
    label === "PASS_WITH_CAVEAT" ||
    label === "PASS WITH CAVEAT" ||
    label === "CAVEATED" ||
    label === "PARTIAL" ||
    label.includes("PARTIAL") ||
    label === "DOWNGRADED" ||
    label.includes("PENDING") ||
    label.includes("UNRESOLVED") ||
    label.includes("MISSING") ||
    label.includes("NOT CLAIMED") ||
    label.includes("NOT VERIFIED") ||
    label.includes("REQUIRES APPROVAL") ||
    label.includes("NO OVERALL OPERATIONAL PASS") ||
    label === "CAPPED" ||
    label.includes("WEAK / MISSING") ||
    label.includes("MISSING / NOT EXPOSED") ||
    label.includes("MISSING / MANUAL ONLY") ||
    label === "NOT_DECISION_READY" ||
    label === "NOT DECISION READY"
  ) return "caution"

  if (
    label === "IN_PROGRESS" ||
    label === "IN PROGRESS" ||
    label === "CURRENTLY ACTIVE" ||
    label.includes("CURRENTLY ACTIVE") ||
    label.startsWith("STARTED") ||
    label === "NEXT TECHNICAL STEP" ||
    label.includes("CURRENT FOCUS")
  ) return "active"

  if (
    label === "PASS" ||
    label === "PASSED" ||
    label === "COMPLETE" ||
    label === "COMPLETED" ||
    label === "VALIDATED" ||
    label === "PRESENT" ||
    label.startsWith("PRESENT ") ||
    label === "EXISTS" ||
    label === "STRONG" ||
    label === "FOUNDATION READY" ||
    label === "DECISION-READY" ||
    label.startsWith("AVAILABLE —") ||
    label.startsWith("IMPLEMENTED") ||
    label.includes("STRESS COMPLETE") ||
    (label.startsWith("PROTECTED —") && label.includes("CLOSEOUT"))
  ) return "pass"

  if (
    label === "BOUNDARY" ||
    label === "BOUNDARY VISIBLE" ||
    label === "SCOPED" ||
    label === "SCOPED ENFORCEMENT" ||
    label === "SCOPED EXECUTION" ||
    label === "NOT_STARTED" ||
    label === "NOT STARTED" ||
    label === "PARKED" ||
    label.includes("PARKED / TBD") ||
    label === "ARCHIVED" ||
    label.startsWith("HISTORICAL") ||
    label === "DISABLED" ||
    label.startsWith("DISABLED ") ||
    label.startsWith("STATIC SNAPSHOT") ||
    label === "TARGET ONLY" ||
    label === "FUTURE LANE" ||
    label === "NOT PRESENT" ||
    label === "NOT EXPOSED PUBLICLY" ||
    label === "DOCUMENTED" ||
    label === "CONCEPTUAL" ||
    label.includes("BOUNDED CANONICAL CANDIDATE") ||
    label.includes("TBD / NOT COUNTABLE")
  ) return "neutral"

  return null
}

function isStatusSurface(node: HTMLElement) {
  if (node.matches('[data-slot="badge"]')) return true
  if (node.matches("span.rounded-full")) return true
  if (node.parentElement?.getAttribute("aria-label") === "Current status") return true
  return normalizedText(node.textContent) === "UNDER CONSTRUCTION"
}

function applyTone(node: HTMLElement, tone: StatusTone, dark: boolean) {
  const palette = palettes[dark ? "dark" : "light"][tone]
  node.style.backgroundColor = palette.background
  node.style.color = palette.color
  node.style.borderColor = palette.border

  if (node.matches('[data-slot="badge"], span.rounded-full')) {
    node.style.borderWidth = "1px"
    node.style.borderStyle = "solid"
  }
}

export function ArchitectureStatusColorNormalizer() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname.startsWith("/architecture")) return

    const apply = () => {
      const dark = document.documentElement.classList.contains("dark")
      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>('[data-slot="badge"], span.rounded-full, [aria-label="Current status"] > span, p'),
      )

      candidates.forEach((node) => {
        if (!isStatusSurface(node)) return
        const label = normalizedText(node.textContent)
        const tone = classifyStatus(label)
        if (!tone) return
        applyTone(node, tone, dark)

        if (label === "UNDER CONSTRUCTION") {
          const banner = node.closest<HTMLElement>("div.rounded-xl")
          if (banner) applyTone(banner, "caution", dark)
        }
      })
    }

    apply()
    const themeObserver = new MutationObserver(apply)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => themeObserver.disconnect()
  }, [pathname])

  return null
}
