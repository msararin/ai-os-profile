"use client"

import { useEffect } from "react"

type Tone = "pass" | "active" | "caution" | "fail" | "neutral"

const palette: Record<Tone, { bg: string; fg: string; border: string }> = {
  pass: { bg: "rgba(16,185,129,0.10)", fg: "#047857", border: "rgba(5,150,105,0.45)" },
  active: { bg: "rgba(99,102,241,0.10)", fg: "#4338CA", border: "rgba(99,102,241,0.50)" },
  caution: { bg: "rgba(245,158,11,0.10)", fg: "#92400E", border: "rgba(217,119,6,0.45)" },
  fail: { bg: "rgba(239,68,68,0.10)", fg: "#B91C1C", border: "rgba(220,38,38,0.45)" },
  neutral: { bg: "rgba(100,116,139,0.08)", fg: "#475569", border: "rgba(100,116,139,0.40)" },
}

const darkFg: Record<Tone, string> = {
  pass: "#A7F3D0",
  active: "#C7D2FE",
  caution: "#FDE68A",
  fail: "#FECACA",
  neutral: "#CBD5E1",
}

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim().toUpperCase()
}

function classify(label: string): Tone | null {
  if (!label) return null

  if (/\b(FAIL|FAILED|ESCALATE|BLOCKED|CLAIM_BLOCKED|NOT APPROVED)\b/.test(label)) return "fail"

  if (
    /\b(RCA|UNDER CONSTRUCTION|CAVEAT|CAVEATED|PARTIAL|PENDING|UNRESOLVED|MISSING|NOT PRESENT|NOT EXPOSED|NOT CLAIMED|NOT VERIFIED|CAPPED|CANDIDATE|REQUIRES APPROVAL|IF APPROVED|NO OVERALL OPERATIONAL PASS)\b/.test(label)
  ) return "caution"

  if (/\b(IN_PROGRESS|IN PROGRESS|CURRENTLY ACTIVE|CURRENT FOCUS|ACTIVE|STARTED|OWNER REVIEW SUPPORT)\b/.test(label)) return "active"

  if (/\b(PASS|PASSED|COMPLETE|COMPLETED|VALIDATED|PRESENT|AVAILABLE|READY|IMPLEMENTED|VERIFIED|OPERATIONAL|ADOPTED|EXISTS|STRONG|DECISION-READY)\b/.test(label)) return "pass"

  if (/\b(PARKED|ARCHIVED|NOT_STARTED|NOT STARTED|DISABLED|FUTURE|TBD|STATIC SNAPSHOT|DOCUMENTED|TARGET ONLY)\b/.test(label)) return "neutral"

  return null
}

function applyTone(node: HTMLElement, tone: Tone) {
  const colors = palette[tone]
  node.style.backgroundColor = colors.bg
  node.style.color = document.documentElement.classList.contains("dark") ? darkFg[tone] : colors.fg
  node.style.borderColor = colors.border
}

function isStatusSurface(node: HTMLElement) {
  if (node.matches('[data-slot="badge"]')) return true

  const label = normalizedText(node.textContent)
  if (/^(PASS|PASS_WITH_CAVEAT|FAIL|DOWNGRADED|ESCALATE|PARKED|NOT_STARTED|IN_PROGRESS)$/.test(label)) return true

  if (node.closest('[aria-label="Current status"]')) return true

  if (label === "UNDER CONSTRUCTION") return true

  return false
}

function apply() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('span, p, [data-slot="badge"]'))

  nodes.forEach((node) => {
    if (!isStatusSurface(node)) return
    const label = normalizedText(node.textContent)
    const tone = classify(label)
    if (!tone) return
    applyTone(node, tone)

    if (label === "UNDER CONSTRUCTION") {
      const container = node.closest<HTMLElement>("div.rounded-xl, div.rounded-lg")
      if (container) applyTone(container, "caution")
    }
  })
}

export function ArchitectureStatusColorNormalizer() {
  useEffect(() => {
    apply()

    const bodyObserver = new MutationObserver(apply)
    bodyObserver.observe(document.body, { childList: true, subtree: true, characterData: true })

    const themeObserver = new MutationObserver(apply)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => {
      bodyObserver.disconnect()
      themeObserver.disconnect()
    }
  }, [])

  return null
}
