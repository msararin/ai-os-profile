# CASE-003 Surface Implementation Summary

## Scope

Implemented the RCA-approved direction:

- rewrite the CASE-003 page around Company M, controlled experiment framing, and measurement comparison
- add Case Studies as a first-class navigation item
- create `/case-studies`
- preserve the deep route `/case-studies/case-003/round3-evidence-ladder`
- copy the RCA before/after HTML report to Downloads for local owner review

## Files Changed

- `components/site-header.tsx`
- `app/case-studies/page.tsx`
- `app/case-studies/case-003/round3-evidence-ladder/page.tsx`

## Downloads Copy

HTML report copied to Downloads:

- `CASE003_PAGE_STORYTELLING_RCA_BEFORE_AFTER_REPORT.html`

File exists and has nonzero size.

## Story Rewrite Summary

The page now starts from the reader problem:

Company M is a mock retail-like company context used to test how AI adoption work can move from useful-looking output to measurable, traceable, and claim-safe controlled execution evidence.

The rewritten page includes:

- problem statement
- Company M context
- controlled experiment framing
- concrete "what stayed constant"
- round-by-round change summary
- measurement comparison table
- intervention ladder tied to measurement deltas
- plain-language glossary
- included/excluded scope
- claim boundary
- evidence map
- next decision

## Navigation Summary

Top navigation now includes:

- `Case Studies` -> `/case-studies`

The `/case-studies` page includes a CASE-003 card linking to:

- `/case-studies/case-003/round3-evidence-ladder`

