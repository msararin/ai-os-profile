# Executive Architecture Map v2 Proposal

Status: proposal only  
Target route: `/architecture`  
Target source file: `app/architecture/page.tsx`  
Boundary: no deploy, no go-live approval, no production-readiness claim, no full QA claim.

## Assessment of Current Map

The current Executive Architecture Map is clear but too shallow for the current AIOS public surface. It has four useful groups:

- Executive & Intent
- Execution Control & Evidence Governance
- Specialist Delivery & Validation
- Evidence, State & Business Runway

It answers the basic question "what are the high-level layers?" but does not yet give a one-glance executive view of:

- how a task flows from idea to evidence to public/business outcome;
- where GPT/Robert, Codex, OpenRouter, Ollama, Big Crew, Supernova, optimize-worker, and Data Team fit;
- where Prime Gate, Gate PM, Runner Gang, Public Surface Runner, and owner decision sit;
- how advisory signals differ from blocking gates;
- how public surface review differs from deployment or production readiness;
- which cross-cutting controls keep public claims safe.

## Recommended Strategy

Replace the current flat four-group map with a denser executive operating-model infographic. Keep the current wording discipline, but make the map more useful at one glance.

Recommended primary strategy: `PROCEED_TO_EXECUTIVE_ARCHITECTURE_MAP_V2_PATCH` after Lyn approves this proposal.

Do not add every topic as an equal card. Use lanes, chips, and grouped controls to avoid clutter.

## Proposed v2 Structure

### 1. North Star Header

Label: `AIOS: from ambiguous AI work to measurable, evidence-aligned execution`

One-line public-safe meaning: AIOS turns unclear AI work into scoped tasks, bounded execution, evidence, review gates, and public-safe outcomes.

Value:

- faster execution;
- safer governance;
- evidence-ready outcomes;
- reusable operating system;
- portfolio/business leverage.

Boundary: not enterprise-scale automation, not production readiness, not autonomous release.

Route/page: `/architecture`

Treatment: hero header plus five compact value tags.

### 2. Main Operating Flow

Use five columns or lanes:

| Lane | One-line public-safe meaning | Value | Boundary | Treatment |
| --- | --- | --- | --- | --- |
| Intake & Strategy | Lyn and Robert/GPT define intent, risk, priority, and business question. | Aligns work before tools act. | Does not skip owner decision. | Visual lane |
| Orchestration & Routing | GPT/Robert routes work to the right lane and frames tradeoffs. | Reduces ambiguity and role drift. | Does not own final protected decisions. | Visual lane |
| Execution Workforce | Codex, Big Crew, Supernova, optimize-worker, OpenRouter, Ollama, and Data Team produce scoped outputs or evidence support. | Makes the workforce inspectable. | Does not imply all workers act on every task. | Visual lane with grouped chips |
| Evidence / Gates / Validation | Checker, Runner, Super Runner, Gate PM, Runner Gang, Prime Gate, and deterministic checks validate scope, evidence, and claim boundaries. | Prevents public overclaim and unsafe release wording. | Does not approve go-live or production readiness. | Visual lane plus boundary badge |
| Public Surface / Portfolio / Business Outcome | PageLab Public Surface Release Lane, observability, achievements, and portfolio pages package owner-review-ready public updates. | Reduces repeated manual validation burden. | Go-live remains owner-controlled. | Visual lane |

### 3. Cross-Cutting Controls

These should appear as an embedded layer across the flow, not as a separate page wall.

| Control | Public-safe meaning | Value | Boundary | Treatment |
| --- | --- | --- | --- | --- |
| Source of Truth | Reviewed knowledge records and Git remain durable truth. | Prevents page/status drift. | Public pages are not source of truth. | Thin horizontal band |
| Evidence Readiness | Shows what is ready, missing, blocked, or downgraded. | Stops premature claims. | Not benchmark proof. | Thin horizontal band |
| Public Claim Boundary | Separates safe claims from draft/local/incomplete evidence. | Protects public trust. | Does not guarantee correctness. | Thin horizontal band |
| Cockpit Observability | Static public-safe visibility into status and blocked states. | Makes limits inspectable. | Not live monitoring. | Thin horizontal band |
| Owner-Delegated Decision Policy | Protected decisions stay with Lyn; roles recommend, block, or escalate. | Keeps authority clear. | No delegated role owns final risk. | Thin horizontal band |
| Role Power Separation | Worker, checker, reviewer, owner, and gate authority stay distinct. | Prevents fake orchestration proof. | Does not prove multi-worker execution. | Thin horizontal band |
| Advisory vs Blocking Metrics | Distinguishes signals from gates. | Prevents dashboards becoming false proof. | Advisory evidence is not approval. | Thin horizontal band |
| Deployment Claim Safety | Separates local validation, deployment, live verification, and production readiness. | Prevents deployment overclaim. | Deploy does not mean production-ready. | Thin horizontal band |

### 4. Workforce Layer

| Label | Meaning | Value | Boundary | Route/page | Treatment |
| --- | --- | --- | --- | --- | --- |
| GPT / Robert | Executive brain and orchestration layer. | Context, sequencing, tradeoffs, claim review. | Does not replace Lyn. | `/org-roles` | Visual chip |
| Codex | Implementation engineer lane. | File edits, validation, commit-ready output. | Does not self-approve or define scope. | `/ai-operating-system` | Visual chip |
| OpenRouter | Flexible model and receipted reviewer lane. | External model review when receipted. | No provider superiority claim. | `/ai-operating-system` | Visual chip |
| Ollama | Local utility support lane. | Cheap/local support where appropriate. | No production model-hosting claim. | `/ai-operating-system` | Footnote/chip |
| optimize-worker | Worker execution and trace support. | Structured runs and repeatable validation support. | No autonomous production routing. | `/org-roles` | Visual chip |
| Big Crew | Engineering/execution intelligence. | Specialist delivery critique. | Not execution-control authority. | `/org-roles` | Visual chip |
| Supernova | Business/opportunity intelligence. | Business options, risk, monetization questions. | No POC/revenue proof. | `/org-roles` | Visual chip |
| Data Team | Evidence-structure and dashboard-readiness support lane. | Reviews data/dashboard ambiguity before escalation. | Not final decision authority or live analytics platform. | `/ai-operating-system/agent-review-dashboard` | Visual chip |

### 5. Gate & Review Layer

| Label | Meaning | Value | Boundary | Route/page | Treatment |
| --- | --- | --- | --- | --- | --- |
| Gate PM / PM | Coordinates scope, DoD, evidence package, owner gate. | Reduces ambiguous handoffs. | Does not approve release. | `/org-roles` | Compact card |
| Super Runner | Controls task boundary and stop conditions. | Prevents unsafe execution scope. | Not autonomous platform. | `/org-roles` | Compact card |
| Runner | Executes approved bounded work. | Produces validation-ready outputs. | Does not invent scope. | `/org-roles` | Compact card |
| Checker | Checks evidence, source-of-truth, and claim boundary. | Blocks unsafe public claims. | Does not replace QA or owner review. | `/org-roles` | Compact card |
| Runner Gang | Role-based review pattern. | Brings source mapping, claim boundary, release verification, leakage, workflow friction, and scope checks together. | Not independent autonomous proof unless separately evidenced. | `/how-we-build` | Footnote or grouped card |
| Prime Gate | Decision-quality reviewer for bounded implementation decisions. | Evaluates evidence, risk, and scope. | Does not replace owner approval. | `/how-we-build` | Compact card |
| Public Surface Runner | Deterministic public-update validation. | PASS/WARN/BLOCK packet for owner review. | Does not deploy or approve go-live. | `/architecture/system-health/observability` | Compact card |
| Owner | Final risk/business/public decision. | Keeps protected decisions human-controlled. | Must not be hidden behind model/tool output. | `/org-roles` | Boundary badge |

### 6. Public Surface / PageLab Layer

| Label | Meaning | Value | Boundary | Route/page | Treatment |
| --- | --- | --- | --- | --- | --- |
| PageLab Public Surface Release Lane | Packages recurring public-page updates for owner review before go-live consideration. | Less manual validation burden. | No deploy, no go-live approval, no production readiness. | `/architecture/system-health/observability` | Visual lane |
| One-click owner review | Review packet command and HTML output. | Repeatable owner review. | Local review only. | `/how-we-build` | Footnote |
| Public claim boundary | Allowed/blocked wording map. | Safer public pages. | Does not guarantee correctness. | `/architecture/system-health/observability` | Thin band |
| Leakage scan | Checks private artifacts do not enter public surfaces. | Reduces privacy/public-boundary risk. | Not full security audit. | `/how-we-build` | Thin band |
| Route/build evidence | Captures local route/build checks where applicable. | Makes update readiness reviewable. | Not full QA. | `/architecture/system-health` | Thin band |
| Go-live consideration only | Owner review can consider release. | Preserves owner gate. | Runner does not approve. | `/org-roles` | Boundary badge |

### 7. Outcome Row

Visible outcomes:

- safer public updates;
- less manual validation burden;
- traceable portfolio evidence;
- reusable release lane;
- clearer governance story;
- faster deployment with less content breakage risk.

Boundary: outcomes are governance and repeatability improvements, not production readiness, full QA, or guaranteed correctness.

Treatment: bottom outcome row with six compact tiles.

## One-Glance Design Recommendation

Recommended visual shape:

1. Header with north star and five value tags.
2. Five-lane operating flow across the page.
3. Cross-cutting control band below the lanes.
4. Workforce chips nested under Execution Workforce.
5. Gate/review chips nested under Evidence / Gates / Validation.
6. Public Surface / PageLab lane on the right.
7. Outcome row at the bottom.

Avoid:

- separate full card for every worker;
- org-chart density on the architecture page;
- production or deployment visuals that imply authority;
- decorative complexity without route/topic ownership.

## Proposed First Patch After Approval

Small first implementation slice:

1. Keep route `/architecture`.
2. Replace the current four-group card set with the five-lane architecture map.
3. Add compact chips for workforce and gate/review lanes.
4. Add one cross-cutting controls band.
5. Add one outcome row.
6. Do not touch `/org-roles` or system-health pages in the same patch.

Validation for that future patch:

- `pnpm public:review` with architecture-v2 input;
- `pnpm lint`;
- `pnpm typecheck`;
- `pnpm build`;
- leakage scan on `/architecture` output;
- owner semantic review before deployment.

