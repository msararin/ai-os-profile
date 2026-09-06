import { defineConfig } from "@playwright/test"

const externalURL = process.env.E2E_BASE_URL
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 30_000,
  globalTimeout: 180_000,
  expect: { timeout: 5_000 },
  retries: 0,
  reporter: [["list"], ["json", { outputFile: "test-results/results.json" }]],
  use: {
    baseURL: externalURL || "http://127.0.0.1:3221",
    browserName: "chromium",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: externalURL ? undefined : {
    command: "pnpm start --hostname 127.0.0.1 --port 3221",
    url: "http://127.0.0.1:3221",
    reuseExistingServer: false,
    timeout: 60_000,
  },
})
