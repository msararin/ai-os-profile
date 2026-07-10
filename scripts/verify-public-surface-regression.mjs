#!/usr/bin/env node

import { readFile } from "node:fs/promises"
import path from "node:path"

const args = process.argv.slice(2)
const sourceRootIndex = args.indexOf("--source-root")
const sourceRoot = path.resolve(
  sourceRootIndex >= 0 ? args[sourceRootIndex + 1] : process.env.SOURCE_ROOT || process.cwd(),
)
const baseArg = args.find((arg, index) => arg !== "--source-root" && index !== sourceRootIndex + 1)
const baseUrl = (baseArg || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "")
const timeoutMs = Number(process.env.VERIFY_TIMEOUT_MS || 15000)

const checks = []

// Owner-review guardrails: these strings represent the raw empty staging UX that must not return.
const bannedTelemetrySourcePatterns = [
  ["raw staging banner", /STAGING_CANDIDATE - local internal dashboard query candidate/],
  ["empty-query message", /No rows found in the staging query/],
  ["raw missing-field banner", /FIELD_NOT_EXPOSED_NOT_CLAIMED - ledger unavailable/],
]

// Positive claim forms are forbidden; explicit non-claims such as "not established" remain allowed.
const positiveTelemetryOverclaims =
  /telemetry (?:is )?ready|production telemetry (?:is )?verified|public telemetry dashboard|authenticated dashboard content (?:is )?verified/i

function record(name, passed, detail) {
  checks.push({ name, passed, detail })
  console.log(`${passed ? "PASS" : "FAIL"} ${name}: ${detail}`)
}

async function request(path) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(`${baseUrl}${path}`, {
      redirect: "manual",
      signal: controller.signal,
      headers: { "user-agent": "aios-public-surface-regression/20260710" },
    })
  } catch (error) {
    throw new Error(`${path} request failed closed: ${error instanceof Error ? error.message : error}`)
  } finally {
    clearTimeout(timer)
  }
}

async function publicPage(path, expectations) {
  const response = await request(path)
  const body = await response.text()
  record(`${path} status`, response.status === 200, `HTTP ${response.status}`)

  for (const [label, pattern] of expectations) {
    record(`${path} ${label}`, pattern.test(body), pattern.test(body) ? "present" : "missing")
  }

  return body
}

async function protectedRoute(path, { allowAbsent = false } = {}) {
  const response = await request(path)
  const body = await response.text()
  const location = response.headers.get("location") || ""
  const redirectsToAuth = response.status >= 300 && response.status < 400 &&
    /\/api\/auth\/signin|\/auth\/signin|\/login/i.test(location)
  const protectedContentLeaked = /Broad all-missing-fields aggregate|26957|18019|Internal Cockpit|Task-role-evidence-governance view/i.test(body)

  record(`${path} protected status`, response.status !== 200, `HTTP ${response.status}`)
  const protectedOutcome = redirectsToAuth || (allowAbsent && response.status === 404)
  record(
    `${path} protected outcome`,
    protectedOutcome,
    redirectsToAuth ? location : response.status === 404 ? "route absent; no public surface" : "missing auth redirect",
  )
  record(`${path} response body leak`, !protectedContentLeaked, protectedContentLeaked ? "protected content found" : "no protected content found")
}

async function sourceRegression() {
  const knowledgeSource = await readFile(path.join(sourceRoot, "app/knowledge-sharing/page.tsx"), "utf8")
  const telemetrySource = await readFile(path.join(sourceRoot, "app/internal/telemetry/page.tsx"), "utf8")

  const knowledgeExpectations = [
    ["bounded page width", /max-w-5xl/],
    ["shrink-safe descendants", /min-w-0/],
    ["contained cards and embeds", /overflow-hidden/],
    ["wrapping text and links", /break-words/],
    ["responsive iframe cap", /w-full max-w-\[504px\]/],
  ]
  for (const [label, pattern] of knowledgeExpectations) {
    record(`Knowledge Sharing source ${label}`, pattern.test(knowledgeSource), pattern.test(knowledgeSource) ? "present" : "missing")
  }
  record("Knowledge Sharing source no viewport-width escape", !/\bw-screen\b/.test(knowledgeSource), /\bw-screen\b/.test(knowledgeSource) ? "w-screen found" : "no w-screen")

  const telemetryExpectations = [
    ["server auth call", /const session = await auth\(\)/],
    ["owner allowlist", /isAllowedInternalEmail/],
    ["auth redirect", /redirect\("\/api\/auth\/signin\?callbackUrl=\/internal\/telemetry"\)/],
    ["dynamic route", /export const dynamic = "force-dynamic"/],
    ["local query row presence", /Local query row presence/],
    ["claim boundary", /Claim boundary/],
    ["next gates", /Next gates/],
    ["collapsed diagnostics", /<details/],
  ]
  for (const [label, pattern] of telemetryExpectations) {
    record(`Internal Telemetry source ${label}`, pattern.test(telemetrySource), pattern.test(telemetrySource) ? "present" : "missing")
  }

  for (const [label, pattern] of bannedTelemetrySourcePatterns) {
    record(`Internal Telemetry source excludes ${label}`, !pattern.test(telemetrySource), pattern.test(telemetrySource) ? "banned string found" : "absent across full source")
  }

  record(
    "Internal Telemetry source no positive readiness/exposure claim",
    !positiveTelemetryOverclaims.test(telemetrySource),
    positiveTelemetryOverclaims.test(telemetrySource) ? "positive overclaim found" : "no positive overclaim",
  )
}

try {
  await sourceRegression()
  await publicPage("/knowledge-sharing", [
    ["URN 7480909361486397440", /urn:li:share:7480909361486397440/],
    ["URN 7478071149814403072", /urn:li:share:7478071149814403072/],
  ])

  const systemHealthBody = await publicPage("/architecture/system-health", [
    ["Internal Telemetry card", /Internal Telemetry/],
    ["internal telemetry href", /href=["']\/internal\/telemetry["']/],
    ["protected wording", /Protected internal/],
    ["authentication wording", /Authentication is required/],
  ])
  record(
    "/architecture/system-health raw telemetry values",
    !/69881|26957|18019/.test(systemHealthBody),
    /69881|26957|18019/.test(systemHealthBody) ? "protected values found" : "no protected values found",
  )

  await publicPage("/architecture/internal-cockpit-governance", [
    ["System Health navigation", /href=["']\/architecture\/system-health["']/],
    ["protected authentication boundary", /internal surface remains protected and requires authentication/i],
  ])

  await protectedRoute("/internal/telemetry")
  await protectedRoute("/internal/dashboard", { allowAbsent: true })
} catch (error) {
  record("request execution", false, error instanceof Error ? error.message : String(error))
}

const failures = checks.filter((check) => !check.passed)
console.log(`SUMMARY ${checks.length - failures.length}/${checks.length} checks passed for ${baseUrl}`)
if (failures.length > 0) process.exit(1)
