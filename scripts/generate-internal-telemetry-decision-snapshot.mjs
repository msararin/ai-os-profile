#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import Database from "better-sqlite3"
import {
  CONTRACT_ID,
  ENVIRONMENT_VARIABLE,
  GENERATOR_VERSION,
  SCHEMA_VERSION,
  buildEnvelope,
  canonicalJson,
  sha256,
  validateEnvelope,
} from "./internal-telemetry-decision-snapshot-core.mjs"

const args = Object.fromEntries(process.argv.slice(2).map((arg) => {
  const index = arg.indexOf("=")
  if (!arg.startsWith("--") || index < 3) throw new Error(`invalid argument: ${arg}`)
  return [arg.slice(2, index), arg.slice(index + 1)]
}))

const required = (name) => {
  const value = args[name]
  if (!value) throw new Error(`missing --${name}=...`)
  return value
}

const inputPath = required("input")
const payloadOutput = required("payload-output")
const manifestOutput = required("manifest-output")
const snapshotVersion = required("snapshot-version")
const generatedAt = required("generated-at")
const generatorSourceSha256 = sha256(
  Buffer.concat([
    fs.readFileSync(new URL(import.meta.url)),
    fs.readFileSync(new URL("./internal-telemetry-decision-snapshot-core.mjs", import.meta.url)),
  ]),
)

const rawFile = fs.readFileSync(inputPath)
const sourceFileSha256 = sha256(rawFile)
const db = new Database(inputPath, { readonly: true, fileMustExist: true })
db.pragma("query_only = ON")

const columns = db.prepare("PRAGMA table_info(agent_runs)").all().map((row) => row.name)
for (const field of ["trace_id", "record_classification", "provider", "model", "cost_usd", "cost_source", "started_at", "ended_at"]) {
  if (!columns.includes(field)) throw new Error(`agent_runs.${field} is unavailable`)
}

const rows = db.prepare(
  "SELECT trace_id, provider, model, cost_usd, cost_source, started_at, ended_at FROM agent_runs WHERE record_classification = 'live' AND trace_id NOT LIKE 'trace-example-%' ORDER BY id",
).all()
db.close()

if (rows.length === 0) throw new Error("agent_runs has no schema-classified live operational rows")
if (rows.some((row) => /^trace-example-/.test(row.trace_id))) {
  throw new Error("synthetic trace-example fixtures are not an operational Spend source")
}

const normalizedRows = rows.map((row) => {
  if (row.cost_usd !== null && (!Number.isFinite(row.cost_usd) || row.cost_usd < 0)) {
    throw new Error("cost_usd contains an unsupported value")
  }
  return {
    traceId: row.trace_id,
    provider: row.provider ?? "SOURCE_ARTIFACT_MISSING_FIELD",
    model: row.model ?? "SOURCE_ARTIFACT_MISSING_FIELD",
    costUsd: row.cost_usd,
    costSource: row.cost_source,
    startedAt: row.started_at,
    endedAt: row.ended_at,
  }
})

const numericRows = normalizedRows.filter((row) => row.costUsd !== null)
const groups = [...numericRows.reduce((map, row) => {
  const key = canonicalJson([row.provider, row.model, row.costSource])
  const current = map.get(key) ?? {
    provider: row.provider,
    model: row.model,
    costSource: row.costSource,
    numericRowCount: 0,
    costUsd: 0,
  }
  current.numericRowCount += 1
  current.costUsd += row.costUsd
  map.set(key, current)
  return map
}, new Map()).values()]
  .map((group) => ({ ...group, costUsd: Number(group.costUsd.toFixed(9)) }))
  .sort((a, b) => b.costUsd - a.costUsd || a.provider.localeCompare(b.provider))

const startedAt = normalizedRows.map((row) => row.startedAt).sort()
const endedAt = normalizedRows.flatMap((row) => row.endedAt ? [row.endedAt] : []).sort()
const sourceDataSha256 = sha256(canonicalJson(normalizedRows))
const numericCostUsdTotal = Number(numericRows.reduce((sum, row) => sum + row.costUsd, 0).toFixed(9))

const snapshot = {
  contractId: CONTRACT_ID,
  schemaVersion: SCHEMA_VERSION,
  generatorVersion: GENERATOR_VERSION,
  snapshotVersion,
  generatorSourceSha256,
  generatedAt,
  source: {
    kind: "protected_sqlite_agent_runs_sanitized_aggregate",
    sourceDataSha256,
    sourceFileSha256,
    sourceFreshness: endedAt.at(-1) ?? startedAt.at(-1),
    currency: "USD",
    timezone: "UTC",
  },
  spend: {
    period: { basis: "started_at", start: startedAt[0], end: startedAt.at(-1) },
    populationCount: normalizedRows.length,
    numericCostRowCount: numericRows.length,
    nullCostRowCount: normalizedRows.length - numericRows.length,
    numericCostUsdTotal,
    groups,
  },
  approvalUsage: { status: "AUTHORITATIVE_CONTRACT_NOT_PROVEN" },
}

const envelope = buildEnvelope(snapshot)
validateEnvelope(envelope, envelope.integrity.payloadSha256)

const manifest = {
  contractId: CONTRACT_ID,
  schemaVersion: SCHEMA_VERSION,
  snapshotVersion,
  generatorVersion: GENERATOR_VERSION,
  generatorSourceSha256,
  environmentVariable: ENVIRONMENT_VARIABLE,
  expectedPayloadSha256: envelope.integrity.payloadSha256,
}

const atomicWrite = (destination, content) => {
  fs.mkdirSync(path.dirname(destination), { recursive: true })
  const temporary = `${destination}.tmp-${process.pid}`
  fs.writeFileSync(temporary, content, { mode: 0o600 })
  fs.renameSync(temporary, destination)
}

atomicWrite(payloadOutput, `${JSON.stringify(envelope)}\n`)
atomicWrite(manifestOutput, `${JSON.stringify(manifest, null, 2)}\n`)

console.log(`Generated sanitized decision snapshot ${snapshotVersion}; payload SHA-256 ${envelope.integrity.payloadSha256}`)
