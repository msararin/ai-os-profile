# T6 Models & Experiments Migration Evidence

Date: 2026-08-29
Base: `0be8bb62642cdd63fde0c8d679445f712ecb42dc`
Scope: Models & Experiments content migration only

## Route Ledger

| Field | Contract |
| --- | --- |
| Outcome | Make the ML formulation, diagnostic reasoning, policy-learning direction, evidence boundaries, and next authorized decision understandable without conflating them with MLOps custody. |
| Lane | T6 Models migration; separate from Engineering, navigation, event-ledger, and deployment-infrastructure work. |
| Sources | Supplied Spec/DoD/Technical Plan PDF, Test Cases XLSX, T4 ownership/cross-link contracts, retained legacy components, and Experiment 3 decision record. |
| Allowed | Add the Models primary lens, stable cross-links, evidence record, deterministic tests, commit/PR/deploy after gates pass. |
| Forbidden | Training, scoring, TEST access, model/registry/UC mutation, Engineering migration, navigation change, event ledger, legacy deletion. |
| Stop gates | Taxonomy blur; lost evidence; unlabeled TRAIN result; Experiment 3 held-out implication; duplicate Engineering custody; failed 30-second comprehension or responsive contract. |
| Rollback | Revert only the T6 merge; T5 Business lens and retained legacy evidence remain recoverable and unchanged. |

## Source-to-target equivalence

| ID | Target | Required content retained |
| --- | --- | --- |
| K008 | `#knowledge-nbo-k008` | V1 population/metrics, failed default threshold, analyzed-not-approved 0.24, weak-to-moderate discrimination, diagnostic-only decision. |
| K010 | `#knowledge-nbo-k010` | Experiment 2A purpose, Silver limitations, Behavior Simulation/Offer Enrichment decision, G7/modeling boundary, no operator truth. |
| K012 | `#knowledge-nbo-k012` | Synthetic-world equation, observed/assumed/uncertainty distinction, versioning/reproducibility/provenance controls. |
| K015 | `#knowledge-nbo-k015` | Generalization issue, hypothesis/root-cause results, LR/RF/GBT TRAIN→TEST evidence, interpretation and decision separation. |
| K016 | `#knowledge-nbo-k016` | Single-candidate blocker, no-training stop, targeted Data Gate reopen, RC4 immutability, 3–8 alternative target flow, G2.1 A–I. |
| K017 | `#knowledge-nbo-k017` | Shared 2A/2B foundation, distinct questions/methods, 2B never repairs 2A. |
| K018 | `#knowledge-nbo-k018` | Full historical 2B OPE path/metrics/support/ESS/verdict and explicit separation from untouched Experiment 3 TEST. |
| K022 | `#knowledge-nbo-k022` | One-step contextual problem, five actions, no sequential-RL evidence, current V2/constrained-greedy direction, provisional epsilon/logging contract. |
| K024 | `#knowledge-nbo-k024` | A–F hierarchy with V2 TRAIN formulation pass inside B, unresolved B1/B2, downstream stages not started. |
| K025 | `#knowledge-nbo-k025` | V1/V1-D/V2/RL identities/statuses/metrics and taxonomy boundaries; Engineering identity linked, not copied. |
| K026 | `#knowledge-nbo-k026` | Question→Evidence→Interpretation→Decision trail, 16/16 read-back, zero decisions, next bounded action. |
| K027 | `#knowledge-nbo-k027` | Support distribution, bounded guardrail bands, blocked unrestricted learning, exact K033/K029 permitted cross-links. |
| K030 | `#knowledge-nbo-k030` | V1 capacity limitation, V2 TRAIN repair proof/margins, no held-out/causal/production inference, exact K028 link. |
| K031 | `#knowledge-nbo-k031` | Winner identity + margin + logged support interpretation; TRAIN-only/no causal-production claim. |

## Test gates

- **TC-019:** taxonomy table keeps V1 baseline, V1-D durability, V2 formulation, and RL/policy lane separate.
- **TC-020:** five question-led articles make Question → Evidence → Interpretation → Decision explicit.
- **TC-021:** Experiment 3 model metrics, probes, margins, and support diagnostics are explicitly TRAIN/TRAIN-only.
- **TC-022:** Experiment 3 TEST is explicitly untouched; K018 labels its TEST values as historical Experiment 2B evidence and distinguishes the lane.
- **TC-023:** synthetic limitations remain visible at the lens boundary and relevant claims.
- **TC-049:** the phase performs no experiment execution or protected-state mutation. Protected legacy/model/engineering/data/registry/UC sources remain byte-identical to the base.
- **TC-050:** candidate change-set is limited to the Models lens, its mount/stable future Engineering anchors, and this T6 evidence record.

## Cross-link custody

- XL001 K027 → K033 uses only the permitted TEST-state summary; no TEST procedure or held-out-use rationale is copied.
- XL003 K025 → K029 uses only the permitted persisted/load-back summary; no run/path/recovery procedure is copied.
- XL004 K030 → K028 uses only the permitted continuity summary; no recovery commands or custody evidence is copied.
- XL006 K027 → K029 uses only the permitted governed-counts summary; no lineage/load-back evidence is copied.

Legacy `ExperimentTabs` and all source injectors remain mounted and unchanged until the later deletion gate.

## Deterministic validation receipt

- `pnpm typecheck` — PASS
- `pnpm exec eslint app/case-studies/nbo-nrt-azure-databricks/models-experiments-lens.tsx app/case-studies/nbo-nrt-azure-databricks/page.tsx` — PASS
- `pnpm build` — PASS; 47/47 static pages generated
- `git diff --check` — PASS
- Exact T6 `data-knowledge-id` set comparison — PASS, 14/14 with no extras
- Rendered-route fragment check — all Business, Models, Engineering, legacy, K028, K029, and K033 targets resolve exactly once

Protected-state custody check covered the 12 tracked legacy sources named by the T6 ownership map: `experiment-tabs`, three Experiment 2 injectors, the 2B structure injector, Experiment 3 selector/four reasoning injectors/recovery injector, and the policy-learning decision record. For each explicit path, the base hash was calculated with `git show 0be8bb6:<path> | sha256sum`; the working hash used `sha256sum <path>`. Both result sets were sorted by the full `hash  path` line and compared with `diff -u` (no output). The two sorted manifest digests are identical:

`a307226978500166a42401804f308ca5c8eb477cd3db54aa6f4a7e7b58a00e8e`

No protected file changed. No runtime, notebook, training, scoring, TEST, registry, or Unity Catalog operation was executed.

## Reader and responsive mitigation

The first independent stakeholder pass found that decision-system expertise appeared too late, the reasoning grammar was inconsistent, the lens lacked local navigation, and the taxonomy table required mobile horizontal scrolling. That gate failed and progression stopped.

The bounded repair adds:

- a four-card `Decision system in 30 seconds` summary;
- an immediate V1/V1-D/V2/policy-lane distinction;
- five local jump links;
- repeated Question/Evidence/Interpretation/Decision labels;
- a seven-step investigation trail;
- mobile taxonomy cards below `md`, with the full table retained for `md` and above.

Responsive contract: mobile-first grids collapse at 390 px; links/status groups wrap; wide evidence tables remain scoped to desktop or `overflow-x-auto`; the new taxonomy uses cards rather than horizontal scrolling on mobile. Pixel viewport execution was planned but the owner explicitly authorized progression after rough visual review; the release therefore remains `PASS_WITH_BOUNDARIES` and makes no screenshot or pixel-perfect claim.

### Independent post-repair reader receipt

- Actual checker: `/root/t6_fresh_reader_recheck` (independent sub-agent; provider/model/token/cost telemetry not exposed)
- 30-second comprehension: **PASS**
- Deep stakeholder comprehension: **PASS**
- Immediate ML + decision-systems signal: **PASS**
- Question → Evidence → Interpretation → Decision grammar: **PASS**
- V1/V1-D/V2/policy-lane naming: **PASS**
- Mobile taxonomy contract: **PASS by source/CSS inspection**; the desktop table is hidden below `md` and replaced by stacked cards
- Reviewer boundary: no browser binary was available, so screenshot/viewport execution was not claimed

Reviewer note: the opening now states the decision, action/reward framing, evidence interpretation, current support restriction, and next authorized step inside the first summary. Local 1–5 jumps wrap on mobile and the detailed lens remains progressively disclosed. The at-a-glance label was tightened to “policy-learning lane: separate, not sequential RL” so contextual-bandit learning is not conflated with sequential RL.

### Preview deployment and viewport boundary

- PR: `#126`; content deployment head: `cd845e02b5f623d73ba6c3950959d62cad2edaf4`; evidence-only update head before this final receipt repair: `2ee1a6cf035203a60d1b09c9f69848114ba74e6c`
- Deployment Preflight run 420: **PASS**
- Vercel `v0-ai-os-profile`: **READY / SUCCESS**
- Vercel `ai-os-profile`: first attempt reported an error, automatic retry completed **READY / SUCCESS**
- Actual viewport checker: `/root/t6_preview_viewport_agent` (independent sub-agent; provider/model/token/cost not exposed)
- Browser result: **BLOCKED_ENVIRONMENT** before page render. Two independent browser sessions returned `CDP operation refresh tabs was superseded by browser recovery`; no viewport size was observed and no screenshot claim is made.
- Direct anonymous preview fetch reached Vercel deployment protection rather than application HTML, so it is not used as responsive proof.

Responsive verdict before merge: **PASS_WITH_BOUNDARIES**. Deterministic source/build evidence proves mobile-first grids, wrapped controls, breakpoint-specific taxonomy cards/table, and scoped overflow. The independent reader found the responsive contract credible at 390/1024/1440 by code inspection. Pixel layout remains unverified because the browser runtime was unavailable. This limitation is explicit and production HTML/route validation remains mandatory immediately after merge; any observed regression triggers T6-only rollback.
