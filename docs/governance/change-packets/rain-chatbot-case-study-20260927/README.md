# Rain Chatbot case-study change packet

Date: 2026-09-27

## Route ledger

| Field | Decision |
| --- | --- |
| Outcome | Publish an evidence-bounded Rain Forecast Chatbot case study on the existing route and downloadable HTML. |
| Lane | Public case study + repository evidence + KB publish-back. |
| Sources | Current public page, Library case-study HTML, Rain Bot specification v0.1, canonical KB search, Open-Meteo/TMD/Bangkok/RainViewer primary documentation. |
| Scope | Rain case-study route, Case Studies index card, downloadable HTML, existing QR asset, validation script, release receipt. |
| Executor | Codex; final review by independent QA Sentinel and simulated stakeholder. |
| Gates | Meaning, measurement, trust boundary, custody, execution, validation, closeout. |
| Allowed | Edit the named public surfaces, preserve QR, add bounded source statements and deploy through the repository workflow. |
| Forbidden | Claim khwaeng-level accuracy, superiority, live-bot readiness, runtime API success, or user benefit without test evidence. |
| Rollback | Revert the release commit; existing URL paths and QR asset remain stable. |

## Reconciled truth

- `SPEC_DRAFT_READY`; not `PRODUCTION_READY`.
- Open-Meteo is the agreed R1 numeric forecast source. Project runtime behaviour has not been proven.
- TMD/Bangkok radar and RainViewer remain candidates pending endpoint, coverage, freshness, usage-rights and implementation evidence.
- Search, map pin and friend-shared location converge on coordinates; deterministic reverse geocoding and user confirmation precede save.
- Coordinates are authoritative. The LLM may explain or translate but must not infer geography.
- On-demand rain-now, next-three-hours and three-day trend responses are requirements, not tested capabilities.
- Thai, English and Simplified Chinese are requirements, not tested capabilities.
- Daily probability change is expressed in percentage points versus the previous day, never MoM.
- The owner-supplied QR identifies LINE account `@777bsqns`; it is not evidence that the bot is operational.

## Evidence state

Before deployment, the candidate is `VALIDATED_LOCAL_ONLY`. After verified deployment, the release may claim only that the case-study content and downloadable artifact were published and checked. Product implementation, live forecast data, forecast accuracy, user comprehension and real-world benefit remain unverified.

Publication URLs:

- <https://sararin.ai/case-studies/rain-chatbot>
- <https://sararin.ai/downloads/rain-chatbot-case-study.html>

Final commit, deployment checks, live-route checks and KB receipt are appended after deployment.
