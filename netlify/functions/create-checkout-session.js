const Stripe = require('stripe');

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
}

function toCents(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return Math.round(amount * 100);
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed. Use POST.' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return json(500, { error: 'Server is missing STRIPE_SECRET_KEY.' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (_) {
    return json(400, { error: 'Request body must be valid JSON.' });
  }

  const {
    frequency,
    total,
    currency = 'cad',
    serviceLabel = 'Dufferin Deep Clean booking',
    customerEmail,
    metadata = {}
  } = payload;

  const amountCents = toCents(total);
  if (!amountCents) {
    return json(400, { error: 'A positive total is required.' });
  }

  const normalizedFrequency = String(frequency || '').toLowerCase();
  const subscriptionMode = normalizedFrequency === 'monthly';

  const origin = event.headers.origin || event.headers.Origin || '';
  const safeOrigin = origin && /^https?:\/\//i.test(origin)
    ? origin.replace(/\/$/, '')
    : 'http://localhost:8888';

  const successUrl = `${safeOrigin}/book.html?stripe_success=1&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${safeOrigin}/book.html?stripe_cancel=1`;

  try {
    const stripe = new Stripe(secretKey);

    const session = await stripe.checkout.sessions.create({
      mode: subscriptionMode ? 'subscription' : 'payment',
      customer_email: customerEmail || undefined,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: String(currency).toLowerCase(),
            product_data: {
              name: subscriptionMode
                ? `${serviceLabel} (Monthly Subscription)`
                : `${serviceLabel} (One-Time Payment)`
            },
            recurring: subscriptionMode ? { interval: 'month' } : undefined,
            unit_amount: amountCents
          }
        }
      ],
      metadata: {
        source: 'dufferin-booking-form',
        frequency: normalizedFrequency || 'unknown',
        ...metadata
      }
    });

    return json(200, {
      id: session.id,
      url: session.url,
      mode: session.mode,
      amount_cents: amountCents,
      currency: String(currency).toLowerCase()
    });
  } catch (error) {
    return json(500, {
      error: error && error.message ? error.message : 'Stripe session creation failed.'
    });
  }
};
