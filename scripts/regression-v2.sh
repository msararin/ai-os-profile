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
echo "[1/7] Architecture invariants"
check "ViewProvider mounted at root layout"      "<ViewProvider>{children}</ViewProvider>"  "app/layout.tsx"
check "ViewProvider import in root layout"       "from '@/components/view-toggle'"          "app/layout.tsx"
absent "ViewProvider in PageLayout"              "ViewProvider"                             "components/page-layout.tsx"
check "page-layout still exports PageLayout"     "export function PageLayout"               "components/page-layout.tsx"
check "view-toggle defines ViewProvider"         "export function ViewProvider"             "components/view-toggle.tsx"
check "view-toggle defines useView hook"         "export function useView"                  "components/view-toggle.tsx"

echo
echo "[2/7] Home page (v2.1 public homepage content)"
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
check "System State header"   "System State"                                                              "app/page.tsx"
check "Current State header"  "Current State"                                                             "app/page.tsx"
check "To-Be State header"    "To-Be State"                                                               "app/page.tsx"
check "Belief 1 title"        "Source of truth must be committed"                                         "app/page.tsx"
check "Belief 2 title"        "Status must be actionable"                                                 "app/page.tsx"
check "Belief 3 title"        "AI output is not truth until reviewed and committed"                       "app/page.tsx"

echo
echo "[3/7] Home page (Internal mode locked content)"
check "Workstream Status header"     "Workstream Status"                                                  "app/page.tsx"
check "Workstream optimize-worker"   '"optimize-worker"'                                                  "app/page.tsx"
check "Workstream Hermes + MCP"      '"Hermes + MCP"'                                                     "app/page.tsx"
check "Workstream Supernova"         '"Supernova"'                                                        "app/page.tsx"
check "Workstream Big Crew"          '"Big Crew"'                                                         "app/page.tsx"
check "Workstream Investment Team"   '"Investment Team"'                                                  "app/page.tsx"
check "Backlog heading v2"           "Cockpit patch sequence — completed validation snapshot, not live."  "app/page.tsx"
check "Patch 3 entry"                "Patch 3 internal mode workstream snapshot"                          "app/page.tsx"
check "Patch 4 entry"                "Patch 4 architecture page"                                          "app/page.tsx"
check "Patch 5 entry"                "Patch 5 LVT page"                                                   "app/page.tsx"
check "Patch 6 entry"                "Patch 6 principles page"                                            "app/page.tsx"
check "Patch 7 entry"                "Patch 7 final consistency audit"                                    "app/page.tsx"
check "All patches COMPLETE (5x)"    '"COMPLETE"'                                                         "app/page.tsx"
absent "Old IN PROGRESS status"      'Patch 3 internal mode workstream snapshot", "IN PROGRESS"'          "app/page.tsx"
absent "Old PLANNED placeholder"     'Patch 4 architecture page", "PLANNED"'                              "app/page.tsx"
check "Operating discipline note"    "read surface, not a control plane"                                  "app/page.tsx"

echo
echo "[4/7] Architecture page locked content"
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
echo "[5/7] LVT page locked content"
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
echo "[6/7] Principles page locked content"
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
echo "[7/7] Shared components locked content"
check "Header nav Home"        '{ name: "Home", href: "/" }'                                              "components/site-header.tsx"
check "Header nav Architecture" '{ name: "Architecture", href: "/architecture" }'                         "components/site-header.tsx"
check "Header nav LVT"         '{ name: "LVT", href: "/lean-value-tree" }'                                "components/site-header.tsx"
check "Header nav Learning"    '{ name: "Learning", href: "/achievement-learning" }'                      "components/site-header.tsx"
check "Header nav Principles"  '{ name: "Principles", href: "/principles" }'                              "components/site-header.tsx"
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
