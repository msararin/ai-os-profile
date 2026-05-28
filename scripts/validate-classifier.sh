#!/bin/bash
# validate-classifier.sh
# Tests file pattern classifier with actual repo paths

TEST_CASES=(
  "app/page.tsx:low"
  "app/architecture/page.tsx:strategic"
  "app/ai-operating-system/page.tsx:low"
  "app/how-we-build/page.tsx:low"
  "app/achievements/page.tsx:low"
  "components/site-header.tsx:medium"
  "components/control-plane-visual.tsx:low"
  "components/page-layout.tsx:low"
  "docs/planning/EXAMPLE.md:low"
  "docs/planning/nested/EXAMPLE.md:low"
  "public/icon.svg:low"
  "public/images/example.png:low"
  "middleware.ts:high"
  "next.config.mjs:high"
  "package.json:high"
  "pnpm-lock.yaml:high"
  "app/layout.tsx:medium"
  "app/internal/dashboard/page.tsx:high"
  "app/internal/nested/page.tsx:high"
  ".env:forbidden"
  ".env.local:forbidden"
  "secrets/api.key:forbidden"
  "06_private_raw/example.md:forbidden"
)

PASSED=0
FAILED=0
FAILED_CASES=""

for test in "${TEST_CASES[@]}"; do
  file=$(echo "$test" | cut -d: -f1)
  expected=$(echo "$test" | cut -d: -f2)

  # Run classifier logic (CORRECTED ORDER)
  FORBIDDEN=0
  STRATEGIC=0
  PATH_RISK="unknown"

  # Check forbidden first
  if echo "$file" | grep -E '\.env$|\.env\.local$|\.key$|\.pem$|/secrets/|06_private_raw/' >/dev/null; then
    FORBIDDEN=1
    RESULT="forbidden"
  else
    # Path classification (SPECIFIC PATTERNS BEFORE WILDCARDS)
    case "$file" in
      # High-risk patterns (must come before app/*.tsx wildcard)
      middleware.ts) PATH_RISK="high" ;;
      next.config.mjs|next.config.js) PATH_RISK="high" ;;
      package.json|pnpm-lock.yaml) PATH_RISK="high" ;;
      app/internal/*.tsx) PATH_RISK="high" ;;
      app/internal/*/*.tsx) PATH_RISK="high" ;;
      app/internal/*/*/*.tsx) PATH_RISK="high" ;;

      # Medium-risk patterns (must come before app/*.tsx and components/*.tsx wildcards)
      components/site-header.tsx) PATH_RISK="medium" ;;
      app/layout.tsx) PATH_RISK="medium" ;;

      # Low-risk patterns (wildcards come last)
      app/*.tsx) PATH_RISK="low" ;;
      app/*/*.tsx) PATH_RISK="low" ;;
      app/*/*/*.tsx) PATH_RISK="low" ;;
      components/*.tsx) PATH_RISK="low" ;;
      components/*/*.tsx) PATH_RISK="low" ;;
      docs/planning/*.md) PATH_RISK="low" ;;
      docs/planning/*/*.md) PATH_RISK="low" ;;
      public/*) PATH_RISK="low" ;;
      public/*/*) PATH_RISK="low" ;;

      # Unknown patterns
      *) PATH_RISK="unknown" ;;
    esac

    # Strategic content check
    if [ "$PATH_RISK" = "low" ]; then
      case "$file" in
        app/architecture/page.tsx|app/architecture/*.tsx)
          STRATEGIC=1
          ;;
      esac
    fi

    if [ $STRATEGIC -eq 1 ]; then
      RESULT="strategic"
    else
      RESULT="$PATH_RISK"
    fi
  fi

  # Compare result
  if [ "$RESULT" = "$expected" ]; then
    echo "✅ PASS: $file → $RESULT"
    PASSED=$((PASSED + 1))
  else
    echo "❌ FAIL: $file → expected $expected, got $RESULT"
    FAILED=$((FAILED + 1))
    FAILED_CASES="$FAILED_CASES\n  $file (expected $expected, got $RESULT)"
  fi
done

echo ""
echo "=== VALIDATION RESULTS ==="
echo "Passed: $PASSED / ${#TEST_CASES[@]}"
echo "Failed: $FAILED / ${#TEST_CASES[@]}"

if [ $FAILED -ne 0 ]; then
  echo ""
  echo "Failed cases:$FAILED_CASES"
  echo ""
  echo "❌ VALIDATION FAILED"
  echo "Fix classifier patterns before implementation"
  exit 1
else
  echo ""
  echo "✅ VALIDATION PASSED"
  echo "Classifier correctly labels all test cases"
  echo "Safe to proceed with implementation of scripts/safe-publish.sh"
  exit 0
fi
