/**
 * Signal Studio Draft Content Packages
 * Data structure for internal knowledge sharing drafts
 */

export interface SignalStudioDraft {
  id: string;
  title: string;
  status:
    | "captured"
    | "draft"
    | "needs_review"
    | "approved"
    | "approved_for_visual"
    | "visual_ready"
    | "published_external"
    | "posted_linkedin"
    | "posted_thai_social"
    | "parked";

  topic: string;
  learningSummary: string;
  whyItMatters: string;

  englishProfessionalDraft: string;
  thaiCasualDraft: string;

  linkedInAngle: string;
  thaiSocialAngle: string;
  recommendedChannel: Array<"linkedin" | "thai_social" | "knowledge_sharing" | "park">;

  infographicPrompt: string;
  visualBrief: string;
  visualStatus:
    | "draft_prompt"
    | "ready_to_generate"
    | "generated"
    | "reviewed"
    | "approved_for_post"
    | "used"
    | "parked";

  evidenceNote: string;
  sourceMaterial: string[];
  publicSafeClaim: string[];
  needsCaveat: string[];
  doNotUse: string[];

  signalArchitectReview: string;
  signalPublisherReview: string;
  evidenceReviewerReview: string;

  publicRiskLevel: "low" | "medium" | "high";
  lastReviewedBy: string | null;
  lastReviewedAt: string | null;

  // Review feedback fields (optional)
  revisionNotes?: string;
  requestedChanges?: string[];
}

/**
 * Signal Studio draft content packages
 * 7 learning topics: 4 new (v0.5) + 3 preserved (v0.3)
 */
export const signalStudioDrafts: SignalStudioDraft[] = [
  // Topic 1: Spec-First Execution (NEW v0.5)
  {
    id: "spec-first-execution",
    title: "Spec-First Execution",
    status: "draft",
    topic: "Workflow discipline",
    learningSummary:
      "Spec-first execution is more effective than live back-and-forth chat during execution.",
    whyItMatters:
      "AI work improves when tasks start with priority, scope, DoD, metrics, validation, and stop gates.",

    englishProfessionalDraft: `**Why spec-first matters**

Most AI workflows start with back-and-forth chat: "Do this," then "Wait, change that," then "Actually, I meant something else." Every iteration burns time and creates rework.

Spec-first execution flips this: write the full task specification before execution starts—scope, Definition of Done, validation criteria, stop gates, and expected output.

When AIOS agents receive a complete work spec, they execute faster, with fewer clarifications, and stop at the right point. Rework drops. Ambiguity disappears.

**What changed**

Before: Live chat execution → confusion → back-and-forth → rework
After: Work spec upfront → clear execution → validation → stop gate → done

**Evidence**

AIOS work-spec workflow shows consistent reduction in clarification rounds and rework cycles when specifications include scope, DoD, validation, and stop conditions.`,

    thaiCasualDraft: `**ทำไม spec ก่อนถึงสำคัญ**

AI workflow ส่วนใหญ่เริ่มด้วยแชทไปเรื่อย ๆ: "ทำอันนี้" แล้วก็ "เดี๋ยวเปลี่ยนใจ ทำอันนั้นแทน" แล้วก็ "จริง ๆ ริน…หมายถึงอีกอย่าง" รอบไหนก็เสียเวลา งานซ้ำเยอะ

Spec-first execution กลับด้าน: เขียนสเปกงานให้ครบก่อนเริ่มทำ — ขอบเขต Definition of Done เกณฑ์ตรวจสอบ หยุดตรงไหน ผลลัพธ์คืออะไร

พอ AI agent ได้สเปกครบ มันทำได้เร็วขึ้น ถามน้อยลง หยุดตรงจุด งานซ้ำลดลง ความกำกวมหายไป

**อะไรเปลี่ยน**

ก่อน: แชทสด → งง → คุยไปคุยมา → ทำซ้ำ
หลัง: เขียนสเปกก่อน → ทำชัด → validate → หยุดตรงจุด → จบ

**หลักฐาน**

AIOS work-spec workflow แสดงให้เห็นว่า เมื่อสเปกมี scope, DoD, validation, stop condition รอบคำถาม clarification กับงานซ้ำลดลงชัดเจน`,

    linkedInAngle:
      "Spec-first execution reduces rework in AI workflows—share the discipline, not the tool",
    thaiSocialAngle:
      "สเปกก่อนทำ ลดงานซ้ำ — วินัยการทำงานกับ AI ที่ใช้ได้จริง",
    recommendedChannel: ["linkedin", "knowledge_sharing"],

    infographicPrompt: `Two-path comparison:
LEFT PATH (live chat): "Do this" → confusion → "Wait, change" → rework → fatigue
RIGHT PATH (spec-first): Write spec → clear execution → validate → stop gate → done

Visual metaphor: messy chat bubbles (left) vs. structured checklist (right)
Color: chaos (red/gray) vs. clarity (green/blue)`,

    visualBrief:
      "Side-by-side comparison showing live-chat chaos vs. spec-first clarity. Use visual metaphors: tangled chat thread vs. clean checklist.",
    visualStatus: "draft_prompt",

    evidenceNote:
      "AIOS work-spec workflow, repeated reduction in clarification rounds, qualitative observation (not quantified benchmark)",
    sourceMaterial: ["AIOS planning docs", "work-spec pattern", "v0.5 delta assessment"],
    publicSafeClaim: [
      "Spec-first reduces ambiguity",
      "Work specs improve execution clarity",
    ],
    needsCaveat: [
      "Qualitative learning, not measured benchmark",
      "Personal AIOS workflow, not enterprise claim",
    ],
    doNotUse: [
      "Quantified efficiency metrics without benchmark",
      "Claims of universal applicability",
    ],

    signalArchitectReview:
      "Good positioning—practical workflow discipline, not tool-specific. Avoids generic AI consultant framing. Suitable for LinkedIn.",
    signalPublisherReview:
      "English professional, Thai casual tone achieved. Refers to 'ริน' correctly.",
    evidenceReviewerReview:
      "Public-safe if framed as personal learning. Do not claim measured efficiency gains without benchmark trace.",

    publicRiskLevel: "low",
    lastReviewedBy: null,
    lastReviewedAt: null,
  },

  // Topic 2: Living Dashboard (NEW v0.5)
  {
    id: "living-dashboard",
    title: "Living Dashboard",
    status: "draft",
    topic: "Observability maturity",
    learningSummary:
      "A dashboard should not only show what is done—it should show whether the system is getting better.",
    whyItMatters:
      "The real value of an AI operating system is not task completion alone, but evidence that the system reduces rework, catches regressions, controls cost, and improves over time.",

    englishProfessionalDraft: `**Traditional vs. Living Dashboard**

Most dashboards show task status: ✅ Done, ⏳ In Progress, ❌ Failed.

That's useful, but it doesn't answer the question that matters: *Is the system getting better?*

A **Living Dashboard** tracks improvement signals:
- Are regressions caught before production?
- Is rework decreasing over time?
- Are costs under control?
- Is cognitive load on the user dropping?
- Is the system learning from mistakes?

**Why it matters**

Task completion is table stakes. System improvement is the actual value. A Living Dashboard shows whether your AIOS is evolving or just churning.

**Current status**

AIOS Living Dashboard principle is documented but not yet live. Metrics engine is parked with Definition of Ready. When implemented, it will track before/after improvement patterns, not just completion counts.`,

    thaiCasualDraft: `**แดชบอร์ดแบบเดิม vs. Living Dashboard**

แดชบอร์ดส่วนใหญ่แสดงสถานะงาน: ✅ เสร็จ, ⏳ กำลังทำ, ❌ พัง

มันก็มีประโยชน์ แต่มันไม่ได้ตอบคำถามที่สำคัญ: *ระบบดีขึ้นจริงไหม?*

**Living Dashboard** ติดตามสัญญาณการพัฒนา:
- จับ regression ได้ก่อนขึ้น production ไหม?
- งานซ้ำลดลงไหม?
- ต้นทุนควบคุมได้ไหม?
- ภาระคิดของคนใช้ลดลงไหม?
- ระบบเรียนรู้จากความผิดพลาดไหม?

**ทำไมสำคัญ**

งานเสร็จคือพื้นฐาน ระบบพัฒนาคือคุณค่าจริง Living Dashboard บอกว่า AIOS evolve หรือแค่วนลูปเดิม ๆ

**สถานะตอนนี้**

หลักการ Living Dashboard มีอยู่ใน KB แต่ยังไม่ live Metrics engine ถูก park ไว้พร้อม DoR พอมันถูก implement มันจะติดตาม before/after improvement pattern ไม่ใช่แค่นับงานเสร็จ`,

    linkedInAngle:
      "Living Dashboard: track system improvement, not just task completion",
    thaiSocialAngle: "Living Dashboard: ติดตามว่าระบบดีขึ้นจริงไหม ไม่ใช่แค่งานเสร็จกี่งาน",
    recommendedChannel: ["linkedin", "knowledge_sharing"],

    infographicPrompt: `Dashboard split visual:
LEFT: Traditional dashboard—task checkboxes, completion count
RIGHT: Living Dashboard—before/after graphs, regression alerts, cost trends, rework reduction, learning loop

Visual metaphor: static checklist vs. living organism (growth chart)
Color: static (gray/blue) vs. living (green gradient, upward arrows)`,

    visualBrief:
      "Split comparison: traditional task dashboard vs. living improvement dashboard. Use growth metaphors.",
    visualStatus: "draft_prompt",

    evidenceNote:
      "AIOS Living Dashboard principle documented in GPT KB. Metrics engine parked with DoR. Conceptual only (not live yet).",
    sourceMaterial: [
      "Living Dashboard principle (KB)",
      "parked metrics-engine backlog",
      "DoR document",
    ],
    publicSafeClaim: [
      "Dashboard should track improvement, not just completion",
      "System value = improvement evidence",
    ],
    needsCaveat: [
      "Conceptual framework, not live implementation",
      "No quantified metrics yet (illustrative only)",
    ],
    doNotUse: [
      "Measured improvement metrics without benchmark",
      "Live dashboard claims (not implemented yet)",
      "1,400×, 2.3×, 653%, $1.36 metrics",
    ],

    signalArchitectReview:
      "Strong positioning—observability maturity angle. Avoids tool-specific framing. Suitable for thought leadership.",
    signalPublisherReview:
      "English professional, Thai casual achieved. 'ริน' used correctly.",
    evidenceReviewerReview:
      "Public-safe if framed as principle/vision. Do NOT use illustrative metrics as measured results.",

    publicRiskLevel: "medium",
    lastReviewedBy: null,
    lastReviewedAt: null,
  },

  // Topic 3: Strategic Gate Is Not Failure (NEW v0.5)
  {
    id: "strategic-gate-not-failure",
    title: "Strategic Gate Is Not Failure",
    status: "draft",
    topic: "Release governance",
    learningSummary:
      "When a release gate stops strategic content, that is governance working.",
    whyItMatters:
      "Good automation should not automate every decision. Some changes should stop, ask for human judgment, and continue only after approval.",

    englishProfessionalDraft: `**When the gate stops you**

Most people think a passing build is a green light to deploy. But some changes shouldn't auto-deploy—even if all tests pass.

AIOS Safe Publish Protocol has 8 automated gates. Most changes pass all 8 and deploy automatically. But strategic content—architecture pages, positioning changes, public claims—triggers Gate 3: Strategic Stop.

Gate 3 doesn't fail the build. It pauses and asks for human approval. GPT (executive reviewer) evaluates positioning, claims-safety, and public/private boundaries before approving.

**What happened**

Architecture Visual Upgrade Phase 1 triggered Gate 3. GPT reviewed, approved positioning, and Sararin performed a controlled manual publish. Live verification passed 7/7 routes.

The gate worked exactly as designed: automation for speed, human judgment for strategy.

**The takeaway**

Governance isn't bureaucracy when it knows what to automate and what to pause for human review. Strategic gates aren't failures—they're intelligence.`,

    thaiCasualDraft: `**เมื่อ gate หยุดเรา**

คนส่วนใหญ่คิดว่า build ผ่านแปลว่า deploy ได้เลย แต่บางอย่างไม่ควร auto-deploy ถึง test จะผ่านหมดก็ตาม

AIOS Safe Publish Protocol มี 8 gates อัตโนมัติ งานส่วนใหญ่ผ่านทั้ง 8 และ deploy อัตโนมัติ แต่ strategic content — architecture page, positioning change, public claim — จะ trigger Gate 3: Strategic Stop

Gate 3 ไม่ใช่ fail build มันหยุดและถาม human approval GPT (executive reviewer) ดู positioning, claims-safety, public/private boundary ก่อน approve

**เกิดอะไรขึ้น**

Architecture Visual Upgrade Phase 1 trigger Gate 3 GPT review แล้ว approve positioning ริน publish manual แบบ controlled Live verification ผ่าน 7/7 routes

Gate ทำงานตามที่ออกแบบไว้พอดี: automation เพื่อความเร็ว human judgment เพื่อ strategy

**บทเรียน**

Governance ไม่ใช่ bureaucracy ถ้ามันรู้ว่าอะไรควร automate อะไรควรหยุดให้คนตัดสินใจ Strategic gate ไม่ใช่ failure — มันคือ intelligence`,

    linkedInAngle:
      "Good automation knows when to stop and ask for human judgment",
    thaiSocialAngle: "Automation ที่ดีรู้ว่าเมื่อไหร่ควรหยุดให้คนตัดสินใจ",
    recommendedChannel: ["linkedin", "knowledge_sharing"],

    infographicPrompt: `Release flow diagram:
Build → Regression → Strategic Gate STOP → Human Approval → Controlled Publish → Live Verification

Visual metaphor: automation highway with strategic checkpoint (not barrier, but checkpoint)
Color: green (automation) → yellow (strategic stop) → green (approved publish)`,

    visualBrief:
      "Release governance flow showing strategic gate as intelligent checkpoint, not failure. Use traffic/checkpoint metaphor.",
    visualStatus: "draft_prompt",

    evidenceNote:
      "Architecture Phase 1 triggered Gate 3, GPT approved, Sararin published manually, 7/7 live routes verified. Commit 511024c.",
    sourceMaterial: [
      "Safe Publish Protocol v0.1.3",
      "Architecture Phase 1 closeout",
      "commit 511024c",
      "GPT gate approval (documented)",
    ],
    publicSafeClaim: [
      "Strategic gate triggered as designed",
      "7/7 live routes verified",
      "GPT gate approval process operational",
    ],
    needsCaveat: [
      "Personal AIOS case study, not enterprise platform",
      "Strategic gate is human approval, not automated",
    ],
    doNotUse: [
      "Enterprise-scale maturity claims",
      "Automated strategic approval (it's manual)",
    ],

    signalArchitectReview:
      "Excellent positioning—governance maturity without claiming enterprise scale. Suitable for senior roles.",
    signalPublisherReview:
      "English professional, Thai casual tone achieved. 'ริน' used correctly.",
    evidenceReviewerReview:
      "Public-safe. Evidence is verifiable (commit SHA, live URLs, documented approval). Frame as case study, not enterprise offering.",

    publicRiskLevel: "low",
    lastReviewedBy: null,
    lastReviewedAt: null,
  },

  // Topic 4: Worker Label Is Not Configuration (NEW v0.5)
  {
    id: "worker-label-not-configuration",
    title: "Worker Label Is Not Configuration",
    status: "draft",
    topic: "Cost control",
    learningSummary:
      "Calling a worker 'cheap' does not control cost unless the actual model/provider is verified.",
    whyItMatters:
      "In multi-agent systems, budget control requires actual routing evidence: planned worker, actual model, expected cost, actual cost, and variance.",

    englishProfessionalDraft: `**The budget variance learning**

Evidence Inventory was planned as a cheap mechanical task. Worker labeled "เบ๊" (cheap/Flash). Expected cost: ~$0.05.

Actual execution: Hermes delegation inherited Sonnet from parent agent. Actual cost: ~$2.50-3.00.

Variance: 50x-300x over expected.

The task succeeded—52 evidence items classified correctly. But the routing intent didn't match actual execution.

**The lesson**

Worker label is not configuration. Budget control requires:
1. Confirm actual model/provider before delegation
2. Estimate cost range (not just intent)
3. Classify reasoning level: high/medium/low
4. Verify cheap worker is actually configured
5. Get approval if expected cost exceeds 2× budget

**Prevention rule established**

Before any delegation: preflight cost estimate + model verification. No more silent inheritance.`,

    thaiCasualDraft: `**การเรียนรู้เรื่อง budget variance**

Evidence Inventory วางแผนไว้ว่าเป็นงานถูก mechanical ง่าย ๆ ตั้งชื่อ worker ว่า "เบ๊" (ถูก/Flash) คาดหวัง ~$0.05

ความจริง: Hermes delegation สืบทอด Sonnet จาก parent agent ต้นทุนจริง ~$2.50-3.00

ส่วนต่าง: 50x-300x เกินคาด

งานสำเร็จ — classify evidence ได้ 52 items ถูกต้อง แต่ routing intent ไม่ตรงกับ execution จริง

**บทเรียน**

แค่ตั้งชื่อ worker ว่า "ถูก" ไม่ได้แปลว่าต้นทุนถูกจริง การควบคุม budget ต้องมี:
1. ยืนยันโมเดล/provider จริงก่อน delegate
2. ประมาณต้นทุนจริง (ไม่ใช่แค่ตั้งใจ)
3. classify reasoning level: สูง/กลาง/ต่ำ
4. ยืนยันว่า cheap worker config จริง
5. ขออนุมัติถ้าต้นทุนเกิน 2× ที่คาด

**Prevention rule ที่ตั้งไว้**

ก่อน delegate: preflight cost estimate + model verification ไม่มี silent inheritance อีกแล้ว`,

    linkedInAngle:
      "Multi-agent cost control: worker label ≠ configuration—verify routing, not just intent",
    thaiSocialAngle: "ควบคุมต้นทุน multi-agent: ชื่อ worker ≠ config จริง — ต้องยืนยัน routing",
    recommendedChannel: ["linkedin", "knowledge_sharing"],

    infographicPrompt: `Cost variance flow:
Planned: "เบ๊" cheap worker → expected Flash $0.05
Actual: inherited Sonnet → actual $2.50-3.00
Variance: 50x-300x
Prevention: preflight cost estimate + model verification

Visual metaphor: label vs. reality (price tag vs. actual receipt)
Color: expected (green) → actual (red) → prevention (blue)`,

    visualBrief:
      "Show planned vs. actual cost with visual metaphor of label (intent) vs. receipt (reality). Include prevention rule.",
    visualStatus: "draft_prompt",

    evidenceNote:
      "Budget routing variance documented (KB commit cebcc5c). Evidence Inventory delegation: planned Flash, actual Sonnet, 50x-300x variance.",
    sourceMaterial: [
      "Budget routing variance note (KB)",
      "Evidence Inventory delegation",
      "commit cebcc5c",
    ],
    publicSafeClaim: [
      "Worker label ≠ configuration",
      "Budget control requires actual routing verification",
      "Variance recorded and prevention rule established",
    ],
    needsCaveat: [
      "Personal AIOS learning, not enterprise tooling",
      "Task succeeded despite variance (quality unaffected)",
    ],
    doNotUse: [
      "Specific budget numbers ($0.05, $2.50) without context",
      "Frame as system failure (it's learning)",
    ],

    signalArchitectReview:
      "Excellent operational transparency. Shows learning from variance. Suitable for technical leadership positioning.",
    signalPublisherReview:
      "English professional, Thai casual tone achieved. 'ริน' not needed (technical content).",
    evidenceReviewerReview:
      "Public-safe as system learning. Do not expose sensitive budget totals. Frame as operational improvement, not cost failure.",

    publicRiskLevel: "low",
    lastReviewedBy: null,
    lastReviewedAt: null,
  },

  // Topic 5: Governance Enables Speed Safely (PRESERVED from v0.3)
  {
    id: "governance-enables-speed",
    title: "Governance Enables Speed Safely",
    status: "draft",
    topic: "Release discipline",
    learningSummary:
      "Good governance doesn't slow you down—it lets you move fast because you know what can break and what can't.",
    whyItMatters:
      "Most people think governance is bureaucracy. But good governance is automation + discipline that enables confident deployment.",

    englishProfessionalDraft: `**The governance paradox**

Most people think governance slows you down. More checks = slower releases, right?

Wrong.

Good governance does the opposite—it lets you move fast because you know exactly what's safe and what needs review.

**How it works**

AIOS Safe Publish Protocol v0.1.3 runs 8 automated gates before production:
1. Build validation
2. Regression checks (7 URLs must return 200)
3. File risk classification  
4. Forbidden file detection
5. Remote divergence check
6. Force-push prevention
7. Strategic content gate (triggers human approval)
8. Live verification

Most changes pass all 8 gates automatically in under 2 minutes. Strategic content stops at Gate 3 for human review.

**What we caught**

File pattern classifier validation caught a critical bug: pattern matching order was wrong (wildcards before specific patterns). 23/23 test cases now pass.

Without automated validation, that bug would have shipped to production.

**The takeaway**

Governance isn't bureaucracy when it's automated and intentional. It's insurance that lets you deploy confidently.`,

    thaiCasualDraft: `**Paradox ของ governance**

คนส่วนใหญ่คิดว่า governance ทำให้ช้า check เยอะ = release ช้า ใช่ไหม?

ผิด

Governance ที่ดีทำตรงกันข้าม — มันทำให้เราทำงานเร็วขึ้นได้ โดยไม่ต้องลดมาตรฐานความปลอดภัย เพราะเรารู้แน่ว่าอะไรปลอดภัย อะไรต้อง review

**ทำงานยังไง**

AIOS Safe Publish Protocol v0.1.3 มี 8 gates อัตโนมัติก่อนขึ้น production:
1. Build validation
2. Regression check (7 URLs ต้อง return 200)
3. File risk classification
4. Forbidden file detection
5. Remote divergence check
6. Force-push prevention
7. Strategic content gate (trigger human approval)
8. Live verification

งานส่วนใหญ่ผ่าน 8 gates อัตโนมัติใน 2 นาที Strategic content หยุดที่ Gate 3 เพื่อ human review

**อะไรที่เราจับได้**

File pattern classifier validation จับ bug ร้ายแรง: pattern matching order ผิด (wildcard ก่อน specific pattern) 23/23 test case ผ่านแล้วตอนนี้

ถ้าไม่มี automated validation bug นี้คงขึ้น production

**บทเรียน**

Governance ไม่ใช่ bureaucracy ถ้ามัน automated และตั้งใจ มันคือประกันที่ทำให้ deploy ได้อย่างมั่นใจ`,

    linkedInAngle:
      "Safe Publish Protocol: 8 automated gates that enable speed, not slow it down",
    thaiSocialAngle: "Safe Publish Protocol: 8 gates ที่ทำให้เร็วขึ้น ไม่ใช่ช้าลง",
    recommendedChannel: ["linkedin", "knowledge_sharing"],

    infographicPrompt: `8-gate release flow:
Build → Regression → File Risk → Forbidden → Divergence → Force-Push → Strategic → Live
Show: most changes auto-pass (green flow), strategic stops for review (yellow checkpoint)

Visual metaphor: assembly line with quality checkpoints
Color: green (pass) / yellow (strategic stop) / red (caught bug)`,

    visualBrief:
      "Show 8-gate release flow as intelligent assembly line with strategic checkpoint. Emphasize speed + safety.",
    visualStatus: "draft_prompt",

    evidenceNote:
      "Safe Publish Protocol v0.1.3 (commit 44079bf), Architecture Phase 1 (commit 511024c), file classifier 23/23 validation, 7/7 live routes verified.",
    sourceMaterial: [
      "Safe Publish Protocol v0.1.3",
      "commit 44079bf",
      "commit 511024c",
      "file classifier validation",
    ],
    publicSafeClaim: [
      "8 gates operational",
      "23/23 test cases pass",
      "7/7 live routes verified",
      "Bug caught pre-deploy",
    ],
    needsCaveat: ["Personal AIOS portfolio site, not enterprise platform"],
    doNotUse: ["Enterprise-scale claims", "Tool/product offering claims"],

    signalArchitectReview:
      "Strong governance maturity positioning. Suitable for senior engineering / release management roles.",
    signalPublisherReview: "English professional, Thai casual achieved.",
    evidenceReviewerReview:
      "Public-safe. All claims verifiable (commits, test results, live URLs).",

    publicRiskLevel: "low",
    lastReviewedBy: null,
    lastReviewedAt: null,
  },

  // Topic 6: Thin-Slice Delivery (PRESERVED from v0.3)
  {
    id: "thin-slice-delivery",
    title: "Thin-Slice Delivery Shows You Can Ship",
    status: "draft",
    topic: "Execution capability",
    learningSummary:
      "Big-bang releases are scary because you don't know what breaks until everything is live. Thin-slice delivery means you ship small, validate fast, and catch issues early.",
    whyItMatters:
      "Execution capability isn't just 'I can code.' It's 'I can break work into pieces, ship incrementally, and validate continuously.'",

    englishProfessionalDraft: `**Why thin-slice matters**

Big-bang releases are scary. You build everything, merge everything, deploy everything—and hope nothing breaks. When it does break, you don't know which piece caused it.

Thin-slice delivery flips this: ship small, validate fast, learn early.

**How AIOS Showcase was built**

4 staged iterations:
- Stage 2A: Skeleton pages (placeholder content only)
- Stage 2B: Populate AI Operating System + Org Roles
- Stage 2C: Populate How We Build + Achievement Learning  
- Stage 2D: Bridge navigation (kept old pages discoverable)

Each stage: clear scope, build passed, routes validated, traces documented.

**What we caught**

Navigation regression in Stage 2D: Architecture page disappeared briefly. Added must-preserve registry to prevent recurrence.

Because each stage was small, we caught it immediately and fixed it before it affected users.

**The takeaway**

Execution capability isn't just technical skill. It's the discipline to break work into pieces, ship incrementally, and validate continuously.`,

    thaiCasualDraft: `**ทำไม thin-slice สำคัญ**

Big-bang release น่ากลัว สร้างทุกอย่าง merge ทุกอย่าง deploy ทุกอย่าง — แล้วหวังว่าไม่มีอะไรพัง พอมันพังจริง ๆ ก็ไม่รู้ว่าชิ้นไหนทำให้พัง

Thin-slice delivery กลับด้าน: ship เล็ก ๆ validate เร็ว เรียนรู้ตั้งแต่แต่เนิ่น ๆ

**AIOS Showcase สร้างยังไง**

4 ช่วงแบบ staged:
- Stage 2A: Skeleton pages (placeholder อย่างเดียว)
- Stage 2B: ใส่เนื้อหา AI Operating System + Org Roles
- Stage 2C: ใส่เนื้อหา How We Build + Achievement Learning
- Stage 2D: เพิ่ม bridge navigation (เก็บ old pages ไว้ระหว่าง migration)

แต่ละ stage: scope ชัด, build ผ่าน, routes validate แล้ว, trace document แล้ว

**อะไรที่เราจับได้**

Navigation regression ใน Stage 2D: Architecture page หายไปชั่วคราว เพิ่ม must-preserve registry เพื่อป้องกันไม่ให้เกิดซ้ำ

เพราะแต่ละ stage เล็ก เราจับได้ทันที แก้ได้ก่อน user เจอ

**บทเรียน**

Execution capability ไม่ใช่แค่เทคนิค มันคือวินัยในการแบ่งงานเป็นชิ้นเล็ก ๆ ship ทีละขั้น validate ตลอดเวลา`,

    linkedInAngle:
      "Thin-slice delivery: ship small, validate fast, catch issues early",
    thaiSocialAngle: "Thin-slice delivery: ship เล็ก validate เร็ว จับปัญหาได้เนิ่น ๆ",
    recommendedChannel: ["linkedin", "knowledge_sharing"],

    infographicPrompt: `Two paths comparison:
LEFT: Big-bang (build all → merge all → deploy → BOOM → debug chaos)
RIGHT: Thin-slice (2A skeleton → 2B populate → 2C populate → 2D bridge → validate each)

Visual metaphor: monolith tower (risky) vs. building blocks (stable)
Color: red (big-bang risk) vs. green (incremental safety)`,

    visualBrief:
      "Show big-bang risk vs. thin-slice incremental delivery. Use building/construction metaphor.",
    visualStatus: "draft_prompt",

    evidenceNote:
      "AIOS Showcase Stages 2A-2D (commits c963b1f, 8e923e0, f9afebd, e81e89d), stage traces in docs/traces/, 7/7 live routes verified.",
    sourceMaterial: [
      "Stage traces",
      "commits c963b1f, 8e923e0, f9afebd, e81e89d",
      "live routes verification",
    ],
    publicSafeClaim: [
      "4 staged iterations completed",
      "Each stage validated incrementally",
      "Navigation regression caught and fixed",
    ],
    needsCaveat: ["Personal project scale, not enterprise deployment"],
    doNotUse: ["Enterprise CI/CD platform claims"],

    signalArchitectReview:
      "Good execution positioning. Shows discipline, not just coding skill.",
    signalPublisherReview: "English professional, Thai casual achieved.",
    evidenceReviewerReview:
      "Public-safe. Evidence verifiable (commits, traces, live URLs).",

    publicRiskLevel: "low",
    lastReviewedBy: null,
    lastReviewedAt: null,
  },

  // Topic 7: Learning from Incidents (PRESERVED from v0.3)
  {
    id: "learning-from-incidents",
    title: "Learning from Incidents Makes Systems Better",
    status: "draft",
    topic: "Operational maturity",
    learningSummary:
      "Operational maturity isn't zero incidents. It's how fast you learn from them and prevent repeats.",
    whyItMatters:
      "Most portfolios only show wins. Showing how you respond to problems is more telling than perfect execution.",

    englishProfessionalDraft: `**Why share incidents?**

Most portfolios only show perfect execution. Everything worked. No problems. All green.

That's not real.

Real operational maturity is how you respond when things break—how fast you debug, how you prevent recurrence, how you turn problems into systems.

**What broke**

Two incidents on May 24-25:
1. OAuth sign-out bug: users couldn't sign out due to stale environment variables
2. Navigation regression: Architecture page disappeared briefly during navigation redesign

**How we responded**

OAuth bug:
- Complete debug report (root cause: env vars loaded at build time, not runtime)
- Solution: dynamic loading
- Prevention: environment variable loading pattern documented

Navigation regression:
- Must-preserve registry created (list of pages that must never disappear)
- 5-layer governance framework (Memory → Checklist → Source-of-truth → Automated → Human)
- Prevention: registry check added to navigation changes

**The takeaway**

Incidents aren't failures if you turn them into systems. OAuth bug → debug report. Navigation regression → governance framework. Both problems now have prevention mechanisms.`,

    thaiCasualDraft: `**ทำไมแชร์เรื่อง incident**

Portfolio ส่วนใหญ่โชว์แต่ perfect execution ทุกอย่างเวิร์ค ไม่มีปัญหา เขียวหมด

นั่นไม่ใช่ความจริง

Operational maturity จริง ๆ คือยังไงตอนของพัง — debug ได้เร็วแค่ไหน ป้องกันซ้ำยังไง เปลี่ยนปัญหาเป็นระบบได้ยังไง

**อะไรพัง**

Incident 2 เรื่องวันที่ 24-25 พค:
1. OAuth sign-out bug: user sign out ไม่ได้เพราะ env vars ค้าง
2. Navigation regression: Architecture page หายไปชั่วคราวตอน redesign navigation

**ริน respond ยังไง**

OAuth bug:
- เขียน debug report เต็มรูปแบบ (root cause: env vars โหลดตอน build ไม่ใช่ runtime)
- Solution: dynamic loading
- Prevention: document environment variable loading pattern

Navigation regression:
- สร้าง must-preserve registry (list หน้าที่ต้องไม่หาย)
- 5-layer governance framework (Memory → Checklist → Source-of-truth → Automated → Human)
- Prevention: เพิ่ม registry check ตอนเปลี่ยน navigation

**บทเรียน**

Incident ไม่ใช่ failure ถ้าเปลี่ยนมันเป็นระบบ OAuth bug → debug report Navigation regression → governance framework ทั้ง 2 ปัญหามี prevention mechanism แล้วตอนนี้`,

    linkedInAngle:
      "Operational maturity: turn incidents into prevention systems",
    thaiSocialAngle: "Operational maturity: เปลี่ยน incident เป็นระบบป้องกัน",
    recommendedChannel: ["knowledge_sharing"],

    infographicPrompt: `Incident response flow:
Problem → Root Cause → Solution → Prevention Mechanism → System Improvement

Show two examples:
1. OAuth bug → debug report → dynamic loading → pattern documented
2. Navigation regression → must-preserve registry → 5-layer framework

Visual metaphor: problem → learning loop → system evolution
Color: red (problem) → yellow (analysis) → green (prevention)`,

    visualBrief:
      "Show incident response as learning loop, not failure. Emphasize problem → prevention → system improvement.",
    visualStatus: "draft_prompt",

    evidenceNote:
      "OAuth debug report (commit f406485), Navigation regression retrospective (KB), 5-layer governance (commit 470b446), must-preserve registry (docs/governance/).",
    sourceMaterial: [
      "OAuth debug report",
      "commit f406485",
      "Navigation regression retrospective",
      "commit 470b446",
      "must-preserve registry",
    ],
    publicSafeClaim: [
      "2 incidents documented with root cause",
      "Prevention mechanisms created",
      "Governance framework established",
    ],
    needsCaveat: [
      "Frame as operational learning, not failure post-mortem",
      "Emphasize prevention mechanism, not just 'things broke'",
    ],
    doNotUse: ["Frame as failure or incompetence", "Blame external factors"],

    signalArchitectReview:
      "Strong operational transparency. Shows maturity through problem response.",
    signalPublisherReview: "English professional, Thai casual achieved.",
    evidenceReviewerReview:
      "Public-safe if framed as learning. Do not frame as failure—emphasize prevention systems created.",

    publicRiskLevel: "medium",
    lastReviewedBy: null,
    lastReviewedAt: null,
  },
];
