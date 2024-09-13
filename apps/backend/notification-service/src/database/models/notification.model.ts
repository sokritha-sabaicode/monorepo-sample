import mongoose from 'mongoose';

// Define TypeScript interface for Notification
export interface INotification {
  userId: string;
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  }
}

// Define the Notification schema
const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  endpoint: { type: String, required: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true }
  }
}, {
  timestamps: true,
  toObject: {
    transform: function (_doc, ret) {
      delete ret.__v;
      ret._id = ret._id.toString();
    }
  }
});

// Create a Mongoose model
const NotificationModel = mongoose.model<INotification>('Notification', notificationSchema);

export default NotificationModel;