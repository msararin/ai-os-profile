#!/usr/bin/env bash
# regression-v2.sh — Locked-spec content checks for ai-os-profile v2.x
#
# Usage:    bash scripts/regression-v2.sh
# Exit 0    all checks pass → safe to commit
# Exit 1    one or more checks failed → DO NOT COMMIT, revert or fix
#
# This script enforces docs/SPEC-v2.md. It does NOT verify visual layout —
# that requires human review or screenshot diffing.
#
# Each check greps a single locked phrase against a single source file.
# When the spec evolves, update BOTH this file AND docs/SPEC-v2.md, then
# bump the site version (v2.1.0 / v3.0.0).

set -u

cd "$(dirname "$0")/.."

PASS=0
FAIL=0
FAILED_CHECKS=()

check() {
  local label="$1"
  local pattern="$2"
  local file="$3"
  if grep -Fq -- "$pattern" "$file" 2>/dev/null; then
    PASS=$((PASS+1))
    printf '  ✅ %s\n' "$label"
  else
    FAIL=$((FAIL+1))
    FAILED_CHECKS+=("$label  ($file)")
    printf '  ❌ %s\n' "$label"
  fi
}

absent() {
  local label="$1"
  local pattern="$2"
  local file="$3"
  if grep -Fq -- "$pattern" "$file" 2>/dev/null; then
    FAIL=$((FAIL+1))
    FAILED_CHECKS+=("$label SHOULD BE ABSENT  ($file)")
    printf '  ❌ %s SHOULD BE ABSENT\n' "$label"
  else
    PASS=$((PASS+1))
    printf '  ✅ %s absent (good)\n' "$label"
  fi
}

echo
echo "============================================================"
echo " ai-os-profile v2.x regression test"
echo "============================================================"

echo
echo "[1/8] Architecture invariants"
check "ViewProvider mounted at root layout"      "<ViewProvider>{children}</ViewProvider>"  "app/layout.tsx"
check "ViewProvider import in root layout"       "from '@/components/view-toggle'"          "app/layout.tsx"
absent "ViewProvider in PageLayout"              "ViewProvider"                             "components/page-layout.tsx"
check "page-layout still exports PageLayout"     "export function PageLayout"               "components/page-layout.tsx"
check "view-toggle defines ViewProvider"         "export function ViewProvider"             "components/view-toggle.tsx"
check "view-toggle defines useView hook"         "export function useView"                  "components/view-toggle.tsx"

echo
echo "[2/8] Home page (v2.1 public homepage content)"
check "Hero H1"               "AI Orchestration Governance"                                                "app/page.tsx"
check "Hero hook"             "AIOS is a working evidence trail for human-led AI work governance"          "app/page.tsx"
check "Tagline"               "Tools change. Governance discipline doesn"                                 "app/page.tsx"
check "Differentiation header" "What Makes This Different?"                                                "app/page.tsx"
check "Diff card 1"           "Separate role, model, provider, and cost"                                  "app/page.tsx"
check "Diff card 2"           "Benchmark trace as Definition of Done gate"                                "app/page.tsx"
check "Diff card 3"           "Learning from failure with policy response"                                "app/page.tsx"
check "Diff card 4"           "Human review gates where risk matters"                                     "app/page.tsx"
check "Diff card 5"           "Privacy-first curated context"                                             "app/page.tsx"
check "Portfolio disclaimer"  "This is a portfolio case study, not a production product"                  "app/page.tsx"
absent "Old Executive Summary" "Executive Summary"                                                        "app/page.tsx"
check "Evidence anchors"      "Evidence Anchors"                                                          "app/page.tsx"
check "Evidence anchor 1"     "Failure became policy"                                                     "app/page.tsx"
check "Evidence anchor 2"     "Completion requires trace"                                                 "app/page.tsx"
check "Evidence anchor 3"     "Context is intentionally bounded"                                          "app/page.tsx"
check "System State header"   "System State"                                                              "app/page.tsx"
check "Compact state copy"    "Actionable workstream status lives on the"                                 "app/page.tsx"
absent "Home workstream table" "Workstream Status"                                                        "app/page.tsx"
absent "Home mixed cockpit block" "Cockpit Evidence"                                                      "app/page.tsx"

echo
echo "[3/8] Workstreams page actionable status"
check "Workstreams route page"        "export default function WorkstreamsPage"                            "app/workstreams/page.tsx"
check "Workstreams heading"           "Workstreams"                                                        "app/workstreams/page.tsx"
check "Owner column"                  "Owner / role"                                                       "app/workstreams/page.tsx"
check "Next action column"            "Next action"                                                        "app/workstreams/page.tsx"
check "Gate decision column"          "Gate decision"                                                      "app/workstreams/page.tsx"
check "Blocker risk column"           "Blocker / risk"                                                     "app/workstreams/page.tsx"
check "Proof evidence column"         "Proof / evidence"                                                   "app/workstreams/page.tsx"
check "Workstream optimize-worker"    '"optimize-worker"'                                                  "app/workstreams/page.tsx"
check "Workstream fallback routing"   '"Fallback routing"'                                                 "app/workstreams/page.tsx"
check "Workstream profile positioning" '"Profile positioning"'                                             "app/workstreams/page.tsx"
check "Workstream Supernova"          '"Supernova"'                                                        "app/workstreams/page.tsx"
check "Supernova first version"        "First version exists; POC not yet run"                             "app/workstreams/page.tsx"
check "Workstream Big Crew"           '"Big Crew"'                                                         "app/workstreams/page.tsx"
check "Workstream Researcher"         '"Researcher"'                                                       "app/workstreams/page.tsx"
check "Workstream Investment Team"    '"Investment Team"'                                                  "app/workstreams/page.tsx"
check "Workstream descriptions"       "description:"                                                      "app/workstreams/page.tsx"
check "optimize-worker description"   "Execution support layer for routing experiments"                   "app/workstreams/page.tsx"
check "Big Crew description"          "Scoped execution crew for implementation"                          "app/workstreams/page.tsx"
check "Researcher description"        "Bounded evidence scanner"                                          "app/workstreams/page.tsx"
check "Big Crew started"              "Patch 1 and Patch 2 implementation handoffs"                       "app/workstreams/page.tsx"
check "Researcher started"            "Homepage differentiation brief"                                     "app/workstreams/page.tsx"
check "Public-safe disclaimer"        "public-safe"                                                        "app/workstreams/page.tsx"
check "No production control claim"   "not live"                                                          "app/workstreams/page.tsx"

echo
echo "[4/8] Org & Roles page"
check "Org Roles route page"          "export default function OrgRolesPage"                              "app/org-roles/page.tsx"
check "Org Roles heading"             "Org Chart & Role Policy"                                           "app/org-roles/page.tsx"
check "Operating org chart"           "Operating Org Chart"                                               "app/org-roles/page.tsx"
check "Role policy section"           "Role & Responsibility Policy"                                      "app/org-roles/page.tsx"
check "Budget policy section"         "Budget Policy"                                                     "app/org-roles/page.tsx"
check "Task routing section"          "Task Routing Policy"                                               "app/org-roles/page.tsx"
check "Lyn Robert gate"               "Lyn / Robert"                                                      "app/org-roles/page.tsx"
check "Robert Hermes peers"           "peers via KB"                                                      "app/org-roles/page.tsx"
check "Shared truth"                  "Robert KB + Git"                                                   "app/org-roles/page.tsx"
check "Hermes row"                    'role: "Hermes"'                                                    "app/org-roles/page.tsx"
check "Codex row"                     'role: "Codex"'                                                     "app/org-roles/page.tsx"
check "Big Crew row"                  'role: "Big Crew"'                                                  "app/org-roles/page.tsx"
check "Researcher row"                'role: "Researcher"'                                                "app/org-roles/page.tsx"
check "Supernova row"                 'role: "Supernova"'                                                 "app/org-roles/page.tsx"
check "Investment row"                'role: "Investment Team"'                                           "app/org-roles/page.tsx"
check "Role first budget rule"        "Role first, model second"                                          "app/org-roles/page.tsx"
check "Cheap local tier"              "Cheap/local first"                                                 "app/org-roles/page.tsx"
check "Senior synthesis tier"         "Senior synthesis"                                                  "app/org-roles/page.tsx"
check "Executive escalation tier"     "Executive escalation"                                              "app/org-roles/page.tsx"
check "Implementation lane tier"      "Implementation lane"                                               "app/org-roles/page.tsx"
check "No senior delegation rule"     "No senior delegation without a named decision"                     "app/org-roles/page.tsx"
check "No production claim"           "not runtime access control"                                        "app/org-roles/page.tsx"

echo
echo "[5/8] Architecture page locked content"
check "Layer 1 title"        "Executive Layer"                                                            "app/architecture/page.tsx"
check "Layer 2 title"        "Routing Layer"                                                              "app/architecture/page.tsx"
check "Layer 3 title"        "Execution Layer"                                                            "app/architecture/page.tsx"
check "Layer 4 title"        "Source-of-Truth Layer"                                                      "app/architecture/page.tsx"
check "Tag Robert/GPT"       "Robert / GPT"                                                               "app/architecture/page.tsx"
check "Tag Hermes+MCP"       "Hermes + Opus + custom MCP*"                                                "app/architecture/page.tsx"
check "Tag optimize-worker"  "optimize-worker"                                                            "app/architecture/page.tsx"
check "Tag Privacy-first"    "Privacy-first"                                                              "app/architecture/page.tsx"
check "Flow arrow 1"         "Strategic intent + scope"                                                   "app/architecture/page.tsx"
check "Flow arrow 2"         "Routed task + capability match"                                             "app/architecture/page.tsx"
check "Flow arrow 3"         "Reviewed artifact (commit gate)"                                            "app/architecture/page.tsx"
check "Hermes annotation"    "Hermes operates as a context-aware operator surface"                        "app/architecture/page.tsx"
check "MCP read-only bridge" "read-only bridge for context retrieval"                                     "app/architecture/page.tsx"
check "Human Review Gate"    "Human Review Gate"                                                          "app/architecture/page.tsx"
check "Gate phrase"          "Checkpoint, not a layer"                                                    "app/architecture/page.tsx"
check "Six Design Choices"   "Six Design Choices"                                                         "app/architecture/page.tsx"
check "Glossary header"      "Component Glossary"                                                         "app/architecture/page.tsx"
check "Glossary row 1"       "Robert KB + Git"                                                            "app/architecture/page.tsx"
check "Glossary row Hermes"  "Context-aware operator surface — Active trial"                              "app/architecture/page.tsx"
check "MCP footnote (full)"  "Current operational trial surface. MCP is used as a read-only context bridge"  "app/architecture/page.tsx"

echo
echo "[6/8] LVT page locked content"
check "North Star"           "Sustainable economic leverage through an AI-assisted personal"              "app/lean-value-tree/page.tsx"
check "Layer 1 name"         '"Strategic Control"'                                                        "app/lean-value-tree/page.tsx"
check "Layer 2 name"         '"Execution Leverage"'                                                       "app/lean-value-tree/page.tsx"
check "Layer 3 name"         '"Workforce Efficiency"'                                                     "app/lean-value-tree/page.tsx"
check "Layer 4 name"         '"Portfolio Proof"'                                                          "app/lean-value-tree/page.tsx"
check "Layer 5 name"         '"Opportunity Intelligence"'                                                 "app/lean-value-tree/page.tsx"
check "Layer 6 name"         '"Monetization"'                                                             "app/lean-value-tree/page.tsx"
check "Field Objective"      "Maintain decision authority and scope discipline"                           "app/lean-value-tree/page.tsx"
check "Field Metric"         "Decisions logged in KB / total decisions made"                              "app/lean-value-tree/page.tsx"
check "Field Evidence"       "Robert KB decision logs, cockpit governance v0.3 + R1"                      "app/lean-value-tree/page.tsx"
check "Field Next move"      "Continue weekly KB decision audit"                                          "app/lean-value-tree/page.tsx"
check "Status Active"        '"Active"'                                                                   "app/lean-value-tree/page.tsx"
check "Status Drafted"       '"Drafted"'                                                                  "app/lean-value-tree/page.tsx"
check "Status Planned"       '"Planned"'                                                                  "app/lean-value-tree/page.tsx"

echo
echo "[7/8] Principles page locked content"
check "Page heading"          "Governance Principles"                                                     "app/principles/page.tsx"
check "Subtitle"              "Six principles that guide the design and operation"                        "app/principles/page.tsx"
check "Principle 1 title"     "Governed execution over rushed execution"                                  "app/principles/page.tsx"
check "Principle 2 title"     "Single source of truth"                                                    "app/principles/page.tsx"
check "Principle 3 title"     "Tools change; discipline doesn"                                            "app/principles/page.tsx"
check "Principle 4 title"     "Depth control by design"                                                   "app/principles/page.tsx"
check "Principle 5 title"     "Demonstrate maturity, not readiness"                                       "app/principles/page.tsx"
check "Principle 6 title"     "Sustainable operating model"                                               "app/principles/page.tsx"
check "P1 simplified body"    "Speed without governance creates rework and false confidence"              "app/principles/page.tsx"
check "P2 simplified body"    "Robert KB and Git are the only places truth lives"                         "app/principles/page.tsx"
check "P3 simplified body"    "AI tools change every quarter"                                             "app/principles/page.tsx"
check "P4 simplified body"    "Internal complexity stays internal"                                        "app/principles/page.tsx"
check "P5 simplified body"    "This system shows how AI work can be governed"                             "app/principles/page.tsx"
check "P6 simplified body"    "Designed for one person to run before scaling"                             "app/principles/page.tsx"
check "Closing quote"         "AI orchestration is program management"                                    "app/principles/page.tsx"

echo
echo "[8/8] Shared components locked content"
check "Header nav Home"        '{ name: "Home", href: "/" }'                                              "components/site-header.tsx"
check "Header nav Architecture" '{ name: "Architecture", href: "/architecture" }'                         "components/site-header.tsx"
check "Header nav LVT"         '{ name: "LVT", href: "/lean-value-tree" }'                                "components/site-header.tsx"
check "Header nav Learning"    '{ name: "Learning", href: "/achievement-learning" }'                      "components/site-header.tsx"
check "Header nav Principles"  '{ name: "Principles", href: "/principles" }'                              "components/site-header.tsx"
check "Header nav Workstreams" '{ name: "Workstreams", href: "/workstreams" }'                            "components/site-header.tsx"
check "Header nav Org Roles"   '{ name: "Org & Roles", href: "/org-roles" }'                              "components/site-header.tsx"
check "Header focus-ring"      "focus-visible:ring-2"                                                     "components/site-header.tsx"
absent "Header ViewToggle import" "ViewToggle"                                                             "components/site-header.tsx"
absent "Header External button" "External"                                                                "components/site-header.tsx"
absent "Header Internal button" "Internal"                                                                "components/site-header.tsx"
check "Footer last updated"    "Last updated: 2026-05-18 21:00 ICT"                                       "components/site-footer.tsx"
check "Footer source"          "Source: Robert KB + Git"                                                  "components/site-footer.tsx"
check "Footer version"         "Version: v1.1 rescue draft"                                               "components/site-footer.tsx"
check "Footer copyright line"  "© 2026 AI Orchestration Governance"                                       "components/site-footer.tsx"
check "Footer credits Lyn"     "by Lyn (msararin)"                                                        "components/site-footer.tsx"
check "Metadata last updated"  "Last updated: 2026-05-18 21:00 ICT"                                       "components/page-metadata.tsx"
check "Metadata source"        "Source: Robert KB + Git"                                                  "components/page-metadata.tsx"
check "Metadata version"       "Version: v1.1 rescue draft"                                               "components/page-metadata.tsx"

echo
echo "============================================================"
echo " RESULT"
echo "============================================================"
TOTAL=$((PASS + FAIL))
printf ' Passed:  %3d / %d\n' "$PASS" "$TOTAL"
printf ' Failed:  %3d\n' "$FAIL"
echo
if [ "$FAIL" -eq 0 ]; then
  echo " ✅ ALL CHECKS PASSED — safe to commit / tag"
  exit 0
else
  echo " ❌ FAILED CHECKS:"
  for c in "${FAILED_CHECKS[@]}"; do
    printf '   - %s\n' "$c"
  done
  echo
  echo " 🚫 DO NOT COMMIT. Either:"
  echo "    1. Revert your changes and re-run."
  echo "    2. If spec is intentionally evolving, update docs/SPEC-v2.md AND this script,"
  echo "       then bump the version (v2.1.0 / v3.0.0) before re-running."
  exit 1
fi
