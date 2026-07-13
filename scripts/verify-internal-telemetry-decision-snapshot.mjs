#!/usr/bin/env node

import fs from "node:fs"
import {
  ENVIRONMENT_VARIABLE,
  validateEnvelope,
} from "./internal-telemetry-decision-snapshot-core.mjs"

const args = Object.fromEntries(process.argv.slice(2).map((arg) => {
  const index = arg.indexOf("=")
  if (!arg.startsWith("--") || index < 3) throw new Error(`invalid argument: ${arg}`)
  return [arg.slice(2, index), arg.slice(index + 1)]
}))

const manifest = JSON.parse(fs.readFileSync(args.manifest ?? "data/telemetry/internal-decision-snapshot.manifest.json", "utf8"))
const rawPayload = args.payload
  ? fs.readFileSync(args.payload, "utf8")
  : process.env[manifest.environmentVariable ?? ENVIRONMENT_VARIABLE]

if (!rawPayload) throw new Error("snapshot payload is unavailable")
const envelope = JSON.parse(rawPayload)
const result = validateEnvelope(envelope, manifest.expectedPayloadSha256)

if (manifest.snapshotVersion !== envelope.snapshot.snapshotVersion) throw new Error("snapshot version mismatch")
if (manifest.generatorVersion !== envelope.snapshot.generatorVersion) throw new Error("generator version mismatch")
if (manifest.generatorSourceSha256 !== envelope.snapshot.generatorSourceSha256) throw new Error("generator source mismatch")

if (args["receipt-output"]) {
  const receipt = {
    verifiedAt: new Date().toISOString(),
    snapshotVersion: envelope.snapshot.snapshotVersion,
    payloadSha256: result.calculatedPayloadSha256,
    sourceDataSha256: envelope.snapshot.source.sourceDataSha256,
    sourceFileSha256: envelope.snapshot.source.sourceFileSha256,
    state: result.state,
    spend: envelope.snapshot.spend,
    approvalUsage: envelope.snapshot.approvalUsage,
  }
  fs.writeFileSync(args["receipt-output"], `${JSON.stringify(receipt, null, 2)}\n`, { mode: 0o600 })
}

console.log(`PASS ${manifest.snapshotVersion} ${result.calculatedPayloadSha256}`)
