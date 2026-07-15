import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

const querySource = await readFile(new URL("../lib/telemetry-ledger/query.ts", import.meta.url), "utf8")
const artifact = JSON.parse(await readFile(new URL("../data/telemetry/preserved-historical-spend-evidence.json", import.meta.url), "utf8"))

assert.match(querySource, /const historicalSpendByModelProvider = historical\.groups\.map/)
assert.match(querySource, /historicalSpendByModelProvider,\s*\n\s*historicalSpendSummary/)
assert.doesNotMatch(querySource, /historicalSpendByModelProvider:\s*\[\]/)
assert.equal(artifact.populationCount, 10)
assert.equal(artifact.numericCostRowCount, 6)
assert.equal(artifact.nullCostRowCount, 4)
assert.equal(artifact.groups.reduce((total, group) => total + group.costUsd, 0).toFixed(3), "0.527")
assert.equal(artifact.groups.find((group) => group.costSource === "estimated_from_delegate_report").costUsd.toFixed(3), "0.461")
assert.equal(artifact.groups.find((group) => group.costSource === "provider_reported").costUsd.toFixed(3), "0.066")
assert.equal(artifact.classification, "SYNTHETIC/BACKFILL")
assert.equal(artifact.operationalClaim, "EXCLUDED")
assert.deepEqual(artifact.period, {
  start: "2026-05-30T10:47:46.404231Z",
  end: "2026-05-30T11:37:46.404231Z",
  timezone: "UTC",
  endExclusive: true,
})

console.log("PASS production-equivalent historical Spend render contract")
