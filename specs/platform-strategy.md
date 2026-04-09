# Platform Strategy Decision — Peptide Portal

**Sprint:** Sprint 3
**Decision Date:** April 2026
**Decision:** Web-only (Responsive Web App)

---

## 1. Where Do Users Need This Product?

Peptide Portal's primary users — health-optimizing professionals aged 28–50 — access the product in two distinct contexts:

**At onboarding (at a desk):** The quiz intake is a 7-step form requiring focused attention: entering medical history, reviewing contraindications, and committing to a $99–$299/month subscription. This is a deliberate, considered decision — not a quick mobile action. Users will naturally complete this on a desktop or laptop where they're comfortable reading clinical information and entering accurate health data.

**During ongoing care (either context):** After onboarding, patients use the dashboard to check order status, read provider messages, and manage billing. These are lightweight, periodic actions (~2–3 minutes per session) that could plausibly happen on a phone — but the usage frequency is low (roughly weekly), which weakens the case for a native app install.

**Conclusion:** The core conversion action (quiz → checkout) is desktop-primary. The retention actions (dashboard, messaging) are low-frequency enough that a mobile-optimized web experience is fully sufficient.

---

## 2. Does the Product Need Device Hardware?

No. Peptide Portal's core functionality requires none of the following:

| Hardware Capability | Required? | Rationale |
|---|---|---|
| Camera | No | No photo ID verification or image upload in MVP |
| GPS / Location | No | State eligibility is entered manually in the quiz |
| Push Notifications | No | Provider messages are async; email notification is sufficient |
| Biometric Auth | No | Email/password via Supabase Auth is sufficient for MVP |
| Offline Access | No | All data is cloud-native; offline mode adds no value |

The absence of any required native hardware capability removes the primary technical justification for a native app.

---

## 3. Platform Decision

**Decision: Web-only — Responsive Web App**

The MVP is deployed as a standard responsive Next.js web application at `https://peptide-portal.vercel.app`. No App Store distribution, no service worker, no offline caching. The UI is fully responsive and functional on mobile browsers, but the product is not being packaged as a PWA or native wrapper at this stage.

---

## 4. Justification Using the Decision Framework

Evaluating against the four decision questions:

| Question | Answer | Platform Signal |
|---|---|---|
| Do users need this away from a computer? | Primarily no — onboarding is a deliberate desktop action | Web is fine |
| Does it need device hardware? | No — no camera, GPS, or sensors required | Web is fine |
| Is the core user flow < 30 seconds? | No — quiz takes 3–5 minutes; subscription decision is considered | Desktop-first okay |
| Do competitors have apps? | Yes — Hims, Noom, Found all have iOS/Android apps | Understand why |
| Will users install another app? | Unlikely at this scale — no brand recognition yet to drive installs | Probably web |

The competitor signal (Hims has a native app) is worth noting, but Hims operates at massive scale with millions of users and significant retention loops that justify app store presence. For a MVP with zero users and unvalidated retention, the cost of building and maintaining a native app (App Store compliance, push notification infrastructure, Capacitor/React Native overhead) far exceeds the benefit. The right move is to validate retention in-browser first.

Additionally, the Responsive Web → PWA → Capacitor upgrade path is well-established in the Next.js ecosystem. No architectural decisions made in this MVP block the upgrade.

---

## 5. What Would Change My Mind?

Three specific signals would cause an upgrade from Web-only to PWA or Capacitor:

**Signal 1 — Retention data shows high mobile session rate**
If Vercel Analytics shows >40% of dashboard sessions coming from mobile devices, and session length/engagement is comparable to desktop, that's evidence users genuinely want a mobile-first experience. The first upgrade would be PWA (installable, offline-capable) since it requires no App Store process.

**Signal 2 — Users request notifications for prescription status**
The order pipeline (Processing → Compounding → Shipped → Delivered) is a natural push notification trigger. If user interviews or churn analysis reveal that patients are disengaging because they don't know when their order ships, native push notifications via a PWA or Capacitor app would directly address retention. Web push (PWA) would be the first step; native push (Capacitor) only if web push underperforms.

**Signal 3 — A pharmacy or lab integration requires a camera**
If v2 includes identity verification (government ID scan) or at-home lab kit photo submission, device camera access becomes a genuine requirement. At that point, a Capacitor wrapper would unlock camera APIs and justify App Store distribution for the credibility signal alone.

---

## Upgrade Path (When Evidence Warrants)

```
Current:  Responsive Web App (Vercel, no install)
    ↓ (if mobile retention signal)
Step 1:   PWA — add service worker, web app manifest, offline cache
              Effort: ~1 week | App Store: Limited (iOS PWA has restrictions)
    ↓ (if push notification need or camera requirement)
Step 2:   Capacitor — wrap Next.js build for iOS/Android distribution
              Effort: ~2–3 weeks | App Store: Yes (full native distribution)
    ↓ (only if performance-critical native features needed)
Step 3:   React Native — rebuild core screens natively
              Effort: Significant rebuild | Justified only at scale
```

The decision to stay web-only is not a permanent constraint — it's a deliberate bet that the evidence required to justify the next step doesn't yet exist.
