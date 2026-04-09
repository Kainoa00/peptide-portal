# Loom Reflection Video Script — Sprint 3
## Peptide Portal | 2-Minute Video

**Total target time:** ~2:00
**Format:** Screen share (app live) + talking head or voice-over

---

## SECTION 1: INTRO + CORE FEATURE DEMO (0:00–0:45)

> "Hey — this is my Sprint 3 reflection for Peptide Portal. I'm going to quickly show you the core feature, then walk through what I learned from user testing and my platform decision.

> Peptide Portal is a telehealth web app where patients can get physician-prescribed peptide protocols without an in-person visit. Think Hims, but for biohackers and longevity patients.

> Here's the core loop — a user lands here [**show landing page**], hits 'Start Assessment', and goes through a 7-step health intake quiz [**click through 2–3 steps fast**]. At the end, they see their matched protocol — in this case, CJC-1295/Ipamorelin for longevity and recovery — and hit checkout via Stripe [**show recommendation card and Stripe CTA**]. That intake gets saved to Supabase, and on the provider side [**switch to /provider/dashboard**], it shows up in the review queue. The provider can approve with dosage notes [**show approval form**], which creates a prescription record in the database. The patient then sees their protocol and order status on their dashboard. [**show /dashboard**] Full end-to-end — quiz, payment, physician review, and fulfillment tracking."

---

## SECTION 2: USER TESTING LEARNINGS (0:45–1:20)

> "I ran three user tests with people who match my ICP — health-conscious, 25–40, already interested in biohacking.

> The most surprising finding: [**describe your biggest surprise from testing — e.g. "Two of my testers completely missed the 'Start Assessment' CTA on the landing page — they scrolled past it and went straight to the catalog. I assumed the hero section was obvious, but it turns out the dark background made the button hard to spot at a glance."**]

> The critical issue I found was [**describe your critical issue if any — e.g. "On step 4 of the quiz — medical history — one tester wasn't sure if checking a condition meant they were disqualified. There was no explanation of what the screening was for, and she almost abandoned the quiz."**]

> What I'm changing: [**describe your top 1 change — e.g. "I'm adding a one-line explanation below the contraindication flags: 'Some conditions may affect protocol eligibility. Your physician will review.' That alone should reduce anxiety and keep users moving through the quiz."**]"

---

## SECTION 3: PLATFORM DECISION (1:20–1:50)

> "My platform decision is web-only — a responsive web app with no App Store distribution.

> Here's the reasoning: the core conversion action is a 7-step health intake form. That's a deliberate, considered decision people make at a desk, not a 30-second mobile action. My ICP doesn't need this on-the-go — they need it to feel trustworthy and clinical.

> The product also has zero hardware requirements — no camera, no GPS, nothing that requires a native app.

> What would change my mind: if analytics showed 40% or more of dashboard sessions coming from mobile with strong engagement, I'd add a PWA layer — installable, with basic offline support. If we added photo ID verification or at-home lab kit uploads in v2, I'd consider a Capacitor wrapper for camera access. But right now, web-only is the right call."

---

## SECTION 4: CLOSE (1:50–2:00)

> "That's the Sprint 3 wrap. Core feature is live and working. Three user tests done. Platform decision made. Main thing I'm shipping this week is [**mention your top fix**]. Thanks."

---

## Recording Tips

- Use Loom's screen share + cam mode (picture-in-picture) — it looks more professional than voice-over only
- Keep the app open in your browser at the start and switch to each section as you go
- Speak at a slightly faster-than-conversational pace — 2 minutes goes quickly
- Do one dry run before recording — you'll probably cut 20–30 seconds of filler on the first pass
- If you go over 2:15, cut the catalog demo from Section 1 — go straight from landing page to quiz to provider dashboard
- Paste the Loom URL into your Google Doc submission right after recording
