# Signal Studio v0.1 Role Map (PROPOSAL)

**Status:** Proposal — NOT canonical source of truth yet  
**Created:** 2026-05-26  
**Author:** Risa (Signal Studio v0.5 implementation)  
**Review required:** Lyn / Robert before integrating into KB canonical docs

---

## Purpose

Define Signal Studio as a separate team from Supernova within the AIOS team-of-team architecture.

**Signal Studio mission:** Personal branding / PR / knowledge sharing / thought leadership  
**Supernova mission:** Business / opportunity intelligence / monetization

**Key distinction:**
- Supernova supports money-creation decisions
- Signal Studio supports personal brand / reputation / public positioning

---

## Team Classification

**Signal Studio is separate from Supernova**

- Supernova = opportunity framing, market validation, business modeling, channel strategy
- Signal Studio = content drafting, claims-safety review, visual handoff, channel publishing

**Why separate?**
- Different missions (money creation vs. reputation management)
- Different outputs (business decisions vs. public content)
- Different risk profiles (opportunity cost vs. reputation risk)
- Different review criteria (ROI vs. claims-safety)

---

## Signal Studio Role Registry

| Role | Purpose | Trigger | Input | Output | Default model | Escalation | Stop condition |
|------|---------|---------|-------|--------|---------------|------------|----------------|
| **Signal Architect** | Frame personal branding / positioning / publishability decisions | Need to decide: what to share, where to share, how to position, whether publishable | Topic, evidence, audience, channel options, risk level | Positioning recommendation, channel fit, publishability decision, risk assessment | Sonnet worker | Escalate to Lyn/Robert for high reputation risk or public-facing claims | Stop when positioning is explicit, channel is clear, and risk is classified |
| **Signal Publisher** | Draft bilingual content (English professional + Thai casual) with appropriate tone | Approved topic ready for drafting | Topic, evidence notes, positioning, target channel, tone requirements | English professional draft, Thai casual draft, LinkedIn angle, Thai social angle | Flash bulk drafting + Sonnet review | Escalate if tone/voice uncertain or if content touches sensitive topics | Stop when both drafts are complete, tone is appropriate, and bilingual quality passes review |
| **Evidence Reviewer** | Verify claims-safety, evidence integrity, public/private boundary | Draft content ready for claims review | Draft content, evidence notes, source material, public risk level | Claims-safety assessment, public-safe claims list, needs-caveat list, do-not-use list, public risk level | Sonnet worker | Escalate to Lyn/Robert for medium/high public risk or unverified metrics | Stop when every claim is classified as public-safe, needs-caveat, or do-not-use |
| **Visual Architect** | Design infographic prompts and visual briefs for Visual Gemini | Approved content ready for visual handoff | Draft content, positioning, target platform, evidence notes | Infographic prompt, visual brief, visual status, allowed text guidance, what-not-to-show guidance | Sonnet worker | Escalate if visual contains metrics, internal data, or reputation-sensitive claims | Stop when visual prompt is clear, claims-safe, and ready for Visual Gemini generation |
| **Channel Strategist** | Recommend publishing channel and timing | Content ready for channel decision | Draft content, positioning, evidence level, audience, available channels | Recommended channel (LinkedIn / Thai social / Knowledge Sharing / Park), timing recommendation, cross-posting logic | Sonnet worker | Escalate for high-stakes public content or first-time channel use | Stop when channel is explicit, timing is clear, and cross-posting rules are defined |
| **Release Coordinator** | Coordinate publication workflow and status updates | Approved content ready to publish | Draft content, channel, timing, visual status, approval status | Publication plan, status updates, post-publish validation, rollback criteria | Sonnet worker | Escalate to Lyn for final publication approval (manual gate) | Stop when content is published OR parked with reason documented |
| **Brand Continuity Guardian** | Maintain voice consistency, prevent overclaiming, protect reputation | Any public-facing content before publish | Draft content, past published content, brand guidelines, claims-safety notes | Consistency check, overclaiming flags, reputation risk assessment, revision recommendations | Sonnet worker | Escalate to Lyn/Robert for potential reputation damage or brand misalignment | Stop when content aligns with established voice and does not overclaim |

---

## Model Routing Rule

**Default routing:**
- Cheap/Flash: bulk bilingual drafting, template population, mechanical classification
- Sonnet: claims-safety review, positioning decisions, tone refinement, final review
- Opus: high-stakes reputation decisions, public-facing strategic content (escalation only)

**Budget discipline:**
- Signal Publisher uses Flash for bulk drafting, Sonnet for claims review
- All other roles use Sonnet as default worker
- Opus is escalation only, never default

---

## Output Contracts

**Signal Architect output:**
- Positioning statement
- Channel recommendation (LinkedIn / Thai social / Knowledge Sharing / Park)
- Publishability decision (Yes / Needs Revision / Park)
- Public risk level (low / medium / high)

**Signal Publisher output:**
- English professional draft (LinkedIn / portfolio tone)
- Thai casual draft (friendly, practical, uses "เรา" by default, "ริน" sparingly)
- LinkedIn angle (one-sentence hook)
- Thai social angle (one-sentence hook)

**Evidence Reviewer output:**
- Public-safe claims (list)
- Needs caveat (list)
- Do NOT use (list)
- Public risk level (low / medium / high)
- Evidence integrity assessment

**Visual Architect output:**
- Infographic prompt (full creative brief for Visual Gemini)
- Visual brief (summary of visual concept)
- Visual status (draft_prompt / ready_to_generate / generated / reviewed / approved_for_post / used / parked)
- Allowed text guidance
- What NOT to show guidance

**Channel Strategist output:**
- Recommended channel (LinkedIn / Thai social / Knowledge Sharing / Park)
- Timing recommendation
- Cross-posting logic

**Release Coordinator output:**
- Publication status (draft / needs_review / approved / published_external / posted_linkedin / posted_thai_social / parked)
- Post-publish validation (evidence that content was published)
- Rollback criteria (if publication fails or needs removal)

**Brand Continuity Guardian output:**
- Voice consistency check (pass / needs revision)
- Overclaiming flags (list)
- Reputation risk assessment (low / medium / high)
- Revision recommendations (if needed)

---

## Integration with AIOS Team Architecture

**Proposed hierarchy:**

```
Human Release Gate (Lyn/Robert)
↓
Orchestration Brain (Robert)
↓
Memory Layer (KB)
↓
Dispatch Layer
↓
├── Big Crew (Engineering: PM, Architect, QA, Release Captain, etc.)
├── Supernova (Business Intelligence: Opportunity Framer, Market Analyst, etc.)
└── Signal Studio (Personal Branding: Signal Architect, Publisher, Evidence Reviewer, etc.)
```

**Signal Studio's relationship to other teams:**
- Reports to Orchestration Brain (Robert) for task dispatch
- Uses Memory Layer (KB) for evidence retrieval and brand continuity
- Escalates to Human Release Gate (Lyn/Robert) for high-risk content
- Does NOT make money/business decisions (that's Supernova's domain)
- Does NOT make technical/engineering decisions (that's Big Crew's domain)

---

## Release Rule

Signal Studio v0.1 output is draft until reviewed by Robert and gated by Lyn when required.

**Manual gates:**
- All public-facing content requires Lyn final approval
- Medium/high public risk requires Lyn review before publication
- First-time channel use requires Lyn approval
- Content touching reputation/career/privacy requires Lyn gate

**No auto-publish:**
- No automatic LinkedIn posting
- No automatic Thai social posting
- No automatic promotion from draft to published_external
- All publication is manual or via explicit Lyn approval

---

## Source-of-Truth Location (Proposal)

**Recommended canonical location:**
- Option A: `/Users/apple/robert-knowledge-base/03_ai_skill_lab/signal-studio/signal-studio-v1-role-registry.md`
- Option B: Add Signal Studio section to `/Users/apple/robert-knowledge-base/03_ai_skill_lab/team-of-team-orchestration/team-orchestration-overview.md`
- Option C: Create new `/Users/apple/robert-knowledge-base/03_ai_skill_lab/personal-branding/` directory

**Decision needed:** Lyn/Robert must approve location before creating canonical file

---

## Next Steps

1. ✅ Signal Studio role map proposal created (this document)
2. ⏸️ Lyn/Robert review proposal
3. ⏸️ Approve canonical location
4. ⏸️ Create canonical Signal Studio role registry
5. ⏸️ Update team orchestration overview to reference Signal Studio
6. ⏸️ Update AIOS org chart (if exists in ai-os-profile repo)

---

**Status:** PROPOSAL — awaiting Lyn/Robert review before integrating into canonical KB docs
