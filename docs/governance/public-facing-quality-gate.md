# Public-Facing Quality Gate Checklist
## Post-Change Validation Before Deploy

**Purpose:** Verify change meets discipline contract  
**Enforcement:** All checks must pass before deploy  
**Authority:** Lyn/Robert release gate required

---

## GATE 1: Build & Technical

- [ ] `pnpm build` passes without errors
- [ ] No TypeScript errors
- [ ] No ESLint errors (or documented exceptions)
- [ ] No broken internal links (spot check)
- [ ] No console errors in browser DevTools
- [ ] All pages load correctly (localhost test)

**If any fail:** Fix before proceeding to Gate 2.

---

## GATE 2: Must-Preserve Registry

**Verify ALL items still present:**

### Navigation
- [ ] Home
- [ ] About
- [ ] Portfolio
- [ ] Achievements
- [ ] Role Fit
- [ ] Knowledge Sharing
- [ ] Contact
- [ ] Internal

### Core Concepts (visible somewhere)
- [ ] LVT (or documented as deferred)
- [ ] AIOS org chart (or documented as deferred)
- [ ] Role & responsibility model (or documented as deferred)
- [ ] Architecture layers
- [ ] Observability (or documented as deferred)
- [ ] Harness concept (or documented as deferred)
- [ ] Governance concepts (guardrails, HITL, quality gates)
- [ ] "How We Build" (or documented as deferred)
- [ ] Usage/budget tracking (in internal)
- [ ] Internal backlog/swimlane (or documented as deferred)
- [ ] Daily learning format (or documented as deferred)
- [ ] Knowledge Sharing layer

### Identity & Positioning
- [ ] "I create structure where transformation is messy"
- [ ] "Not just coordination" differentiation
- [ ] Governance + execution proof
- [ ] Technical depth visible
- [ ] 80/20 balance (AIOS first, Lyn credential second)

**If any missing unexpectedly:** BLOCK deploy, restore item.

**If intentionally deferred:** Must be documented in must-preserve-registry.md

---

## GATE 3: Evidence Standard

**For ALL metrics visible on public pages:**

Check each performance/ROI/speed/cost claim:
- [ ] Has baseline (compared to what?)
- [ ] Has date (when measured?)
- [ ] Has same-task validation (apples-to-apples?)
- [ ] Has evidence source (file or methodology)
- [ ] Has caveat (scope, limitations)

**If any metric incomplete:**
- [ ] Metric removed, OR
- [ ] Metric hidden, OR
- [ ] Metric relabeled as "prototype observation pending validation"

**Do NOT deploy unsupported hero metrics.**

---

## GATE 4: First Impression Check

**If Home page was touched:**
- [ ] AIOS content leads (80% of visible content)
- [ ] Lyn credential layer brief (20% of visible content)
- [ ] First scan answer: "This person built working AIOS" ✓
- [ ] NOT: "This person has nice resume" ✗

**If About page was touched:**
- [ ] Page answers: "Why Lyn can govern AIOS" ✓
- [ ] NOT: "Lyn's life story" ✗

**Senior executive 90-second scan:**
- [ ] Clear what this site is about
- [ ] Clear what makes this person different
- [ ] Evidence visible (not just claims)

---

## GATE 5: Forbidden Content Check

**Scan changed files for:**
- [ ] No `สีมงคลวันศุกร์` or unprofessional cultural content
- [ ] No unsupported hero metrics (e.g., "1,750× faster" without evidence)
- [ ] No pure biography (credential layer only)
- [ ] No "consulting storefront" positioning
- [ ] No "startup pitch" tone

**If found:** Remove before deploy.

---

## GATE 6: File Action Accuracy

**Report must accurately state:**
- [ ] Which website files were changed
- [ ] Which KB files were changed (if any)
- [ ] Which skill files were changed (if any)
- [ ] Which config/script files were changed (if any)

**Do NOT say "no files edited" if anything was changed.**

**Precision matters for evidence discipline.**

---

## GATE 7: Deployment Verification

### Pre-Deploy
- [ ] All changes committed to git
- [ ] Commit message describes change accurately
- [ ] Pre-change gate report filed
- [ ] Gates 1-6 passed

### Post-Deploy (Vercel)
- [ ] CI/CD pipeline passed
- [ ] Vercel deploy successful
- [ ] Preview URL loads correctly
- [ ] Changed pages render correctly in preview

### Post-Deploy (Live)
- [ ] https://sararin.ai/ loads
- [ ] Changed pages accessible
- [ ] Navigation works
- [ ] No broken links (spot check)
- [ ] No console errors (browser DevTools)
- [ ] Regression check passed (if script available)

**If any post-deploy check fails:**
- [ ] Rollback immediately
- [ ] Document failure
- [ ] Fix locally
- [ ] Re-run full gate sequence

---

## GATE 8: Human Release Approval

**Lyn/Robert final review:**

- [ ] Change aligns with mission
- [ ] No reputation risk detected
- [ ] First impression appropriate
- [ ] Evidence discipline maintained
- [ ] Anti-fatigue: Reduces future explanation burden (not increases)

**Release decision:**
- [ ] ✅ APPROVED - Change is live
- [ ] ⏸️ HOLD - Needs adjustment (specify)
- [ ] ❌ ROLLBACK - Revert immediately (specify reason)

---

## Rollback Protocol

**If any gate fails:**

1. **Immediate:**
   ```bash
   git revert [commit SHA]
   git push origin main
   ```

2. **Document:**
   - What failed?
   - Why did it fail?
   - What was missed in pre-change gate?

3. **Learn:**
   - Update pre-change gate template (if gap found)
   - Update this checklist (if new check needed)
   - Feed back to discipline contract

4. **Retry:**
   - Fix issue locally
   - Re-run full gate sequence
   - Only deploy when ALL gates pass

---

## Definition of Done (Final)

**A public website change is DONE when:**

1. ✅ All 8 gates passed
2. ✅ Live site verified working
3. ✅ No regression detected
4. ✅ Lyn/Robert release approval obtained
5. ✅ Pre-change report filed
6. ✅ Post-deploy verification completed
7. ✅ KB updated (if applicable)
8. ✅ No future explanation burden added

**Then and only then:** Say "deployed successfully."

---

## Status Tracking

**Last successful deploy:**
- **Commit:** [SHA]
- **Date:** [YYYY-MM-DD]
- **All gates:** PASS
- **Approved by:** [Lyn / Robert]

**Failed deploys (learn from):**
- [Record failures here with reason + fix]

---

## Version History

- **v1.0** (2026-05-24): Initial quality gate after navigation regression
  - 8 gates defined
  - Evidence standard enforced
  - Human release gate required

---

**This checklist is not optional.**

Every public-facing change must pass all 8 gates before going live.

No shortcuts. No exceptions. No "I'll fix it later."

**This is how discipline becomes real.**
