"use client"

import { useEffect } from "react"

type Tone = "pass" | "active" | "caution" | "fail" | "neutral"

const toneClass: Record<Tone, string> = {
  pass: "!border-emerald-600/40 !bg-emerald-500/10 !text-emerald-800 dark:!text-emerald-200",
  active: "!border-indigo-500/40 !bg-indigo-500/10 !text-indigo-800 dark:!text-indigo-200",
  caution: "!border-amber-500/40 !bg-amber-500/10 !text-amber-800 dark:!text-amber-200",
  fail: "!border-red-600/40 !bg-red-500/10 !text-red-800 dark:!text-red-200",
  neutral: "!border-slate-400/40 !bg-slate-500/10 !text-slate-700 dark:!text-slate-200",
}

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim().toUpperCase()
}

function classify(label: string): Tone | null {
  if (!label) return null

  if (/\b(FAIL|FAILED|ESCALATE|BLOCKED|CLAIM_BLOCKED|NOT APPROVED|REJECTED)\b/.test(label)) return "fail"

  if (/\b(NOT EXPOSED PUBLICLY|PARKED|ARCHIVED|NOT_STARTED|NOT STARTED|DISABLED|FUTURE|TBD|STATIC SNAPSHOT|TARGET ONLY|DOCUMENTED|BOUNDARY)\b/.test(label)) return "neutral"

  if (/\b(RCA|UNDER CONSTRUCTION|CAVEAT|CAVEATED|PARTIAL|PENDING|UNRESOLVED|MISSING|NOT PRESENT|NOT EXPOSED|NOT CLAIMED|NOT VERIFIED|CAPPED|CANDIDATE|REQUIRES APPROVAL|PROVISIONAL)\b/.test(label)) return "caution"

  if (/\b(IN_PROGRESS|IN PROGRESS|CURRENTLY ACTIVE|CURRENT FOCUS|STARTED|OWNER REVIEW SUPPORT)\b/.test(label)) return "active"

  if (/\b(PASS|PASSED|COMPLETE|COMPLETED|VALIDATED|PRESENT|AVAILABLE|READY|IMPLEMENTED|VERIFIED|OPERATIONAL|ADOPTED|EXISTS|STRONG|DECISION-READY|FOUNDATION READY|CANONICAL BOUNDED CLOSEOUT)\b/.test(label)) return "pass"

  if (/\b(SCOPED|BOUNDED|STATIC|MAP \/ NOT LIVE)\b/.test(label)) return "neutral"

  return null
}

function isStatusSurface(node: HTMLElement) {
  if (node.matches('[data-slot="badge"]')) return true

  const label = normalizedText(node.textContent)
  if (/^(PASS|PASS_WITH_CAVEAT|FAIL|DOWNGRADED|ESCALATE|PARKED|NOT_STARTED|IN_PROGRESS)$/.test(label)) return true
  if (label === "UNDER CONSTRUCTION") return true

  return false
}

function applyStatusColors() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('span, p, [data-slot="badge"]'))

  nodes.forEach((node) => {
    if (!isStatusSurface(node)) return
    const tone = classify(normalizedText(node.textContent))
    if (!tone) return

    Object.values(toneClass).forEach((classes) => {
      classes.split(" ").forEach((className) => node.classList.remove(className))
    })
    toneClass[tone].split(" ").forEach((className) => node.classList.add(className))

    if (normalizedText(node.textContent) === "UNDER CONSTRUCTION") {
      const container = node.closest<HTMLElement>("div.rounded-xl, div.rounded-lg")
      if (container) {
        container.classList.remove("border-red-600", "bg-red-50", "text-red-950", "dark:bg-red-950/40", "dark:text-red-100")
        container.classList.add("border-amber-500/40", "bg-amber-500/10", "text-foreground")
      }
    }
  })
}

export function SystemHealthStatusColorNormalizer() {
  useEffect(() => {
    applyStatusColors()
    const observer = new MutationObserver(applyStatusColors)
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [])

  return null
}
