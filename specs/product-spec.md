# Product Spec — Peptide Portal MVP

**Version:** 1.0
**Sprint:** Sprint 3
**Last Updated:** 2026-04-09
**Status:** MVP Build Complete

---

## 1. Product Summary

Peptide Portal is a direct-to-consumer telehealth platform for physician-prescribed peptide protocols. The MVP delivers a thin, functional slice through the full stack: a patient completes a health assessment, receives a matched protocol recommendation, pays via Stripe, and a provider asynchronously reviews and approves the prescription. The patient then tracks their order and messages their provider from a personal dashboard.

**Core Value Proposition:** Physician oversight + pharmaceutical-grade compounding at subscription pricing, without an in-person visit.

---

## 2. User Stories (MoSCoW Prioritized)

### 🔴 Must Have — MVP fails without these

**US-01 — Patient completes health assessment and receives a protocol recommendation**
> As a prospective patient, I want to complete a guided health assessment quiz so that I receive a personalized peptide protocol recommendation matched to my goals and medical history.

Acceptance Criteria:
- Quiz presents 7 sequential steps covering: experience level, goals, age, medical history, lifestyle, physical stats, and recommendation
- Contraindication logic flags submissions with disqualifying conditions (cancer, active cardiovascular disease, pregnancy)
- Final step displays matched protocol name, mechanism summary, dosage range, and monthly price
- User cannot proceed past a step without completing required fields
- Quiz state persists across accidental page refreshes (no lost progress)

---

**US-02 — Patient signs up, pays, and submits their intake for review**
> As a new patient, I want to create an account and pay for my subscription so that my intake is submitted to a physician for review.

Acceptance Criteria:
- Patient can sign up with email + password on `/signup`
- HIPAA consent checkbox is required before account creation
- After completing the quiz, a Stripe Checkout Session is created and the patient is redirected to Stripe's hosted payment page
- On successful payment, a `subscription` record is created in Supabase and the `intake_submission` status is set to `pending`
- Patient is redirected to `/success` confirmation page with a "what happens next" timeline

---

**US-03 — Provider reviews intake and approves or denies a prescription**
> As a provider, I want to review a patient's intake submission so that I can approve, deny, or request more information before issuing a prescription.

Acceptance Criteria:
- Provider can log into `/provider/dashboard` and see all pending intake submissions in a queue
- Each submission card shows: patient name, state, age, goals, flagged contraindications, recommended protocol
- Provider can open a full review screen at `/provider/review/[id]` with complete patient data
- Provider can approve (with editable dosage and frequency), deny (with required reason), or request more info (with message)
- Approving creates a `prescriptions` record in Supabase; denying sends a message to the patient
- Submissions with contraindications appear in a separate "Flagged" column

---

**US-04 — Patient views their active prescription and order status from a dashboard**
> As a patient with an approved prescription, I want to view my active protocol and track my order so that I know what I'm receiving and when it will arrive.

Acceptance Criteria:
- Patient can log in and access `/dashboard` showing their active prescription (peptide name, dosage, frequency, provider name)
- A fulfillment tracker shows the current stage: Processing → Compounding → Shipped → Delivered
- If no active prescription exists, the dashboard shows an appropriate empty/pending state
- Data is persisted in Supabase and reflects real prescription records (not hardcoded)

---

**US-05 — Patient manages their subscription (view, cancel)**
> As a patient, I want to manage my subscription so that I can update my payment method or cancel if needed.

Acceptance Criteria:
- Patient can navigate to `/dashboard/subscription` and see their current plan, price, and status
- "Manage Billing" opens the Stripe Customer Portal in the same tab
- Patient can cancel through the Stripe portal
- Cancellation updates the `subscriptions` table status via Stripe webhook

---

### 🟡 Should Have — Important but MVP works without

**US-06 — Patient messages their provider through a secure thread**
> As a patient, I want to send messages to my prescribing physician so that I can ask follow-up questions without scheduling an appointment.

Acceptance Criteria:
- Patient can navigate to `/dashboard/messages` and see a message thread with their provider
- Messages are stored in the `messages` table keyed to the patient and provider
- New messages appear in order with date separators
- HIPAA disclaimer is displayed in the thread UI

---

**US-07 — Patient reviews their treatment history**
> As a patient, I want to view a timeline of my past prescriptions and shipments so that I can track my treatment history over time.

Acceptance Criteria:
- `/dashboard/history` renders a vertical timeline of events (intake submission, approval, shipments, refills)
- Each event shows type, date, and relevant details
- Summary stats (protocol, duration, shipments received) shown at top

---

### 🟢 Could Have — Nice if time permits

**US-08 — Provider advances order status through fulfillment stages**
> As a provider, I want to manually advance an order's fulfillment status so that patients see accurate shipment progress.

Acceptance Criteria:
- Provider can access `/provider/orders` and see all active orders in a table
- "Mark [Next Stage]" button advances status: Processing → Compounding → Shipped → Delivered
- Advancing to Shipped auto-generates a tracking number
- Patient dashboard reflects the updated status

---

**US-09 — Expert users can self-select a peptide from the catalog**
> As an experienced user, I want to browse and select a specific peptide protocol from the catalog so that I'm not forced through a guided quiz.

Acceptance Criteria:
- `/catalog` shows all 13 protocols in a filterable, sortable grid
- `/catalog/[slug]` shows detailed clinical data per protocol
- Sticky "Start Consultation" CTA on detail page routes to quiz with pre-selected protocol

---

### ⚫ Won't Have (Explicitly Out of Scope for MVP)

**US-10 — Live video telehealth consults** — Async review only in v1; no telehealth API integration
**US-11 — Lab order integration** — No blood panel ordering or result upload in MVP
**US-12 — Native mobile app** — Web-first; no Capacitor or React Native build
**US-13 — Multi-pharmacy routing** — Single compounding pharmacy partner assumed; no pharmacy API
**US-14 — Admin dashboard** — Provider role management done directly in Supabase; no admin UI
**US-15 — Real-time chat (WebSocket)** — Messaging is async/polled; no live WebSocket channel in MVP

---

## 3. Functional Requirements

### Authentication & Authorization
- FR-01: Users authenticate via Supabase email/password. No OAuth in MVP.
- FR-02: All `/dashboard/*` routes require an authenticated session; unauthenticated users redirect to `/login`
- FR-03: All `/provider/*` routes require `profiles.role = 'provider'`; non-providers redirect to `/dashboard`
- FR-04: Auth middleware runs on every request via `proxy.ts`; session checked against Supabase server client
- FR-05: HIPAA consent checkbox is required on patient signup and stored on the profile record

### Quiz & Intake
- FR-06: Quiz uses `lib/quiz-logic.ts` to score 5 protocol categories (longevity, recovery, weight loss, cognitive, performance) against patient goals and lifestyle inputs
- FR-07: Contraindication logic flags 5 disqualifying conditions: active cancer, cardiovascular disease, diabetes (Type 1), pregnancy, active psychiatric medication
- FR-08: Quiz state is held in React component state; completing all 7 steps required to trigger checkout
- FR-09: On quiz completion, an API call to `/api/stripe/checkout` creates a Stripe Checkout Session with the matched protocol's `stripe_price_id`
- FR-10: `intake_submission` record is written to Supabase on checkout completion (via Stripe webhook `checkout.session.completed`)

### Data Persistence
- FR-11: All patient data is stored in Supabase PostgreSQL with RLS enabled on every table
- FR-12: Patients can only read/write their own rows (`auth.uid() = patient_id` / `user_id` policies)
- FR-13: Providers can read all `intake_submissions` and `prescriptions`; cannot modify `subscriptions`
- FR-14: Prescription creation requires `provider` role and generates a foreign-keyed record linking patient, provider, and peptide
- FR-15: Stripe subscription state is mirrored to the `subscriptions` table via webhook events

### Payments
- FR-16: Stripe is used for all billing; no custom payment processing
- FR-17: Each peptide has a corresponding Stripe Product + monthly recurring Price
- FR-18: Checkout is triggered before provider approval (Hims model: pay first, refund if denied)
- FR-19: Stripe Customer Portal handles self-service billing management (payment method updates, cancellation, invoices)
- FR-20: Webhook endpoint at `/api/stripe/webhook` handles: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`

### Provider Portal
- FR-21: Provider dashboard displays intake submissions in three Kanban columns: Pending / Flagged / Active
- FR-22: "Flagged" column automatically populates submissions where `contraindications` array is non-empty
- FR-23: Approval action creates a `prescriptions` row and triggers order pipeline creation
- FR-24: Denial action creates a `messages` row with the denial reason, visible in the patient's message thread
- FR-25: Order management table allows advancing fulfillment status; "Shipped" stage auto-generates a tracking number string

### Error & Empty States
- FR-26: Patient dashboard shows a pending-state UI when no active prescription exists (no hardcoded mock data visible to logged-in users with no real prescription)
- FR-27: Quiz shows validation errors inline (per-step) for required fields
- FR-28: Failed Stripe checkout redirects to quiz with an error toast; intake is not created
- FR-29: Supabase errors on the server are caught and logged; UI shows a graceful error message (not a raw stack trace)

---

## 4. Success Metrics

### Functional (MVP Gate — Must Pass Before Submission)
- SM-01: A new user can sign up, complete the 7-step quiz, and reach Stripe Checkout in under 5 minutes
- SM-02: A TA can create an account, complete the quiz, and see their data persist in Supabase `intake_submissions` table
- SM-03: A provider-role account can log in, view a pending submission, and issue an approval that creates a row in `prescriptions`
- SM-04: The patient dashboard reflects the approved prescription without hardcoded data
- SM-05: Stripe webhook delivers correctly and `subscriptions` table updates on test payment completion

### Product Quality
- SM-06: All 3 user test participants can complete the core action (quiz → checkout) without assistance
- SM-07: Zero critical-severity issues (core task blockers) remain unresolved after user testing
- SM-08: App loads in under 3 seconds on a standard WiFi connection (Vercel CDN + Next.js SSR)

### Business Signal (Post-MVP Tracking)
- SM-09: Quiz completion rate ≥ 60% (Step 1 start → Step 7 checkout CTA)
- SM-10: Checkout conversion rate ≥ 40% of users who reach Step 7
- SM-11: Provider average review time ≤ 5 minutes per intake (measured from open → decision submit)

---

## 5. Out of Scope

The following are explicitly **not** part of the MVP build and should not be built or partially implemented:

| Item | Rationale |
|------|-----------|
| Live video consults | Requires HIPAA-compliant telehealth API (e.g., Daily.co, Doxy.me); deferred to v2 |
| Lab order / results integration | Requires third-party lab API (e.g., Rupa Health, Vibrant America); complex compliance scope |
| Native mobile app (iOS/Android) | Web-first is sufficient for target persona; native app adds AppStore compliance overhead with no MVP benefit |
| Real-time WebSocket messaging | Async messaging sufficient for 24–48h provider response model; Supabase Realtime can be added in v2 |
| Multi-pharmacy routing | Single pharmacy partner is the MVP assumption; routing logic requires API contracts not yet negotiated |
| Admin role + UI | Provider role management done via direct Supabase SQL; admin UI is v2 scope |
| AI-generated personalized protocol notes | Protocol recommendations are rule-based (quiz logic); LLM-generated notes add compliance risk in v1 |
| Audit logging for PHI | Required for HIPAA production; deferred until BAA execution with Supabase |
| Geographic eligibility filtering | State-by-state telehealth prescribing laws not yet mapped; accept all US states in MVP with legal disclaimer |

---

## 6. Database Schema (Reference)

See `supabase/migrations/001_schema.sql` for full DDL.

```
profiles          → extends auth.users; role enum (patient/provider/admin)
peptides          → 13 seeded protocols; clinical metadata + stripe_price_id
intake_submissions → quiz results per patient; status enum (pending/reviewed/approved/denied)
prescriptions     → provider-issued prescriptions; links patient + provider + peptide
subscriptions     → mirrors Stripe subscription state; updated via webhook
messages          → patient-provider async thread; keyed to patient_id + provider_id
order_status      → fulfillment pipeline per prescription; status enum (processing/compounding/shipped/delivered)
```

---

## 7. Technical Constraints

- **Next.js App Router only** — no Pages Router patterns; use Server Components by default, Client Components only when interactivity requires it
- **No external state management library** — React state + Supabase real-time subscriptions are sufficient; no Redux/Zustand
- **Tailwind v4 + CSS variables only** — no inline color values; all colors via `var(--token)`
- **TypeScript strict mode** — all types defined; no `any` in new code; types for Supabase tables in `lib/types/database.ts`
- **Demo mode must not break** — app must render meaningful UI without env vars configured (mock fallbacks remain)
