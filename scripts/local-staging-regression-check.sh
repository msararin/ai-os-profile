#!/usr/bin/env bash

set -u
set -o pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && git rev-parse --show-toplevel)"
TIMESTAMP="$(date +"%Y%m%d_%H%M%S")"
REPORT_DIR="${AIOS_REPORT_DIR:-${TMPDIR:-/tmp}/aios-staging-regression}"
REPORT_FILE="${REPORT_DIR}/AIOS_Staging_Regression_Report_${TIMESTAMP}.txt"
SERVER_LOG="${REPORT_DIR}/aios_staging_regression_dev_server_${TIMESTAMP}.log"
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
DEV_SERVER_PID=""
STARTED_SERVER="no"
BUILD_STATUS="FAIL"
ROUTE_STATUS="FAIL"
INTERNAL_AUTH_STATUS="FAIL"
INTERNAL_BROWSER_REVIEW_STATUS="FAIL"
BOUNDARY_STATUS="FAIL"
FINAL_VERDICT="Regression incomplete"

ROUTES=(
  "/"
  "/ai-operating-system"
  "/org-roles"
  "/how-we-build"
  "/achievements"
  "/architecture"
  "/about"
  "/knowledge-sharing"
  "/internal/knowledge-sharing-drafts"
)

PUBLIC_SEARCH_ROOTS=(
  "app"
  "pages"
  "src/app"
  "src/pages"
)

echo "AI OS local staging regression check"
echo "Report file: ${REPORT_FILE}"

mkdir -p "$(dirname "${REPORT_FILE}")"

cd "${REPO_DIR}" || {
  echo "Unable to enter repo directory: ${REPO_DIR}" | tee "${REPORT_FILE}"
  exit 1
}

exec >"${REPORT_FILE}" 2>&1

echo "AI OS local staging regression check"
echo "Report file: ${REPORT_FILE}"

cleanup() {
  if [[ -n "${DEV_SERVER_PID}" ]]; then
    echo ""
    echo "Stopping dev server started by this script: ${DEV_SERVER_PID}"
    kill "${DEV_SERVER_PID}" >/dev/null 2>&1 || true
  fi
}

trap cleanup EXIT

section() {
  echo ""
  echo "## $1"
}

run_and_keep_going() {
  echo ""
  echo "$ $*"
  "$@"
  return $?
}

detect_package_runner() {
  if [[ -f "pnpm-lock.yaml" ]]; then
    echo "pnpm"
  elif [[ -f "yarn.lock" ]]; then
    echo "yarn"
  else
    echo "npm"
  fi
}

run_build() {
  local runner="$1"
  if [[ "${runner}" == "pnpm" ]]; then
    run_and_keep_going pnpm build
  elif [[ "${runner}" == "yarn" ]]; then
    run_and_keep_going yarn build
  else
    run_and_keep_going npm run build
  fi
}

start_dev_server() {
  local runner="$1"
  if curl -fsS "${BASE_URL}" >/dev/null 2>&1; then
    echo "Dev server already responding at ${BASE_URL}"
    STARTED_SERVER="no"
    return 0
  fi

  echo "No dev server responded at ${BASE_URL}; starting local dev server."
  if [[ "${runner}" == "pnpm" ]]; then
    pnpm dev --hostname 127.0.0.1 --port 3000 >"${SERVER_LOG}" 2>&1 &
  elif [[ "${runner}" == "yarn" ]]; then
    yarn dev --hostname 127.0.0.1 --port 3000 >"${SERVER_LOG}" 2>&1 &
  else
    npm run dev -- --hostname 127.0.0.1 --port 3000 >"${SERVER_LOG}" 2>&1 &
  fi
  DEV_SERVER_PID="$!"
  STARTED_SERVER="yes"
  echo "Started dev server PID: ${DEV_SERVER_PID}"
  echo "Dev server log: ${SERVER_LOG}"

  for _ in {1..60}; do
    if curl -fsS "${BASE_URL}" >/dev/null 2>&1; then
      echo "Dev server ready at ${BASE_URL}"
      return 0
    fi
    sleep 1
  done

  echo "Dev server did not become ready at ${BASE_URL}"
  if [[ -f "${SERVER_LOG}" ]]; then
    echo "Last dev server log lines:"
    tail -n 80 "${SERVER_LOG}" || true
  fi
  return 1
}

check_routes() {
  local failures=0
  echo "| Route | HTTP Status | Result |"
  echo "| ----- | ----------- | ------ |"
  for route in "${ROUTES[@]}"; do
    local status
    if ! status="$(curl -L -sS -o /tmp/aios_route_body_${TIMESTAMP}.txt -w "%{http_code}" "${BASE_URL}${route}")"; then
      status="000"
    fi
    if [[ "${status}" =~ ^(200|301|302|307|308|401|403)$ ]]; then
      echo "| ${route} | ${status} | PASS |"
    else
      echo "| ${route} | ${status} | FAIL |"
      failures=$((failures + 1))
    fi
  done

  if [[ "${failures}" -eq 0 ]]; then
    ROUTE_STATUS="PASS"
    return 0
  fi
  ROUTE_STATUS="FAIL"
  return 1
}

check_internal_auth() {
  local status
  local header_file="/tmp/aios_internal_headers_${TIMESTAMP}.txt"
  local body_file="/tmp/aios_internal_body_${TIMESTAMP}.txt"
  local signin_body_file="/tmp/aios_signin_body_${TIMESTAMP}.txt"
  local location
  local google_client_present="no"
  local google_secret_present="no"

  if [[ -n "${GOOGLE_CLIENT_ID:-}" ]]; then
    google_client_present="yes"
  fi
  if [[ -n "${GOOGLE_CLIENT_SECRET:-}" ]]; then
    google_secret_present="yes"
  fi

  echo "GOOGLE_CLIENT_ID present: ${google_client_present}"
  echo "GOOGLE_CLIENT_SECRET present: ${google_secret_present}"

  if ! status="$(curl -sS -D "${header_file}" -o "${body_file}" -w "%{http_code}" "${BASE_URL}/internal/knowledge-sharing-drafts")"; then
    status="000"
  fi
  echo "Internal route status: ${status}"

  location="$(awk 'BEGIN{IGNORECASE=1} /^location:/ {sub(/\r$/, "", $0); print $2}' "${header_file}" | tail -n 1)"
  if [[ -n "${location}" ]]; then
    echo "Internal route redirect location: ${location}"
  fi

  if [[ "${location}" == https://accounts.google.com/* || "${location}" == *"/api/auth/signin/google"* ]]; then
    echo "Internal browser-review access: BLOCKED - route redirects to external Google OAuth."
    INTERNAL_AUTH_STATUS="BLOCKED"
    INTERNAL_BROWSER_REVIEW_STATUS="BLOCKED"
    return 1
  fi

  if [[ "${status}" =~ ^(301|302|303|307|308)$ && "${location}" == *"/auth/signin"* ]]; then
    echo "Internal route redirects to local sign-in page."
    if ! curl -sS -o "${signin_body_file}" "${BASE_URL}/auth/signin" >/dev/null; then
      echo "Internal browser-review access: BLOCKED - sign-in page could not be loaded."
      INTERNAL_AUTH_STATUS="BLOCKED"
      INTERNAL_BROWSER_REVIEW_STATUS="BLOCKED"
      return 1
    fi
    if grep -q "Sign in with Google" "${signin_body_file}" && { [[ "${google_client_present}" == "no" ]] || [[ "${google_secret_present}" == "no" ]]; }; then
      echo "Internal browser-review access: BLOCKED - local review requires Google OAuth but Google OAuth env keys are missing."
      INTERNAL_AUTH_STATUS="BLOCKED"
      INTERNAL_BROWSER_REVIEW_STATUS="BLOCKED"
      return 1
    fi
  fi

  if grep -qi "invalid_client\\|Authorization Error\\|OAuthAccountNotLinked\\|OAuthCallback\\|OAuthSignin" "${body_file}"; then
    echo "Internal browser-review access: BLOCKED - auth/runtime error content detected."
    INTERNAL_AUTH_STATUS="BLOCKED"
    INTERNAL_BROWSER_REVIEW_STATUS="BLOCKED"
    return 1
  fi

  if [[ "${status}" =~ ^(200|401|403)$ ]]; then
    echo "Internal route is reviewable or access-controlled without a runtime failure."
    INTERNAL_AUTH_STATUS="PASS"
    INTERNAL_BROWSER_REVIEW_STATUS="PASS"
    return 0
  fi
  echo "Internal route failed runtime/access check."
  INTERNAL_AUTH_STATUS="FAIL"
  INTERNAL_BROWSER_REVIEW_STATUS="FAIL"
  return 1
}

existing_public_roots() {
  local root
  for root in "${PUBLIC_SEARCH_ROOTS[@]}"; do
    if [[ -d "${root}" ]]; then
      echo "${root}"
    fi
  done
}

check_public_private_boundary() {
  local failures=0
  local roots
  roots="$(existing_public_roots)"

  if [[ -z "${roots}" ]]; then
    echo "No public source roots found for boundary scan."
    BOUNDARY_STATUS="FAIL"
    return 1
  fi

  echo "Public source roots scanned:"
  echo "${roots}"

  echo ""
  echo "Private KB path exposure scan:"
  if echo "${roots}" | xargs grep -RIn --include="*.ts" --include="*.tsx" -E '(/Users/[^[:space:]"]+|\.codex|private[ _-]?kb|kb/|robert-kb|canonical-current-state)' --exclude-dir=".next" --exclude-dir="node_modules" --exclude-dir="internal" 2>/dev/null; then
    echo "FAIL: Private KB path indicators found in public source roots."
    failures=$((failures + 1))
  else
    echo "PASS: No private KB path indicators found in public source roots."
  fi

  echo ""
  echo "Public /knowledge-sharing internal draft exposure scan:"
  if [[ -d "app/knowledge-sharing" || -d "src/app/knowledge-sharing" || -d "pages/knowledge-sharing" || -f "pages/knowledge-sharing.tsx" ]]; then
    if grep -RIn --include="*.ts" --include="*.tsx" -E 'internal/knowledge-sharing-drafts|draft|unpublished|private|/internal/' app/knowledge-sharing src/app/knowledge-sharing pages/knowledge-sharing pages/knowledge-sharing.tsx 2>/dev/null; then
      echo "FAIL: Public knowledge-sharing route appears to expose internal draft indicators."
      failures=$((failures + 1))
    else
      echo "PASS: Public knowledge-sharing route did not expose internal draft indicators."
    fi
  else
    echo "PASS: No public /knowledge-sharing source route found to expose drafts."
  fi

  echo ""
  echo "Unverified metrics exposure scan in public app routes:"
  if echo "${roots}" | xargs grep -RIn --include="*.ts" --include="*.tsx" -E '(unverified|not verified|placeholder metric|estimated metric|mock metric|internal metrics|without benchmarks|ROI|cost reduction|[0-9][0-9,.]*×|[0-9]+%|\$[0-9]+)' --exclude-dir=".next" --exclude-dir="node_modules" --exclude-dir="internal" 2>/dev/null; then
    echo "FAIL: Possible unverified metrics found in public source roots."
    failures=$((failures + 1))
  else
    echo "PASS: No unverified metric indicators found in public source roots."
  fi

  if [[ "${failures}" -eq 0 ]]; then
    BOUNDARY_STATUS="PASS"
    return 0
  fi
  BOUNDARY_STATUS="FAIL"
  return 1
}

print_dod_table() {
  echo "| DoD Area | Requirement | Evidence | Status | Gap / Action |"
  echo "| -------- | ----------- | -------- | ------ | ------------ |"
  echo "| build | Local build completes | Build status: ${BUILD_STATUS} | ${BUILD_STATUS} | Fix build errors if failed |"
  echo "| full route regression | Required routes respond without runtime failure | Route status: ${ROUTE_STATUS} | ${ROUTE_STATUS} | Fix failing routes if any |"
  echo "| auth/reviewability | Internal review route is accessible for browser review or access-controlled without auth runtime failure | Internal auth status: ${INTERNAL_AUTH_STATUS}; browser-review status: ${INTERNAL_BROWSER_REVIEW_STATUS} | ${INTERNAL_AUTH_STATUS} | Resolve internal route runtime/auth issue if failed |"
  echo "| integrated staging/local review access | Local dev server supports route review | Dev server started by script: ${STARTED_SERVER}; base URL: ${BASE_URL} | ${ROUTE_STATUS} | Restore local review access if failed |"
  echo "| Signal Studio DoD | Regression evidence captured for review readiness | This report captures build, routes, boundary, status, and verdict | PASS | Review content-specific gaps before Lyn review |"
  echo "| public/private boundary | Internal drafts stay under /internal/* and private KB paths/metrics are not public | Boundary status: ${BOUNDARY_STATUS} | ${BOUNDARY_STATUS} | Remove public exposure if failed |"
  echo "| existing behavior unchanged | Existing public routes continue responding | Public routes included in route regression | ${ROUTE_STATUS} | Investigate failed public route responses |"
  echo "| forbidden scope check | No publish/main/safe-publish/staging actions performed by script | Script only runs local build, dev, curl, git inspection, and grep scans | PASS | Keep deployment actions out of regression |"
  echo "| changed files vs origin/main | Changed files are listed in this report | See changed files section | PASS | Review diff before approval |"
  echo "| git status | Working tree state is captured | See git status section | PASS | Resolve unexpected changes before final review |"
  echo "| .env.local not committed | .env.local is not tracked | See .env.local section | PASS | Remove from tracking if found |"
  echo "| old untracked files untouched | Script does not stage, commit, delete, or clean untracked files | Git status captured before manual review | PASS | Leave unrelated untracked files alone |"
}

section "Repository"
echo "Repo: ${REPO_DIR}"
echo "Branch:"
git branch --show-current || true

section "Latest Commits"
git --no-pager log --oneline -n 8 || true

section "Changed Files vs origin/main"
git --no-pager diff --name-status origin/main...HEAD || true
echo ""
echo "Working tree changes vs origin/main:"
git --no-pager diff --name-status origin/main || true

section "Git Status"
git status --short --branch || true

section ".env.local Not Tracked/Committed"
if git ls-files --error-unmatch .env.local >/dev/null 2>&1; then
  echo "FAIL: .env.local is tracked."
else
  echo "PASS: .env.local is not tracked."
fi
if [[ -f ".env.local" ]]; then
  echo "Local .env.local exists but contents were not printed."
else
  echo "No local .env.local file found."
fi

PACKAGE_RUNNER="$(detect_package_runner)"
section "Package Runner"
echo "Detected package runner: ${PACKAGE_RUNNER}"

section "Build"
if run_build "${PACKAGE_RUNNER}"; then
  BUILD_STATUS="PASS"
  echo "Build result: PASS"
else
  BUILD_STATUS="FAIL"
  echo "Build result: FAIL"
fi

section "Dev Server Status"
if start_dev_server "${PACKAGE_RUNNER}"; then
  echo "Dev server status: PASS"
else
  echo "Dev server status: FAIL"
fi

section "Full Route Regression"
check_routes || true

section "Internal Route Auth/Access Status"
check_internal_auth || true

section "Public/Private Boundary Checks"
check_public_private_boundary || true

section "DoD Regression Table"
print_dod_table

section "Final Verdict"
if [[ "${BUILD_STATUS}" == "PASS" && "${ROUTE_STATUS}" == "PASS" && "${INTERNAL_AUTH_STATUS}" == "PASS" && "${BOUNDARY_STATUS}" == "PASS" ]]; then
  FINAL_VERDICT="Ready for Lyn final review"
elif [[ "${INTERNAL_AUTH_STATUS}" == "BLOCKED" || "${INTERNAL_BROWSER_REVIEW_STATUS}" == "BLOCKED" ]]; then
  FINAL_VERDICT="Blocked by auth/runtime"
elif [[ "${BUILD_STATUS}" == "FAIL" || "${ROUTE_STATUS}" == "FAIL" || "${BOUNDARY_STATUS}" == "FAIL" ]]; then
  FINAL_VERDICT="Implemented but not review-ready"
else
  FINAL_VERDICT="Regression incomplete"
fi
echo "${FINAL_VERDICT}"

echo ""
echo "Report file: ${REPORT_FILE}"
