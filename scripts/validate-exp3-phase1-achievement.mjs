#!/usr/bin/env node
import fs from "node:fs"

const file = "app/achievements/achievements-exp3-recovery-injector.tsx"
const source = fs.readFileSync(file, "utf8")
const required = [
  "Recovered Experiment 3 from durable artifacts",
  "NOTEBOOK RECOVERY &amp; DRIFT TESTS PASSED",
  "PHASE 1 ACCEPTED WITH LIMITATIONS",
  "Reward Model V2 recovery",
  "8,002",
  "7,660",
  "38,300",
  "DRIFT_DETECTED",
  "18/18 PASS",
  "Scientific gate B1 remains active",
  "THIN_SUPPORT",
  "no TEST evaluation",
  "no model or policy training",
  "Role separation retained",
  "full Phase 1 DoD completion is not established",
  "exp3-durable-acceptance",
]
const prohibited = [
  "Experiment 3 completed",
  "B1 passed",
  "production ready",
  "uplift proven",
]

const missing = required.filter((value) => !source.includes(value))
const unsafe = prohibited.filter((value) => source.toLowerCase().includes(value.toLowerCase()))
const evidence = JSON.parse(fs.readFileSync("public/evidence/exp3-notebook-acceptance-20260907.json", "utf8"))
const engineering = fs.readFileSync("app/case-studies/nbo-nrt-azure-databricks/engineering-evidence-lens.tsx", "utf8")
const models = fs.readFileSync("app/case-studies/nbo-nrt-azure-databricks/models-experiments-lens.tsx", "utf8")
if (evidence.observed.train_rows !== 8002 || evidence.observed.distinct_train_context_states !== 7660 || evidence.observed.distinct_actions !== 5 || evidence.observed.candidate_rows !== 38300 || !evidence.resume_blocked || !evidence.original_expected_unchanged) missing.push("exact exported acceptance values")
if (!engineering.includes('id="exp3-durable-acceptance"')) missing.push("use-case evidence anchor")
if (!models.includes("Do not use these bands as the current B1 classification contract.")) missing.push("historical threshold boundary")
if (!models.includes("ACTIVE · RULE UNRESOLVED")) missing.push("B1 current state")
const publicData = JSON.stringify(evidence)
if (/\/Users\/|msararin@|adb-740560|3090848486868219/.test(publicData)) unsafe.push("private location in public summary")
const result = {
  verdict: missing.length === 0 && unsafe.length === 0 ? "PASS" : "BLOCK",
  file,
  required_checks: required.length,
  missing,
  prohibited_claims_found: unsafe,
}

console.log(JSON.stringify(result, null, 2))
process.exit(result.verdict === "PASS" ? 0 : 1)
