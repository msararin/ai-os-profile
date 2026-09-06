# T11.1 Desktop Lens Layout Repair Evidence

Date: 2026-09-06

Base SHA: `0321fd67d427ab2540b528feff6c423635a7e3f2`

Initial reviewed staged tree: `7afb1a5483cda1657290055808a643a76475a0a9`

Freeze timestamp: `2026-09-06T02:57:58Z`

## Outcome

Restore readable desktop use of the Cockpit's detailed review lenses. The three compact lens selectors remain a three-column navigation row; the detailed Business, Models, and Engineering sections render as full-width stacked sections.

## Route ledger

| Field | Decision |
| --- | --- |
| Route | Bounded public Cockpit UI repair |
| Repository | `msararin/ai-os-profile` |
| Permitted change | Detailed lens container layout and this evidence packet |
| Excluded | Lens content, runtime proof, KB, Databricks data, experiment state, responsive redesign |
| Meaning gate | Remove the narrow one-third-width reading column and unused desktop whitespace |
| Measurement gate | Selector retains `md:grid-cols-3`; detailed wrapper has no multi-column breakpoint |
| Trust boundary | Public production UI change; owner requested test and deployment |
| Custody gate | Exact staged tree must be reviewed before commit |
| Validation gate | Diff check, targeted lint, TypeScript, production build, QA Sentinel, stakeholder lens |
| Rollback | Revert the single layout commit |

## Change

`app/case-studies/nbo-nrt-azure-databricks/page.tsx`

- Retained selector navigation: `mt-6 grid gap-4 md:grid-cols-3`.
- Changed the detailed-lens wrapper from `mt-8 grid gap-4 lg:grid-cols-3` to `mt-8 grid gap-4`.
- No lens text, runtime evidence, status, event ledger, experiment result, or claim boundary changed.

## Validation

| Check | Result |
| --- | --- |
| `git diff --check` | PASS |
| `pnpm exec tsc --noEmit` | PASS |
| Targeted ESLint | PASS |
| `pnpm build` | PASS; 47/47 routes generated |
| Local HTTP render | NOT OBSERVED; Next server startup hit workspace host-network interface error |
| QA Sentinel | Implementation PASS; initial formal review required the T11.1 naming and final receipt reconciliation now applied. Final frozen-tree review required. Reviewer: `/root/qa_layout_fix`; model/provider/token/cost telemetry not exposed. |
| Simulated stakeholder lens | PASS for merge/deploy with production-visual verification still required. `SIMULATED_STAKEHOLDER_LENS_ONLY`; reviewer: `/root/stakeholder_layout_fix`; model/provider/token/cost telemetry not exposed. |
| Production desktop verification | Required after deployment |

## Claim boundary

Before deployment this phase may claim only `VALIDATED_LOCAL_ONLY`. Production success requires the exact merged identity, successful deployment status, and direct verification of the live desktop layout. Mobile/tablet redesign remains deferred by owner direction.
