"use client"

import { useEffect } from "react"

const colors: Record<string, string> = {
  "PRODUCTION AUTH NOT CLAIMED": "!border-amber-500/40 !bg-amber-500/10 !text-amber-800 dark:!text-amber-200",
  "AUTH STATUS": "!border-amber-500/40 !bg-amber-500/10 !text-amber-800 dark:!text-amber-200",
  "STILL BLOCKED": "!border-red-600/40 !bg-red-500/10 !text-red-800 dark:!text-red-200",
  "NEXT TECHNICAL STEP": "!border-indigo-500/40 !bg-indigo-500/10 !text-indigo-800 dark:!text-indigo-200",
}

function applyInternalCockpitStatusColors() {
  const badges = Array.from(document.querySelectorAll<HTMLElement>('[data-slot="badge"]'))
  badges.forEach((badge) => {
    const label = (badge.textContent ?? "").replace(/\s+/g, " ").trim().toUpperCase()
    const classes = colors[label]
    if (!classes) return
    classes.split(" ").forEach((className) => badge.classList.add(className))
  })
}

export function InternalCockpitStatusColorNormalizer() {
  useEffect(() => {
    applyInternalCockpitStatusColors()
    const observer = new MutationObserver(applyInternalCockpitStatusColors)
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [])

  return null
}
