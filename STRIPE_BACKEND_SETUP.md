# Stripe backend endpoint setup (Option B)

This project now includes a Netlify Function at:

- `netlify/functions/create-checkout-session.js`

## 1) Add keys in Netlify (where to paste secret vs publishable)

In Netlify **Site configuration → Environment variables**, add:

- `STRIPE_SECRET_KEY=sk_live_...` ✅ server-only (secret)
- `STRIPE_PUBLISHABLE_KEY=pk_live_...` optional for future Stripe.js usage

For this Checkout redirect endpoint, only `STRIPE_SECRET_KEY` is required. Do **not** paste secret keys in HTML.

## 2) Install dependency

This repo now includes `package.json` with Stripe dependency. Netlify will install it automatically on deploy.

For local testing:

```bash
npm install
```

## 3) Endpoint contract

POST to `/.netlify/functions/create-checkout-session` with JSON:

```json
{
  "frequency": "monthly",
  "total": 189,
  "currency": "cad",
  "serviceLabel": "Standard clean - 1200 sqft",
  "customerEmail": "client@example.com",
  "metadata": {
    "service": "standard",
    "sqft": "1000-1500"
  }
}
```

Response:

```json
{
  "id": "cs_...",
  "url": "https://checkout.stripe.com/...",
  "mode": "subscription",
  "amount_cents": 18900,
  "currency": "cad"
}
```

## 4) Frontend usage (`book.html` is now wired)

`book.html` now calls the endpoint in `data-stripe-checkout-endpoint` on the `<body>` tag and redirects automatically.

Manual example (same pattern):

```js
const payload = {
  frequency: formData.get('frequency'),
  total: Number(hiddenTotalPrice.value || 0),
  currency: 'cad',
  serviceLabel: hiddenServiceLabel.value || 'Dufferin Deep Clean booking',
  customerEmail: formData.get('email') || ''
};

const res = await fetch('/.netlify/functions/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});

const data = await res.json();
if (!res.ok || !data.url) throw new Error(data.error || 'Stripe checkout failed');
window.location.href = data.url;
```

## 5) Stripe Dashboard / Netlify checklist

1. In Stripe Dashboard, copy keys from **Developers → API keys**.
2. Paste `sk_live_...` into Netlify env var `STRIPE_SECRET_KEY`.
3. If needed later for Stripe.js Elements, paste `pk_live_...` into a public config (never `sk_`).
4. Deploy site, then test card checkout from `book.html`.

## 6) Important production note

For full payment integrity, duplicate pricing logic server-side and calculate the final total in the function rather than trusting the browser-provided `total`.
