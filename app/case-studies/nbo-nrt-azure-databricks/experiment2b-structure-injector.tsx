"use client"

import { useEffect } from "react"

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim()
}

export function Experiment2BStructureInjector() {
  useEffect(() => {
    const install = () => {
      const tab = Array.from(document.querySelectorAll<HTMLButtonElement>("button")).find((node) =>
        normalizedText(node.textContent).startsWith("Experiment 2B — Offline Policy Evaluation"),
      )
      if (tab) {
        if (normalizedText(tab.textContent) !== "Experiment 2B — Offline Policy Evaluation (Currently Active)") {
          tab.textContent = "Experiment 2B — Offline Policy Evaluation (Currently Active)"
        }
        tab.classList.add("bg-amber-500/10", "text-amber-900", "dark:text-amber-100")
      }

      const heading = Array.from(document.querySelectorAll<HTMLHeadingElement>("h2")).find(
        (node) => normalizedText(node.textContent) === "Experiment 2B — Offline Policy Evaluation",
      )
      const root = heading?.closest<HTMLDivElement>("div.space-y-10")
      if (!root) return

      const details = Array.from(root.querySelectorAll<HTMLDetailsElement>("details"))
      const shared = details.find((node) =>
        normalizedText(node.querySelector(":scope > summary")?.textContent).startsWith("Shared foundation"),
      )
      const different = details.find((node) =>
        normalizedText(node.querySelector(":scope > summary")?.textContent).startsWith("What is different"),
      )

      const sharedSummary = shared?.querySelector<HTMLElement>(":scope > summary")
      if (sharedSummary && normalizedText(sharedSummary.textContent) !== "Same as Experiment 2A — shared foundation") {
        sharedSummary.textContent = "Same as Experiment 2A — shared foundation"
      }

      const differentSummary = different?.querySelector<HTMLElement>(":scope > summary")
      if (differentSummary && normalizedText(differentSummary.textContent) !== "Different from Experiment 2A — question, method and evidence") {
        differentSummary.textContent = "Different from Experiment 2A — question, method and evidence"
      }

      const evidenceHeading = Array.from(root.querySelectorAll<HTMLHeadingElement>("h3")).find(
        (node) => normalizedText(node.textContent) === "Experiment 2B evidence path",
      )
      if (evidenceHeading) evidenceHeading.textContent = "What steps have been done"

      const intro = heading?.parentElement?.parentElement
      if (intro && !intro.querySelector("[data-exp2b-relationship-note]")) {
        const note = document.createElement("p")
        note.dataset.exp2bRelationshipNote = "true"
        note.className = "mt-3 max-w-4xl rounded-lg border border-amber-600/25 bg-amber-500/5 p-4 text-sm leading-7 text-muted-foreground"
        note.innerHTML = "<strong class=\"text-foreground\">Relationship to Experiment 2A:</strong> 2B keeps the same governed synthetic foundation and controls, but it opens a separate analytical lane with a different scientific question and evaluation method. The comparison below is shown first; executed steps and evidence follow after it."
        intro.appendChild(note)
      }
    }

    install()
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
