#!/usr/bin/env node
import fs from "node:fs"
import crypto from "node:crypto"
import path from "node:path"

const PROFILE_ID = "public_surface_go_live_v0_1"
const ROOT = process.cwd()
const KIT_DIR = path.join(ROOT, "docs", "governance", "public-surface-runner", "v0.1")
const DEFAULT_INPUT = path.join(KIT_DIR, "public-surface-review-input.pagelab-template.json")
const DEFAULT_RULES = path.join(KIT_DIR, "public-surface-runner-rules.json")
const DEFAULT_HTML_OUT = path.join(ROOT, "PUBLIC_SURFACE_REVIEW_PACKET.html")
const DEFAULT_JSON_OUT = path.join(ROOT, "public-surface-review-result.json")

function parseArgs(argv) {
  const args = {
    input: DEFAULT_INPUT,
    rules: DEFAULT_RULES,
    out: DEFAULT_HTML_OUT,
    json: DEFAULT_JSON_OUT,
  }

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i]
    const next = argv[i + 1]
    if (arg === "--") {
      continue
    } else if (arg === "--input" && next) {
      args.input = path.resolve(next)
      i += 1
    } else if (arg === "--rules" && next) {
      args.rules = path.resolve(next)
      i += 1
    } else if (arg === "--out" && next) {
      args.out = path.resolve(next)
      i += 1
    } else if (arg === "--json" && next) {
      args.json = path.resolve(next)
      i += 1
    } else if (arg === "--help" || arg === "-h") {
      printHelp()
      process.exit(0)
    } else {
      throw new Error(`Unknown or incomplete argument: ${arg}`)
    }
  }

  return args
}

function printHelp() {
  console.log(`Public Surface Runner
Profile: ${PROFILE_ID}

Usage:
  pnpm public:review
  pnpm public:review -- --input docs/governance/change-packets/<packet>/public-surface-review-input.json

Options:
  --input <path>  Review input JSON
  --rules <path>  Rules JSON
  --out <path>    HTML packet output path
  --json <path>   JSON result output path

Boundary:
  Local owner review only. No deploy, no publish, no production promotion, no go-live approval.
`)
}

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"))
  } catch (error) {
    throw new Error(`Failed to read ${label} at ${filePath}: ${error.message}`)
  }
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex")
}

function text(value) {
  if (value === null || value === undefined) return ""
  if (typeof value === "string") return value
  return JSON.stringify(value)
}

function status(value) {
  return String(value || "").trim().toLowerCase()
}

function hasText(...values) {
  return values.some((value) => text(value).trim().length > 0)
}

function matchesAny(value, patterns) {
  return patterns.some((pattern) => pattern.test(value))
}

function containsPrivatePath(value) {
  return matchesAny(value, [
    /\/Users\/apple\b/i,
    /\/Downloads\b/i,
    /\/robert-knowledge-base\b/i,
    /private\s+KB\s+checkout\s+path/i,
    /internal\s+worktree\s+path/i,
  ])
}

function containsSensitiveDetail(value) {
  return matchesAny(value, [
    /\b(api[_-]?key|token|secret|bearer)\b\s*[:=]/i,
    /\bsk-[A-Za-z0-9_-]{12,}\b/,
    /\bOPENROUTER_API_KEY\b/i,
    /\bANTHROPIC_API_KEY\b/i,
    /\bOPENAI_API_KEY\b/i,
    /\bprovider receipt body\b/i,
    /\bgeneration id\b/i,
    /\braw telemetry\b/i,
    /\bprivate prompt log\b/i,
    /\binternal evidence json\b/i,
  ])
}

function safeRef(value) {
  const raw = text(value)
  if (containsPrivatePath(raw)) return "[private path redacted]"
  if (containsSensitiveDetail(raw)) return "[sensitive detail redacted]"
  return raw
}

function evidenceStatus(evidence, fallback) {
  if (!evidence) return fallback
  const value = status(evidence.status || evidence.result || evidence.verdict)
  if (["pass", "passed", "success", "ok", "200"].includes(value)) return "PASS"
  if (["fail", "failed", "error", "block", "blocked"].includes(value)) return "BLOCK"
  if (["warn", "warning"].includes(value)) return "WARN"
  if (["not_applicable", "n/a", "na", "not applicable"].includes(value)) return "NOT_APPLICABLE"
  return "WARN"
}

function evidenceNote(name, evidence, fallback) {
  if (!evidence) return fallback
  if (typeof evidence === "string") return evidence
  return evidence.reason || evidence.note || evidence.summary || `${name} status: ${evidence.status || evidence.result || "provided"}`
}

function check(id, rulesById, result, evidence, note) {
  const rule = rulesById[id] || {}
  return { id, name: rule.name || id, result, evidence, note }
}

function codeLike(files) {
  return files.some((file) => /\.(js|jsx|ts|tsx|mjs|cjs|css|html|json|mdx)$/.test(String(file)))
}

function evaluate(input, rules, outputHtmlPath) {
  if (input.profile !== PROFILE_ID) {
    throw new Error(`Input profile must be ${PROFILE_ID}`)
  }

  const rulesById = Object.fromEntries((rules.checks || []).map((item) => [item.id, item]))
  const checks = []
  const publicCopy = text(input.public_copy || input.public_copy_summary)
  const boundary = input.declared_claim_boundary || {}
  const changedFiles = Array.isArray(input.changed_files) ? input.changed_files : []
  const refs = Array.isArray(input.evidence_refs) ? input.evidence_refs : []
  const corpus = [
    publicCopy,
    input.public_route_or_surface,
    input.expected_entry_identifier,
    changedFiles.join("\n"),
    refs.join("\n"),
    JSON.stringify(boundary),
  ].join("\n")

  const surfaceIdentified = hasText(input.public_route_or_surface, input.preview_url, input.production_url)
  checks.push(check(
    "SURFACE_IDENTIFIED",
    rulesById,
    surfaceIdentified ? "PASS" : "BLOCK",
    surfaceIdentified ? safeRef(input.public_route_or_surface || input.preview_url || input.production_url) : "No public surface supplied.",
    surfaceIdentified ? "Public surface is explicitly identified." : "A route, page, component, card, preview URL, or production URL is required."
  ))

  const entryPresent = input.expected_entry_present === true || (hasText(input.expected_entry_identifier) && publicCopy.trim().length > 0)
  checks.push(check(
    "EXPECTED_ENTRY_PRESENT",
    rulesById,
    entryPresent ? "PASS" : "BLOCK",
    entryPresent ? safeRef(input.expected_entry_identifier || "Entry content provided.") : "No expected entry evidence supplied.",
    entryPresent ? "Expected public entry is present or traceable." : "Expected public entry is missing or not traceable."
  ))

  const riskyPositiveTerms = [
    /\bproven\b/i,
    /\bguaranteed\b/i,
    /\bproduction-ready\b/i,
    /\bfully automated\b/i,
    /\bautonomous\b/i,
    /\bcomplete orchestration\b/i,
    /\blive monitoring\b/i,
    /\benterprise-grade\b/i,
    /\bcertified\b/i,
    /\baudited\b/i,
  ]
  const riskyInPublicCopy = matchesAny(publicCopy, riskyPositiveTerms)
  checks.push(check(
    "CLAIM_SAFE_WORDING",
    rulesById,
    riskyInPublicCopy ? "BLOCK" : "PASS",
    riskyInPublicCopy ? "Risky public claim wording detected." : "Public copy avoids blocked maturity and proof claims.",
    riskyInPublicCopy ? "Downgrade or remove unsupported public claim wording." : "Claim wording is bounded."
  ))

  const privatePathLeak = containsPrivatePath(corpus)
  checks.push(check(
    "NO_PRIVATE_PATH_LEAK",
    rulesById,
    privatePathLeak ? "BLOCK" : "PASS",
    privatePathLeak ? "Private path pattern detected; raw value redacted from this report." : "No private local or KB path patterns detected.",
    privatePathLeak ? "Remove private paths from public-facing copy and owner-safe summaries." : "No private path leakage found."
  ))

  const sensitiveLeak = containsSensitiveDetail(corpus)
  checks.push(check(
    "NO_SECRET_OR_RECEIPT_LEAK",
    rulesById,
    sensitiveLeak ? "BLOCK" : "PASS",
    sensitiveLeak ? "Sensitive secret, receipt, telemetry, or prompt-log pattern detected; raw value redacted." : "No secret or receipt patterns detected.",
    sensitiveLeak ? "Remove sensitive details before owner/public review." : "No secret or receipt leakage found."
  ))

  const round3Blocked = matchesAny(publicCopy, [
    /\bRound 3 executed\b/i,
    /\bRound 3 completed\b/i,
    /\bRound 3 successful\b/i,
    /\bRound 3 proven\b/i,
    /\bproduction-ready Round 3\b/i,
    /\breal pilot completed\b/i,
    /\bmulti-worker proof completed\b/i,
  ])
  checks.push(check(
    "NO_ROUND3_OVERCLAIM",
    rulesById,
    round3Blocked ? "BLOCK" : "PASS",
    round3Blocked ? "Round 3 execution/success overclaim detected." : "No Round 3 execution, success, proof, or production-readiness claim detected.",
    round3Blocked ? "Remove or reframe Round 3 claim as pending/planning/bounded only." : "Round 3 boundary is clean."
  ))

  const technicalApplicable = input.code_changes === true || codeLike(changedFiles)
  const techEvidence = [input.build_result, input.typecheck_result, input.lint_result].filter(Boolean)
  let techResult = "NOT_APPLICABLE"
  let techNote = "No code-affecting changes supplied."
  if (technicalApplicable) {
    if (techEvidence.length === 0) {
      techResult = "WARN"
      techNote = "Code-like changes are present but build/typecheck/lint evidence was not supplied."
    } else if (techEvidence.some((item) => evidenceStatus(item, "WARN") === "BLOCK")) {
      techResult = "BLOCK"
      techNote = "At least one technical check failed."
    } else {
      techResult = techEvidence.some((item) => evidenceStatus(item, "WARN") === "WARN") ? "WARN" : "PASS"
      techNote = "Technical evidence is captured or explicitly not applicable."
    }
  } else if (techEvidence.length > 0) {
    techResult = techEvidence.some((item) => evidenceStatus(item, "WARN") === "BLOCK") ? "BLOCK" : "PASS"
    techNote = "Technical evidence was supplied."
  }
  checks.push(check(
    "BUILD_TYPECHECK_LINT_CAPTURED_IF_APPLICABLE",
    rulesById,
    techResult,
    [
      `build: ${evidenceNote("build", input.build_result, "not supplied")}`,
      `typecheck: ${evidenceNote("typecheck", input.typecheck_result, "not supplied")}`,
      `lint: ${evidenceNote("lint", input.lint_result, "not supplied")}`,
    ].join(" | "),
    techNote
  ))

  const routeSmoke = input.route_smoke_result
  checks.push(check(
    "ROUTE_SMOKE_CAPTURED_IF_APPLICABLE",
    rulesById,
    routeSmoke ? evidenceStatus(routeSmoke, "WARN") : (surfaceIdentified ? "WARN" : "NOT_APPLICABLE"),
    evidenceNote("route smoke", routeSmoke, "No route smoke evidence supplied."),
    routeSmoke ? "Route smoke evidence supplied." : "Route smoke not supplied; acceptable only when no route/public preview is required."
  ))

  let deploymentResult = "NOT_APPLICABLE"
  let deploymentNote = "No deployment occurred."
  if (input.deployment_occurred === true) {
    deploymentResult = hasText(input.deployment_url, input.preview_url, input.production_url) ? "PASS" : "BLOCK"
    deploymentNote = deploymentResult === "PASS" ? "Deployment/preview reference captured." : "Deployment occurred but no URL/reference was supplied."
  }
  checks.push(check(
    "DEPLOYMENT_REF_CAPTURED_IF_DEPLOYED",
    rulesById,
    deploymentResult,
    safeRef(input.deployment_url || input.preview_url || input.production_url || "No deployment reference."),
    deploymentNote
  ))

  const boundaryClear = Array.isArray(boundary.public_may_claim) && Array.isArray(boundary.public_must_not_claim) && Array.isArray(boundary.internal_only)
  checks.push(check(
    "PUBLIC_INTERNAL_BOUNDARY_CLEAR",
    rulesById,
    boundaryClear ? "PASS" : "WARN",
    boundaryClear ? "Claim boundary fields supplied." : "Claim boundary fields are incomplete.",
    boundaryClear ? "Public/internal claim boundary is explicit." : "Add public_may_claim, public_must_not_claim, and internal_only arrays."
  ))

  checks.push(check(
    "FORBIDDEN_TERMS_CONTEXT_ONLY",
    rulesById,
    riskyInPublicCopy ? "BLOCK" : "PASS",
    riskyInPublicCopy ? "Forbidden term appears as a positive public claim." : "Forbidden terms are not used as positive public claims.",
    riskyInPublicCopy ? "Move forbidden terms to boundary/not-claimed sections only." : "Forbidden term context is acceptable."
  ))

  let visualResult = "NOT_APPLICABLE"
  let visualNote = "Visual Spot Checker not used."
  if (input.visual_spot_check) {
    const result = evidenceStatus(input.visual_spot_check, "WARN")
    visualResult = input.visual_spot_check.required === true && result !== "PASS" ? "BLOCK" : result
    visualNote = input.visual_spot_check.required === true && result !== "PASS"
      ? "Visual confirmation was required but did not pass."
      : evidenceNote("visual spot check", input.visual_spot_check, "Visual Spot Checker supplied.")
  }
  checks.push(check(
    "VISUAL_SPOT_CHECK_OPTIONAL",
    rulesById,
    visualResult,
    visualNote,
    "Optional lightweight visibility check only; no screenshot diffing, design QA, accessibility approval, or visual regression."
  ))

  checks.push(check(
    "OWNER_REVIEW_SURFACE_AVAILABLE",
    rulesById,
    "PASS",
    path.basename(outputHtmlPath),
    "One-click owner review packet is generated by this command."
  ))

  const warnings = checks.filter((item) => item.result === "WARN")
  const blocks = checks.filter((item) => item.result === "BLOCK")
  const finalStatus = blocks.length > 0
    ? "BLOCKED_BEFORE_PROFILE"
    : warnings.length > 0
      ? "READY_WITH_WARNINGS_OWNER_REVIEW_REQUIRED"
      : "READY_FOR_GO_LIVE_CONSIDERATION"

  return {
    profile: PROFILE_ID,
    profile_name: "Public Surface Runner",
    generated_at: new Date().toISOString(),
    rules_sha256: input.__rules_sha256 || "",
    surface_type: input.surface_type || "",
    public_route_or_surface: safeRef(input.public_route_or_surface || ""),
    expected_entry_identifier: safeRef(input.expected_entry_identifier || ""),
    changed_files: changedFiles.map(safeRef),
    public_copy_summary: safeRef(publicCopy),
    evidence_refs: refs.map(safeRef),
    declared_claim_boundary: boundary,
    checks,
    warnings,
    blocks,
    deployment_occurred: input.deployment_occurred === true,
    deployment_url: safeRef(input.deployment_url || input.preview_url || input.production_url || ""),
    route_smoke_result: input.route_smoke_result || null,
    build_result: input.build_result || null,
    typecheck_result: input.typecheck_result || null,
    lint_result: input.lint_result || null,
    visual_spot_check: input.visual_spot_check || null,
    final_status: finalStatus,
    boundary_statement: "Local owner review only. No deploy, no publish, no preview promotion, no production modification, no go-live approval.",
  }
}

function escapeHtml(value) {
  return text(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function listItems(items) {
  if (!items || items.length === 0) return "<li>None supplied.</li>"
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n")
}

function resultClass(result) {
  return String(result || "").toLowerCase().replace(/_/g, "-")
}

function renderHtml(result) {
  const passCount = result.checks.filter((item) => item.result === "PASS").length
  const warnCount = result.checks.filter((item) => item.result === "WARN").length
  const blockCount = result.checks.filter((item) => item.result === "BLOCK").length
  const naCount = result.checks.filter((item) => item.result === "NOT_APPLICABLE").length
  const checkRows = result.checks.map((item) => `
      <tr>
        <td>${escapeHtml(item.id)}</td>
        <td>${escapeHtml(item.name)}</td>
        <td><span class="badge ${resultClass(item.result)}">${escapeHtml(item.result)}</span></td>
        <td>${escapeHtml(item.evidence)}</td>
        <td>${escapeHtml(item.note)}</td>
      </tr>`).join("\n")

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Public Surface Review Packet</title>
  <style>
    :root { --ink: #172033; --muted: #5b6475; --line: #d8dee9; --panel: #f7f9fc; --pass: #0d7a46; --warn: #9a6200; --block: #b42318; --na: #596170; }
    body { margin: 0; font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: var(--ink); background: #fff; }
    main { max-width: 1120px; margin: 0 auto; padding: 32px 24px 48px; }
    h1 { font-size: 28px; line-height: 1.15; margin: 0 0 8px; }
    h2 { font-size: 18px; margin: 28px 0 10px; padding-bottom: 6px; border-bottom: 1px solid var(--line); }
    p, ul { margin-top: 8px; margin-bottom: 8px; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; margin-top: 18px; }
    .field { border: 1px solid var(--line); border-radius: 6px; background: var(--panel); padding: 10px 12px; min-width: 0; }
    .label { display: block; color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0; margin-bottom: 4px; }
    .value { overflow-wrap: anywhere; font-weight: 600; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; }
    th, td { text-align: left; vertical-align: top; border: 1px solid var(--line); padding: 8px; overflow-wrap: anywhere; }
    th { background: #eef2f7; font-size: 12px; color: #3d4656; }
    .badge { display: inline-block; border-radius: 999px; padding: 2px 8px; font-size: 12px; font-weight: 700; color: #fff; }
    .pass { background: var(--pass); } .warn { background: var(--warn); } .block { background: var(--block); } .not-applicable { background: var(--na); }
    .boundary { border-left: 4px solid #374151; background: #f7f7f8; padding: 12px 14px; }
  </style>
</head>
<body>
  <main>
    <h1>Public Surface Review Packet</h1>
    <p><strong>Profile:</strong> ${escapeHtml(result.profile)} | <strong>Generated:</strong> ${escapeHtml(result.generated_at)}</p>
    <p><strong>Final status:</strong> <span class="badge ${resultClass(result.final_status)}">${escapeHtml(result.final_status)}</span></p>
    <div class="summary">
      <div class="field"><span class="label">Surface type</span><span class="value">${escapeHtml(result.surface_type || "not supplied")}</span></div>
      <div class="field"><span class="label">Public surface</span><span class="value">${escapeHtml(result.public_route_or_surface || "not supplied")}</span></div>
      <div class="field"><span class="label">Expected entry</span><span class="value">${escapeHtml(result.expected_entry_identifier || "not supplied")}</span></div>
      <div class="field"><span class="label">Check counts</span><span class="value">${passCount} PASS, ${warnCount} WARN, ${blockCount} BLOCK, ${naCount} NOT_APPLICABLE</span></div>
    </div>
    <h2>Intended Public Change</h2>
    <p>${escapeHtml(result.public_copy_summary || "No public copy supplied.")}</p>
    <p><strong>Changed files:</strong></p><ul>${listItems(result.changed_files)}</ul>
    <p><strong>Evidence references:</strong></p><ul>${listItems(result.evidence_refs)}</ul>
    <h2>Claim Boundary</h2>
    <div class="summary">
      <div class="field"><span class="label">Public may claim</span><ul>${listItems(result.declared_claim_boundary.public_may_claim || [])}</ul></div>
      <div class="field"><span class="label">Public must not claim</span><ul>${listItems(result.declared_claim_boundary.public_must_not_claim || [])}</ul></div>
      <div class="field"><span class="label">Internal only</span><ul>${listItems(result.declared_claim_boundary.internal_only || [])}</ul></div>
    </div>
    <h2>Validation Results</h2>
    <table><thead><tr><th style="width: 18%;">Check ID</th><th style="width: 18%;">Name</th><th style="width: 12%;">Result</th><th style="width: 24%;">Evidence</th><th>Note</th></tr></thead><tbody>${checkRows}</tbody></table>
    <h2>Warnings And Blocks</h2>
    <p><strong>Warnings:</strong></p><ul>${listItems(result.warnings.map((item) => `${item.id}: ${item.note}`))}</ul>
    <p><strong>Blocks:</strong></p><ul>${listItems(result.blocks.map((item) => `${item.id}: ${item.note}`))}</ul>
    <h2>Technical Evidence</h2>
    <ul>
      <li>Build: ${escapeHtml(evidenceNote("build", result.build_result, "not supplied"))}</li>
      <li>Typecheck: ${escapeHtml(evidenceNote("typecheck", result.typecheck_result, "not supplied"))}</li>
      <li>Lint: ${escapeHtml(evidenceNote("lint", result.lint_result, "not supplied"))}</li>
      <li>Route smoke: ${escapeHtml(evidenceNote("route smoke", result.route_smoke_result, "not supplied"))}</li>
      <li>Deployment occurred: ${result.deployment_occurred ? "yes" : "no"}</li>
      <li>Deployment reference: ${escapeHtml(result.deployment_url || "not applicable")}</li>
    </ul>
    <h2>Visual Spot Checker</h2>
    <p>${escapeHtml(evidenceNote("visual spot check", result.visual_spot_check, "not used"))}</p>
    <p>This is optional lightweight visibility confirmation only. It is not screenshot diffing, design QA, accessibility approval, or visual regression.</p>
    <h2>Final Boundary Statement</h2>
    <div class="boundary">
      <p>${escapeHtml(result.boundary_statement)}</p>
      <p>Passing this review packet does not deploy, publish, promote preview to production, approve public go-live, or prove production readiness.</p>
    </div>
  </main>
</body>
</html>
`
}

function main() {
  try {
    const args = parseArgs(process.argv)
    const input = readJson(args.input, "review input")
    const rules = readJson(args.rules, "rules")
    input.__rules_sha256 = sha256(args.rules)
    const result = evaluate(input, rules, args.out)
    fs.writeFileSync(args.out, renderHtml(result))
    fs.writeFileSync(args.json, `${JSON.stringify(result, null, 2)}\n`)

    const counts = {
      pass: result.checks.filter((item) => item.result === "PASS").length,
      warn: result.checks.filter((item) => item.result === "WARN").length,
      block: result.checks.filter((item) => item.result === "BLOCK").length,
      na: result.checks.filter((item) => item.result === "NOT_APPLICABLE").length,
    }

    console.log("Public Surface Runner")
    console.log(`Profile: ${PROFILE_ID}`)
    console.log(`Review packet: ${args.out}`)
    console.log(`Checks: ${counts.pass} PASS, ${counts.warn} WARN, ${counts.block} BLOCK, ${counts.na} NOT_APPLICABLE`)
    console.log(`Final status: ${result.final_status}`)
    console.log("Boundary: no deploy, no publish, no go-live approval")
    process.exit(counts.block > 0 ? 1 : 0)
  } catch (error) {
    console.error(`Public Surface Runner failed: ${error.message}`)
    process.exit(2)
  }
}

main()
