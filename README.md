# Kastave PMF Landing Page

React/Vite landing page for validating Kastave with US bass bank anglers.

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
VITE_STRIPE_PAYMENT_LINK=
VITE_PAYPAL_PAYMENT_LINK=
VITE_BEEHIIV_FORM_URL=
VITE_GA_MEASUREMENT_ID=
VITE_META_PIXEL_ID=
VITE_TIKTOK_PIXEL_ID=
VITE_PLAUSIBLE_DOMAIN=kastave.com
VITE_SURVEY_URL=
```

Recommended first production links:

- Stripe: `$1` one-time Payment Link for `Kastave Early Reservation Deposit`
- PayPal: `$1` business payment link as backup
- Beehiiv: public subscribe form URL
- Survey: Tally or Google Form URL

Payment copy should stay clear: the `$1` is a non-refundable early reservation deposit and unlocks a `$100` launch credit.
