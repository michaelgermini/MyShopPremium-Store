import { EmailService } from './email';
import { prisma } from './prisma';

export class EmailEventService {
  static async handleOrderCreated(orderId: string) {
    try {
      // Récupérer les détails de la commande
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          user: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!order) {
        console.error('Order not found for email:', orderId);
        return;
      }

      // Envoyer l'email de confirmation
      const emailResult = await EmailService.sendOrderConfirmation({
        ...order,
        shippingAddress: {
          firstName: 'John', // Ces données devraient venir du formulaire de checkout
          lastName: 'Doe',
          address: '123 Main St',
          city: 'Paris',
          postalCode: '75001',
          country: 'France',
        },
      });

      // Loguer l'envoi d'email dans la base de données
      await this.logEmailEvent({
        orderId,
        type: 'order_confirmation',
        recipient: order.email,
        success: emailResult.success,
        messageId: emailResult.messageId,
        error: emailResult.error,
      });

      return emailResult;
    } catch (error) {
      console.error('Error sending order confirmation email:', error);
      return { success: false, error: error.message };
    }
  }

  static async handlePaymentSucceeded(orderId: string) {
    try {
      // Mettre à jour le statut de la commande
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'paid' },
      });

      // Récupérer les détails mis à jour
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          user: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!order) return;

      // Envoyer un email de confirmation de paiement
      const emailResult = await EmailService.sendOrderConfirmation({
        ...order,
        shippingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          address: '123 Main St',
          city: 'Paris',
          postalCode: '75001',
          country: 'France',
        },
      });

      await this.logEmailEvent({
        orderId,
        type: 'payment_success',
        recipient: order.email,
        success: emailResult.success,
        messageId: emailResult.messageId,
        error: emailResult.error,
      });

      return emailResult;
    } catch (error) {
      console.error('Error handling payment success:', error);
      return { success: false, error: error.message };
    }
  }

  static async handlePaymentFailed(orderId: string, failureReason?: string) {
    try {
      // Mettre à jour le statut de la commande
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'failed' },
      });

      // Récupérer les détails
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          user: true,
        },
      });

      if (!order) return;

      // Envoyer un email d'échec de paiement
      const emailResult = await EmailService.sendPaymentFailed(order, failureReason);

      await this.logEmailEvent({
        orderId,
        type: 'payment_failed',
        recipient: order.email,
        success: emailResult.success,
        messageId: emailResult.messageId,
        error: emailResult.error,
      });

      return emailResult;
    } catch (error) {
      console.error('Error handling payment failure:', error);
      return { success: false, error: error.message };
    }
  }

  static async handleOrderShipped(orderId: string, trackingInfo?: any) {
    try {
      // Mettre à jour le statut de la commande
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'shipped' },
      });

      // Récupérer les détails
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          user: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!order) return;

      // Envoyer un email d'expédition
      const emailResult = await EmailService.sendOrderShipped(order, trackingInfo);

      await this.logEmailEvent({
        orderId,
        type: 'order_shipped',
        recipient: order.email,
        success: emailResult.success,
        messageId: emailResult.messageId,
        error: emailResult.error,
      });

      return emailResult;
    } catch (error) {
      console.error('Error handling order shipped:', error);
      return { success: false, error: error.message };
    }
  }

  static async handleUserRegistered(userId: string) {
    try {
      // Récupérer les détails de l'utilisateur
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) return;

      // Envoyer un email de bienvenue
      const emailResult = await EmailService.sendWelcomeEmail(user);

      await this.logEmailEvent({
        userId,
        type: 'welcome',
        recipient: user.email,
        success: emailResult.success,
        messageId: emailResult.messageId,
        error: emailResult.error,
      });

      return emailResult;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error: error.message };
    }
  }

  private static async logEmailEvent(data: {
    orderId?: string;
    userId?: string;
    type: string;
    recipient: string;
    success: boolean;
    messageId?: string;
    error?: string;
  }) {
    try {
      // Pour l'instant, on log juste dans la console
      // Plus tard, on pourra créer une table email_logs
      console.log('Email event logged:', {
        ...data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging email event:', error);
    }
  }
}

export default EmailEventService;
