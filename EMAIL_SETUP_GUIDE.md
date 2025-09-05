# 📧 Email Notifications Setup Guide

## 🎯 Overview

Your e-commerce application now includes a comprehensive email notification system that automatically sends emails for key events and allows manual email sending through the admin panel.

## 🚀 Features

### ✅ **Automated Emails**
- **Order Confirmation**: Sent when a customer places an order
- **Payment Success**: Sent when payment is processed successfully
- **Payment Failed**: Sent when payment processing fails
- **Order Shipped**: Sent when order status changes to shipped
- **Welcome Email**: Sent when a new user registers

### ✅ **Manual Email Management**
- **Test Emails**: Verify email configuration
- **Custom Emails**: Send personalized emails
- **Order-Specific Emails**: Resend order confirmations
- **Admin Interface**: Full email management in admin panel

## 🔧 Configuration

### **Step 1: Email Provider Setup**

Choose one of the following email providers:

#### **Option A: Gmail (Recommended for Development)**
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Copy the generated password (16 characters)

#### **Option B: SendGrid (Recommended for Production)**
1. Create account at [SendGrid](https://sendgrid.com)
2. Verify your email/domain
3. Get your API key from Settings > API Keys

#### **Option C: Mailgun**
1. Create account at [Mailgun](https://www.mailgun.com)
2. Verify your domain
3. Get SMTP credentials from Domains section

### **Step 2: Environment Variables**

Add these variables to your `.env.local` file:

```env
# Email Configuration
EMAIL_FROM=noreply@yourstore.com
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=your-email@gmail.com
EMAIL_SMTP_PASS=your-16-char-app-password
EMAIL_SMTP_SECURE=false

# For SendGrid
# SENDGRID_API_KEY=SG.your-sendgrid-api-key
# EMAIL_PROVIDER=sendgrid

# For Mailgun
# MAILGUN_API_KEY=your-mailgun-api-key
# MAILGUN_DOMAIN=your-domain.mailgun.org
# EMAIL_PROVIDER=mailgun
```

### **Step 3: Test Configuration**

1. Start your application:
```bash
npm run dev
```

2. Go to Admin Panel > Emails
3. Send a test email to verify configuration

## 📧 Email Templates

### **Professional Templates Included**
- **Order Confirmation**: Beautiful order summary with item details
- **Order Shipped**: Tracking information and delivery updates
- **Payment Failed**: Clear retry instructions and support contact
- **Welcome Email**: Branded welcome message with store information

### **Template Features**
- **Responsive Design**: Looks great on all devices
- **Customizable Branding**: Easy to modify colors and logos
- **Dynamic Content**: Personalized with customer/order data
- **Plain Text Fallback**: Accessible text versions

## 🎯 Usage

### **Automatic Emails**

Emails are sent automatically for these events:

1. **New Order** → Order Confirmation Email
2. **Payment Success** → Payment Confirmation Email
3. **Payment Failed** → Payment Failure Email
4. **Order Shipped** → Shipping Notification Email
5. **User Registration** → Welcome Email

### **Manual Email Sending**

Access the email management interface:

1. Go to `/admin/emails`
2. Choose email type from dropdown
3. Fill required fields
4. Click "Send Email"

#### **Available Email Types**
- **Test Email**: Simple configuration test
- **Order Confirmation**: Resend order confirmation
- **Order Shipped**: Send shipping notification
- **Payment Failed**: Send failure notification
- **Welcome Email**: Send welcome message
- **Custom Email**: Send personalized content

## 🔍 Email Events & Triggers

### **Webhook Integration**
- Stripe webhooks automatically trigger emails
- Payment success/failure events
- Real-time status updates

### **API Integration**
- Order creation triggers confirmation email
- User registration triggers welcome email
- Manual triggers via admin interface

## 📊 Monitoring & Logs

### **Email Logging**
- Success/failure status tracking
- Message ID recording
- Error message logging
- Console output for debugging

### **Admin Dashboard**
- Email sending status
- Configuration verification
- Template status overview

## 🎨 Customization

### **Modifying Templates**
Edit templates in `src/lib/email.ts`:
```typescript
const templates = {
  orderConfirmation: `...your HTML template...`,
  // Add your custom templates here
};
```

### **Custom Email Service**
Extend the `EmailService` class:
```typescript
export class CustomEmailService extends EmailService {
  static async sendCustomNotification(data: any) {
    // Your custom email logic
  }
}
```

### **Branding**
Update store information in templates:
```typescript
const storeConfig = {
  name: 'Your Store Name',
  url: 'https://yourstore.com',
  supportEmail: 'support@yourstore.com',
};
```

## 🔒 Security & Best Practices

### **Security Features**
- **SMTP Authentication**: Secure connection to email provider
- **Input Validation**: Sanitized email content
- **Rate Limiting**: Prevent email spam
- **Error Handling**: Graceful failure handling

### **Best Practices**
- **Test Emails**: Always test before production
- **Opt-out Links**: Include unsubscribe options
- **Spam Compliance**: Follow email marketing laws
- **Backup Providers**: Configure fallback email services

## 🚨 Troubleshooting

### **Common Issues**

#### **"Email not sending"**
- Check SMTP credentials
- Verify firewall settings
- Check email provider limits
- Review server logs

#### **"Template errors"**
- Validate HTML syntax
- Check Handlebars variables
- Test with sample data

#### **"Rate limiting"**
- Check email provider limits
- Implement queuing system
- Add delays between sends

### **Debug Mode**
Enable detailed logging:
```typescript
// In email service
console.log('Email config:', emailConfig);
console.log('Send result:', result);
```

### **Test Commands**
```bash
# Test email sending
curl -X POST http://localhost:3000/api/admin/emails \
  -H "Content-Type: application/json" \
  -d '{"type":"test","email":"test@example.com"}'
```

## 📈 Production Deployment

### **Production Checklist**
- ✅ Configure production email provider
- ✅ Update FROM email address
- ✅ Test all email templates
- ✅ Set up domain authentication
- ✅ Configure email analytics
- ✅ Set up bounce handling

### **Performance Optimization**
- **Email Queuing**: Use Redis/bull for large volumes
- **Template Caching**: Cache compiled templates
- **Connection Pooling**: Reuse SMTP connections
- **Batch Sending**: Group similar emails

## 📚 Additional Resources

### **Email Service Providers**
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [Mailgun Documentation](https://documentation.mailgun.com/)
- [AWS SES Documentation](https://docs.aws.amazon.com/ses/)

### **Email Best Practices**
- [Really Good Emails](https://reallygoodemails.com/)
- [Email on Acid](https://www.emailonacid.com/)
- [Litmus Resources](https://www.litmus.com/resources)

### **Legal Compliance**
- [CAN-SPAM Act](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)
- [GDPR Email Guidelines](https://gdpr.eu/eprivacy-directive/)

---

## 🎉 **Your Email System is Ready!**

**Start using automated emails today:**
1. Configure your email provider
2. Test the setup with admin panel
3. Place a test order to see emails in action
4. Customize templates for your brand

**Need help?** Check the admin email interface for testing and debugging tools.
