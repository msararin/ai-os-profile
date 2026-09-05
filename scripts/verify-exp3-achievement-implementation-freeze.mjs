#!/usr/bin/env node
import crypto from "node:crypto"
import fs from "node:fs"
import { spawnSync } from "node:child_process"

const manifestPath = process.argv[2]
if (!manifestPath) {
  console.error("freeze manifest path required")
  process.exit(2)
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const actual = manifest.implementation_files.map(({ path }) => {
  const result = spawnSync("git", ["show", `:${path}`], { encoding: null })
  if (result.status !== 0) {
    throw new Error(`unable to read staged Git blob: ${path}`)
  }
  const bytes = result.stdout
  return { path, sha256: crypto.createHash("sha256").update(bytes).digest("hex") }
})
const aggregate = crypto
  .createHash("sha256")
  .update(actual.map(({ path, sha256 }) => `${path}\0${sha256}\n`).join(""))
  .digest("hex")
const mismatches = actual.filter((entry, index) => entry.sha256 !== manifest.implementation_files[index].sha256)
const verdict = mismatches.length === 0 && aggregate === manifest.implementation_digest_sha256 ? "PASS" : "BLOCK"

console.log(JSON.stringify({
  verdict,
  candidate_id: manifest.candidate_id,
  base_sha: manifest.base_sha,
  implementation_digest_sha256: aggregate,
  expected_implementation_digest_sha256: manifest.implementation_digest_sha256,
  files_checked: actual.length,
  source: "staged Git index blobs via git show :path",
  mismatches,
}, null, 2))
process.exit(verdict === "PASS" ? 0 : 1)
