import {
  Controller,
  Route,
  Post,
  Body,
  Request,
  Delete,
  SuccessResponse
} from "tsoa";
import NotificationService, { NotificationPayload } from "@/src/services/notification.service";
import { Request as ExpressRequest } from "express";
import sendResponse from "@/src/utils/send-response";
import { INotification } from "@/src/database/models/notification.model";


interface PushSubscriptionParams {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  }
}

interface SubscriptionNotificationResponse {
  message: string;
  data: INotification;
}


@Route("v1/notifications")
export class NotificationsController extends Controller {

  @Post('/subscribe')
  public async subscribe(@Request() request: ExpressRequest, @Body() body: PushSubscriptionParams): Promise<SubscriptionNotificationResponse> {
    try {
      console.log('body', body)
      const userId = request.cookies['user_id']

      const newSubscription = await NotificationService.subscribe({ userId, ...body });

      // Send welcome notification after successful subscription
      const welcomeMessage: NotificationPayload = {
        title: 'Welcome!',
        body: 'Thank you for subscribing to our notifications.',
      };
      await NotificationService.sendNotification(userId, welcomeMessage);

      return sendResponse<INotification>({ message: 'Subscription successful', data: newSubscription });
    } catch (error) {
      throw error;
    }
  }

  @Post('/push-notification')
  public async pushNotification(@Request() request: ExpressRequest, @Body() body: NotificationPayload): Promise<void> {
    try {
      const userId = request.cookies['user_id']

      await NotificationService.sendNotification(userId, body);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/unsubscribe')
  @SuccessResponse('204', 'Unsubscribed')
  public async unsubscribe(@Body() endpoint: string): Promise<void> {
    try {
      await NotificationService.unsubscribe(endpoint);
    } catch (error) {
      throw error;
    }
  }
}