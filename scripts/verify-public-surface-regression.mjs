#!/usr/bin/env node

const baseUrl = (process.argv[2] || process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "")
const timeoutMs = Number(process.env.VERIFY_TIMEOUT_MS || 15000)

const checks = []

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

try {
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
