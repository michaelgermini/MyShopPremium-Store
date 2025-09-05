import { Stripe, loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with public key
let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
      'pk_test_your_public_key_here' // Replace with your actual test key
    );
  }
  return stripePromise;
};

export default getStripe;

// Server-side Stripe instance
import StripeServer from 'stripe';

export const stripe = new StripeServer(
  process.env.STRIPE_SECRET_KEY || 'sk_test_your_secret_key_here', // Replace with your actual test key
  {
    apiVersion: '2024-06-20',
  }
);
