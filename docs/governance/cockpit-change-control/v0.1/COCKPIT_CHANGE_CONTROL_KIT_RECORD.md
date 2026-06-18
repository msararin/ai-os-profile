# Cockpit Change Control Kit Record v0.1

Task: TASK_GOVERNANCE_REPAIR_WORKTREE_RECOVERY_AND_SAFE_CONTINUATION_V0_1
Date: 2026-06-18

## Installed Files

- `COCKPIT_CHANGE_CONTROL_SPEC_V0_1.md`
- `COCKPIT_CHANGE_CONTROL_DEFINITION_OF_DONE_V0_1.md`
- `COCKPIT_CHANGE_CONTROL_CHECKER_SPEC_V0_1.md`
- `CHANGE_CONTROL_MANIFEST_TEMPLATE.json`
- `COCKPIT_CHANGE_CONTROL_KIT_RECORD.md`
- `COCKPIT_CHANGE_CONTROL_KIT_OWNER_REPORT.html`
- `cockpit-change-control-kit-final-verdict.json`
- `INSTALL_RECORD.md`
- `scripts/check-cockpit-change-control.mjs`

## Command Wiring

The checker script was installed directly at `scripts/check-cockpit-change-control.mjs`.

`package.json` wiring was deferred to avoid expanding the scope of this recovery task.

## Boundary

No public app route copy was changed by the kit install.

No deploy was performed.
