# Cockpit browser regression gate

The NBO–NRT page previously used twelve body-wide mutation observers. Updating an unchanged paragraph retriggered its observer indefinitely. The page now initializes static evidence once per panel lifetime, with React owning card selection. No observer or retry timer belongs in this route.

Run `pnpm test:cockpit-source`, `pnpm build`, `pnpm exec playwright install chromium`, then `pnpm test:cockpit-browser`. The existing Deployment Preflight runs these checks against `next start`. Use Playwright's bundled Chromium pinned by the lockfile; system Chrome versions do not provide a repeatable performance environment. `E2E_BASE_URL` can select an already-running build for controlled verification.

The browser suite checks:

- All four lanes, evidence sections, native details, repeated selection and route remount.
- Preservation of translator-style wrappers and details while either the last legacy lane or Experiment 3 is hidden. Unrelated body changes must cause zero child/text rewrites in the settled Experiment 3 panel.
- No body-wide child-list observer registrations; the source gate rejects observers/retry timers even in unvisited route modules.
- An event-loop heartbeat, unhandled browser errors, and performance under a fixed 4× CPU slowdown.
- The exact historical pre-fix taxonomy injector reaches a 50-callback safety cap, whereas the engineer hotfix converges. This isolated fixture is distinct from the full candidate-page tests. Git history is required; CI checkout retains it.

The initial browser-lab ceilings are **5 seconds to the ready panel**, **500 ms from a card click handler to the second animation frame**, and **less than 100 ms of long-task time during a 2-second idle window**. These conservative regression budgets detect substantial regressions; they are not production INP, Core Web Vitals certification or a China-network SLA. Initial measurements and CI artifacts should guide any deliberate budget revision. Do not silently loosen a failing budget.

To verify the performance gate itself rejects a slowdown, run `COCKPIT_PERF_NEGATIVE_CONTROL=1 pnpm test:cockpit-browser --grep 'performance budget'`. This test-only control inserts a bounded 700 ms busy task on each tested card click; the normal 500 ms budget must fail. Never enable it in the normal CI run. No injected delay or loop cap exists in application code.

Playwright assertion and overall test deadlines are outside the page. The suite also has a 3-minute global deadline, and the GitHub Actions browser step has a 4-minute timeout. Thus a microtask loop that starves in-page timers cannot keep CI running indefinitely. Test failures block a passing preflight; no retries hide failures. Ensure this preflight remains a required merge check for the protected branch. Branch protection is a repository-platform setting, not established by this file.

The three legacy JSX lane trees and their UI primitives are static. A keyed memoized wrapper permits one initialization pass and is replaced wholesale only when selecting a different legacy lane. Adding state/context/dynamic descendants requires revisiting that ownership boundary. Experiment 3 has an empty React host whose descendants belong to its detached DOM builder. All ordered enhancements finish before the panel is attached. See comments in `experiment-tabs.tsx` and `experiment-enhancements.ts`.

Actual browser translation services and overseas networks need separate environment-specific checks; synthetic DOM translation coverage does not certify Google Translate.
