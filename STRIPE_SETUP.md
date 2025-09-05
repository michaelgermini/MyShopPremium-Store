# 🚀 Stripe Payment Integration Setup

This guide will help you set up Stripe payments for your e-commerce application.

## 📋 Prerequisites

1. **Stripe Account**: Create a free account at [stripe.com](https://stripe.com)
2. **Test Mode**: We'll use Stripe's test mode for development

## 🔧 Step 1: Get Your Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Sign in or create an account
3. In the left sidebar, click on "Developers" → "API keys"
4. Copy your keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

## 🔧 Step 2: Configure Environment Variables

Create a `.env.local` file in your project root with your Stripe keys:

```env
# Stripe Configuration
STRIPE_PUBLIC_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# NextAuth (keep existing)
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# Database (keep existing)
DATABASE_URL="file:./dev.db"
```

**⚠️ Important**: Replace the placeholder values with your actual Stripe keys.

## 🔧 Step 3: Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Go to your application and try a purchase:
   - Add products to cart
   - Go to checkout
   - Fill shipping information
   - Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date and any CVC

## 🔧 Step 4: Webhook Setup (Optional but Recommended)

For production, set up webhooks to handle payment events:

1. In Stripe Dashboard, go to "Developers" → "Webhooks"
2. Click "Add endpoint"
3. Set URL to: `https://yourdomain.com/api/webhooks/stripe`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy the webhook secret to your `.env.local`

## 🎯 Test Cards

Use these test card numbers for testing:

| Card Number | Brand | Description |
|-------------|-------|-------------|
| 4242 4242 4242 4242 | Visa | Succeeds |
| 4000 0000 0000 0002 | Visa | Declined |
| 5555 5555 5555 4444 | Mastercard | Succeeds |

## 🚀 Going Live

When you're ready for production:

1. Switch to live mode in Stripe Dashboard
2. Replace test keys with live keys in `.env.local`
3. Update webhook URL to your production domain
4. Test thoroughly with real payment methods

## 📚 Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Next.js + Stripe Integration](https://stripe.com/docs/payments/quickstart)

## 🆘 Troubleshooting

### Common Issues:

1. **"Invalid API Key" error**:
   - Check that your keys are correct
   - Ensure you're using test keys for development

2. **Payment not processing**:
   - Verify your environment variables are loaded
   - Check the browser console for errors

3. **Webhook not working**:
   - Ensure the webhook URL is accessible
   - Check that the webhook secret matches

### Debug Tips:

- Check browser console for Stripe errors
- Look at server logs for API errors
- Use Stripe's dashboard to see payment attempts

---

**🎉 Your Stripe integration is now ready!** Start testing with the test cards above.
