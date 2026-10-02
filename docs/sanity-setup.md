# Sanity CMS setup

1. Create a project at https://www.sanity.io/manage (free plan is fine). Note the **project ID**.
2. Put it in `.env.local`: `NEXT_PUBLIC_SANITY_PROJECT_ID=<id>` (dataset defaults to `production`). Restart `npm run dev`.
3. In the Sanity dashboard, project settings, API, **CORS origins**: add `http://localhost:3000` and the production origin, both with "Allow credentials" ticked. Without this the Studio at `/studio` cannot load.
4. Open `/studio`, sign in, and add Projects (title, type, kW, city, photo with alt text). Testimonials are also available.
5. Production: pass `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` as Docker build args.

The site reads published content and refreshes at most every 60 seconds. While no project ID is set, `/projects` shows sample cards in development and a "Projects are being added" message in production.
