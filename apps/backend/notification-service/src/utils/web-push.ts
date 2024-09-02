import configs from '@/src/config';
import webPush from 'web-push';

webPush.setVapidDetails(
  'mailto:sokritha.dev@gmail.com',
  configs.vapidPublicKey,
  configs.vapidPrivateKey
)

interface NotificationPayload {
  title: string;
  body: string;
  data: {}
}

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  }
}

export const sendNotification = async (subscription: PushSubscription, payload: NotificationPayload): Promise<void> => {
  try {
    await webPush.sendNotification(subscription, JSON.stringify(payload));
  } catch (error) {
    throw error;
  }
}