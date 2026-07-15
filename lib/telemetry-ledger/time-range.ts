export type TelemetryRange =
  | { kind: "ALL"; start: null; end: null }
  | { kind: "PRESET"; preset: "7D" | "30D"; start: string; end: string }
  | { kind: "CUSTOM"; start: string; end: string }

export function normalizeTelemetryRange(input: { preset?: string; start?: string; end?: string }, now = new Date()): TelemetryRange {
  if (input.preset === "ALL") return { kind: "ALL", start: null, end: null }
  if (input.preset === "7D" || input.preset === "30D") {
    const end = now.toISOString()
    const startDate = new Date(now)
    startDate.setUTCDate(startDate.getUTCDate() - (input.preset === "7D" ? 7 : 30))
    return { kind: "PRESET", preset: input.preset, start: startDate.toISOString(), end }
  }
  if (!input.start || !input.end) throw new Error("custom range requires start and end")
  const start = new Date(input.start).toISOString()
  const end = new Date(input.end).toISOString()
  if (!(start < end)) throw new Error("range start must be earlier than end")
  return { kind: "CUSTOM", start, end }
}
