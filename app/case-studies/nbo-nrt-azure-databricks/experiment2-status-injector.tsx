"use client"

import { useEffect } from "react"

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim()
}

const stepStatus: Record<string, string> = {
  "Synthetic World Specification": "Completed / released in RC4",
  "Customer population + latent state": "Completed / validated",
  "Observable Telco behavior": "Completed / validated",
  "Context / event generation": "Completed / validated",
  "Offer interaction": "Completed in RC4 · candidate-set issue later found",
  "Exposure": "Completed / validated",
  "Probabilistic response": "Completed / validated",
  "Hidden evaluation truth": "Completed / sealed",
}

export function Experiment2StatusInjector() {
  useEffect(() => {
    const install = () => {
      const heading = Array.from(document.querySelectorAll<HTMLHeadingElement>("h2")).find(
        (node) => normalizedText(node.textContent) === "Experiment 2 — Data Preparation Status",
      )
      const root = heading?.closest<HTMLDivElement>("div.space-y-10")
      if (!root) return

      const intro = heading?.parentElement
      if (intro && !intro.querySelector("[data-exp2-current-status]")) {
        const badge = document.createElement("span")
        badge.dataset.exp2CurrentStatus = "true"
        badge.className = "inline-flex items-center rounded-full border border-amber-600/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-900 dark:text-amber-100"
        badge.textContent = "DATA GATE REOPENED — candidate-set repair"
        intro.appendChild(badge)
      }

      const bundle = root.querySelector<HTMLDetailsElement>("[data-exp2-flow-bundle]")
      const bundleSummary = bundle?.querySelector<HTMLElement>(":scope > summary")
      if (bundleSummary && !bundleSummary.querySelector("[data-exp2-rc4-status]")) {
        const status = document.createElement("span")
        status.dataset.exp2Rc4Status = "true"
        status.className = "ml-3 inline-flex items-center rounded-full border border-emerald-600/35 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-900 dark:text-emerald-100"
        status.textContent = "RC4 COMPLETE · G0–G7 PASS WITH ASSUMPTIONS"
        bundleSummary.appendChild(status)
      }

      for (const [title, status] of Object.entries(stepStatus)) {
        const details = Array.from(root.querySelectorAll<HTMLDetailsElement>("details")).find((node) => {
          const summary = node.querySelector<HTMLElement>(":scope > summary")
          return normalizedText(summary?.textContent).includes(title)
        })
        const summary = details?.querySelector<HTMLElement>(":scope > summary")
        if (!summary) continue

        const badges = Array.from(summary.querySelectorAll<HTMLElement>("span, div")).filter((node) => {
          const text = normalizedText(node.textContent)
          return text === "Define" || text === "Design" || text === "Gate-controlled" || text.startsWith("Completed")
        })
        const statusNode = badges.at(-1)
        if (statusNode && normalizedText(statusNode.textContent) !== status) {
          statusNode.textContent = status
        }
      }

      const gateSection = Array.from(root.querySelectorAll<HTMLElement>("section")).find((node) =>
        Array.from(node.querySelectorAll<HTMLHeadingElement>("h3")).some(
          (title) => normalizedText(title.textContent) === "G0–G7 readiness gates",
        ),
      )
      if (gateSection) {
        for (const gate of gateSection.querySelectorAll<HTMLDetailsElement>("details")) {
          const summary = gate.querySelector<HTMLElement>(":scope > summary")
          const badge = Array.from(summary?.querySelectorAll<HTMLElement>("span") ?? []).find(
            (node) => normalizedText(node.textContent) === "Gate",
          )
          if (badge) badge.textContent = "PASS — RC4"
        }
      }
    }

    const scheduleInstall = () => {
      install()
      window.setTimeout(install, 100)
    }

    scheduleInstall()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })

    const handleClick = () => window.setTimeout(install, 0)
    document.addEventListener("click", handleClick, true)

    return () => {
      observer.disconnect()
      document.removeEventListener("click", handleClick, true)
    }
  }, [])

  return null
}
