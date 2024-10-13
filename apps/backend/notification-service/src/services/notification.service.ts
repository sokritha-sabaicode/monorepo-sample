import { InvalidInputError, prettyObject } from "@sokritha-sabaicode/ms-libs";
import webpush from 'web-push';
import configs from '@/src/config';
import NotificationRepository from '@/src/database/repositories/notification.repository';
import { INotification } from "@/src/database/models/notification.model";

export interface NotificationPayload {
  title: string;
  body: string;
  data?: {}
}

export interface NotificationErrorResponse {
  success: boolean;
  endpoint: string;
  error: string;
}

class NotficationService {
  constructor() {
    webpush.setVapidDetails(
      'mailto:sokritha.dev@gmail.com',
      configs.vapidPublicKey,
      configs.vapidPrivateKey
    )
  }

  async subscribe(subscription: INotification) {
    try {
      const newNotification = await NotificationRepository.saveSubscription(subscription);
      return newNotification;
    } catch (error) {
      console.error(`NotificationService - subscribe() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  async sendNotification(userId: string, payload: NotificationPayload): Promise<INotification[] | NotificationErrorResponse[]> {
    try {
      const notifications = await NotificationRepository.getSubscriptionsByUserId(userId);
      if (!notifications) {
        throw new InvalidInputError({ message: 'Notification subscription not found' });
      }

      const sendPromises = notifications.map((subscription) => {
        const pushSubscription = {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.keys.p256dh,
            auth: subscription.keys.auth
          }
        }

        return webpush.sendNotification(pushSubscription, JSON.stringify(payload)).catch((error) => {
          return {
            success: false,
            endpoint: subscription.endpoint,
            error: error.message
          }
        });
      });

      const results = await Promise.all(sendPromises);
      return results as INotification[] | NotificationErrorResponse[];
    } catch (error) {
      console.error(`NotificationService - sendNotification() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  async unsubscribe(endpoint: string) {
    try {
      const subscription = await NotificationRepository.getSubscriptionByEndpoint(endpoint);
      if (!subscription) {
        throw new InvalidInputError({ message: 'Notification subscription not found' });
      }

      await NotificationRepository.deleteSubscription(subscription._id.toString());
    } catch (error) {
      console.error(`NotificationService - unsubscribe() method error: `, prettyObject(error as {}))
      throw error;
    }
  }
}

export default new NotficationService();