# Peptide Portal — Complete Product Guide

> Physician-prescribed peptide protocols. Built for the modern telehealth market.

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [How It Works](#2-how-it-works)
3. [User Roles](#3-user-roles)
4. [Feature Walkthrough](#4-feature-walkthrough)
5. [Tech Stack](#5-tech-stack)
6. [Project Structure](#6-project-structure)
7. [Local Development Setup](#7-local-development-setup)
8. [Supabase Configuration](#8-supabase-configuration)
9. [Stripe Configuration](#9-stripe-configuration)
10. [Vercel Deployment](#10-vercel-deployment)
11. [Environment Variables Reference](#11-environment-variables-reference)
12. [Database Schema](#12-database-schema)
13. [Design System](#13-design-system)
14. [Customization Guide](#14-customization-guide)
15. [Going to Production Checklist](#15-going-to-production-checklist)
16. [Business Model](#16-business-model)

---

## 1. Product Overview

Peptide Portal is a full-stack telehealth platform that enables patients to get physician-prescribed peptide protocols without the friction of in-person visits. Modeled after the "Hims" direct-to-consumer telehealth model, it connects patients to board-certified physicians who review intake forms and issue real prescriptions fulfilled by a compounding pharmacy partner.

### The Problem It Solves

The peptide market is fragmented. Patients either:
- Buy research-grade peptides online (unregulated, no physician oversight)
- Navigate expensive concierge medicine clinics ($300–$500/consult)
- Have no access to longevity medicine in their geography

Peptide Portal sits in the middle: physician oversight at subscription pricing ($99–$299/month), delivered to the door.

### Value Proposition

**For Patients:**
- No in-person visit required
- Board-certified MD reviews every intake
- Pharmaceutical-grade compounding pharmacy
- Ongoing physician messaging included
- Subscription model — pause or cancel anytime

**For Providers:**
- Async review queue (review when convenient)
- Structured intake data — no transcription needed
- Automated order pipeline
- Recurring revenue per patient panel

---

## 2. How It Works

### Patient Journey

```
Sign Up → Health Assessment Quiz (7 steps) → AI-Matched Protocol
    → Physician Review (24–48h) → Prescription Issued
    → Compounding Pharmacy → Shipped to Door
    → Monthly Refills (auto-billed via Stripe)
```

### Provider Journey

```
Login → Review Queue (Kanban) → Open Intake Submission
    → Review Patient Data → Approve / Deny / Request Info
    → Approved: Pharmacy notified → Order tracked
    → Monitor Active Prescriptions
```

---

## 3. User Roles

The app has three roles controlled by the `profiles.role` column in Supabase.

| Role | Access | Default |
|------|--------|---------|
| `patient` | `/dashboard/*` routes | Yes (all signups) |
| `provider` | `/provider/*` routes | No (manually assigned) |
| `admin` | Future: `/admin/*` | No |

### Assigning a Provider Role

After a provider signs up, manually update their role in Supabase:

```sql
UPDATE profiles SET role = 'provider' WHERE email = 'doctor@example.com';
```

Or use the Supabase dashboard: **Table Editor → profiles → edit row**.

---

## 4. Feature Walkthrough

### Public Routes

#### `/` — Landing Page
The entry point. Designed to convert health-conscious consumers.

- **Hero section**: "Precision Protocols. Prescribed by Physicians." with CTA to quiz
- **Stats bar**: Social proof (4,200+ patients, HIPAA, 48-hour review)
- **Protocol categories**: Longevity / Recovery / Weight Loss / Cognitive — each with accent color
- **How it works**: 4-step visual flow
- **Testimonials**: 3 patient stories with star ratings and protocol badges
- **FAQ accordion**: 5 questions covering safety, legality, results timeline, states served, cancellation
- **CTA banner**: Pulsing teal glow button linking to assessment

#### `/quiz` — Health Assessment
A 7-step intake form that collects all data the physician needs to review.

| Step | What It Collects |
|------|-----------------|
| 1 | Experience level (beginner / intermediate / expert) |
| 2 | Goals (multi-select: longevity, recovery, weight loss, cognitive, performance) |
| 3 | Age |
| 4 | Medical history (cancer, diabetes, thyroid, cardiovascular, pregnancy) |
| 5 | Lifestyle (activity level, sleep quality) |
| 6 | Physical stats (height, weight) |
| 7 | Protocol recommendation + Stripe checkout |

The quiz uses `lib/quiz-logic.ts` to score protocols against goals and flag contraindications. Step 7 displays the matched protocol and triggers a Stripe Checkout Session on CTA click.

#### `/catalog` — Peptide Catalog
A filterable grid of all 13 available peptide protocols.

- Filter by category: All / Longevity / Recovery / Weight Loss / Cognitive / Performance
- Sort by default / price ascending / price descending
- Each card shows: protocol name, category badge, FDA status, price, mechanism summary

#### `/catalog/[slug]` — Protocol Detail Pages
One page per peptide with full clinical data:

- At-a-glance specs (dosage range, delivery method, cycle length, price)
- Mechanism of action
- Key benefits list
- Clinical considerations
- Sticky `PrescriptionPanel` with "Start Consultation" CTA

#### `/login` & `/signup`
- Supabase email/password authentication
- Signup includes HIPAA consent checkbox + links to Privacy Policy and Terms
- Login redirects to `/dashboard`, signup redirects to `/quiz`

#### `/success`
Post-checkout confirmation page with animated checkmark and "what happens next" timeline.

#### `/privacy` & `/terms`
Full legal pages with Clinical Luxury styling. Privacy policy is HIPAA-compliant with data retention schedules and patient rights table.

---

### Patient Dashboard Routes (`/dashboard/*`)

All routes under `/dashboard` are protected — unauthenticated users are redirected to `/login`.

#### `/dashboard` — My Protocol
The patient's primary view.

- **Protocol Status card**: Shows peptide name, dosage, frequency, approval date, provider name. Status badge (pending/active/approved) with animated pulse dot on active.
- **Shipment Status**: `FulfillmentTracker` component showing stages: Processing → Compounding → Shipped → Delivered. Teal glow on active stage, gradient connectors.
- **Tracking number**: Displayed in monospace.
- **Quick Actions**: Three link cards — Message Provider, View Subscription, Browse Catalog.

#### `/dashboard/messages` — Secure Messaging
HIPAA-compliant messaging thread with the prescribing physician.

- Provider avatar with "Online" badge
- Amber disclaimer strip ("responses within 24 hours on business days")
- Bubble layout: provider messages left (`var(--surface-2)`), patient messages right (teal-dim)
- Date separators between sessions
- Auto-scroll to latest message
- Real-time Supabase subscription (when configured)

#### `/dashboard/subscription` — Subscription Management
- Current plan card with peptide name, monthly price, and status badge
- "Manage Billing" button → Stripe Customer Portal (opens in same tab)
- "What's Included" section: Physician Review, Compounding, Shipping, Messaging
- Cancel subscription with confirmation modal (blur overlay, warning triangle, consequences explained)

#### `/dashboard/history` — Treatment Timeline
A vertical timeline of the patient's full treatment history:

- Event types: intake, approval, shipment, delivery, refill, message, lab
- Month-group separators
- Color-coded nodes per event type
- Summary stats bar at top: Protocol / Duration / Shipments / Status

---

### Provider Portal Routes (`/provider/*`)

Protected by role check in `proxy.ts`. Non-providers are redirected to `/dashboard`.

#### `/provider/dashboard` — Review Queue
Kanban board with three columns:

| Column | Color | Content |
|--------|-------|---------|
| Pending Review | Amber | New intake submissions awaiting review |
| Flagged | Rose | Submissions with contraindications (diabetes, cardiovascular, etc.) |
| Active Prescriptions | Teal | Currently active patient prescriptions |

Each card shows:
- Patient name, state, age
- Goal pills (amber badges)
- Contraindication warnings (rose bubble, for flagged column)
- Recommended protocol
- Time since submission ("2h ago")
- "Review →" link

Stats bar at top: live counts for Pending / Flagged / Active.

#### `/provider/review/[id]` — Intake Review
Two-column layout for reviewing a specific patient submission.

**Left column (2/3 width):**
- Patient header (name, state, age, submission timestamp, recommended protocol chip)
- `IntakeReviewPanel` component with:
  - Patient info card (amber left-border)
  - Goals as amber pills
  - Contraindications in rose warning bubble
  - Medical history table (flagged rows highlighted in rose)

**Right column (1/3 width, sticky):**
- `ApprovalForm` component (amber top border)
- Three action buttons: **Approve** (teal), **Deny** (rose), **Request Info** (amber)
- Expanding forms per action:
  - Approve: dosage + frequency + patient notes fields
  - Deny: required reason field
  - Request Info: message field
- Decision banner shown after submission

#### `/provider/orders` — Order Management
Full order fulfillment pipeline.

- Filter tabs: All / Processing / Compounding / Shipped / Delivered (with counts)
- `OrderStatusTable` with columns: Patient / Peptide / Status badge / Tracking / Updated / Action
- "Mark [Next Stage]" buttons advance each order
- Advancing to Shipped auto-generates a tracking number
- Toast notification on each stage change

---

## 5. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js App Router | 16.1.6 |
| Runtime | React | 19.2.3 |
| Language | TypeScript | 5.x (strict) |
| Styling | Tailwind CSS + CSS Variables | v4 |
| Database | Supabase (PostgreSQL) | ^2.96 |
| Auth | Supabase Auth | via `@supabase/ssr` |
| Payments | Stripe Billing | v20 (`stripe@^20.3.1`) |
| Deployment | Vercel | iad1 (Washington DC) |
| Fonts | Cormorant Garamond + DM Sans | via `next/font/google` |

### Why These Choices

**Next.js 16 App Router**: Server components reduce JS bundle size. Route groups (`(public)`, `(patient)`, `(provider)`) provide clean auth separation without extra config.

**Supabase**: Postgres with built-in auth, real-time subscriptions, and RLS. Scales from zero to production without infrastructure management.

**Stripe v20**: Subscription billing with the Customer Portal handles upgrades, downgrades, payment method changes, and cancellation without custom code.

**Tailwind v4 + CSS Variables**: Tailwind handles spacing/layout utilities. All colors and design tokens live in CSS custom properties for consistent theming across inline styles and class utilities.

---

## 6. Project Structure

```
peptide-portal/
├── app/
│   ├── (patient)/
│   │   └── dashboard/
│   │       ├── layout.tsx          # Sidebar nav + mobile tabs
│   │       ├── page.tsx            # My Protocol
│   │       ├── messages/page.tsx   # Secure messaging
│   │       ├── subscription/page.tsx
│   │       ├── history/page.tsx
│   │       ├── SignOutButton.tsx
│   │       └── UserName.tsx        # Real user name from Supabase
│   ├── (provider)/
│   │   └── provider/
│   │       ├── layout.tsx          # Provider sidebar (amber accent)
│   │       ├── dashboard/page.tsx  # Review queue kanban
│   │       ├── review/[id]/page.tsx
│   │       ├── orders/page.tsx
│   │       └── SignOutButton.tsx
│   ├── (public)/
│   │   ├── catalog/
│   │   │   ├── page.tsx            # Server wrapper (metadata)
│   │   │   ├── CatalogClient.tsx   # Client: filter/sort logic
│   │   │   └── [slug]/
│   │   │       ├── page.tsx        # Server: dynamic metadata
│   │   │       └── PrescriptionPanel.tsx
│   │   ├── quiz/
│   │   │   ├── page.tsx            # Server wrapper (metadata)
│   │   │   └── QuizClient.tsx      # Client: 7-step quiz
│   │   └── success/page.tsx
│   ├── api/
│   │   └── stripe/
│   │       ├── checkout/route.ts   # Create checkout session
│   │       ├── portal/route.ts     # Open billing portal
│   │       └── webhook/route.ts    # Handle Stripe events
│   ├── login/
│   │   ├── page.tsx                # Server wrapper (metadata)
│   │   └── LoginClient.tsx
│   ├── signup/
│   │   ├── page.tsx
│   │   └── SignupClient.tsx        # Has consent checkbox
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── not-found.tsx
│   ├── loading.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── globals.css                 # Design system
│   ├── layout.tsx                  # Root layout + metadata
│   └── page.tsx                    # Landing page
├── components/
│   ├── catalog/
│   │   ├── PeptideCard.tsx
│   │   ├── PeptideGrid.tsx
│   │   └── CategoryFilter.tsx
│   ├── dashboard/
│   │   ├── ProtocolStatus.tsx      # Status card with pulse dot
│   │   ├── FulfillmentTracker.tsx  # Stage stepper with glow
│   │   └── MessageThread.tsx       # Chat bubbles + auto-scroll
│   ├── provider/
│   │   ├── IntakeReviewPanel.tsx   # Patient data display
│   │   ├── ApprovalForm.tsx        # Approve/Deny/Request Info
│   │   └── OrderStatusTable.tsx    # Order management table
│   ├── quiz/
│   │   ├── QuizShell.tsx
│   │   └── RecommendationCard.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Toast.tsx               # Fixed notification
│       ├── ErrorBoundary.tsx       # React error boundary
│       └── SkipLink.tsx            # Accessibility skip nav
├── lib/
│   ├── peptide-data.ts             # 13 peptides + metadata
│   ├── quiz-logic.ts               # Scoring + contraindications
│   ├── supabase.ts                 # Browser client (null-safe)
│   ├── supabase-server.ts          # RSC server client
│   ├── stripe.ts                   # Lazy Stripe getter
│   ├── types/
│   │   └── database.ts             # Supabase table types
│   └── hooks/
│       ├── usePatientData.ts
│       └── useProviderQueue.ts
├── supabase/
│   └── migrations/
│       ├── 001_schema.sql          # All tables + RLS + triggers
│       └── 002_seed_peptides.sql   # 13 peptides seeded
├── proxy.ts                        # Next.js 16 auth middleware
├── next.config.ts                  # Security headers + image config
├── vercel.json                     # Deployment config
└── .env.example                    # All required env vars
```

---

## 7. Local Development Setup

### Prerequisites

- Node.js 18+
- npm 9+
- A Supabase account (free tier works)
- A Stripe account (test mode works)

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/Kainoa00/peptide-portal.git
cd peptide-portal

# 2. Install dependencies
npm install

# 3. Copy env file and fill in values
cp .env.example .env.local

# 4. Run development server
npm run dev
```

Open http://localhost:3000.

> **Without env vars**: The app works in demo mode. Auth pages show but Supabase calls fail gracefully. Stripe checkout shows a "demo mode" message. All mock data renders normally.

---

## 8. Supabase Configuration

### Create a Project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Choose a region close to your users (US East recommended to match Vercel iad1)
3. Copy your **Project URL** and **anon key** from Settings → API

### Run Migrations

In the Supabase SQL editor, run these two files **in order**:

**Step 1:** `supabase/migrations/001_schema.sql`
```
Creates: profiles, peptides, intake_submissions, prescriptions,
         subscriptions, messages, order_status tables
Sets up: RLS policies, auto-create profile trigger, indexes
```

**Step 2:** `supabase/migrations/002_seed_peptides.sql`
```
Seeds: All 13 peptide protocols with clinical data
```

### Configure Auth

In Supabase Dashboard → Authentication → Settings:

- **Site URL**: `https://peptide-portal.vercel.app`
- **Redirect URLs**: Add `https://peptide-portal.vercel.app/**`
- **Email confirmations**: Enable for production, disable for development

### Row Level Security

The migrations set up permissive RLS policies. For production, tighten them:

```sql
-- Patients can only see their own prescriptions
CREATE POLICY "patient_own_prescriptions"
ON prescriptions FOR SELECT
USING (auth.uid() = patient_id);

-- Providers can see all prescriptions
CREATE POLICY "provider_all_prescriptions"
ON prescriptions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'provider'
  )
);
```

### Real-Time Subscriptions

Enable real-time for the `messages` table:

Supabase Dashboard → Database → Replication → toggle `messages` table on.

---

## 9. Stripe Configuration

### Create Products and Prices

In the Stripe Dashboard (use Test Mode first):

1. **Products → Add Product** for each peptide tier:
   - CJC-1295 / Ipamorelin — $169/month
   - Tirzepatide — $299/month
   - Semax — $129/month
   - *(repeat for all 13 protocols)*

2. Copy each **Price ID** (format: `price_xxxx`)

3. Update `lib/peptide-data.ts` — add a `stripePriceId` field to each peptide

4. Update `app/(public)/quiz/QuizClient.tsx` — pass the real `priceId` to the checkout call

### Webhook Setup

1. Stripe Dashboard → Developers → Webhooks → Add Endpoint
2. Endpoint URL: `https://peptide-portal.vercel.app/api/stripe/webhook`
3. Events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy the **Webhook Signing Secret** (`whsec_xxxx`)

### Customer Portal

1. Stripe Dashboard → Settings → Customer Portal
2. Enable: Update payment methods, Cancel subscriptions, View invoice history
3. Save settings

---

## 10. Vercel Deployment

### Initial Deployment

The project is already deployed at **https://peptide-portal.vercel.app**.

To redeploy after changes:

```bash
# Automatic: just push to main
git push origin main

# Manual:
vercel --prod
```

### Environment Variables

In [Vercel Dashboard → Settings → Environment Variables](https://vercel.com/kainoa-shintakus-projects/peptide-portal/settings/environment-variables), add all variables from `.env.example`.

Set environment: **Production + Preview + Development** for all.

### Custom Domain

1. Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., `peptideportal.com`)
3. Update DNS: add CNAME pointing to `cname.vercel-dns.com`
4. Update `NEXT_PUBLIC_APP_URL` env var to your domain

---

## 11. Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service role key (bypasses RLS, server-only) |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key (`sk_live_` or `sk_test_`) |
| `STRIPE_WEBHOOK_SECRET` | Yes | Webhook signing secret (`whsec_`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe publishable key (`pk_live_` or `pk_test_`) |
| `NEXT_PUBLIC_APP_URL` | Yes | Full URL of your app (no trailing slash) |

> **Security note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put secret keys in `NEXT_PUBLIC_` variables.

---

## 12. Database Schema

### `profiles`
Auto-created on signup via trigger. Extends Supabase auth users.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | FK to `auth.users.id` |
| `email` | text | |
| `full_name` | text | nullable |
| `role` | enum | `patient` / `provider` / `admin` |
| `stripe_customer_id` | text | nullable, set on first checkout |
| `created_at` | timestamptz | |

### `intake_submissions`
One row per quiz completion.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | |
| `patient_id` | uuid | FK profiles |
| `goals` | text[] | e.g. `['longevity', 'recovery']` |
| `experience_level` | text | |
| `age` / `weight` / `height` | text | |
| `medical_history` | jsonb | `{"diabetes": false, ...}` |
| `current_medications` | text | |
| `recommended_peptide_id` | uuid | FK peptides, nullable |
| `status` | enum | `pending` / `reviewed` / `approved` / `denied` |
| `submitted_at` | timestamptz | |

### `prescriptions`
Created by provider after approving an intake.

| Column | Type | Notes |
|--------|------|-------|
| `patient_id` / `provider_id` | uuid | FKs |
| `peptide_id` | uuid | FK peptides |
| `status` | enum | `pending` / `approved` / `active` / `paused` / `cancelled` |
| `dosage` / `frequency` / `notes` | text | Provider-entered |
| `approved_at` | timestamptz | |

### `subscriptions`
Created by Stripe webhook on `checkout.session.completed`.

| Column | Type | Notes |
|--------|------|-------|
| `stripe_subscription_id` | text | Stripe sub ID |
| `stripe_customer_id` | text | Stripe customer ID |
| `status` | enum | `active` / `cancelled` / `past_due` / `trialing` |
| `current_period_end` | timestamptz | Next billing date |

### `messages`
One row per message in the patient-provider thread.

| Column | Type | Notes |
|--------|------|-------|
| `patient_id` / `provider_id` | uuid | FKs |
| `sender_id` | uuid | FK auth.users |
| `body` | text | |
| `is_provider` | boolean | True if sent by provider |
| `created_at` | timestamptz | |

### `order_status`
Tracks fulfillment stages for each prescription.

| Column | Type | Notes |
|--------|------|-------|
| `prescription_id` | uuid | FK prescriptions |
| `status` | enum | `processing` / `compounding` / `shipped` / `delivered` |
| `tracking_number` | text | nullable |
| `updated_at` | timestamptz | |

---

## 13. Design System

The entire UI is built on a single dark theme defined in `app/globals.css`.

### Color Tokens

```css
--bg:          #06060F   /* Page background */
--surface:     #0C0C1E   /* Cards, panels */
--surface-2:   #111128   /* Nested surfaces */
--surface-3:   #171734   /* Input fields */

--teal:        #2DD6A8   /* Primary accent: CTAs, active states */
--teal-dim:    rgba(45,214,168,0.12)
--border-teal: rgba(45,214,168,0.25)

--amber:       #D4975A   /* Secondary: provider, warning */
--amber-dim:   rgba(212,151,90,0.12)

--rose:        #E87070   /* Danger: flagged, error, cancel */
--rose-dim:    rgba(232,112,112,0.12)

--lavender:    #9B8EE8   /* Cognitive protocol accent */

--text:        #E8E4D9   /* Primary text */
--text-2:      #6C6C8B   /* Secondary text */
--text-3:      #35354E   /* Muted / placeholder */

--border:      rgba(255,255,255,0.07)
--border-hover:rgba(255,255,255,0.14)
```

### Typography

```css
/* Display font — Cormorant Garamond */
.font-display {
  font-family: var(--font-cormorant, Georgia, serif);
}

/* Body font — DM Sans (applied to <body>) */
font-family: var(--font-dm-sans, system-ui, sans-serif);
```

Use `.font-display` for headings, prices, and emphasis text.

### Animation Classes

| Class | Effect |
|-------|--------|
| `.anim-fade-up` | Fade in from below |
| `.anim-fade-in` | Simple opacity fade |
| `.anim-slide-right` | Slide in from right |
| `.anim-slide-left` | Slide in from left |
| `.anim-float` | Gentle up/down float |
| `.anim-teal-glow` | Breathing teal glow (for CTAs) |
| `.d-100` to `.d-600` | Animation delay (100ms increments) |

### Card Variants

```css
/* Hover lift + teal glow */
.card-glass {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
}
.card-glass:hover {
  border-color: var(--border-teal);
  box-shadow: 0 0 48px var(--teal-glow);
  transform: translateY(-2px);
}
```

---

## 14. Customization Guide

### Adding a New Peptide

1. Add an entry to `lib/peptide-data.ts`:

```typescript
{
  id: 'your-peptide-id',
  slug: 'your-peptide-slug',
  name: 'Your Peptide Name',
  category: 'longevity', // or recovery, weight_loss, cognitive, performance
  tagline: 'Short marketing line',
  description: 'Detailed description...',
  mechanism: 'How it works in the body...',
  dosageRange: '100–200mcg',
  deliveryMethod: 'Subcutaneous injection',
  cycleLength: '12 weeks on, 4 weeks off',
  benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
  considerations: ['Consideration 1', 'Consideration 2'],
  fdaStatus: 'research' | 'compounded' | 'fda_approved',
  priceMonthly: 149,
}
```

2. Add the seed to `supabase/migrations/002_seed_peptides.sql`
3. Add a Stripe Price in the dashboard and update the `stripePriceId` field

### Changing Pricing

Update `priceMonthly` in `lib/peptide-data.ts` for display. Update the actual Stripe price in the Stripe dashboard. Map the new Price ID in your checkout logic.

### Adding a Protocol Category

1. Add category to `CATEGORY_META` in `lib/peptide-data.ts`:

```typescript
export const CATEGORY_META = {
  your_category: {
    label: 'Your Category',
    accent: '#HEXCOLOR',
    accentDim: 'rgba(r,g,b,0.12)',
  },
  // ...existing categories
}
```

2. The catalog filter tab and category card on the landing page will pick it up automatically.

### Changing the Brand Name

1. Search and replace `peptide portal` / `Peptide Portal` / `peptideportal` across all files
2. Update `app/layout.tsx` metadata
3. Update `PRODUCT_GUIDE.md`

### Adding a New Dashboard Tab (Patient)

1. Create `app/(patient)/dashboard/your-tab/page.tsx`
2. Add a nav item to `app/(patient)/dashboard/layout.tsx`:

```typescript
{ href: '/dashboard/your-tab', label: 'Your Tab', icon: <YourIcon /> }
```

### Switching from Mock Data to Real Data (Dashboard)

Each dashboard page currently uses `MOCK_*` constants. To connect real data:

1. Use `createServerSupabaseClient()` from `lib/supabase-server.ts` in the page component
2. Query the relevant table
3. Pass data as props to the client component
4. Keep mock as fallback for when Supabase returns null

Example pattern:

```typescript
// app/(patient)/dashboard/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase-server'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  let prescription = MOCK_PRESCRIPTION // fallback
  if (user) {
    const { data } = await supabase
      .from('prescriptions')
      .select('*, peptides(*)')
      .eq('patient_id', user.id)
      .eq('status', 'active')
      .single()
    if (data) prescription = data
  }

  return <DashboardClient prescription={prescription} />
}
```

---

## 15. Going to Production Checklist

### Before Launch

- [ ] Run SQL migrations in production Supabase project
- [ ] Seed peptide data (`002_seed_peptides.sql`)
- [ ] Set all environment variables in Vercel
- [ ] Configure Supabase Auth redirect URLs
- [ ] Switch Stripe to live mode (update `STRIPE_SECRET_KEY` to `sk_live_`)
- [ ] Create live Stripe products + prices for all peptides
- [ ] Set up Stripe webhook for production URL
- [ ] Enable Stripe Customer Portal
- [ ] Configure custom domain in Vercel
- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Update Supabase Auth Site URL to production domain
- [ ] Tighten RLS policies (move from permissive to restrictive)
- [ ] Assign provider role to physician accounts
- [ ] Set up compounding pharmacy API integration (or manual workflow)

### Legal / Compliance

- [ ] Have a licensed attorney review the Terms of Service
- [ ] Have a HIPAA compliance officer review the Privacy Policy
- [ ] Execute Business Associate Agreements (BAAs) with:
  - Supabase (available on paid plans)
  - Stripe (available on request)
  - Email provider
  - Compounding pharmacy partner
- [ ] Set up audit logging for all PHI access
- [ ] Implement session timeout (30 min inactivity recommended)
- [ ] Verify state-by-state telehealth prescribing legality with counsel

### Performance

- [ ] Enable Vercel Analytics
- [ ] Set up error monitoring (Sentry recommended)
- [ ] Configure Supabase connection pooling for high traffic
- [ ] Add `next/image` optimization for any product images

---

## 16. Business Model

### Revenue Model

**Monthly Subscriptions** via Stripe recurring billing:

| Tier | Price | Contents |
|------|-------|----------|
| Starter | $99/mo | 1 peptide, basic dosage |
| Standard | $169/mo | 1–2 peptides, standard protocol |
| Premium | $299/mo | 2–3 peptides, advanced stack |

### Unit Economics (Illustrative)

| Item | Cost | Notes |
|------|------|-------|
| Compounding pharmacy | $40–$80/mo | Per-patient COGS |
| Physician review | $15–$25/order | Async, scales well |
| Platform fees (Stripe) | ~2.9% + $0.30 | Per transaction |
| **Gross margin** | **~55–65%** | At $169 ASP |

### Scaling Considerations

- **Provider capacity**: One async physician can review ~50–100 intakes/day, supporting ~2,000 active patients
- **Pharmacy partner**: Secure volume discounts after 100+ orders/month
- **Geographic expansion**: Each new state requires verifying telehealth prescribing laws and potentially adding a licensed provider in that state

---

*Peptide Portal — Built with Next.js 16, Supabase, and Stripe.*
*Repository: https://github.com/Kainoa00/peptide-portal*
*Live: https://peptide-portal.vercel.app*
