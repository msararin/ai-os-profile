import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

const routeBase = ".next/server/app/ai-operating-system/agent-review-dashboard"
const files = [
  `${routeBase}.html`,
  `${routeBase}.rsc`,
  `${routeBase}.segments/ai-operating-system/agent-review-dashboard/__PAGE__.segment.rsc`,
  `${routeBase}.segments/ai-operating-system/agent-review-dashboard.segment.rsc`,
]

const blockedTerms = ["03_ai_skill_lab/", "Lyn", "Codex", "msararin", ".md"]

const leaks = []

for (const file of files) {
  const filePath = join(process.cwd(), file)
  if (!existsSync(filePath)) continue

  const content = readFileSync(filePath, "utf8")
  for (const term of blockedTerms) {
    if (content.includes(term)) {
      leaks.push(`${file}: ${term}`)
    }
  }
}

if (leaks.length > 0) {
  console.error("Public dashboard leakage check failed:")
  for (const leak of leaks) console.error(`- ${leak}`)
  process.exit(1)
}

console.log("Public dashboard leakage check passed.")
