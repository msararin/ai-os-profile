"use client"

import { useEffect } from "react"

const EXPERIMENT_3_CARD_KEY = "Experiment 3 — Adaptive Contextual Bandit"

export function Experiment3DefaultViewInjector() {
  useEffect(() => {
    let defaultExperimentApplied = false

    const install = () => {
      const selector = document.querySelector<HTMLElement>("[data-experiment-card-selector]")
      if (selector && !defaultExperimentApplied) {
        const experiment3Button = Array.from(
          selector.querySelectorAll<HTMLButtonElement>("button[data-card-key]"),
        ).find((button) => button.dataset.cardKey === EXPERIMENT_3_CARD_KEY)

        if (experiment3Button) {
          defaultExperimentApplied = true
          experiment3Button.click()
        }
      }

      const trail = document.querySelector<HTMLDetailsElement>("[data-experiment3-investigation-trail]")
      if (trail && trail.dataset.defaultOpenApplied !== "true") {
        trail.open = true
        trail.dataset.defaultOpenApplied = "true"
      }
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
