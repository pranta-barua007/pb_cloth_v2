import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  //@ts-ignore
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);
