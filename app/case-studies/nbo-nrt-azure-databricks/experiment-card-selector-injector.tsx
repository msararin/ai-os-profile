"use client"

import { useEffect } from "react"

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim()
}

const cards = [
  {
    match: "Experiment 1 — Volume-expanded synthetic baseline",
    eyebrow: "Experiment 1",
    title: "Volume-expanded synthetic baseline",
    description: "Completed baseline lane for end-to-end MLOps execution, threshold analysis, registration and read-back evidence.",
    tone: "default",
  },
  {
    match: "Experiment 2A — Post-Silver low-volume baseline",
    eyebrow: "Experiment 2A",
    title: "Post-Silver low-volume baseline",
    description: "Supervised-model lane that preserves the original Experiment 2 evidence and its generalization investigation.",
    tone: "default",
  },
  {
    match: "Experiment 2B — Offline Policy Evaluation",
    eyebrow: "Experiment 2B · Currently Active",
    title: "Offline Policy Evaluation",
    description: "Separate OPE lane comparing target-policy value against logged behavior-policy data while keeping 2A unchanged.",
    tone: "active",
  },
] as const

export function ExperimentCardSelectorInjector() {
  useEffect(() => {
    const install = () => {
      const heading = Array.from(document.querySelectorAll<HTMLHeadingElement>("h2")).find(
        (node) => normalizedText(node.textContent) === "Experiment evidence",
      )
      const section = heading?.closest<HTMLElement>("section")
      if (!section || section.querySelector("[data-experiment-card-selector]")) return

      const buttons = Array.from(section.querySelectorAll<HTMLButtonElement>("button"))
      const tabButtons = cards.map((card) =>
        buttons.find((button) => normalizedText(button.textContent).startsWith(card.match)),
      )
      if (tabButtons.some((button) => !button)) return

      const originalRow = tabButtons[0]?.parentElement
      if (!originalRow) return
      originalRow.classList.add("sr-only")
      originalRow.setAttribute("aria-hidden", "true")

      const selector = document.createElement("div")
      selector.dataset.experimentCardSelector = "true"
      selector.className = "grid gap-4 md:grid-cols-3"

      const renderSelection = () => {
        const currentButtons = selector.querySelectorAll<HTMLButtonElement>("button[data-card-key]")
        currentButtons.forEach((cardButton, index) => {
          const sourceButton = tabButtons[index]
          const selected = sourceButton?.className.includes("border-primary") ?? false
          cardButton.setAttribute("aria-pressed", selected ? "true" : "false")
          const base = "group min-h-44 rounded-xl border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-primary/40"
          const inactive = cards[index].tone === "active"
            ? "border-amber-500/35 bg-amber-500/5 hover:border-amber-500/60 hover:bg-amber-500/10"
            : "border-border bg-background hover:border-primary/40 hover:bg-muted/30"
          const active = cards[index].tone === "active"
            ? "border-amber-500 bg-amber-500/12 shadow-sm ring-1 ring-amber-500/25"
            : "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
          cardButton.className = `${base} ${selected ? active : inactive}`
        })
      }

      cards.forEach((card, index) => {
        const button = document.createElement("button")
        button.type = "button"
        button.dataset.cardKey = card.match
        button.innerHTML = `
          <div class="flex items-start justify-between gap-3">
            <span class="text-xs font-bold uppercase tracking-[0.12em] ${card.tone === "active" ? "text-amber-800 dark:text-amber-200" : "text-muted-foreground"}">${card.eyebrow}</span>
            <span class="text-lg text-muted-foreground transition-transform group-hover:translate-x-0.5">→</span>
          </div>
          <div class="mt-4 text-base font-semibold leading-6 text-foreground">${card.title}</div>
          <p class="mt-3 text-sm leading-6 text-muted-foreground">${card.description}</p>
        `
        button.addEventListener("click", () => {
          tabButtons[index]?.click()
          window.setTimeout(renderSelection, 0)
        })
        selector.appendChild(button)
      })

      originalRow.insertAdjacentElement("afterend", selector)
      renderSelection()

      const observer = new MutationObserver(renderSelection)
      tabButtons.forEach((button) => observer.observe(button!, { attributes: true, attributeFilter: ["class"] }))
      selector.dataset.selectionObserverReady = "true"
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
