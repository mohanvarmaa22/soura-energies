# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — dev server on :3000 (Studio at `/studio`)
- `npm run build` / `npm start` — production build (`output: "standalone"`) and server
- `npm run lint` — ESLint (flat config, `eslint-config-next`)
- No test runner is configured.

## Project

Marketing and lead-generation site for Soura Energies, a solar installer in Telangana, India. `prd.md` holds product requirements and the decision log. Stack: Next.js 16 App Router, React 19, Tailwind v4 (brand tokens from the logo in `src/app/globals.css`, light theme only), `motion` for animation, Zod, Sanity CMS. Path alias `@/*` → `src/*`.

## Architecture

- **Route groups**: public pages live under `src/app/(site)/` (shared header/footer layout). The embedded Sanity Studio is `src/app/studio/[[...tool]]` with its own layout, so keep site chrome out of it. Root `layout.tsx` is shared by both.
- **Config-driven content**: copy and business numbers live in `src/config/` (`site.ts`, `faqs.ts`, `estimator.ts`). Values in `estimator.ts` (tariff slabs, PM Surya Ghar subsidy, per-kW prices) are placeholders marked "VERIFY"; do not treat them as real.
- **Estimator**: `src/lib/estimate.ts` is pure calculation over `estimatorConfig` (bill ↔ units by slab, subsidy, system price by brand and structure). `EstimatorForm.tsx` is the client UI.
- **Lead flow**: `QuoteForm.tsx` posts to `src/app/api/quote/route.ts`. It validates with the Zod schema in `src/lib/quote.ts`, has a honeypot field (`website`, which fakes success) and a soft in-memory per-IP rate limit, then `src/lib/leads.ts` delivers via Resend email and/or a Google Apps Script sheet webhook (`docs/google-sheet-setup.md`). It succeeds if at least one channel works. With none configured, dev logs the lead and production returns 503.
- **Sanity**: `src/sanity/client.ts` returns `null`/`[]` when `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset, so pages must handle the not-configured case (`/projects` shows sample cards in dev only). Content is read with `revalidate: 60`. Schemas are in `src/sanity/schemaTypes` (project, testimonial); `sanity.config.ts` is at the repo root. Setup: `docs/sanity-setup.md`.
- **Analytics**: `Analytics.tsx` and `src/lib/analytics.ts` load GA4 only if `NEXT_PUBLIC_GA_ID` is set, behind a cookie banner.

## Environment and deploy

- `.env.example` documents all variables. `NEXT_PUBLIC_*` values (`SITE_URL`, `GA_ID`, `SANITY_PROJECT_ID`, `SANITY_DATASET`) are inlined at build time, so they are Docker build args in `Dockerfile` and `cloudbuild.yaml` (Cloud Build → container on port 8080, Cloud Run). Changing them requires a rebuild.
- `src/config/url.ts` derives the canonical origin from `NEXT_PUBLIC_SITE_URL` for the sitemap, Open Graph and structured data.
- Lead-delivery secrets (`RESEND_*`, `LEAD_*`, `SHEETS_*`) are runtime-only.
