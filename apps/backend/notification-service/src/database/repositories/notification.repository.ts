import NotificationModel, { INotification } from "@/src/database/models/notification.model";
import { prettyObject } from "@sokritha-sabaicode/ms-libs";

class NotificationRepository {
  async saveSubscription(newSubscriber: INotification) {
    try {
      console.log('newSubscriber', newSubscriber)
      const notification = new NotificationModel(newSubscriber);
      await notification.save();

      return notification;
    } catch (error) {
      console.error(`NotificationRepository - saveSubscription() method error: `, prettyObject(error as {}));
      throw error;
    }
  }

  async getSubscriptionsByUserId(userId: string) {
    try {
      const notification = await NotificationModel.find({ userId });
      return notification;
    } catch (error) {
      console.error(`NotificationRepository - getSubscriptionByUserId() method error: `, prettyObject(error as {}));
      throw error;
    }
  }

  async getSubscriptionByEndpoint(endpoint: string) {
    try {
      const notification = await NotificationModel.findOne({ endpoint });
      return notification;
    } catch (error) {
      console.error(`NotificationRepository - getSubscriptionByEndpoint() method error: `, prettyObject(error as {}));
      throw error;
    }
  }

  async deleteSubscription(id: string) {
    try {
      await NotificationModel.findByIdAndDelete(id);
    } catch (error) {
      console.error(`NotificationRepository - deleteSubscription() method error: `, prettyObject(error as {}));
      throw error;
    }
  }
}

export default new NotificationRepository();
