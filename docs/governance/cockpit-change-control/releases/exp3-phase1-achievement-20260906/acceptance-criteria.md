# Acceptance criteria

| Severity | Criterion | Result |
|---|---|---|
| Critical | B1 remains active; no EXP3-complete, TEST, training, policy, deployment, production, or uplift claim | PASS |
| Critical | Frozen implementation files match one SHA-256 aggregate and both reviewers bind to it | PENDING FINAL REVIEW |
| High | MLOPS source commit and closeout artifacts are hash-reconciled | PASS |
| High | Typecheck, build, change-control, claim, and public-surface validators pass | PASS |
| High | Desktop render shows the changed card clearly | PASS: 1280x720 retained artifact |
| High | QA Sentinel and simulated stakeholder are distinct read-only reviewers | PENDING FINAL REVIEW |
| Medium | Mobile route and card responsive behavior | NOT VERIFIED / DEFERRED: no reliable retained mobile artifact |
| Low | All repository-wide lint warnings eliminated | DEFERRED: five pre-existing warnings outside scope |

Next authorized action after both final reviews pass: commit the bounded candidate, verify committed implementation digest, open a PR, merge through checks, deploy, and verify the live bounded route under owner authorization.
