# Stripe backend endpoint setup (Option B)

This project now includes a Netlify Function at:

- `netlify/functions/create-checkout-session.js`

## 1) Add your Stripe secret key in Netlify

In Netlify site settings, add environment variable:

- `STRIPE_SECRET_KEY=sk_live_...`

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

## 4) Frontend usage

When customer clicks Stripe checkout, call endpoint and redirect:

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

## 5) Important production note

For full payment integrity, duplicate pricing logic server-side and calculate the final total in the function rather than trusting the browser-provided `total`.
