#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const docPath = path.join(root, "docs", "governance", "deployment", "AIOS_PUBLIC_DEPLOYMENT_OPERATING_SET.md")

const requiredHeadings = [
  "Purpose",
  "Classify the change first",
  "Pre-push gate",
  "Validation gate",
  "Commit gate",
  "Push gate",
  "Deployment status gate",
  "Production HTTP/content check",
  "Visual verification gate",
  "Claim boundary ledger",
  "Stop conditions",
  "Standard deployment closeout format",
  "Core rule",
]

const requiredConcepts = [
  "Push does not equal deploy",
  "Deploy does not equal content verified",
  "Content verified does not equal visual verified",
  "Visual verified does not equal Playwright verified",
]

const blockedClaimTerms = [
  "Production visual verification",
  "Fully browser-verified public UI",
  "Playwright visual regression",
]

const errors = []

if (!fs.existsSync(docPath)) {
  errors.push(`missing document: ${docPath}`)
} else {
  const content = fs.readFileSync(docPath, "utf8")

  for (const heading of requiredHeadings) {
    const headingPattern = new RegExp(`^#{1,6}\\s+(?:\\d+\\.\\s+)?${escapeRegExp(heading)}\\b`, "im")
    if (!headingPattern.test(content)) {
      errors.push(`missing required heading: ${heading}`)
    }
  }

  for (const concept of requiredConcepts) {
    if (!content.includes(concept)) {
      errors.push(`missing boundary concept: ${concept}`)
    }
  }

  for (const term of blockedClaimTerms) {
    if (!content.includes(term)) {
      errors.push(`missing blocked-claim language: ${term}`)
    }
  }
}

if (errors.length > 0) {
  console.error("Deployment operating set check failed:")
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log("Deployment operating set check passed")
console.log(`Document: ${path.relative(root, docPath)}`)
console.log(`Headings: ${requiredHeadings.length}`)
console.log(`Boundary concepts: ${requiredConcepts.length}`)
console.log(`Blocked claim terms: ${blockedClaimTerms.length}`)

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
