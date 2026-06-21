# CASE-003 Local Route Verification

## Dev Server

Local dev server:

- `http://127.0.0.1:3001`

## Route Checks

| Route | Result |
|---|---|
| `/` | 200 OK |
| `/case-studies` | 200 OK |
| `/case-studies/case-003/round3-evidence-ladder` | 200 OK |

## Content Checks

Local HTML includes:

- `Case Studies`
- `CASE-003: Company M AI Adoption Measurement Study`
- `View evidence ladder`
- `Company M CASE-003: Measuring AI Adoption Control Across Rounds`
- `Round 1 / Round 2 / Round 3 Parameter Comparison`
- `Plain-language glossary`
- `Included / Excluded Scope`
- `Controlled Execution Evidence Claim`

## Build Route Checks

`pnpm build` generated:

- `/case-studies`
- `/case-studies/case-003/round3-evidence-ladder`

