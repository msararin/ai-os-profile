import fs from "node:fs"
import path from "node:path"
import ts from "typescript"

// This route is driven by React lifecycle, not DOM-change rediscovery.
// Protect all route modules, including ones not exercised by the smoke test.
const root = path.resolve("app/case-studies/nbo-nrt-azure-databricks")
const failures = []
function visitDir(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) { visitDir(file); continue }
    if (!/\.[cm]?[jt]sx?$/.test(file)) continue
    const source = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true)
    function visit(node) {
      if (ts.isIdentifier(node) && ["MutationObserver", "setTimeout", "setInterval"].includes(node.text)) {
        const { line } = source.getLineAndCharacterOfPosition(node.getStart(source))
        failures.push(`${path.relative(process.cwd(), file)}:${line + 1}: ${node.text} is not allowed in the Cockpit lifecycle`)
      }
      ts.forEachChild(node, visit)
    }
    visit(source)
  }
}
visitDir(root)
if (failures.length) {
  console.error(failures.join("\n"))
  process.exitCode = 1
} else console.log("Cockpit lifecycle contract PASS: no DOM observers or retry timers in route modules")
