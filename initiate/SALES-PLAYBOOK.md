# Peptide Portal Sales Playbook

*Last Updated: March 11, 2026*

---

## 🚨 Critical Fixes (Before Selling)

### 1. Provider Approve/Deny Button — ✅ DONE
**Problem:** Provider could see intake but couldn't approve/deny prescriptions  
**Fix:** Added API endpoint + button handlers in dashboard

### 2. Messages Don't Save — ✅ DONE
**Problem:** Messages page used mock data  
**Fix:** Created `/api/messages` endpoint + updated page

### 3. Hardcoded Provider Name — ✅ DONE
**Problem:** Showed "Dr. Sarah Chen" for everyone  
**Fix:** Dynamic provider name from profiles table

### 4. Provider Signup — ✅ DONE
**Problem:** No way for providers to sign up  
**Fix:** Created `/provider/signup` and `/provider/login` pages

---

## 📋 Pre-Launch Checklist

- [x] Fix provider approve/deny workflow
- [x] Fix messages persistence
- [x] Add provider signup/login flow
- [ ] Test full patient flow (quiz → intake → approval → dashboard)
- [ ] Take screenshots for sales materials

---

## 🎯 Sales Strategy

### Target Market (Utah)
1. **Compounding Pharmacies** (referral source)
   - Empower Pharmacy (Salt Lake City)
   - Valley Natural Pharmacy
   - Medication Management Pharmacy (Murray)

2. **Clinic Types**
   - Concierge medicine (MDVIP affiliates)
   - Anti-aging / age management
   - IV therapy clinics
   - Sports medicine / recovery

### Value Prop
- **For Providers:** Automated intake, recurring revenue, compliance handled
- **For Pharmacies:** More prescriptions, structured patient pipeline

### Pricing to Quote
| Tier | Price | Features |
|------|-------|----------|
| Starter | $199/mo | 25 patients, basic intake |
| Growth | $399/mo | 100 patients, messages, analytics |

---

## 📞 Outreach Sequence

### Day 0: Identify Target
1. Search "concierge doctor Utah", "anti-aging clinic Salt Lake City"
2. Add to CRM/notion: Name, clinic, phone, email

### Day 0: Email (Template in SALES-OUTREACH.md)
- Subject: `Quick question about your peptide practice`
- Send from: kai@peptideportal.com (or personal)
- Track opens/clicks

### Day 3: Follow-Up Email
- Subject: `Following up on peptide practice`

### Day 7: Phone Call
- "Hi this is Kai, wanted to follow up on my email..."
- Goal: Get on calendar for 10-min demo

### Day 14: LinkedIn Connection
- Connect with personalization
- Share relevant article 📅

---

## 30-Day Execution Plan

### Week 1: Fix & Prepare
- [ ] Day 1-2: Fix provider approve workflow
- [ ] Day 3: Fix messages persistence  
- [ ] Day 4: Create 2 provider test accounts
- [ ] Day 5: Full end-to-end test + screenshots

### Week 2: Build List
- [ ] Day 8-10: Find 30+ Utah clinics (Google, LinkedIn)
- [ ] Day 11-12: Verify emails (Hunter.io or similar)
- [ ] Day 13-14: Send first outreach batch (10 emails)

### Week 3: Outreach
- [ ] Day 15-17: Send batch 2 (10 emails)
- [ ] Day 18-19: Follow-up on batch 1
- [ ] Day 20-21: Phone calls to non-responders

### Week 4: Demo & Close
- [ ] Day 22-24: Run demos for interested prospects
- [ ] Day 25-27: Handle objections, send contracts
- [ ] Day 28-30: Onboard first paying customer

---

## 🛠️ Tools Needed

| Purpose | Tool | Cost |
|---------|------|------|
| Email outreach | Mailchimp / ConvertKit | $0-29/mo |
| Email tracking | Mailchimp or Mixmax | Included |
| CRM | Notion / Google Sheets | Free |
| Phone | Google Voice | Free |
| Domain/email | Cloudflare + Gmail | $12/yr |

---

## 💰 Revenue Targets

| Month | Target | Notes |
|-------|--------|-------|
| 1 | 1 customer | Any paying customer |
| 2 | 2 customers | $400-800 MRR |
| 3 | 4 customers | $800-1.6K MRR |
| 6 | 10 customers | $2K-4K MRR |

---

## Next Actions

1. **Today:** Fix provider approve button (priority)
2. **Tomorrow:** Test full flow, get screenshots
3. **This week:** Build prospect list, start outreach

---

*Weekly review: Every Monday 9am MST*
