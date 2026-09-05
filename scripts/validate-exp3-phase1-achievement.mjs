#!/usr/bin/env node
import fs from "node:fs"

const file = "app/achievements/achievements-exp3-recovery-injector.tsx"
const source = fs.readFileSync(file, "utf8")
const required = [
  "pause-safe, resumable, and traceable",
  "PHASE 1 ACCEPTED WITH LIMITATIONS",
  "Reward Model V2 recovery",
  "8,002",
  "7,660",
  "38,300",
  "DRIFT_DETECTED",
  "18/18 PASS",
  "Scientific gate B1 remains active",
  "THIN_SUPPORT",
  "TEST was untouched",
  "no model or policy training",
  "Role separation retained",
]
const prohibited = [
  "Experiment 3 completed",
  "B1 passed",
  "production ready",
  "uplift proven",
]

const missing = required.filter((value) => !source.includes(value))
const unsafe = prohibited.filter((value) => source.toLowerCase().includes(value.toLowerCase()))
const result = {
  verdict: missing.length === 0 && unsafe.length === 0 ? "PASS" : "BLOCK",
  file,
  required_checks: required.length,
  missing,
  prohibited_claims_found: unsafe,
}

console.log(JSON.stringify(result, null, 2))
process.exit(result.verdict === "PASS" ? 0 : 1)
