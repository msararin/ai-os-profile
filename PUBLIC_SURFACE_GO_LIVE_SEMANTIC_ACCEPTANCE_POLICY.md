# PUBLIC_SURFACE_GO_LIVE_SEMANTIC_ACCEPTANCE_POLICY

## Policy

For public cockpit, achievement, knowledge-sharing, portfolio, architecture, or public-claim updates, technical validation is not enough.

Build, lint, typecheck, route smoke, and claim scan passing do not mean public meaning is acceptable.

Claim-safe wording is not acceptable if it loses the owner-intended meaning.

Owner semantic acceptance is required before go-live when content reframes:

- CASE-003
- achievements
- portfolio narrative
- public claims
- evidence maturity
- orchestration capability
- execution readiness
- strategy / North Star
- cockpit interpretation
- public CASE wording

## Required Gates

- Public Surface Runner must validate both claim safety and owner-intended meaning preservation before deploy.
- Public Surface Runner readiness or `READY_FOR_GO_LIVE_CONSIDERATION` does not approve go-live, deploy, production readiness, or public semantic acceptance.
- Prime Gate must preserve owner intent, not only reduce claim risk.
- Codex may execute approved copy and validation, but must not decide that a public semantic reframing is acceptable.
- No go-live is allowed if the owner has not reviewed and accepted the final public wording.
- Late-night public deploys require extra caution, explicit owner final-text acceptance, or deferral.
- A durable cockpit/public surface source map is required before future public CASE-003, North Star, cockpit, achievement, knowledge-sharing, or portfolio narrative patches.

## Blocking Rule

Future public CASE-003 patches are blocked pending owner semantic acceptance.

Future public North Star rewrites are blocked pending read-only RCA and owner semantic acceptance.
