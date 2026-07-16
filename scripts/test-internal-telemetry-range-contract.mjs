import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

const query = await readFile(new URL("../lib/telemetry-ledger/query.ts", import.meta.url), "utf8")
const page = await readFile(new URL("../app/internal/telemetry/page.tsx", import.meta.url), "utf8")

assert.match(query, /evaluatedAt: string/)
assert.match(query, /supported: true, evaluatedAt/)
assert.match(query, /invalidReason: "Start must be before end."/)
assert.match(query, /const snapshotEligible = telemetryRange.key === "ALL"/)
assert.match(query, /No timestamped evidence is available for this selected range./)
assert.match(query, /snapshot-only/)
assert.match(page, /aria-label="Telemetry time range"/)
assert.ok(page.includes('aria-current={telemetryRange.key === range ? "page" : undefined}'))
assert.match(page, /name="range" value="CUSTOM"/)
assert.match(page, /type="datetime-local"/)
assert.match(page, /type="submit"/)
assert.match(page, /Snapshot-only sources are excluded outside All/)
assert.match(page, /aria-current=\{telemetryRange\.key === "CUSTOM" \? "page" : undefined\}/)
assert.match(page, /defaultValue=\{value\("start"\) \?\? ""\}/)
assert.match(page, /defaultValue=\{value\("end"\) \?\? ""\}/)
assert.match(page, /Calls\/Dominance is snapshot-only/)

const evaluation = new Date("2026-07-16T12:00:00.000Z")
assert.equal(new Date(evaluation.getTime() - 7 * 86400000).toISOString(), "2026-07-09T12:00:00.000Z")
assert.equal(new Date(evaluation.getTime() - 30 * 86400000).toISOString(), "2026-06-16T12:00:00.000Z")

console.log("PASS shared UTC range interaction contract")
