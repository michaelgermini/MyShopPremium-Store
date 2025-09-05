import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { EmailEventService } from "@/lib/email-events";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const sig = headers().get("stripe-signature");

    if (!sig) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || "whsec_test_secret"
      );
    } catch (err: any) {
      console.error(`Webhook signature verification failed.`, err.message);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;

        // Update order status
        await prisma.order.update({
          where: {
            id: paymentIntent.metadata.orderId,
          },
          data: {
            status: "paid",
          },
        });

        // Send payment success email
        await EmailEventService.handlePaymentSucceeded(paymentIntent.metadata.orderId);

        console.log("Payment succeeded for order:", paymentIntent.metadata.orderId);
        break;

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object;

        // Update order status to failed
        await prisma.order.update({
          where: {
            id: failedPayment.metadata.orderId,
          },
          data: {
            status: "failed",
          },
        });

        // Send payment failure email
        const failureReason = failedPayment.last_payment_error?.message || "Payment method was declined";
        await EmailEventService.handlePaymentFailed(failedPayment.metadata.orderId, failureReason);

        console.log("Payment failed for order:", failedPayment.metadata.orderId);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
