# Kastave Bank Angler Scout Program Landing Page

React/Vite landing page for validating the Kastave Bank Angler Scout Program with US bass bank anglers.

## Local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Vercel output directory: `dist`.

## Environment Variables

Copy `.env.example` to `.env.local` for local testing, then add the same keys in Vercel.

```bash
VITE_PAYPAL_PAYMENT_LINK=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_BEEHIIV_FORM_URL=
VITE_GA_MEASUREMENT_ID=
VITE_META_PIXEL_ID=
VITE_TIKTOK_PIXEL_ID=
VITE_PLAUSIBLE_DOMAIN=kastave.com
VITE_SURVEY_URL=
```

Recommended first production links:

- PayPal: `$1` business payment link for `Kastave Bank Angler Scout Program`
- Supabase: project URL and anon key for landing-page metrics storage
- Beehiiv: public subscribe form URL
- Survey: Tally or Google Form URL

Payment copy should stay clear: the `$1` is a non-refundable early reservation deposit and unlocks a `$100` launch credit.

## Supabase Backend

Run the SQL files in `supabase/migrations/` in order in your Supabase project SQL editor.

It creates:

- `landing_events`: page views, CTA clicks, email submits, PayPal clicks, and popup events
- `waitlist_signups`: normalized email signups
- `pain_point_answers`: bank-fishing pain point responses
- `reservation_intents`: PayPal reservation button clicks, not completed payment confirmations
- `landing_metric_summary`: authenticated-only summary view by A/B variant

The frontend writes to Supabase only when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set. PayPal completed payments still need PayPal dashboard export or a webhook-backed server endpoint.

`landing_metric_summary` includes:

- Landing Page View / Link Click ratio
- Average time on page from `page_engagement`
- CTA click rate
- Email Lead conversion rate
- `$1` reservation click conversion rate
- FAQ expand rate
