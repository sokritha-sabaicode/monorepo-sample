import configs from "@/src/config";
import { Job } from "agenda";
import axios from "axios";

export const sendNewRegistrationNotification = async (job: Job) => {
  console.log('JOBs: ', job)
  const { userId } = job.attrs.data;

  try {
    await axios.post(`${configs.notificationServiceUrl}/v1/notifications/push-notification`, {
      title: 'Welcome to our app!',
      body: `Welcome to our app, ${userId}!`
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `user_id=${userId}`
      }
    });
    console.log(`Notification send for user: ${userId}`)
  } catch (error) {
    console.error(`sendNewRegistrationNotification() method error: `, error);
    throw error;
  };
}