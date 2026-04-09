# User Testing Kit — Peptide Portal

**Sprint:** Sprint 3
**Goal:** Observe 3 real users attempt the core action (quiz → checkout) and identify usability issues

---

## Who to Test With

Test with people who match your ICP: health-conscious, fitness-interested, 22–45 years old. Ideal: someone who takes supplements, uses a fitness tracker, or has researched peptides/biohacking. Avoid: classmates who've already seen the app.

---

## Pre-Session Checklist

- [ ] App is live at https://peptide-portal.vercel.app
- [ ] Loom is open and ready to record (screen + audio)
- [ ] You have a notepad or this doc open to take notes
- [ ] Ask tester for permission to record before starting
- [ ] Open an incognito window so they start fresh (no cached sessions)

---

## Test Script (Use This Verbatim)

### INTRO (1 minute)

> "Thanks for helping me test this. I'm testing the product, not you — there are no wrong answers. I built this, so you can't hurt my feelings. What would actually help me is watching where things feel confusing.
>
> As you go, please think out loud — say whatever comes to mind, even if it's 'I'm not sure what this button does' or 'I would expect to see X here.' I'll stay quiet and take notes. I might ask 'what are you thinking?' if you go quiet.
>
> Any questions before we start?"

### TASK (5–7 minutes)

> "Imagine you've been interested in improving your energy levels, recovery, and longevity — you've heard about peptide therapy and want to explore it. Here's a website. Go ahead and explore it and see if you'd want to use it."

**[Stay silent. Do not help. Do not explain. Just watch and take notes on:**
- Where they pause or hesitate
- What they click first, and whether that was "right"
- Whether they notice the quiz / CTA
- Whether they can get through the quiz steps without confusion
- Whether they reach checkout
- Any verbal confusion ("what does this mean?", "where do I go?")]

### FOLLOW-UP (2–3 minutes)

> "Thanks — that was really helpful. A few quick questions:"

1. "What was that experience like overall?"
2. "Was there anything that confused you?"
3. "Where did you feel most unsure of what to do next?"
4. "What would you change if you could?"
5. "Would you use this if you were actually interested in peptide therapy?"

---

## Observation Template — Test #1

```
Test #: 1
Tester name: ___
Why is this person a good tester? (ICP match): ___
Date: ___
Loom recording URL: ___

Task given: "Explore the site and see if you'd want to use it."

OBSERVATIONS:
- Could they complete the core task (reach quiz → checkout)? [ ] Yes  [ ] No  [ ] Partially
- Time to reach quiz CTA from landing page: ___
- Time to complete full quiz (or where they stopped): ___
- First thing they clicked: ___
- Where they got stuck (describe moment): ___
- Wrong clicks or hesitations: ___
- What they said out loud (quotes): ___
- Facial expressions / body language: ___

FOLLOW-UP RESPONSES:
- What was the experience like? ___
- What was confusing? ___
- Where did they feel most unsure? ___
- What would they change? ___
- Would they use it? ___

SEVERITY OF ISSUES FOUND:
- Critical (can't complete core task): ___
- Major (task possible but difficult): ___
- Minor (annoying but not blocking): ___
```

---

## Observation Template — Test #2

```
Test #: 2
Tester name: ___
Why is this person a good tester? (ICP match): ___
Date: ___
Loom recording URL: ___

Task given: "Explore the site and see if you'd want to use it."

OBSERVATIONS:
- Could they complete the core task (reach quiz → checkout)? [ ] Yes  [ ] No  [ ] Partially
- Time to reach quiz CTA from landing page: ___
- Time to complete full quiz (or where they stopped): ___
- First thing they clicked: ___
- Where they got stuck (describe moment): ___
- Wrong clicks or hesitations: ___
- What they said out loud (quotes): ___
- Facial expressions / body language: ___

FOLLOW-UP RESPONSES:
- What was the experience like? ___
- What was confusing? ___
- Where did they feel most unsure? ___
- What would they change? ___
- Would they use it? ___

SEVERITY OF ISSUES FOUND:
- Critical (can't complete core task): ___
- Major (task possible but difficult): ___
- Minor (annoying but not blocking): ___
```

---

## Observation Template — Test #3

```
Test #: 3
Tester name: ___
Why is this person a good tester? (ICP match): ___
Date: ___
Loom recording URL: ___

Task given: "Explore the site and see if you'd want to use it."

OBSERVATIONS:
- Could they complete the core task (reach quiz → checkout)? [ ] Yes  [ ] No  [ ] Partially
- Time to reach quiz CTA from landing page: ___
- Time to complete full quiz (or where they stopped): ___
- First thing they clicked: ___
- Where they got stuck (describe moment): ___
- Wrong clicks or hesitations: ___
- What they said out loud (quotes): ___
- Facial expressions / body language: ___

FOLLOW-UP RESPONSES:
- What was the experience like? ___
- What was confusing? ___
- Where did they feel most unsure? ___
- What would they change? ___
- Would they use it? ___

SEVERITY OF ISSUES FOUND:
- Critical (can't complete core task): ___
- Major (task possible but difficult): ___
- Minor (annoying but not blocking): ___
```

---

## AI Synthesis Prompt (Use After Running All 3 Tests)

After completing your 3 sessions, paste your filled-in observation notes above into Claude with this prompt:

```
Here are my usability test notes from 3 sessions testing Peptide Portal,
a telehealth web app for physician-prescribed peptide protocols.
The core task was: complete the health assessment quiz and reach Stripe checkout.

[Paste all 3 filled observation templates here]

Synthesize these into:
1. A summary paragraph of overall findings (3–5 sentences)
2. Issues found, grouped by severity (Critical / Major / Minor)
3. Patterns: what did multiple testers experience in common?
4. Key quotes from testers that best illustrate the most important findings
5. Top 3 prioritized changes I should make, with rationale for each
```

---

## Synthesis Template (Fill In After Running Tests + AI Synthesis)

### Overall Findings Summary
[Paste AI-generated summary paragraph here]

### Issues by Severity

**Critical (blocks core task completion):**
- [Issue 1]
- [Issue 2]

**Major (task possible but difficult/slow):**
- [Issue 1]
- [Issue 2]
- [Issue 3]

**Minor (annoying but not blocking):**
- [Issue 1]
- [Issue 2]

### Patterns Across Testers
[What did 2+ testers experience in common?]

### Key Quotes
> "[Quote from tester 1]" — Tester 1, [context]

> "[Quote from tester 2]" — Tester 2, [context]

> "[Quote from tester 3]" — Tester 3, [context]

### Top 3 Prioritized Changes

**Change #1 — [Title]**
What: [Describe the change]
Why: [Rationale — which severity issue does this address, how many testers were affected]

**Change #2 — [Title]**
What: [Describe the change]
Why: [Rationale]

**Change #3 — [Title]**
What: [Describe the change]
Why: [Rationale]
