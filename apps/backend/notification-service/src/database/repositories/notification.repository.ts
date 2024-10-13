import NotificationModel, { INotification } from "@/src/database/models/notification.model";
import { prettyObject } from "@sokritha-sabaicode/ms-libs";

class NotificationRepository {
  async saveSubscription(newSubscriber: INotification) {
    try {
      const notification = await NotificationModel.findOneAndUpdate(
        { userId: newSubscriber.userId },
        { endpoint: newSubscriber.endpoint, keys: newSubscriber.keys },
        {
          upsert: true, // Add if there is no existing userId
          new: true, // Return the new document
          setDefaultsOnInsert: true, // Set default values if creating a new document
        })

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
