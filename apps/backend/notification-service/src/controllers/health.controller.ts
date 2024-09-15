import sendResponse from "@/src/utils/send-response";
import { Controller, Get, Route } from "tsoa";

@Route('v1/notifications')
export class HealthController extends Controller {
  @Get("/health")
  public async getHealth(): Promise<{ message: string }> {
    try {
      return sendResponse({ message: 'OK' })
    } catch (error) {
      throw error;
    }
  }
}
