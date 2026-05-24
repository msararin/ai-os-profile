# sararin.ai

[![Deployment Preflight](https://github.com/msararin/ai-os-profile/actions/workflows/deployment-preflight.yml/badge.svg)](https://github.com/msararin/ai-os-profile/actions/workflows/deployment-preflight.yml)

**Sararin Muangsiri's AI/Data Transformation Governance Portfolio**

Personal professional portfolio showcasing AI governance capabilities, anonymized case studies, and applied AI workflow experiments.

> I create structure where transformation is messy.

This is a [Next.js](https://nextjs.org) project built with modern tooling and employer-safe positioning.

---

## 🎯 What This Is

- Personal AI/Data Transformation Governance Portfolio
- 5-pillar career evidence (data reliability → banking → cloud → lending → AI)
- Anonymized case studies with governance patterns
- Applied AI workflow experiments

**This is not a consulting storefront, not a startup pitch, and not a public dump of internal systems.**

---

## 🎨 Design System

**Color Palette (สีมงคลวันศุกร์):**
- Primary: Classic Blue `#1F3A60` (trust, governance, professional)
- Accent: Mint Teal `#00B494` (innovation, สีมงคลการเงิน/โอกาส)
- Secondary: Pastel Blue `#E6EEF8` (clarity, accessibility)

See `docs/DESIGN_SYSTEM.md` for full specifications.

---

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** Radix UI + Tailwind CSS 4
- **Auth:** NextAuth.js 5 (Google OAuth)
- **Database:** Better SQLite3 (internal only)
- **Deployment:** Vercel
- **Domain:** `sararin.ai` (~$160 for 2 years, .ai registry requirement)

---

## 📂 Project Structure

```
/app
  /                    → Homepage (employer-safe positioning)
  /about              → 5-pillar career story
  /portfolio          → Anonymized case studies
  /knowledge-sharing  → LinkedIn posts / thought leadership
  /architecture       → AIOS architecture visualization
  /internal/*         → Auth-protected (NOT advertised publicly)

/docs
  DESIGN_SYSTEM.md    → Color palette, typography, components
  *.md                → Technical specs
```

---

## 🔒 Privacy Boundaries

**Public (no auth):**
- Homepage, About, Portfolio, Writing
- Anonymized case studies (no client names)
- Governance patterns and principles

**Internal (auth-protected, NOT in public nav):**
- `/internal/dashboard` → Operational cockpit
- `/internal/usage` → Budget tracking
- `/internal/*` → Model routing, KB explorer, benchmarks

**Never rendered:**
- API keys, OAuth secrets, tokens
- Private notes (health, legal, financial)
- Client-specific details, vendor names
- Raw logs, cost traces with vendor exposure

---

## 💻 Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 🎓 Client-Safe Language

**Use:**
- "one of Thailand's largest banks"
- "a major Thai bank"
- "a regulated banking environment"
- "a regional financial services transformation"

**Avoid:**
- Exact bank names, vendor names
- Internal project names from client work
- Contract values, architecture diagrams from client environments

---

## 📋 Recent Updates

**2026-05-24 (sararin-portfolio branch):**
- ✅ Employer-safe homepage positioning
- ✅ สีมงคลวันศุกร์ design system applied
- ✅ `/about` page with 5-pillar career story
- ✅ `/portfolio` page with anonymized case studies
- ✅ Robert's positioning critique integrated
- ✅ NextAuth.js foundation (auth layer)

**2026-05-23:**
- ✅ KB → RAG Foundation Phase 1 complete
- ✅ CI/CD feedback: 9 improvements identified
- ✅ Benchmark reconciliation contract proved functional

---

## 🚢 Deployment

This project deploys to Vercel automatically on push to `main`.

**Environment Variables Required:**
```bash
# Google OAuth (for /internal/* auth)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# NextAuth
NEXTAUTH_URL=https://sararin.ai
NEXTAUTH_SECRET=... (generate with: openssl rand -base64 32)

# Email allowlist
INTERNAL_ALLOWED_EMAILS=msararin@gmail.com
```

---

## 📖 Documentation

- [Design System](./docs/DESIGN_SYSTEM.md) - Color palette, typography, components
- [Technical Architecture](./docs/sararin-labs-technical-architecture.md) - 3-tier auth model
- [Robert's Review](./ROBERT_REVIEW_ACTIONS.md) - Positioning critique & actions

---

## 🎯 Positioning

**Main Identity:** `sararin.ai` (personal AI/Data Transformation portfolio)

**Not:** Sararin Labs (sounds like startup/consulting/side business)

**Structure:**
```
sararin.ai → Main personal portfolio
  ↳ Applied AI Governance Lab (subsection, not whole identity)

Nova Orbit Labs → Separate company/lab identity (use carefully)
```

---

## 📝 License

This is a personal portfolio project. Content and design © 2026 Sararin Muangsiri.

---

**Domain:** sararin.ai (registered)  
**Status:** Active development on `sararin-portfolio` branch  
**Target:** Senior AI/Data Transformation Governance roles
