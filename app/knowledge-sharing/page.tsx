import { PageLayout } from "@/components/page-layout"

export default function KnowledgeSharingPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Knowledge Sharing</h1>
          <p className="text-muted-foreground text-lg">
            Draft content surface — insights and learnings from building an AI Operating System at personal scale
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            ✏️ Draft mode: Content below is editable/copyable for LinkedIn, blog posts, or portfolio use
          </p>
        </div>

        {/* Knowledge Item 1: Governance Maturity */}
        <section className="mb-12 border-b pb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-semibold">1. Governance Enables Speed Safely</h2>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
              Public-Safe
            </span>
          </div>

          {/* English Version */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              🇬🇧 English
            </h3>
            <div className="bg-muted/30 p-4 rounded-lg space-y-3 text-sm">
              <p>
                <strong>What I built:</strong> Safe Publish Protocol v0.1.3 — an 8-gate release
                governance system for my personal AI Operating System portfolio site.
              </p>
              <p>
                <strong>Why it matters:</strong> Most people think governance slows you down. But
                good governance does the opposite — it lets you move fast because you know what
                can break and what can't.
              </p>
              <p>
                <strong>How it works:</strong> Before any production push, 8 automated gates run:
                build validation, regression checks (7 URLs must return 200), file risk
                classification, forbidden file detection, remote divergence check, force-push
                prevention, and live verification. Strategic content (like architecture pages)
                triggers a human approval gate.
              </p>
              <p>
                <strong>What I learned:</strong> The file pattern classifier caught a critical bug
                during validation — pattern matching order was wrong (wildcards before specific
                patterns). 23/23 test cases now pass. If I didn't have automated validation, that
                bug would have shipped to production.
              </p>
              <p>
                <strong>The takeaway:</strong> Governance isn't bureaucracy when it's automated and
                intentional. It's insurance that lets you deploy confidently.
              </p>
            </div>
          </div>

          {/* Thai Version */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">🇹🇭 ไทย</h3>
            <div className="bg-muted/30 p-4 rounded-lg space-y-3 text-sm">
              <p>
                <strong>สิ่งที่สร้าง:</strong> Safe Publish Protocol v0.1.3 — ระบบ governance
                แบบ 8 gates สำหรับเว็บ portfolio AI Operating System ของฉัน
              </p>
              <p>
                <strong>ทำไมสำคัญ:</strong>{" "}
                คนส่วนใหญ่คิดว่า governance ทำให้ช้า แต่ governance ที่ดีทำตรงกันข้าม — มันทำให้เราเร็วได้
                เพราะเรารู้ว่าอะไรพังได้ อะไรปลอดภัย
              </p>
              <p>
                <strong>ทำงานยังไง:</strong> ก่อน push ขึ้น production ทุกครั้ง มี 8 gates
                อัตโนมัติตรวจสอบ: build validation, regression check (7 URLs ต้องได้ 200), file risk
                classification, forbidden file detection, remote divergence check, force-push
                prevention, live verification และถ้าเป็น strategic content (เช่น architecture page)
                จะต้องผ่าน human approval gate ด้วย
              </p>
              <p>
                <strong>สิ่งที่เรียนรู้:</strong> File pattern classifier จับ bug ร้ายแรงได้ตอน
                validation — pattern matching order ผิด (wildcard ก่อน specific pattern) ตอนนี้ผ่าน
                23/23 test cases แล้ว ถ้าไม่มี automated validation bug นี้คงขึ้น production
              </p>
              <p>
                <strong>บทเรียน:</strong> Governance ไม่ใช่ bureaucracy ถ้ามัน automated และตั้งใจ —
                มันคือประกันที่ทำให้ deploy ได้อย่างมั่นใจ
              </p>
            </div>
          </div>

          {/* Evidence Links */}
          <div className="mt-4 p-3 bg-blue-50 rounded text-xs">
            <strong>Evidence:</strong> Commit 44079bf (Safe Publish milestone), Commit 511024c
            (Architecture Phase 1 published), File classifier validation (23/23 pass), Live site
            verification (7/7 URLs return 200)
          </div>
        </section>

        {/* Knowledge Item 2: Execution Evidence */}
        <section className="mb-12 border-b pb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-semibold">
              2. Thin-Slice Delivery Shows You Can Ship
            </h2>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
              Public-Safe
            </span>
          </div>

          {/* English Version */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              🇬🇧 English
            </h3>
            <div className="bg-muted/30 p-4 rounded-lg space-y-3 text-sm">
              <p>
                <strong>What I built:</strong> AIOS Showcase pages delivered in 4 staged
                iterations (2A: skeleton → 2B: populate AI Operating System → 2C: populate How We
                Build → 2D: bridge navigation). All live at{" "}
                <a
                  href="https://sararin.ai"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  sararin.ai
                </a>
                .
              </p>
              <p>
                <strong>Why thin-slice matters:</strong> Big-bang releases are scary because you
                don't know what breaks until everything is live. Thin-slice delivery means you ship
                small, validate fast, and catch issues early.
              </p>
              <p>
                <strong>How it worked:</strong> Each stage had a clear scope: Stage 2A created
                skeleton pages (placeholder content only). Stage 2B migrated Architecture + Org
                Roles content. Stage 2C migrated Principles + Achievement Learning content. Stage
                2D added bridge navigation (kept old pages discoverable during migration).
              </p>
              <p>
                <strong>What I learned:</strong> Every stage had a trace file documenting scope,
                execution, and validation. Build passed at every step. When a navigation regression
                happened (Architecture page disappeared briefly), I added a must-preserve registry
                to prevent it from happening again.
              </p>
              <p>
                <strong>The takeaway:</strong> Execution capability isn't just "I can code." It's
                "I can break work into pieces, ship incrementally, and validate continuously."
              </p>
            </div>
          </div>

          {/* Thai Version */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">🇹🇭 ไทย</h3>
            <div className="bg-muted/30 p-4 rounded-lg space-y-3 text-sm">
              <p>
                <strong>สิ่งที่สร้าง:</strong> หน้า AIOS Showcase ส่งมอบใน 4 ช่วง (2A: สร้าง
                skeleton → 2B: ใส่เนื้อหา AI Operating System → 2C: ใส่เนื้อหา How We Build → 2D:
                เพิ่ม bridge navigation) ดูได้ที่{" "}
                <a
                  href="https://sararin.ai"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  sararin.ai
                </a>
              </p>
              <p>
                <strong>ทำไม thin-slice สำคัญ:</strong> Big-bang release น่ากลัว
                เพราะไม่รู้ว่าอะไรพังจนกว่าทุกอย่างขึ้นจริง Thin-slice delivery
                แปลว่าเราส่งมอบทีละน้อย validate เร็ว จับปัญหาได้ตั้งแต่แต่เนิ่น ๆ
              </p>
              <p>
                <strong>ทำงานยังไง:</strong> แต่ละ stage มี scope ชัด: Stage 2A สร้าง skeleton pages
                (placeholder อย่างเดียว) Stage 2B ย้ายเนื้อหา Architecture + Org Roles Stage 2C
                ย้ายเนื้อหา Principles + Achievement Learning Stage 2D เพิ่ม bridge navigation (เก็บ
                old pages ไว้ระหว่าง migration)
              </p>
              <p>
                <strong>สิ่งที่เรียนรู้:</strong> ทุก stage มี trace file บันทึก scope, execution,
                validation Build ผ่านทุก step เวลามี navigation regression (Architecture หายไปชั่วคราว)
                ฉันเพิ่ม must-preserve registry เพื่อป้องกันไม่ให้เกิดซ้ำ
              </p>
              <p>
                <strong>บทเรียน:</strong> Execution capability ไม่ใช่แค่ "โค้ดเป็น" แต่คือ
                "แบ่งงานเป็นชิ้นเล็ก ๆ ส่งมอบทีละขั้น validate ตลอดเวลา"
              </p>
            </div>
          </div>

          {/* Evidence Links */}
          <div className="mt-4 p-3 bg-blue-50 rounded text-xs">
            <strong>Evidence:</strong> Commits c963b1f (Stage 2A), 8e923e0 (Stage 2B), f9afebd
            (Stage 2C), e81e89d (Stage 2D), Stage traces in docs/traces/, Live pages (7 URLs, all
            200 OK)
          </div>
        </section>

        {/* Knowledge Item 3: Operational Learning */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-semibold">
              3. Learning from Incidents Makes Systems Better
            </h2>
            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
              Needs Context
            </span>
          </div>

          {/* English Version */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              🇬🇧 English
            </h3>
            <div className="bg-muted/30 p-4 rounded-lg space-y-3 text-sm">
              <p>
                <strong>What happened:</strong> Two incidents on May 24-25: (1) OAuth sign-out bug
                — users couldn't sign out due to stale environment variables, (2) Navigation
                regression — Architecture page disappeared briefly when navigation was redesigned
                without a must-preserve check.
              </p>
              <p>
                <strong>Why I'm sharing this:</strong> Most portfolios only show wins. I'm showing
                how I respond to problems — because problem response is more telling than perfect
                execution.
              </p>
              <p>
                <strong>How I debugged:</strong> OAuth bug: Wrote a complete debug report (root
                cause: env vars loaded at build time, not runtime → solution: dynamic loading).
                Navigation regression: Added a must-preserve registry (list of pages that must
                never disappear) and a 5-layer governance framework (Memory → Checklist →
                Source-of-truth → Automated → Human).
              </p>
              <p>
                <strong>What I learned:</strong> Incidents aren't failures if you turn them into
                systems. OAuth bug became a debug report. Navigation regression became a governance
                framework. Both problems now have prevention mechanisms.
              </p>
              <p>
                <strong>The takeaway:</strong> Operational maturity isn't zero incidents. It's how
                fast you learn from them and prevent repeats.
              </p>
            </div>
          </div>

          {/* Thai Version */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">🇹🇭 ไทย</h3>
            <div className="bg-muted/30 p-4 rounded-lg space-y-3 text-sm">
              <p>
                <strong>เกิดอะไรขึ้น:</strong> Incident 2 เรื่องวันที่ 24-25 พค: (1) OAuth sign-out
                bug — user sign out ไม่ได้เพราะ env vars ค้าง (2) Navigation regression —
                Architecture page หายไปชั่วคราวเพราะ navigation redesign โดยไม่มี must-preserve
                check
              </p>
              <p>
                <strong>ทำไมแชร์เรื่องนี้:</strong> Portfolio ส่วนใหญ่โชว์แต่ success
                ฉันโชว์วิธีแก้ปัญหาด้วย — เพราะวิธีแก้ปัญหาบอกอะไรได้มากกว่า perfect execution
              </p>
              <p>
                <strong>Debug ยังไง:</strong> OAuth bug: เขียน debug report เต็มรูปแบบ (root cause: env
                vars โหลดตอน build ไม่ใช่ runtime → solution: dynamic loading) Navigation
                regression: เพิ่ม must-preserve registry (list หน้าที่ต้องไม่หาย) และ 5-layer
                governance framework (Memory → Checklist → Source-of-truth → Automated → Human)
              </p>
              <p>
                <strong>สิ่งที่เรียนรู้:</strong> Incident ไม่ใช่ failure
                ถ้าเราเปลี่ยนมันเป็นระบบป้องกัน OAuth bug กลายเป็น debug report Navigation
                regression กลายเป็น governance framework ทั้ง 2 ปัญหาตอนนี้มี prevention mechanism
                แล้ว
              </p>
              <p>
                <strong>บทเรียน:</strong> Operational maturity ไม่ใช่ zero incident แต่คือความเร็วที่เรา
                learn จาก incident และป้องกันไม่ให้เกิดซ้ำ
              </p>
            </div>
          </div>

          {/* Evidence Links */}
          <div className="mt-4 p-3 bg-blue-50 rounded text-xs">
            <strong>Evidence:</strong> OAuth debug report (commit f406485), Navigation regression
            retrospective (KB), 5-layer governance framework (commit 470b446), Must-preserve
            registry (docs/governance/must-preserve-registry.md)
          </div>

          {/* Caveat */}
          <div className="mt-4 p-3 bg-yellow-50 rounded text-xs">
            <strong>Context needed:</strong> Frame as "operational learning moment" (not failure
            post-mortem). Emphasize: problem → root cause → prevention mechanism (not just
            "things broke").
          </div>
        </section>

        {/* Usage Note */}
        <div className="mt-12 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
          <p className="font-medium mb-2">📋 How to use this content:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Copy/paste sections for LinkedIn posts or blog articles</li>
            <li>Use English or Thai versions as-is, or adapt tone/length</li>
            <li>Evidence links are verifiable (git commits, live URLs, documentation)</li>
            <li>
              &quot;Public-Safe&quot; items: Use without additional caveats
            </li>
            <li>
              &quot;Needs Context&quot; items: Add framing before publishing (e.g., "learning
              moment" not "failure")
            </li>
            <li>Do NOT use: Internal metrics (1,400×, 2.3×, 653%, $1.36) without benchmarks</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
}
