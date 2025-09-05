import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { EmailService } from "@/lib/email";

// Test email endpoint
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, email, orderId, userId, customData } = await request.json();

    let result;

    switch (type) {
      case 'test':
        result = await EmailService.sendCustomEmail(
          email,
          'Test Email from Your Store',
          '<h1>Test Email</h1><p>This is a test email from your e-commerce store.</p>',
          'This is a test email from your e-commerce store.'
        );
        break;

      case 'order_confirmation':
        if (!orderId) {
          return NextResponse.json({ error: "Order ID required" }, { status: 400 });
        }
        // TODO: Implement order confirmation logic
        result = { success: true, messageId: 'order-confirmation-' + orderId };
        break;

      case 'order_shipped':
        if (!orderId) {
          return NextResponse.json({ error: "Order ID required" }, { status: 400 });
        }
        // TODO: Implement order shipped logic
        result = { success: true, messageId: 'order-shipped-' + orderId };
        break;

      case 'payment_failed':
        if (!orderId) {
          return NextResponse.json({ error: "Order ID required" }, { status: 400 });
        }
        // TODO: Implement payment failed logic
        result = { success: true, messageId: 'payment-failed-' + orderId };
        break;

      case 'welcome':
        if (!userId) {
          return NextResponse.json({ error: "User ID required" }, { status: 400 });
        }
        // TODO: Implement welcome email logic
        result = { success: true, messageId: 'welcome-' + userId };
        break;

      case 'custom':
        if (!email || !customData?.subject || !customData?.html) {
          return NextResponse.json({ error: "Email, subject and HTML content required" }, { status: 400 });
        }
        result = await EmailService.sendCustomEmail(
          email,
          customData.subject,
          customData.html,
          customData.text
        );
        break;

      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 });
    }

    return NextResponse.json({
      success: result.success,
      messageId: result.messageId,
      error: result.error,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
