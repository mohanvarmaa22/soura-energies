# Soura Energies — Website PRD

**Status:** Draft v0.2 · 2026-10-02
**Owner:** Mohan
**Note:** All earlier assumptions are now resolved. Confirmed decisions are listed in the Decision Log (section 12).

---

## 1. Overview

Soura Energies is a solar installation company in **Telangana, India**. It also guides customers end to end through loan and subsidy applications. Residential is the primary segment; commercial is secondary. This PRD defines a marketing and lead-generation website that explains the offering, builds trust, and converts visitors into qualified quote requests.

## 2. Problem & Opportunity

- Solar buyers research heavily online before contacting an installer; a weak or generic site loses them to competitors.
- Buyers need quick answers to: *How much will I save? What does it cost? Can I trust this company?*
- Opportunity: a fast, credible, design-led site with a clear savings estimator and low-friction quote flow.

## 3. Goals & Success Metrics

| Goal | Metric | Target |
|---|---|---|
| Generate qualified leads | Quote-form conversion rate | ≥ 3% of sessions |
| Build trust | Visitors reaching Projects/Testimonials | ≥ 35% |
| Engage with the estimator | Estimator completion rate | ≥ 40% of starters |
| Performance | Lighthouse (mobile) | ≥ 90 Perf / 100 A11y / 100 SEO |
| Reach | Organic traffic growth | +50% in 6 months |

**Non-goals (v1):** customer portal, online payments, e-commerce for panels, native mobile app, Telugu/multilingual support (English only; Telugu is a later phase).

## 4. Target Users

1. **Homeowner** — wants lower bills, unsure about cost/ROI, mostly on mobile.
2. **Small/medium business owner** — wants payback period, financing, and minimal downtime.
3. **Facility / procurement manager** — needs technical specs, certifications, case studies.

## 5. User Stories

- As a homeowner, I can estimate my savings from my monthly bill and location so I know if solar is worthwhile.
- As a visitor, I can see real completed projects with capacity, location and outcomes so I trust the company.
- As a business owner, I can request a site survey/quote in under two minutes.
- As a visitor, I can read plain-language FAQs on subsidies, financing, maintenance, and warranty.
- As the Soura team, I receive each lead by email/CRM with the data needed to follow up.

## 6. Scope & Requirements

### 6.1 Pages (P0 = launch)

| Page | Priority | Purpose |
|---|---|---|
| Home | P0 | Value proposition, estimator teaser, proof, CTA |
| Solutions (Residential / Commercial) | P0 | Offering detail per segment |
| Savings Estimator | P0 | Interactive calculator → lead capture |
| Projects / Case Studies | P0 | Social proof with metrics |
| About | P1 | Team, mission, certifications |
| FAQ / Resources | P1 | Subsidies, financing, how solar works |
| Blog | P2 | SEO content |
| Contact / Get a Quote | P0 | Form, phone, WhatsApp, email, office address + map |

### 6.2 Functional Requirements

- **FR1** Savings estimator (residential): inputs (monthly bill or kWh, optional shadow-free roof area, roof/structure type, panel brand) → outputs (system size kW, gross cost, PM Surya Ghar subsidy, net cost, annual savings, payback, CO₂ offset). All formulas and rates live in one config file.
  - **Pricing model:** price is variable. Cost = kW × (brand panel+inverter rate + structure rate) + fixed project cost. Drivers are building/roof size (caps system kW), structure type and size, and brand.
  - **Brands offered:** Tata Power Solar, Waaree, Adani Solar, Premier Energies.
  - **Subsidy rule (default, to verify):** ₹30,000/kW up to 2 kW, ₹18,000 for the 3rd kW, capped at ₹78,000. Residential only.
  - Output is always labelled an estimate; the final quote follows a site survey.
- **FR2** Quote form with validation, spam protection, and confirmation state; submissions delivered to email and stored (email + Google Sheet; CRM later).
- **FR3** Project gallery with filter by type (residential / commercial) and capacity.
- **FR4** Persistent, visible CTA ("Get a Free Quote") on all pages; click-to-call and WhatsApp on mobile.
- **FR5** SEO: semantic HTML, metadata, Open Graph, sitemap, structured data (LocalBusiness).
- **FR6** Analytics and conversion events (form start/submit, estimator steps, CTA clicks).
- **FR7** Cookie/consent banner where required.
- **FR8** Footer on all pages shows "Developed by Mohan Varma"; the name links to https://mohanvarmaa22.github.io/mohan-portfolio/.

### 6.3 Non-Functional Requirements

- **Performance:** LCP < 2.5s on mid-range mobile over 4G; optimized, lazy-loaded imagery.
- **Accessibility:** WCAG 2.2 AA; keyboard navigable; reduced-motion respected.
- **Responsive:** mobile-first; 360px → 1920px.
- **Security/Privacy:** HTTPS, input sanitization, minimal PII retention, privacy policy.
- **Maintainability:** content editable without code changes (CMS or structured content files).

## 7. Design Direction

- Premium, clean, trustworthy; avoids generic "template" solar looks.
- Palette derived from the existing Soura Energies logo colors (logo file required); generous whitespace; strong typographic hierarchy.
- Photography/imagery of real installations over stock; restrained, purposeful motion.
- Only a logo and domain exist; palette extension, typography and imagery guidance are part of phase 0.

## 8. Technical Approach

- Next.js + TypeScript + Tailwind; containerized and deployed on Google Cloud Run; form handler as a server route.
- Hosting: Google Cloud Run (CDN/caching in front for static assets); headless CMS (Sanity) with a non-technical editing UI for projects, testimonials and blog.
- Analytics: GA4 (consent banner required); email via Resend; leads appended to Google Sheets via API.

## 9. Milestones (no fixed deadline; durations indicative, sequence matters)

| Phase | Deliverable | Duration |
|---|---|---|
| 0 | Brief, brand kit, content inventory | 1 wk |
| 1 | Design (home + key pages) | 2 wks |
| 2 | Build P0 pages + estimator + forms | 3 wks |
| 3 | Content, SEO, QA, accessibility pass | 1 wk |
| 4 | Launch + analytics review | 1 wk |

## 10. Risks

- Estimator accuracy → set expectations as "estimate", have engineering validate formulas.
- Lack of real project photos/testimonials → delays trust sections; collect early.
- Subsidy/tariff rules vary by region and change → keep copy data-driven and dated.
- Scope creep into portal/e-commerce → hold to non-goals for v1.

## 11. Open Questions

1. **Loan scope on the site** (parked): process page, document intake, bank partners, EMI calculator? Subsidy is confirmed (see Decision Log #15).
2. Exact commercial/industrial offering and how its quote flow differs from residential.
3. Real pricing rates per brand and per structure type, fixed project cost, and Telangana tariff slabs (estimator currently uses placeholders).
4. Logo file and brand colors (parked); use a placeholder palette until supplied.

## 12. Decision Log

| # | Decision | Date |
|---|---|---|
| 1 | Business: solar installation plus loan and subsidy assistance | 2026-10-02 |
| 2 | Region: Telangana, India (INR, DISCOM net metering, PM Surya Ghar plus state rules) | 2026-10-02 |
| 3 | Segments: residential primary, commercial secondary | 2026-10-02 |
| 4 | Brand: logo and domain exist; no site content or brand kit yet | 2026-10-02 |
| 5 | Proof: plenty of real projects, testimonials, certifications available at launch | 2026-10-02 |
| 6 | Leads: email + Google Sheet for v1 | 2026-10-02 |
| 7 | Language: English only for v1 | 2026-10-02 |
| 8 | Content editing: non-technical team via headless CMS | 2026-10-02 |
| 9 | Timeline: no deadline | 2026-10-02 |
| 10 | Success targets kept as written (3% conversion, 40% estimator completion, +50% organic in 6 months) | 2026-10-02 |
| 11 | Design: palette follows existing logo colors | 2026-10-02 |
| 12 | Contact channels: phone, WhatsApp, email, office address + map | 2026-10-02 |
| 13 | Analytics: GA4 | 2026-10-02 |
| 15 | Subsidy: up to ₹78,000; estimator deducts it from system cost (exact slab rules to be encoded as configurable data) | 2026-10-02 |
| 16 | Scope: website is the only deliverable | 2026-10-02 |
| 18 | Estimator paused: real rates (brand, structure, fixed cost, tariff slabs) to be supplied later; placeholders in place | 2026-10-02 |
| 19 | Lead delivery: Resend email + Google Sheet via Apps Script webhook; form has honeypot, rate limit, consent checkbox | 2026-10-02 |
| 20 | Privacy and analytics: /privacy page; GA4 loads only after the visitor accepts the cookie banner (no banner or GA when NEXT_PUBLIC_GA_ID is unset); events: form_start, generate_lead, estimator_calculate; footer has "Cookie settings" and developer credit | 2026-10-02 |
| 21 | SEO: sitemap.xml, robots.txt, generated Open Graph image, LocalBusiness JSON-LD; canonical origin from NEXT_PUBLIC_SITE_URL (build arg) | 2026-10-02 |
| 22 | Projects: /projects gallery with type and size filters, content from Sanity (Studio embedded at /studio, project and testimonial schemas); sample data in dev only; setup in docs/sanity-setup.md | 2026-10-02 |
| 23 | Home shows Sanity testimonials only when some exist; /faq page (grouped Q&A, FAQPage structured data) replaces the in-page FAQ link; home keeps four questions. FAQ copy is general and needs the team to verify | 2026-10-03 |
| 17 | Pricing is variable by building size, structure type and size, and panel brand (Tata, Waaree, Adani, Premier Energies); estimator models this from configurable rates | 2026-10-02 |
| 14 | Stack: Next.js, TypeScript, Tailwind, Sanity, Resend; deployed on Google Cloud Run | 2026-10-02 |

**Parked:** loan help on the site; logo file.
