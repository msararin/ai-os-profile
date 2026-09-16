import "server-only"
import { readFile, stat } from "node:fs/promises"
import { z } from "zod"
import { requireOwner } from "@/lib/owner-access"
const id = z.string().regex(/^[A-Za-z0-9._:-]{1,100}$/)
const label = z.string().min(1).max(240).refine(value => !/[\r\n]|Bearer |sk-[A-Za-z0-9]|AIza|-----BEGIN|https?:|\/Users\//.test(value))
const nullableLabel = label.nullable()
const state = z.enum(["passed", "failed", "running", "blocked", "unknown"])
const receipt = z.object({ id, claim: label, evidenceType: label, artifactId: z.string().regex(/^[a-f0-9]{24}$/).nullable(), producer: label, verifier: nullableLabel, timestamp: z.string().datetime(), validationState: state, provenance: label, custody: label, limitations: label }).strict()
const run = z.object({ id, timestamp: z.string().datetime(), workstream: id, capability: label, role: nullableLabel, provider: nullableLabel, model: nullableLabel, durationMs: z.number().nonnegative().nullable(), outcome: state, validation: state, fallback: z.boolean().nullable(), escalation: z.boolean().nullable(), costUsd: z.number().nonnegative().nullable(), costBasis: z.enum(["actual", "estimated", "unavailable"]), tokens: z.number().int().nonnegative().nullable(), receiptIds: z.array(id).max(100), route: z.object({ candidate: nullableLabel, selected: nullableLabel, rationaleCategory: nullableLabel, fallbackRoute: nullableLabel }).strict(), checks: z.array(z.object({ test: label, expected: label, observed: label, status: state, verifier: nullableLabel, artifactId: z.string().regex(/^[a-f0-9]{24}$/).nullable(), failureCode: nullableLabel, remediation: nullableLabel }).strict()).max(100), recovery: z.object({ failureClass: label, action: label, result: state, lesson: nullableLabel, durableRuleChanged: z.boolean().nullable() }).strict().nullable() }).strict()
export const operationsSchema = z.object({ schemaVersion: z.literal(1), generatedAt: z.string().datetime(), source: label, coverage: label, sanitized: z.literal(true), runs: z.array(run).max(10000), receipts: z.array(receipt).max(10000), workstreams: z.array(z.object({ id, title: label, status: state, gate: nullableLabel, owner: nullableLabel, nextAction: nullableLabel, blocker: nullableLabel, evidenceState: state, ownerDecision: nullableLabel }).strict()).max(100), deployments: z.array(z.object({ id, timestamp: z.string().datetime(), environment: label, status: state, evidenceId: id.nullable() }).strict()).max(100) }).strict().superRefine((data, context) => {
  const unique = (values: string[]) => new Set(values).size === values.length
  if (!unique(data.runs.map(x => x.id)) || !unique(data.receipts.map(x => x.id)) || !unique(data.workstreams.map(x => x.id))) context.addIssue({ code: z.ZodIssueCode.custom, message: "Duplicate IDs" })
  const receipts = new Set(data.receipts.map(x => x.id)), workstreams = new Set(data.workstreams.map(x => x.id))
  if (data.runs.some(x => !workstreams.has(x.workstream) || x.receiptIds.some(id => !receipts.has(id)) || (x.costBasis === "unavailable") !== (x.costUsd === null))) context.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid reference or cost basis" })
  if (Date.parse(data.generatedAt) > Date.now() + 300000 || data.runs.some(x => Date.parse(x.timestamp) > Date.parse(data.generatedAt))) context.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid timestamp" })
})
export type Operations = z.infer<typeof operationsSchema>
export async function operations(): Promise<{ state: "available" | "stale" | "unavailable"; data: Operations | null }> {
  await requireOwner()
  const file = process.env.COCKPIT_OPERATIONS_PATH
  if (!file) return { state: "unavailable", data: null }
  try {
    if ((await stat(file)).size > 5_000_000) throw new Error("size")
    const data = operationsSchema.parse(JSON.parse(await readFile(file, "utf8")))
    return { state: Date.now() - Date.parse(data.generatedAt) > 86400000 ? "stale" : "available", data }
  } catch { return { state: "unavailable", data: null } }
}
