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

const routeContracts = [
  {
    name: "Public Surface Governance architecture surface",
    routeFile: "app/architecture/public-surface-governance/page.tsx",
    parentFile: "app/architecture/page.tsx",
    href: "/architecture/public-surface-governance",
    parentSnippets: [
      "Public Surface Governance",
      "governance/design surface",
      "implementation support",
      "owner approval",
    ],
    routeSnippets: [
      "How We Update Public Surfaces",
      "claim boundaries",
      "evidence",
      "Surface Story Guild",
      "Prime Gate",
      "Public Surface Runner Team",
      "Lyn owns final positioning",
      "Minor typo fixes",
    ],
  },
  {
    name: "Public Surface Governance achievement surface",
    routeFile: "app/achievements/public-surface-governance/page.tsx",
    parentFile: "app/achievements/page.tsx",
    href: "/achievements/public-surface-governance",
    parentSnippets: [
      "Public Surface Governance Operating Model Defined",
      "automated release-governance",
      "production-readiness certification",
    ],
    routeSnippets: [
      "Public Surface Governance Operating Model Defined",
      "Public-safe result",
      "Evidence / artifacts",
      "Skills demonstrated",
      "Caveat / status",
      "implementation and validation support",
      "production readiness is certified",
    ],
  },
]

const forbiddenPositiveClaims = [
  {
    term: "automated release governance",
    allowedBoundaryPattern: /without claiming automated release\s*-?governance|not (?:a )?claim(?:ing)?[^.]*automated release\s*-?governance/i,
  },
  {
    term: "production-readiness certification",
    allowedBoundaryPattern: /without claiming[^.]*production-readiness certification|not (?:a )?claim(?:ing)?[^.]*production readiness is certified/i,
  },
  {
    term: "certify production readiness",
    allowedBoundaryPattern: /does not approve go-live, certify production\s+readiness, or upgrade public claims/i,
  },
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

for (const contract of routeContracts) {
  checkRouteContract(contract)
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
console.log(`Public surface route contracts: ${routeContracts.length}`)

function checkRouteContract(contract) {
  const routePath = path.join(root, contract.routeFile)
  const parentPath = path.join(root, contract.parentFile)

  if (!fs.existsSync(routePath)) {
    errors.push(`${contract.name}: missing route source file ${contract.routeFile}`)
    return
  }

  if (!fs.existsSync(parentPath)) {
    errors.push(`${contract.name}: missing parent source file ${contract.parentFile}`)
    return
  }

  const routeContent = fs.readFileSync(routePath, "utf8")
  const parentContent = fs.readFileSync(parentPath, "utf8")

  if (!parentContent.includes(contract.href)) {
    errors.push(`${contract.name}: parent page does not link to ${contract.href}`)
  }

  for (const snippet of contract.parentSnippets) {
    if (!parentContent.includes(snippet)) {
      errors.push(`${contract.name}: parent page missing discoverability/boundary snippet: ${snippet}`)
    }
  }

  for (const snippet of contract.routeSnippets) {
    if (!routeContent.includes(snippet)) {
      errors.push(`${contract.name}: route page missing story/boundary snippet: ${snippet}`)
    }
  }

  const surfaceCorpus = `${parentContent}\n${routeContent}`
  for (const claim of forbiddenPositiveClaims) {
    if (surfaceCorpus.includes(claim.term) && !claim.allowedBoundaryPattern.test(surfaceCorpus)) {
      errors.push(`${contract.name}: ${claim.term} appears without approved boundary wording`)
    }
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
