#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const mapPath = path.join(root, "docs", "governance", "public-surface-map", "aios-public-surface-topic-map.json")

const requiredTopicFields = [
  "topic",
  "canonical_public_page",
  "supporting_public_pages",
  "internal_evidence_source",
  "appear_in_org_chart",
  "appear_in_executive_architecture_map",
  "appear_in_cockpit_status",
  "appear_in_governance_policy",
  "appear_in_role_responsibility",
  "recommended_public_safe_description",
  "forbidden_unsafe_claims",
  "current_consistency_status",
  "recommended_next_action",
]

const allowedStatuses = new Set([
  "CONSISTENT",
  "PARTIAL",
  "MISSING",
  "DUPLICATED",
  "AMBIGUOUS",
  "OVEREXPOSED",
])

const allowedActions = new Set([
  "NO_ACTION",
  "ADD_TO_TOPIC_MAP_ONLY",
  "ADD_CROSS_LINK",
  "ADD_COMPACT_SECTION",
  "ADD_ROLE_CARD",
  "ADD_TO_ORG_CHART",
  "ADD_TO_EXECUTIVE_ARCHITECTURE_MAP",
  "CREATE_DEDICATED_PAGE",
  "REMOVE_OR_DOWNGRADE",
  "OWNER_DECISION_REQUIRED",
])

function fail(message) {
  console.error(`Topic map check failed: ${message}`)
  process.exitCode = 1
}

const data = JSON.parse(fs.readFileSync(mapPath, "utf8"))

if (data.schema !== "aios_public_surface_topic_map_v0_1") {
  fail("unexpected schema")
}

if (!Array.isArray(data.routes) || data.routes.length === 0) {
  fail("routes must be a non-empty array")
}

if (!Array.isArray(data.topics) || data.topics.length === 0) {
  fail("topics must be a non-empty array")
}

const seenTopics = new Set()
const statusCounts = {}

for (const topic of data.topics) {
  for (const field of requiredTopicFields) {
    if (!(field in topic)) {
      fail(`${topic.topic || "unknown topic"} missing ${field}`)
    }
  }

  if (seenTopics.has(topic.topic)) {
    fail(`duplicate topic ${topic.topic}`)
  }
  seenTopics.add(topic.topic)

  if (!allowedStatuses.has(topic.current_consistency_status)) {
    fail(`${topic.topic} has invalid status ${topic.current_consistency_status}`)
  }

  if (!allowedActions.has(topic.recommended_next_action)) {
    fail(`${topic.topic} has invalid action ${topic.recommended_next_action}`)
  }

  if (!Array.isArray(topic.supporting_public_pages)) {
    fail(`${topic.topic} supporting_public_pages must be an array`)
  }

  if (!Array.isArray(topic.forbidden_unsafe_claims)) {
    fail(`${topic.topic} forbidden_unsafe_claims must be an array`)
  }

  statusCounts[topic.current_consistency_status] = (statusCounts[topic.current_consistency_status] || 0) + 1
}

const attention = data.topics
  .filter((topic) => topic.current_consistency_status !== "CONSISTENT")
  .map((topic) => `${topic.current_consistency_status}: ${topic.topic} -> ${topic.recommended_next_action}`)

console.log("AIOS Public Surface Topic Map")
console.log(`Routes: ${data.routes.length}`)
console.log(`Topics: ${data.topics.length}`)
console.log(`Status counts: ${JSON.stringify(statusCounts)}`)
console.log("Attention items:")
for (const item of attention) {
  console.log(`- ${item}`)
}

if (process.exitCode) {
  process.exit(process.exitCode)
}
