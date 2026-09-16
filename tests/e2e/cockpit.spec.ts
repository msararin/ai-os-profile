import { test, expect } from "@playwright/test"
test("public case study retains measured proof and limitations without execution recipe", async ({ page }) => {
  const errors: string[]=[]; page.on("pageerror",error=>errors.push(error.message))
  await page.goto("/case-studies/nbo-nrt-azure-databricks")
  await expect(page.getByRole("heading",{name:"NBO / NRT on Azure Databricks"})).toBeVisible()
  await expect(page.getByText(/10,000 synthetic observations/)).toBeVisible()
  await expect(page.getByText(/SYNTHETIC_EXPERIMENT_ONLY/)).toBeVisible()
  await expect(page.locator("[data-experiment3-investigation-trail]")).toHaveCount(0)
  await page.getByRole("link",{name:"Home",exact:true}).click()
  await expect(page).toHaveURL(/\/$/)
  expect(errors).toEqual([])
})
test("private navigation and endpoints deny an anonymous browser", async ({ page, request }) => {
  await page.goto("/cockpit/telemetry")
  await expect(page).toHaveURL(/\/login$/)
  await expect(page.getByRole("button",{name:"Continue with Google"})).toBeVisible()
  for(const route of ["/api/cockpit/telemetry","/api/cockpit/artifacts/unknown","/api/cockpit/search"]) expect((await request.get(route)).status()).toBe(401)
})
