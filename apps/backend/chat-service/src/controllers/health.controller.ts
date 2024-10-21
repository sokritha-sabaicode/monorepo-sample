import { Controller, Get, Route } from "tsoa";
import sendResponse from "../utils/send-response";
 
@Route('v1/chat')
export class HealthController extends Controller {
  @Get("/health")
  public async getHealth(): Promise<{ message: string, data: string }> {
    try { 
      return sendResponse({ message: 'OK',data: '' })
    } catch (error) {
      throw error;
    }
  }
}
