import { test, expect, type Page } from "@playwright/test"
import { execFileSync } from "node:child_process"
import ts from "typescript"

const route = "/case-studies/nbo-nrt-azure-databricks"
const keys = [
  "Experiment 1 — Volume-expanded synthetic baseline",
  "Experiment 2A — Post-Silver low-volume baseline",
  "Experiment 2B — Offline Policy Evaluation",
  "Experiment 3 — Adaptive Contextual Bandit",
]
const lanes = ["one", "twoA", "twoB", "three"]
let runtimeErrors: string[] = []
test.beforeEach(async ({ page }) => {
  runtimeErrors = []
  page.on("pageerror", error => runtimeErrors.push(error.message))
})
test.afterEach(() => { expect(runtimeErrors, "unhandled browser errors").toEqual([]) })

async function ready(page: Page) {
  await page.goto(route)
  await expect(page.locator('[data-experiment-card-selector] button')).toHaveCount(4)
  await expect(page.locator('[data-experiment3-model-taxonomy]')).toHaveCount(1)
  await expect(page.locator('[data-experiment-lane="three"]')).toBeVisible()
}

test("four lanes survive repeated switches, native details and route remount", async ({ page }) => {
  test.setTimeout(60_000) // Multiple full-lane visits; per-assertion deadlines remain 5 seconds.
  const errors: string[] = []
  page.on("pageerror", error => errors.push(error.message))
  await ready(page)
  for (let round = 0; round < 2; round++) {
    for (let index = 0; index < keys.length; index++) {
      const card = page.locator(`button[data-card-key="${keys[index]}"]`)
      await card.click()
      await expect(card).toHaveAttribute("aria-pressed", "true")
      const lane = page.locator(`[data-experiment-lane="${lanes[index]}"]`)
      await expect(lane).toBeVisible()
      await expect(page.locator('[data-experiment-card-selector] button[aria-pressed="true"]')).toHaveCount(1)
      if (index === 1) {
        await expect(lane.locator('[data-exp2-flow-bundle]')).toHaveCount(1)
        await expect(lane.locator('[data-exp2-candidate-decision]')).toHaveCount(1)
      }
      if (index === 3) {
        for (const marker of ["data-experiment3-investigation-trail", "data-experiment3-support-guardrail", "data-experiment3-model-taxonomy"]) {
          await expect(lane.locator(`[${marker}]`)).toHaveCount(1)
        }
        await expect(lane).toContainText("0.613125")
        await expect(lane).toContainText("TEST remains untouched")
      }
      const details = lane.locator("details").first()
      if (await details.count()) {
        const open = await details.evaluate((el: HTMLDetailsElement) => el.open)
        await details.locator(":scope > summary").click()
        await expect.poll(() => details.evaluate((el: HTMLDetailsElement) => el.open)).toBe(!open)
      }
    }
  }
  await page.getByRole("link", { name: "Home", exact: true }).click()
  await expect(page).toHaveURL(/\/$/)
  await ready(page)
  expect(errors).toEqual([])
})

test("legacy translation and open details survive parent updates while hidden", async ({ page }) => {
  await ready(page)
  await page.locator(`button[data-card-key="${keys[1]}"]`).click()
  const lane = page.locator('[data-experiment-lane="twoA"]')
  const target = lane.locator('[data-exp2-candidate-decision] > summary').first()
  await target.evaluate(el => { el.innerHTML = '<font data-legacy-translation="true">候选决策 — การตัดสินใจ</font>' })
  await target.click()
  const open = await target.evaluate(el => (el.parentElement as HTMLDetailsElement).open)
  await page.locator(`button[data-card-key="${keys[3]}"]`).click()
  await page.locator(`button[data-card-key="${keys[1]}"]`).click()
  await expect(target).toHaveText("候选决策 — การตัดสินใจ")
  expect(await target.evaluate(el => (el.parentElement as HTMLDetailsElement).open)).toBe(open)
})

test("performance budget: card paints and idle main thread under CPU slowdown", async ({ page }, testInfo) => {
  test.setTimeout(60_000)
  const cdp = await page.context().newCDPSession(page)
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 })
  await page.addInitScript(({ injectRegression }) => {
    ;(window as any).__cardPaints = []
    ;(window as any).__longTasks = []
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) (window as any).__longTasks.push({ start: entry.startTime, duration: entry.duration })
    })
    observer.observe({ type: "longtask", buffered: true })
    document.addEventListener("click", event => {
      if (!(event.target as Element)?.closest("[data-card-key]")) return
      const start = performance.now()
      // Test-only negative control: prove the budget rejects a slow main thread.
      if (injectRegression) while (performance.now() - start < 700) { /* bounded busy task */ }
      requestAnimationFrame(() => requestAnimationFrame(() => (window as any).__cardPaints.push(performance.now() - start)))
    }, true)
  }, { injectRegression: process.env.COCKPIT_PERF_NEGATIVE_CONTROL === "1" })
  const navigationStart = Date.now()
  await ready(page)
  const initialReadyMs = Date.now() - navigationStart
  expect(await page.evaluate(() => PerformanceObserver.supportedEntryTypes.includes("longtask"))).toBe(true)
  for (let index = 0; index < keys.length; index++) {
    await page.locator(`button[data-card-key="${keys[index]}"]`).click()
    await expect.poll(() => page.evaluate(() => (window as any).__cardPaints.length)).toBe(index + 1)
  }
  const idleStart = await page.evaluate(() => performance.now())
  await page.waitForTimeout(2_000)
  const metrics = await page.evaluate(start => ({
    cardPaintMs: (window as any).__cardPaints as number[],
    idleLongTaskMs: ((window as any).__longTasks as Array<{ start: number; duration: number }>).filter(t => t.start >= start).reduce((sum, t) => sum + t.duration, 0),
  }), idleStart)
  await testInfo.attach("performance-budget", { body: JSON.stringify({ cpuSlowdown: 4, initialReadyMs, ...metrics }, null, 2), contentType: "application/json" })
  // Conservative browser-lab regression ceilings, not production INP or a regional SLA.
  expect(Math.max(...metrics.cardPaintMs)).toBeLessThan(500)
  expect(metrics.idleLongTaskMs).toBeLessThan(100)
  expect(initialReadyMs).toBeLessThan(5_000)
  await cdp.detach()
})

test("settled translations survive unrelated mutations, details and hiding Experiment 3", async ({ page }) => {
  await ready(page)
  const translated = "模型训练说明 — คำอธิบายการฝึกโมเดล"
  const paragraph = page.locator('[aria-label="Experiment 3 A-F modeling execution sequence"] > details').nth(1).locator("summary p").first()
  await paragraph.evaluate((el, text) => {
    const wrapper = document.createElement("font")
    wrapper.setAttribute("data-translator-test", "true")
    wrapper.textContent = text
    el.replaceChildren(wrapper)
  }, translated)
  // Observe after the intentional translator mutation. Our probe is not app code.
  await page.evaluate(() => {
    const panel = document.querySelector("[data-experiment3-panel]")!
    ;(window as any).__routeRewrites = 0
    const probe = new MutationObserver(records => { (window as any).__routeRewrites += records.length })
    probe.observe(panel, { childList: true, characterData: true, subtree: true })
    ;(window as any).__translationProbe = probe
    for (let i = 0; i < 20; i++) {
      const node = document.createElement("span")
      document.body.append(node)
      node.remove()
    }
  })
  const summary = page.locator('[data-experiment3-investigation-trail] > summary')
  await summary.click()
  await page.locator(`button[data-card-key="${keys[0]}"]`).click()
  await page.locator(`button[data-card-key="${keys[3]}"]`).click()
  // An out-of-page Playwright timeout still terminates the test if browser microtasks starve.
  await page.waitForTimeout(2_000)
  await expect(paragraph).toHaveText(translated)
  expect(await page.evaluate(() => (window as any).__routeRewrites)).toBe(0)
  await page.evaluate(() => (window as any).__translationProbe.disconnect())
})

test("no body-wide observer registration and browser heartbeat reaches task queue", async ({ page }) => {
  await page.addInitScript(() => {
    const NativeObserver = window.MutationObserver
    ;(window as any).__bodyObservers = 0
    window.MutationObserver = class extends NativeObserver {
      observe(target: Node, options?: MutationObserverInit) {
        if (target === document.body && options?.subtree && options.childList) (window as any).__bodyObservers++
        return super.observe(target, options)
      }
    }
  })
  await ready(page)
  for (const key of keys) await page.locator(`button[data-card-key="${key}"]`).click()
  const heartbeat = await page.evaluate(() => new Promise(resolve => window.setTimeout(() => resolve("responsive"), 0)))
  expect(heartbeat).toBe("responsive")
  expect(await page.evaluate(() => (window as any).__bodyObservers)).toBe(0)
})

test("historical exact injector reproduces loop; engineer hotfix converges", async ({ page }) => {
  const file = "app/case-studies/nbo-nrt-azure-databricks/experiment3-model-taxonomy-injector.tsx"
  for (const [ref, shouldLoop] of [["3e5db590274bbb45c1044a211babe3395eac6311", true], ["4d698f311b914d917c2d3b900173dee7e478766f", false]] as const) {
    const source = execFileSync("git", ["show", `${ref}:${file}`], { encoding: "utf8" })
    const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS } }).outputText
    await page.goto("about:blank")
    const result = await page.evaluate(async ({ compiled }) => {
      const NativeObserver = window.MutationObserver
      let callbacks = 0
      let capped = false
      const cleanups: Array<() => void> = []
      window.MutationObserver = class extends NativeObserver {
        constructor(callback: MutationCallback) {
          super((records, observer) => {
            callbacks++
            if (callbacks >= 50) { capped = true; observer.disconnect(); return }
            callback(records, observer)
          })
        }
      }
      const mod = { exports: {} as any }
      new Function("require", "exports", "module", compiled)(() => ({ useEffect: (fn: () => () => void) => cleanups.push(fn()) }), mod.exports, mod)
      mod.exports.Experiment3ModelTaxonomyInjector()
      document.body.innerHTML = '<section data-experiment3-panel><div data-experiment3-representational-capacity-evidence></div><section data-experiment3-support-guardrail><div><p>Current focus: old</p></div><div aria-label="Experiment 3 A-F modeling execution sequence"><details><summary><strong>B — Training Formulation</strong><p>old</p></summary></details></div></section></section>'
      await new Promise(resolve => setTimeout(resolve, 50))
      cleanups.forEach(fn => fn())
      window.MutationObserver = NativeObserver
      return { callbacks, capped }
    }, { compiled })
    expect(result.capped).toBe(shouldLoop)
    if (!shouldLoop) expect(result.callbacks).toBeLessThanOrEqual(2)
  }
})
