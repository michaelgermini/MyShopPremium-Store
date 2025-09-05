import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { EmailEventService } from "@/lib/email-events";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { items, shippingInfo } = await request.json();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items in cart" },
        { status: 400 }
      );
    }

    // Calculate total amount
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.id },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.id} not found` },
          { status: 400 }
        );
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Create order in database
    const order = await prisma.order.create({
      data: {
        email: session.user.email!,
        amount: totalAmount,
        currency: "EUR",
        userId: session.user.id,
        status: "pending",
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    // Send order confirmation email
    await EmailEventService.handleOrderCreated(order.id);

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount, // Amount in cents
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: order.id,
        userId: session.user.id,
      },
      shipping: {
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        address: {
          line1: shippingInfo.address,
          postal_code: shippingInfo.postalCode,
          city: shippingInfo.city,
          country: shippingInfo.country,
        },
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    });
  } catch (error) {
    console.error("Payment intent creation error:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
