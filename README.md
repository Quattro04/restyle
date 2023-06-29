This is a template for a T-shirt store in Next.js, which integrates Stripe api to get products, makes checkout and much more.

## Getting Started

First, add `.env.local` file and fill it with required keys from your Stripe dashboard:
```
# Stripe keys
# https://dashboard.stripe.com/apikeys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```
Then:

```bash
npm install
npm run dev
```
And you should be ready to go!
