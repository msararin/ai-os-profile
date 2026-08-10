"use client"

import { useEffect } from "react"

function normalizedText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim()
}

function createOverallStatus() {
  const section = document.createElement("section")
  section.dataset.exp2OverallStatus = "true"
  section.className = "rounded-xl border border-border bg-background p-5 sm:p-6"
  section.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h3 class="text-xl font-semibold text-foreground">Experiment 2 — Overall Status</h3>
      <span class="inline-flex items-center rounded-full border border-amber-600/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-900 dark:text-amber-100">BASELINE UNDER INVESTIGATION</span>
    </div>

    <div class="mt-5 space-y-5 text-sm leading-7 text-muted-foreground">
      <div class="rounded-lg border border-emerald-600/25 bg-emerald-500/5 p-4">
        <p class="font-semibold text-foreground">Data preparation / handoff — ผ่านแล้ว</p>
        <ul class="mt-2 list-disc space-y-1 pl-5">
          <li>RC1 candidate set repaired</li>
          <li>Databricks readback ผ่าน</li>
          <li>temporal / leakage / exposure checks ผ่าน</li>
          <li>training table และ preprocessed table พร้อม</li>
        </ul>
      </div>

      <div class="grid gap-4 lg:grid-cols-3">
        <div class="rounded-lg border border-emerald-600/25 bg-emerald-500/5 p-4">
          <p class="font-semibold text-foreground">1. Feature engineering / split — ผ่านแล้ว</p>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            <li>primary temporal split ล็อกแล้ว</li>
            <li>TRAIN <strong class="text-foreground">3,768</strong> / TEST <strong class="text-foreground">1,032</strong></li>
            <li>Spark-native preprocessing fit บน <strong class="text-foreground">TRAIN only</strong> ผ่าน</li>
            <li>leakage preflight ผ่าน</li>
          </ul>
        </div>

        <div class="rounded-lg border border-emerald-600/25 bg-emerald-500/5 p-4">
          <p class="font-semibold text-foreground">2. Baseline training — ทำแล้ว</p>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            <li>Spark ML Logistic Regression train สำเร็จ</li>
            <li>TEST scoring สำเร็จ</li>
            <li>Experiment 2 มี <strong class="text-foreground">actual model training evidence</strong> แล้ว</li>
          </ul>
        </div>

        <div class="rounded-lg border border-amber-600/30 bg-amber-500/5 p-4">
          <p class="font-semibold text-foreground">3. Model evaluation — พบปัญหาและกำลัง investigate</p>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            <li>TRAIN ROC-AUC ≈ <strong class="text-foreground">0.625</strong></li>
            <li>TEST ROC-AUC ≈ <strong class="text-foreground">0.449</strong></li>
            <li>TEST PR-AUC ≈ <strong class="text-foreground">0.071</strong>, ใกล้ random baseline</li>
            <li>default classification threshold ให้ prediction เป็น negative ทั้งหมด</li>
          </ul>
        </div>
      </div>

      <div class="rounded-lg border border-amber-600/30 bg-amber-500/5 p-4">
        <p class="font-semibold text-foreground">Investigation status</p>
        <ul class="mt-2 list-disc space-y-1 pl-5">
          <li>input distribution ของบาง feature ค่อนข้าง stable แต่ <strong class="text-foreground">feature → outcome relationship ไม่ stable ระหว่าง TRAIN และ TEST</strong></li>
          <li>หลัง inspect generator ยัง <strong class="text-foreground">ไม่มีหลักฐานว่า time เป็น explicit rule ที่สร้าง concept drift โดยตรง</strong></li>
          <li>current hypothesis ชี้ไปที่ interaction ของ <strong class="text-foreground">selection policy + hidden latent variables + response funnel + sampling effects</strong> มากกว่า</li>
          <li>ยังไม่ควร claim <code>temporal concept drift</code> จนกว่าจะ isolate causal mechanism หรือ reproduce drift pattern ได้ชัดเจน</li>
        </ul>
      </div>
    </div>
  `
  return section
}

export function Experiment2OverallStatusInjector() {
  useEffect(() => {
    const install = () => {
      const heading = Array.from(document.querySelectorAll<HTMLHeadingElement>("h2")).find(
        (node) => normalizedText(node.textContent) === "Experiment 2 — Data Preparation Status",
      )
      const root = heading?.closest<HTMLDivElement>("div.space-y-10")
      if (!root || root.querySelector("[data-exp2-overall-status]")) return

      const introSection = heading.closest<HTMLElement>("section")
      if (!introSection) return
      introSection.insertAdjacentElement("afterend", createOverallStatus())
    }

    install()
    const observer = new MutationObserver(install)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}
