# IVORYCLAUSE — Master Reference Doc
> Drop this file in the root of your GitHub repo. Share it at the start of any new session.

---

## THE BUSINESS
- **Site:** ivoryclause.com
- **Tagline:** PROTECT YOUR ART.
- **Sub-brand:** Contract Studio
- **Price:** $19.99 one-time
- **Language rule:** Always "Build Your Contract" — NEVER "Download a Template"
- **Phase 1 goal:** 50 paying customers before building anything else
- **Phase 2 (DO NOT BUILD YET):** "Project Studio" subscription ~$49+/month

---

## INFRASTRUCTURE
| Service | Detail |
|---|---|
| Domain | ivoryclause.com — Namecheap, nameservers → Netlify |
| Hosting | Netlify — project: silver-granita-1a1362, connected via GitHub |
| Repo | github.com/brynmurray3/IvoryClause |
| Email | ivoryclause@gmail.com |
| Stripe | Live, sole proprietor, descriptor: IVORYCLAUSE, non-recurring |
| Resend | Verified. API key in Netlify env vars. Sends from hello@ivoryclause.com |
| Browserless | API key in Netlify env vars (PDF generation) |
| Instagram | @ivoryclauseco |
| Attorney | Zubin Kapadia, Esq. (Kapstone Law) — $200 fixed fee, all 9 contracts reviewed |

---

## DESIGN SYSTEM — FULLY LOCKED, NON-NEGOTIABLE

### Colors
| Token | Hex | Usage |
|---|---|---|
| Cream | `#f5f0e8` | Background — everywhere, always |
| Red | `#e8000d` | Accent — headlines, CTAs, highlights |
| Black | `#1a1a1a` | ALL body text, wordmark |
| ❌ Grey | — | NEVER used on any readable text |
| ❌ Orange | `#ff4500` | REPLACED by red — scrub if found |

> **Dark mode: forced OFF everywhere** — `color-scheme: light only`

### Fonts
| Font | Usage |
|---|---|
| MeshedDisplay-MediumSlanted (woff2 in repo root) | Wordmark + all headlines |
| Inter | Everything else — body, nav, labels, inputs |
| ❌ Never use | Tan Ashford, DM Serif Display, Parabolica, Radiora, Modern Prestige, any DaFont |

### Sizing
- Wordmark sticky nav: `clamp(1.6rem, 3vw, 2.2rem)`
- Hero headline: `clamp(3rem, 6vw, 6.5rem)`
- Step title in wizard: `clamp(2rem, 4vw, 3rem)`

### Rules
- Wordmark always wins hierarchy — larger than hero headline
- IVORYCLAUSE wordmark = black (`#1a1a1a`)
- PROTECT YOUR ART. = red (`#e8000d`)
- Zero grey on any readable text — ever

---

## FILE STRUCTURE
```
/
├── index.html              ← currently the coming soon page (swap at launch)
├── coming-soon.html        ← waitlist signup page
├── success.html            ← post-payment confirmation
├── style.css               ← MASTER stylesheet — all pages link here
├── MeshedDisplay-MediumSlanted.woff2
├── photographer-contract.html
├── [other 8 contract HTML files]
├── netlify/
│   └── functions/
│       ├── create-checkout.js   ← Stripe payment
│       ├── fulfillment.js       ← PDF generation + email delivery
│       └── notify.js            ← Waitlist signup email
└── IVORYCLAUSE_REFERENCE.md ← THIS FILE
```

---

## THE 9 CONTRACTS (all attorney-reviewed by Zubin Kapadia)
1. Photographer
2. Florist
3. Hair & Makeup
4. DJ
5. Wedding Planner
6. Venue
7. Caterer
8. Officiant
9. Videographer

**Platform disclaimer on every contract:**
> "This contract was generated via IvoryClause (ivoryclause.com). IvoryClause is a document generation platform and is not a party to this Agreement. IvoryClause does not provide legal advice, does not represent either party, and is not responsible for the enforcement, validity, or outcome of any agreement entered into using this template."

---

## KNOWN ISSUES & FIXES

### 🔴 Email background color not rendering
**Problem:** Email clients (Gmail, Apple Mail) ignore CSS `background-color` on `<div>` elements — email always shows dark grey instead of cream.

**Fix:** Always use full `<table>` structure with BOTH `bgcolor` attribute AND inline `style` on every `<td>`:
```html
<td bgcolor="#f5f0e8" style="background-color:#f5f0e8;">
```
Never use `<div>` for email layout. Also add to `<body>`:
```html
<body style="margin:0; padding:0; background-color:#f5f0e8;">
```
And in `<head>`:
```html
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
```

### 🔴 Orange `#ff4500` showing up instead of red `#e8000d`
**Problem:** Old orange is hardcoded in some files and overrides the stylesheet.

**Fix:** Search entire project for `ff4500` and replace all with `e8000d`. Check especially:
- `fulfillment.js` (the PDF template has inline styles)
- Any HTML file with hardcoded `style="color:#ff4500"`
- `notify.js` email HTML

### 🔴 JS/function files corrupted when copy-pasting from Claude
**Problem:** Markdown backtick fences get embedded in the file and break syntax.

**Fix:** Always use the **download button** on Claude's file output — never copy-paste code from the chat window into your editor.

### 🔴 `rgba()` colors not rendering in email
**Problem:** Email clients don't support `rgba()` values.

**Fix:** Use solid hex equivalents. Examples:
- `rgba(26,26,26,0.4)` → `#9e9890`
- `rgba(26,26,26,0.12)` → `#d9d4cc`

---

## SUCCESS PAGE STICKY MESSAGING
Per product decisions — these lines must appear on `success.html`:
- **"Bookmark ivoryclause.com — every new client needs a new contract."**
- **"Contract archive and account dashboard coming soon."**

---

## NETLIFY ENV VARS REQUIRED
```
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
RESEND_API_KEY
BROWSERLESS_API_KEY
```

---

## TRADEMARK
- USPTO filing in progress — IvoryClause
- Working with Zubin at Kapstone Law on legal review

---

*Last updated: March 2026*

### 🔴 Email going to spam after HTML changes
**Problem:** Adding `<!DOCTYPE html>`, `<head>`, and `<meta>` tags to email HTML triggers spam filters.

**Fix:** Keep email HTML as a bare table only — no doctype, no head, no meta tags. Start directly with the outer `<table>` element. Resend wraps it appropriately on their end.
