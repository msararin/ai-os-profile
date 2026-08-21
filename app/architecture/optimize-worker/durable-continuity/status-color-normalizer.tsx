"use client"

import { useEffect } from "react"

const passClass = "!border-emerald-600/40 !bg-emerald-500/10 !text-emerald-800 dark:!text-emerald-200"
const cautionClass = "!border-amber-500/40 !bg-amber-500/10 !text-amber-800 dark:!text-amber-200"
const neutralClass = "!border-slate-400/40 !bg-slate-500/10 !text-slate-700 dark:!text-slate-200"

function applyDurableContinuityStatusColors() {
  const status = document.querySelector<HTMLElement>('[aria-label="Current status"]')
  if (!status) return

  Array.from(status.querySelectorAll<HTMLElement>("span")).forEach((node) => {
    const label = (node.textContent ?? "").replace(/\s+/g, " ").trim().toUpperCase()
    const classes = label.includes("NO OVERALL OPERATIONAL PASS")
      ? cautionClass
      : label.includes("PARKED")
        ? neutralClass
        : label.includes("IMPLEMENTED") || label.includes("COMPLETE")
          ? passClass
          : ""

    if (!classes) return
    classes.split(" ").forEach((className) => node.classList.add(className))
  })
}

export function DurableContinuityStatusColorNormalizer() {
  useEffect(() => {
    applyDurableContinuityStatusColors()
    const observer = new MutationObserver(applyDurableContinuityStatusColors)
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [])

  return null
}
