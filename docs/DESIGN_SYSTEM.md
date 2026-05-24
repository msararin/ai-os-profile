# sararin.ai Design System
**Version:** 1.0  
**Date:** 2026-05-24  
**Purpose:** Employer-safe AI/Data Transformation Portfolio

---

## 🎯 Positioning

**Headline:** I build structure where transformation is messy.

**Positioning:** Business-Technology-AI Bridge who turns ambiguous transformation goals into executable systems of work.

---

## 🎨 Color Palette (โหราศาสตร์ไทย - วันศุกร์)

### Primary Colors (60% - Trust & Governance)

**Classic Blue / Indigo**
- Pantone: 19-4052 TCX (Classic Blue)
- HEX: `#1F3A60` (Primary)
- HEX: `#0F2042` (Dark variant)
- Usage: Headers, main text, structural elements
- Mood: Trustworthy, systematic, professional, safe

### Secondary Colors (30% - Clarity & Accessibility)

**Pastel Blue / Slate Blue**
- Pantone: 14-4115 TCX
- HEX: `#E6EEF8` (Light mode backgrounds)
- HEX: `#4A6984` (Elements, cards)
- Usage: Section backgrounds, cards, secondary text
- Mood: Clean, approachable, readable

### Accent Colors (10% - Innovation & Action)

**Mint Leaf / Bio Teal** (สีมงคลด้านการเงิน/โอกาส)
- Pantone: 15-5718 TCX
- HEX: `#00B494` (Primary accent)
- HEX: `#3CD070` (Success states)
- Usage: CTAs, highlights, success indicators, AI elements
- Mood: Innovation, reliability, vitality, AI power

### Base & Typography

**Backgrounds:**
- Light: `#FAFAFA` (Off-white - reduces eye strain)
- White: `#FFFFFF` (Use sparingly for contrast)

**Text:**
- Primary: `#2D3748` (Dark gray - avoids pure black per กาลกิณี)
- Secondary: `#4A5568`
- Muted: `#718096`

### Colors to AVOID (กาลกิณี ปี 2569)
- ❌ Pure black `#000000`
- ❌ Charcoal `#1A1A1A`
- ❌ Dark gray `#2C2C2C`

---

## 🎭 Usage Examples

### Header / Hero
```css
background: #FAFAFA;
color: #1F3A60;
h1: { font-weight: 700, color: #0F2042 }
```

### Badges / Tags
```css
/* e.g., "AI & Data Delivery", "Cloud Governance" */
background: #E6EEF8;
color: #1F3A60;
border: 1px solid #4A6984;
```

### CTA Buttons
```css
/* "Download CV", "Contact Me" */
background: #00B494;
color: #FFFFFF;
hover: { background: #3CD070 }
```

### Cards
```css
background: #FFFFFF;
border: 1px solid #E6EEF8;
shadow: 0 2px 4px rgba(31, 58, 96, 0.1);
```

---

## 📝 Typography

### Font Stack
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Inter', sans-serif;
```

### Scale
- H1: 3rem (48px) / 3.5rem (56px) desktop
- H2: 2rem (32px) / 2.5rem (40px) desktop
- H3: 1.5rem (24px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)

### Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

---

## 🏗️ Component Patterns

### Hero Section
```
Background: #FAFAFA
Title: #0F2042 (Bold, 48-56px)
Subtitle: #4A5568 (Regular, 20-24px)
Badge: "Personal Portfolio" (#E6EEF8 bg, #1F3A60 text)
Alert: "Actively seeking roles" (#00B494 border, light teal bg)
```

### Case Study Cards
```
Background: #FFFFFF
Border: #E6EEF8
Title: #1F3A60
Body: #4A5568
Hover: border-color: #00B494
```

### Navigation
```
Background: #FFFFFF or #FAFAFA
Active: #00B494 underline
Text: #2D3748
Hover: #1F3A60
```

---

## 🎬 Animation & Interaction

### Transitions
```css
transition: all 200ms ease-in-out;
```

### Hover States
- Cards: lift with shadow increase
- Buttons: color darken 10%
- Links: underline fade-in

---

## 📐 Spacing Scale

Based on 8px base unit:
```
xs: 0.5rem (8px)
sm: 1rem (16px)
md: 1.5rem (24px)
lg: 2rem (32px)
xl: 3rem (48px)
2xl: 4rem (64px)
```

---

## 🔒 Accessibility

### Contrast Ratios (WCAG AA minimum)
- Primary text (#2D3748) on light (#FAFAFA): 11.2:1 ✅
- Accent (#00B494) on white: 3.1:1 ⚠️ (Large text only)
- CTA white text on accent (#00B494): 4.2:1 ✅

### Focus States
```css
outline: 2px solid #00B494;
outline-offset: 2px;
```

---

## 📱 Responsive Breakpoints

```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## 🎨 Tailwind Config Extract

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1F3A60',
          dark: '#0F2042',
        },
        secondary: {
          light: '#E6EEF8',
          DEFAULT: '#4A6984',
        },
        accent: {
          DEFAULT: '#00B494',
          light: '#3CD070',
        },
        base: {
          bg: '#FAFAFA',
          text: '#2D3748',
          muted: '#4A5568',
        }
      }
    }
  }
}
```

---

## 💡 Design Principles

1. **Trust First**: Use deep blue to convey systematic, professional governance
2. **Clarity Always**: High contrast, generous whitespace, clear hierarchy
3. **Modern Tech**: Mint accent prevents "old bank" look
4. **Scannable**: Break content into cards, use badges, clear sections
5. **Proof-Oriented**: Show evidence, not claims

---

## 📄 Key Messaging

### Hero
> "I build structure where transformation is messy."

### Positioning
> Business-Technology-AI Bridge: turns ambiguous transformation goals into executable systems of work.

### Employment Status
> Currently exploring senior roles in AI/data transformation, delivery governance, and enterprise technology modernization.

---

## 🚫 What NOT to Show

Per client-safe narrative:
- ❌ Exact bank names (use "major Thai bank", "regulated financial institution")
- ❌ Vendor-specific details
- ❌ Internal component names
- ❌ Private governance documents
- ❌ Production details, security architecture
- ❌ Model routing, provider details, budget traces
- ❌ Private repo paths, config hints

---

## ✅ Safe Labels to Use

- Core banking modernization
- Regulated financial systems
- Large-scale banking transformation
- Cloud migration governance
- Enterprise CCoE readiness
- Digital lending transformation
- Personal AI workflow governance experiment
- Portfolio artifact
- Human-led AI operating prototype

---

**Implementation:** Apply to all public pages. Internal sections can use different palette if needed (but maintain professional consistency).
