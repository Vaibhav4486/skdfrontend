# SKD Finance — React Frontend

Vite + React + React Router + Axios, wired directly to the Spring Boot backend at
`https://skdfinance-backend.onrender.com`.

## Setup

```bash
npm install
cp .env.example .env   # already pre-filled with the Render URL — edit only if it changes
npm run dev
```

Opens at `http://localhost:5173` — already in your backend's `CorsConfig.java` allowlist,
so requests will work immediately with no backend changes needed for local dev.

## First things to try

1. Visit `/register` — creates a CUSTOMER account.
2. Visit `/login` — log in as admin using the `admin.bootstrap.*` credentials from your
   backend's `application.properties`. You'll be redirected to `/admin` instead of `/dashboard`
   automatically, based on the role in the JWT.
3. From `/admin`, go to **Services** and add your 8 services — the public `/services` page,
   the navbar dropdown, and the Contact form's service dropdown are all empty until you do,
   since nothing is hardcoded here anymore; it all comes from the database.
4. Same for **FAQs** — add a few, publish them, then check `/faq` publicly.
5. Submit a testimonial from `/testimonials` (logged out), then approve it from
   `/admin/testimonials` — confirm it appears on the public page afterward.

## One real constraint: Render cold starts

Render's free tier spins the backend down after inactivity. The **first** request after
it's been idle can take 30–50 seconds while it wakes up — every page that fetches data
(`Services`, `Faq`, `Testimonials`, the admin pages) shows a "Loading…" or error message
in that window rather than hanging silently. If something looks broken on first load,
wait and refresh before assuming it's a bug.

## Architecture

- `src/api/` — one file per backend resource, all built on `axiosClient.js`, which attaches
  the JWT to every request automatically via an interceptor. This is also why guest form
  submissions (leads, testimonials) still link to your account if you happen to be logged
  in — same interceptor, no special-casing needed per page.
- `src/context/AuthContext.jsx` — holds the logged-in user (or null), persisted to
  `localStorage` so a refresh doesn't log you out.
- `src/components/ProtectedRoute.jsx` — frontend route guarding. **This is UX, not security**
  — the backend's `SecurityConfig` enforces the real rules independently. A customer could
  theoretically hand-edit `localStorage` to fake a token, but it wouldn't pass signature
  verification on the backend, so nothing behind `/api/admin/**` would actually respond.
- Admin pages (`src/pages/admin/`) each follow the same shape: load list on mount, inline
  create/edit form, action buttons that call the API then reload. Nothing fancy — deliberately
  boring and consistent so any one of them tells you how the others work.

## Before deploying this anywhere real

Update `CorsConfig.java` on the backend with your actual deployed frontend URL (Vercel,
Netlify, whatever you pick) — right now it only allows `localhost` origins and the
`skdfinance.com` placeholder from earlier. Without that, every request will fail silently
in the browser the moment this stops running on `localhost:5173`.
