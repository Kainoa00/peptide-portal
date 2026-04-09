# CLAUDE.md — Peptide Portal

> This file is the canonical context document for AI-assisted development on Peptide Portal.
> Read this before generating any code, features, or architecture decisions.

---

## Product Overview

**Peptide Portal** is a full-stack direct-to-consumer telehealth platform that enables patients to get physician-prescribed peptide protocols without in-person visits. Modeled after the Hims/Hers vertical telehealth stack, it delivers a thin-slice end-to-end experience: patient intake → async physician review → compounding pharmacy fulfillment → monthly subscription billing.

The MVP covers the core loop: a patient completes a 7-step health assessment quiz, receives an AI-matched protocol recommendation, pays via Stripe, and a provider reviews the intake and issues a prescription. The patient can then track their order and message their provider from a personal dashboard.

**Live URL:** https://peptide-portal.vercel.app
**GitHub:** https://github.com/Kainoa00/peptide-portal

---

## Job to Be Done (JTBD)

> "When I want access to physician-supervised peptide therapy, help me get a legitimate prescription and ongoing care without the friction of an in-person clinic visit or the risk of unregulated online purchasing."

Secondary JTBD (Provider):
> "When I want to run an async peptide practice, help me review and manage patient intakes efficiently without administrative overhead."

---

## Value Proposition

**For Patients:** Physician oversight at subscription pricing ($99–$299/month). No in-person visit. Board-certified MD reviews every intake within 24–48 hours. Pharmaceutical-grade compounding pharmacy. Pause or cancel anytime.

**For Providers:** Async review queue with structured intake data — no transcription, no scheduling, no phone calls. Automated order pipeline. Recurring revenue per active patient panel.

---

## Ideal Customer Profile (ICP)

**Primary:** Health-optimizing professionals aged 28–50, already familiar with biohacking, longevity medicine, or sports performance supplementation. They have disposable income ($100–$300/month discretionary health spend), distrust unregulated online peptide vendors, but find concierge medicine clinics ($300–$500/consult) inaccessible or inconvenient. They operate within the US and prefer digital-first healthcare interactions.

**Secondary:** Functional medicine practitioners and sports medicine MDs looking for a lightweight async platform to extend their panel without building custom infrastructure.

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 16 App Router | Server components, route groups for auth zones |
| Runtime | React 19 + TypeScript (strict) | |
| Styling | Tailwind CSS v4 + CSS Variables | Design tokens in `globals.css` |
| Database | Supabase (PostgreSQL) | `@supabase/ssr` v2 |
| Auth | Supabase Auth | Email/password; role-based via `profiles.role` |
| Payments | Stripe Billing v20 | Subscriptions + Customer Portal |
| Deployment | Vercel (iad1 Washington DC) | Auto-deploy on push to `main` |
| Fonts | Cormorant Garamond + DM Sans | via `next/font/google` |

---

## Architecture Decisions

### Route Groups for Auth Zones
The app uses three Next.js route groups to separate auth contexts:
- `(public)/` — Landing, catalog, quiz, auth pages — no session required
- `(patient)/` — Dashboard routes — requires authenticated patient session
- `(provider)/` — Provider portal — requires authenticated session with `role = 'provider'`

Auth enforcement is handled in `proxy.ts` (Next.js middleware) via Supabase session check + role lookup.

### Supabase RLS
Row Level Security is enabled on all patient data tables. Patients can read/write only their own rows. Providers can read all intake submissions and prescriptions but cannot modify billing records. RLS policies live in `supabase/migrations/001_schema.sql`.

### Mock Data Fallback Pattern
Dashboard pages use `MOCK_*` constants as fallback when Supabase returns null. This allows the app to render meaningfully in demo mode (no env vars configured) while being trivially replaceable with real Supabase queries.

### Stripe Checkout Flow
Stripe Checkout is triggered at the end of the quiz (Step 7) before provider approval — this mirrors the Hims model where payment is captured upfront and refunded if the provider denies. The webhook at `/api/stripe/webhook` handles `checkout.session.completed` → creates subscription record in Supabase and marks the intake as `pending`.

### Provider Role Assignment
Providers cannot self-signup. After creating an account via `/provider/signup`, an admin must manually run:
```sql
UPDATE profiles SET role = 'provider' WHERE email = 'doctor@example.com';
```

---

## Database Schema Summary

| Table | Purpose |
|-------|---------|
| `profiles` | Extends Supabase auth users; stores role, full_name |
| `peptides` | 13 seeded peptide protocols with clinical metadata |
| `intake_submissions` | One row per quiz completion; includes goals, medical history, recommended peptide |
| `prescriptions` | Created by provider on approval; tracks dosage, frequency, status |
| `subscriptions` | Mirrors Stripe subscription state; synced via webhook |
| `messages` | Patient-provider async messaging per prescription |
| `order_status` | Fulfillment pipeline: processing → compounding → shipped → delivered |

Full schema: `supabase/migrations/001_schema.sql`
Peptide seed data: `supabase/migrations/002_seed_peptides.sql`

---

## Key File Map

```
app/
  page.tsx                        ← Landing page (reference implementation for design)
  (public)/quiz/QuizClient.tsx    ← 7-step intake quiz with Stripe checkout trigger
  (public)/catalog/CatalogClient.tsx ← Filterable peptide catalog
  (patient)/dashboard/page.tsx    ← Patient protocol + fulfillment view
  (provider)/provider/dashboard/  ← Provider review queue (Kanban)
  api/stripe/checkout/route.ts    ← Creates Stripe Checkout Session
  api/stripe/webhook/route.ts     ← Handles Stripe events → Supabase writes
lib/
  peptide-data.ts                 ← All 13 peptides with clinical metadata
  quiz-logic.ts                   ← Protocol scoring + contraindication flagging
  supabase-server.ts              ← RSC-safe server client
  supabase.ts                     ← Browser client (null-safe for demo mode)
proxy.ts                          ← Auth middleware (route protection + role checks)
```

---

## Out of Scope (MVP)

- Real telehealth video consults (physician review is async only)
- Lab order integration (deferred to v2)
- Native mobile app (web-only in MVP; PWA upgrade path planned)
- Multi-pharmacy routing (single compounding partner assumed)
- BAA execution with Supabase/Stripe (prototype only — not production HIPAA-compliant)
- Full audit logging for PHI access
- Admin role and admin dashboard

---

## Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_APP_URL
```

All defined in `.env.example`. Set in Vercel Dashboard → Settings → Environment Variables.

---

## Development Notes for Claude

- Always use `createServerSupabaseClient()` from `lib/supabase-server.ts` in Server Components and Route Handlers
- Use the browser client from `lib/supabase.ts` only in Client Components
- Design tokens live in `app/globals.css` as CSS custom properties — never hardcode colors; use `var(--teal)`, `var(--surface)`, etc.
- The `proxy.ts` middleware runs on every request — keep it fast (no DB queries)
- Stripe operations are lazy-initialized via `lib/stripe.ts` to avoid missing-env errors at build time
- All new pages should use the `font-display` class (Cormorant Garamond) for headings and DM Sans for body
- Keep mock data fallbacks when connecting real Supabase queries — don't break demo mode
