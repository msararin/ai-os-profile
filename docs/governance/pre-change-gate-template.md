# Pre-Change Gate Report Template
## Required Before Any Website Edit

**Purpose:** Declare intent before implementation  
**Enforcement:** No edit without completed report  
**Review:** Lyn/Robert must approve before proceed

---

## REPORT TEMPLATE

### Change ID
**Date:** [YYYY-MM-DD]  
**Requestor:** [Lyn / Robert / Self-identified issue]  
**Change type:** [PATCH / FIX / NEW / REFACTOR]

---

### 1. Files I Will Touch

**Website files:**
```
app/[page]/page.tsx
components/[component].tsx
...
```

**Config files:**
```
(if any)
```

**Other:**
```
(KB, skills, docs, scripts)
```

---

### 2. Files I Will NOT Touch

**Explicitly preserved:**
```
app/portfolio/page.tsx
app/knowledge-sharing/page.tsx
app/contact/page.tsx
components/site-header.tsx (navigation array)
...
```

---

### 3. Page-Purpose Contract Affected

**Which page(s):**
- [ ] Home (job: Show AIOS, establish Lyn credibility)
- [ ] About (job: Prove why Lyn can govern AIOS)
- [ ] Portfolio (job: Show proof artifacts)
- [ ] Achievements (job: Evidence-backed timeline)
- [ ] Role Fit (job: Show differentiation for target roles)
- [ ] Architecture (job: Prove technical/system thinking)
- [ ] Knowledge Sharing (job: Public thought leadership)
- [ ] Contact (job: Professional contact info)
- [ ] Other: _______

**Does this change the page job?**
- [ ] No (safe)
- [ ] Yes (requires justification + approval)

---

### 4. Must-Preserve Items Checked

**From registry, verified present:**
- [ ] Navigation (8 items)
- [ ] LVT
- [ ] AIOS org chart
- [ ] Role & responsibility model
- [ ] Architecture layers
- [ ] Observability
- [ ] Harness concept
- [ ] Usage/budget tracking
- [ ] Internal backlog/swimlane
- [ ] Daily learning format
- [ ] Governance concepts
- [ ] How We Build
- [ ] Knowledge Sharing layer
- [ ] "I create structure..." positioning
- [ ] "Not just coordination" differentiation
- [ ] 80/20 balance

**Will any of these disappear?**
- [ ] No (safe to proceed)
- [ ] Yes (STOP - escalate to Lyn)

---

### 5. Metrics Affected

**Metrics in this change:**
```
(list any performance, ROI, speed, cost claims)
```

**Evidence status:**
- [ ] All metrics have baseline + date + evidence + caveat
- [ ] Some metrics incomplete → Plan: [remove / relabel / defer]
- [ ] No metrics affected

---

### 6. 80/20 Balance Check

**Does this change affect Home page?**
- [ ] No
- [ ] Yes → Current balance: ___% AIOS / ___% Lyn
- [ ] Yes → After change: ___% AIOS / ___% Lyn

**If Yes, verify:**
- [ ] AIOS content leads (80%)
- [ ] Lyn credential layer brief (20%)
- [ ] First impression: "Built working AIOS" not "Nice resume"

---

### 7. Risk Level

- [ ] **LOW:** Typo, link fix, evidence addition (no content change)
- [ ] **MEDIUM:** Content addition (append only, nothing removed)
- [ ] **HIGH:** Content restructure, removal, or replacement
- [ ] **CRITICAL:** Navigation change, home page rewrite, identity shift

---

### 8. Rollback Plan

**Last known good commit:**
```
[commit SHA]
```

**Rollback command:**
```
git revert [commit SHA]
```

**Verification after rollback:**
```
pnpm build
pnpm dev (check localhost)
curl https://sararin.ai/ (check live)
```

---

### 9. Validation Steps

**Before commit:**
- [ ] Build passes (`pnpm build`)
- [ ] No TypeScript errors
- [ ] No broken links (manual spot check)
- [ ] Must-preserve registry items still present
- [ ] Evidence standard complied (if metrics touched)

**After commit (before deploy):**
- [ ] CI passes
- [ ] Vercel preview deploy successful
- [ ] Preview site loads correctly
- [ ] Regression check passed (if script available)

**After deploy:**
- [ ] Live site loads (https://sararin.ai/)
- [ ] Changed pages render correctly
- [ ] Navigation works
- [ ] No console errors (browser DevTools)

---

### 10. Stop Point Before Commit

**I will STOP and report back if:**
- [ ] Build fails
- [ ] Must-preserve item disappears unexpectedly
- [ ] Evidence standard can't be met for existing metric
- [ ] Realize change is larger than originally scoped
- [ ] Conflict with approved identity detected

**Do NOT proceed without Lyn approval if stop point triggered.**

---

## APPROVAL SECTION

**Risa self-assessment:**
- [ ] This change is within my judgment scope
- [ ] This change requires Lyn review

**Lyn/Robert approval:**
- [ ] ✅ APPROVED - Proceed with change
- [ ] ⏸️ HOLD - Needs revision (specify below)
- [ ] ❌ BLOCK - Do not proceed (specify below)

**Notes:**
```


```

---

**Signature:** ________________  
**Date:** ________________

---

## Usage Instructions

**For every website change:**
1. Copy this template
2. Fill out all sections
3. Post report OR save as `pre-change-gate-[date]-[change-id].md`
4. Wait for approval if HIGH/CRITICAL risk
5. Only then proceed with edit

**No report = No edit.**

This is the enforcement layer that makes discipline real.
