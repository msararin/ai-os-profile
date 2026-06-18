#!/usr/bin/env node
import fs from "node:fs"

const manifestPath = process.argv[2]

const result = {
  verdict: "PASS",
  blockers: [],
  warnings: [],
  checked_at: new Date().toISOString(),
}

if (!manifestPath) {
  result.verdict = "BLOCK"
  result.blockers.push("manifest_path_missing")
  console.log(JSON.stringify(result, null, 2))
  process.exit(1)
}

let manifest
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
} catch (error) {
  result.verdict = "BLOCK"
  result.blockers.push(`manifest_json_parse_failed:${error.message}`)
  console.log(JSON.stringify(result, null, 2))
  process.exit(1)
}

const requiredFields = [
  "change_class",
  "summary",
  "owner_intended_meaning",
  "canonical_source",
  "affected_public_routes",
  "affected_files",
  "protected_not_in_scope",
  "owner_semantic_acceptance_required",
  "owner_semantic_acceptance_status",
  "deploy_allowed",
  "deployment_performed",
  "claim_boundary",
]

for (const field of requiredFields) {
  if (!(field in manifest)) {
    result.blockers.push(`missing_required_field:${field}`)
  }
}

if (manifest.owner_semantic_acceptance_required !== "yes") {
  result.blockers.push("owner_semantic_acceptance_required_must_be_yes")
}

if (manifest.deploy_allowed !== "no") {
  result.blockers.push("deploy_allowed_must_be_no_before_owner_go_live")
}

if (manifest.deployment_performed !== "no") {
  result.blockers.push("deployment_performed_must_be_no")
}

for (const arrayField of ["affected_public_routes", "affected_files", "protected_not_in_scope"]) {
  if (arrayField in manifest && !Array.isArray(manifest[arrayField])) {
    result.blockers.push(`${arrayField}_must_be_array`)
  }
}

if (manifest.owner_semantic_acceptance_status === "approved_for_go_live") {
  result.blockers.push("go_live_approval_not_allowed_in_local_packet")
}

if (result.blockers.length > 0) {
  result.verdict = "BLOCK"
} else if (result.warnings.length > 0) {
  result.verdict = "WARN"
}

console.log(JSON.stringify(result, null, 2))
process.exit(result.verdict === "BLOCK" ? 1 : 0)
