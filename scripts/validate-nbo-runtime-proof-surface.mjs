import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const page = readFileSync("app/case-studies/nbo-nrt-azure-databricks/page.tsx", "utf8")
const proof = readFileSync("app/case-studies/nbo-nrt-azure-databricks/runtime-proof.tsx", "utf8")

assert(page.includes('import { RuntimeProof } from "./runtime-proof"'), "runtime proof component must be imported")
assert(page.includes("<RuntimeProof />"), "runtime proof component must be mounted")
assert(page.includes("reconciled through 30 Aug 2026"), "page evidence date must reflect runtime reconciliation")

for (const text of [
  "ML / Decision Evidence",
  "LLM / Agent Assurance",
  "Governance Runtime Proof",
  "Runtime verified with boundaries",
  "View tested proof",
  "T8-RUNTIME-PARENT-001",
  "T8-RUNTIME-CHILD-001",
  "T8-RUNTIME-SUPERSEDE-001",
  "IDEMPOTENCY_KEY_COLLISION_REJECTED",
  "STALE_PROJECTION_POINTER_REJECTED",
  "DELTA_CANNOT_MODIFY_APPEND_ONLY",
  "SYNTHETIC_LEARNING_AND_MLOPS_EVIDENCE_ONLY",
  "concurrent or multi-writer safety is not verified",
]) assert(proof.includes(text), `runtime proof surface missing: ${text}`)

for (const forbidden of [
  "PRODUCTION_VERIFIED",
  "multi-writer verified",
  "model quality verified",
  "TEST accessed",
]) assert(!proof.includes(forbidden), `runtime proof surface contains prohibited claim: ${forbidden}`)

assert(proof.includes("owner-operated Databricks results"), "owner-operated custody boundary must be visible")
assert(proof.includes("not a direct connector transcript"), "direct-connector non-claim must be visible")
assert(proof.includes("UPDATE and DELETE were runtime-tested"), "runtime probe scope must be visible")
assert(proof.includes("static workflow exclusions only"), "static/runtime distinction must be visible")

console.log(JSON.stringify({
  verdict: "PASS",
  boundary: "LOCAL_PUBLIC_SURFACE_CONTRACT_ONLY",
  checks: {
    mounted: true,
    evidence_date: true,
    evidence_classes_separated: true,
    expandable_proof: true,
    retained_identities: true,
    expected_failures: true,
    custody_boundary: true,
    claim_boundary: true,
    prohibited_claims_absent: true,
  },
}, null, 2))
