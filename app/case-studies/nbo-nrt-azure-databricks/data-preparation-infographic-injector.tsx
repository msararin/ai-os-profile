"use client"

import { useEffect } from "react"

const infographicSections = [
  {
    number: "1",
    title: "Existing AIOS agents accelerated candidate research",
    src: "/case-studies/nbo-nrt/data-preparation/section-1.svg",
  },
  {
    number: "2",
    title: "Flexible composition was a response to limited direct-fit data",
    src: "/case-studies/nbo-nrt/data-preparation/section-2.svg",
  },
  {
    number: "3",
    title: "AIOS governance remained visible during research and preparation",
    src: "/case-studies/nbo-nrt/data-preparation/section-3.svg",
  },
  {
    number: "4",
    title: "A small governed package proved the data path first",
    src: "/case-studies/nbo-nrt/data-preparation/section-4.svg",
  },
  {
    number: "5",
    title: "Volume was added after Silver for model learning",
    src: "/case-studies/nbo-nrt/data-preparation/section-5.svg",
  },
]

export function DataPreparationInfographicInjector() {
  useEffect(() => {
    const installInfographics = () => {
      const detailsElements = document.querySelectorAll<HTMLDetailsElement>("details")

      for (const details of detailsElements) {
        const summary = details.querySelector<HTMLElement>(":scope > summary")
        const summaryText = summary?.textContent?.replace(/\s+/g, " ").trim() ?? ""
        const section = infographicSections.find(({ title }) => summaryText.includes(title))

        if (!summary || !section) continue
        if (details.querySelector(`[data-data-prep-infographic="${section.number}"]`)) continue

        const figure = document.createElement("figure")
        figure.dataset.dataPrepInfographic = section.number
        figure.className = "border-t border-border bg-muted/10 p-3 sm:p-4"

        const image = document.createElement("img")
        image.src = section.src
        image.alt = `${section.number}. ${section.title}`
        image.loading = "lazy"
        image.decoding = "async"
        image.className = "h-auto w-full rounded-lg border border-border bg-background shadow-sm"

        figure.appendChild(image)
        summary.insertAdjacentElement("afterend", figure)
      }
    }

    installInfographics()
    const observer = new MutationObserver(installInfographics)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return null
}
