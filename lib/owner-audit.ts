import "server-only"
type AuditEvent = "login" | "logout" | "authorization_denied" | "export"
export function audit(event: AuditEvent) {
  console.info(JSON.stringify({ schema: "owner-audit.v1", event, at: new Date().toISOString() }))
}
