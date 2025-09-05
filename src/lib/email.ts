import nodemailer from 'nodemailer';
import { compile } from 'handlebars';

// Email configuration
const emailConfig = {
  host: process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_SMTP_PORT || '587'),
  secure: process.env.EMAIL_SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_SMTP_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_SMTP_PASS || 'your-app-password',
  },
};

// Create transporter
const transporter = nodemailer.createTransporter(emailConfig);

// Email templates
const templates = {
  orderConfirmation: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Order Confirmation - {{storeName}}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
    .order-item { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #2563eb; }
    .total { font-size: 18px; font-weight: bold; color: #2563eb; text-align: right; }
    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Order Confirmation</h1>
      <p>Thank you for your order, {{customerName}}!</p>
    </div>

    <div class="content">
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> #{{orderId}}</p>
      <p><strong>Date:</strong> {{orderDate}}</p>
      <p><strong>Status:</strong> {{orderStatus}}</p>

      <h3>Items Ordered</h3>
      {{#each items}}
      <div class="order-item">
        <h4>{{name}}</h4>
        <p>Quantity: {{quantity}} × ${{price}}</p>
        <p><strong>Subtotal: ${{subtotal}}</strong></p>
      </div>
      {{/each}}

      <div class="total">
        <p>Total: ${{total}}</p>
      </div>

      <h3>Shipping Information</h3>
      <p>{{shippingAddress.firstName}} {{shippingAddress.lastName}}</p>
      <p>{{shippingAddress.address}}</p>
      <p>{{shippingAddress.city}}, {{shippingAddress.postalCode}}</p>
      <p>{{shippingAddress.country}}</p>
    </div>

    <div class="footer">
      <p>If you have any questions, please contact us at {{supportEmail}}</p>
      <p>&copy; 2024 {{storeName}}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `,

  orderShipped: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Order Shipped - {{storeName}}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
    .tracking { background: #e0f2fe; padding: 15px; border-radius: 5px; margin: 15px 0; }
    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Order Shipped!</h1>
      <p>Your order is on its way, {{customerName}}!</p>
    </div>

    <div class="content">
      <h2>Order #{{orderId}} has been shipped</h2>

      {{#if trackingNumber}}
      <div class="tracking">
        <h3>📦 Tracking Information</h3>
        <p><strong>Tracking Number:</strong> {{trackingNumber}}</p>
        <p><strong>Carrier:</strong> {{carrier}}</p>
        <p><a href="{{trackingUrl}}" style="color: #2563eb;">Track your package →</a></p>
      </div>
      {{/if}}

      <p>Estimated delivery: {{estimatedDelivery}}</p>

      <h3>What's next?</h3>
      <ul>
        <li>You'll receive updates on your package status</li>
        <li>Delivery confirmation will be sent once received</li>
        <li>Questions? Contact us at {{supportEmail}}</li>
      </ul>
    </div>

    <div class="footer">
      <p>&copy; 2024 {{storeName}}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `,

  paymentFailed: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Payment Failed - {{storeName}}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
    .retry-button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 15px 0; }
    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚠️ Payment Issue</h1>
      <p>We couldn't process your payment, {{customerName}}</p>
    </div>

    <div class="content">
      <h2>Order #{{orderId}} - Payment Failed</h2>

      <p>Unfortunately, we were unable to process your payment for the following reason:</p>
      <p><strong>{{failureReason}}</strong></p>

      <h3>What you can do:</h3>
      <ul>
        <li>Check your payment method details</li>
        <li>Ensure sufficient funds are available</li>
        <li>Try a different payment method</li>
      </ul>

      <a href="{{retryUrl}}" class="retry-button">Retry Payment</a>

      <p>If you continue to experience issues, please contact our support team at {{supportEmail}}.</p>
    </div>

    <div class="footer">
      <p>&copy; 2024 {{storeName}}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `,

  welcomeEmail: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to {{storeName}}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #7c3aed; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
    .cta-button { display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 15px 0; }
    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎊 Welcome to {{storeName}}!</h1>
      <p>Your account has been created successfully</p>
    </div>

    <div class="content">
      <h2>Hello {{customerName}},</h2>

      <p>Welcome to {{storeName}}! We're excited to have you as part of our community.</p>

      <h3>What you can do now:</h3>
      <ul>
        <li>Browse our complete product catalog</li>
        <li>Add items to your wishlist</li>
        <li>Enjoy fast and secure checkout</li>
        <li>Track your orders in real-time</li>
        <li>Receive exclusive offers and updates</li>
      </ul>

      <a href="{{storeUrl}}" class="cta-button">Start Shopping →</a>

      <p>Thank you for choosing {{storeName}}!</p>
      <p>The {{storeName}} Team</p>
    </div>

    <div class="footer">
      <p>&copy; 2024 {{storeName}}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `,
};

// Email service class
export class EmailService {
  private static async sendEmail(
    to: string,
    subject: string,
    html: string,
    text?: string
  ) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@yourstore.com',
        to,
        subject,
        html,
        text,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  }

  static async sendOrderConfirmation(orderData: any) {
    const template = compile(templates.orderConfirmation);
    const html = template({
      storeName: 'Your E-Commerce Store',
      customerName: orderData.customerName || orderData.user?.name || 'Valued Customer',
      orderId: orderData.id.slice(-8),
      orderDate: new Date(orderData.createdAt).toLocaleDateString(),
      orderStatus: orderData.status,
      items: orderData.items.map((item: any) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: (item.price / 100).toFixed(2),
        subtotal: ((item.price * item.quantity) / 100).toFixed(2),
      })),
      total: (orderData.amount / 100).toFixed(2),
      shippingAddress: orderData.shippingAddress || {},
      supportEmail: 'support@yourstore.com',
    });

    return this.sendEmail(
      orderData.email,
      `Order Confirmation - #${orderData.id.slice(-8)}`,
      html,
      `Your order #${orderData.id.slice(-8)} has been confirmed. Total: $${(orderData.amount / 100).toFixed(2)}`
    );
  }

  static async sendOrderShipped(orderData: any, trackingInfo?: any) {
    const template = compile(templates.orderShipped);
    const html = template({
      storeName: 'Your E-Commerce Store',
      customerName: orderData.customerName || orderData.user?.name || 'Valued Customer',
      orderId: orderData.id.slice(-8),
      trackingNumber: trackingInfo?.trackingNumber,
      carrier: trackingInfo?.carrier,
      trackingUrl: trackingInfo?.trackingUrl,
      estimatedDelivery: trackingInfo?.estimatedDelivery || '3-5 business days',
      supportEmail: 'support@yourstore.com',
    });

    return this.sendEmail(
      orderData.email,
      `Order Shipped - #${orderData.id.slice(-8)}`,
      html,
      `Your order #${orderData.id.slice(-8)} has been shipped and is on its way!`
    );
  }

  static async sendPaymentFailed(orderData: any, failureReason?: string) {
    const template = compile(templates.paymentFailed);
    const html = template({
      storeName: 'Your E-Commerce Store',
      customerName: orderData.customerName || orderData.user?.name || 'Valued Customer',
      orderId: orderData.id.slice(-8),
      failureReason: failureReason || 'Payment method was declined',
      retryUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/checkout`,
      supportEmail: 'support@yourstore.com',
    });

    return this.sendEmail(
      orderData.email,
      `Payment Failed - Order #${orderData.id.slice(-8)}`,
      html,
      `We couldn't process your payment for order #${orderData.id.slice(-8)}. Please try again.`
    );
  }

  static async sendWelcomeEmail(userData: any) {
    const template = compile(templates.welcomeEmail);
    const html = template({
      storeName: 'Your E-Commerce Store',
      customerName: userData.name || 'New Customer',
      storeUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    });

    return this.sendEmail(
      userData.email,
      `Welcome to Your E-Commerce Store!`,
      html,
      `Welcome ${userData.name || 'New Customer'}! Thank you for joining Your E-Commerce Store.`
    );
  }

  static async sendCustomEmail(to: string, subject: string, html: string, text?: string) {
    return this.sendEmail(to, subject, html, text);
  }
}

// Export default instance
export default EmailService;
