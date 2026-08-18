"use client"

import { useEffect } from "react"

type SemanticStatus = "pass" | "active" | "caution" | "fail" | "neutral"

const exactStatusMap: Record<string, SemanticStatus> = {
  PASS: "pass",
  PASSED: "pass",
  COMPLETE: "pass",
  COMPLETED: "pass",
  VALIDATED: "pass",
  EXISTS: "pass",
  PRESENT: "pass",
  IN_PROGRESS: "active",
  "IN PROGRESS": "active",
  "CURRENTLY ACTIVE": "active",
  "PENDING REGISTRY RECONCILIATION": "active",
  "RCA OPEN": "caution",
  "UNDER CONSTRUCTION": "caution",
  PASS_WITH_CAVEAT: "caution",
  "PASS WITH CAVEAT": "caution",
  CAVEATED: "caution",
  PARTIAL: "caution",
  DOWNGRADED: "caution",
  NOT_DECISION_READY: "caution",
  "NOT DECISION READY": "caution",
  FAIL: "fail",
  FAILED: "fail",
  ESCALATE: "fail",
  BLOCKED: "fail",
  NOT_APPROVED: "fail",
  "NOT APPROVED": "fail",
  PARKED: "neutral",
  NOT_STARTED: "neutral",
  "NOT STARTED": "neutral",
  HISTORICAL: "neutral",
  DISABLED: "neutral",
}

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim().toUpperCase()
}

function isStatusSurface(node: HTMLElement) {
  if (node.matches('[data-slot="badge"]')) return true
  if (node.tagName === "SPAN" && (node.className.includes("rounded") || node.className.includes("font-semibold"))) return true
  if (node.tagName === "P" && normalizedText(node.textContent) === "UNDER CONSTRUCTION") return true
  return false
}

export function SemanticStatusNormalizer() {
  useEffect(() => {
    const apply = () => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("span, p, [data-slot='badge']"))
      nodes.forEach((node) => {
        if (!isStatusSurface(node)) return
        const semantic = exactStatusMap[normalizedText(node.textContent)]
        if (semantic) node.dataset.semanticStatus = semantic
      })
    }

    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [])

  return null
}
