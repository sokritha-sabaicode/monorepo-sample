import { IConversation } from "@/src/database/models/conversation.model";
import { ConversationService } from "@/src/services/conversation.service";
import sendResponse from "@/src/utils/send-response";
import { Route, Controller, Post, Body, Request, Get, Path } from "tsoa";
import { Request as ExpressRequest } from 'express';
import { IMessage } from "@/src/database/models/message.model";
import { MessageService } from "@/src/services/message.service";

export interface CreateConversationParams {
  companyId: string,
  companyProfile: string,
  companyName: string,
  userId?: string,
  username: string,
  userProfile: string,
}


@Route("/v1/conversations")
export class ConversationController extends Controller {
  private conversationService: ConversationService;
  private messageService: MessageService;

  constructor() {
    super();
    this.conversationService = new ConversationService();
    this.messageService = new MessageService();
  }

  @Get("/")
  async getConversations(@Request() request: ExpressRequest): Promise<{ message: string, data: IConversation[] }> {
    try {
      const userId = request.cookies['user_id']

      const conversations = await this.conversationService.getConversations(userId)

      return sendResponse<IConversation[]>({ message: 'Conversation room was created successfully!', data: conversations })
    } catch (error) {
      console.error('ConversationController createConversation() method error::: ', error)
      throw error;
    }
  }

  @Post("/")
  async createConversation(@Request() request: ExpressRequest, @Body() requestBody: CreateConversationParams): Promise<{ message: string, data: IConversation }> {
    try {
      const userId = request.cookies['user_id']

      const newRoom = await this.conversationService.getOrCreateConversation({ ...requestBody, userId });

      return sendResponse<IConversation>({ message: 'Conversation room was created successfully!', data: newRoom })
    } catch (error) {
      console.error('ConversationController createConversation() method error::: ', error)
      throw error;
    }
  }

  @Post("/{conversationId}/messages")
  async saveMessage(@Body() requestBody: IMessage): Promise<IMessage> {
    const { text, senderId, recipientId, conversationId } = requestBody;
    return this.messageService.saveMessage({ text, senderId, recipientId, conversationId });
  }

  @Get("/{conversationId}/messages")
  async getMessagesByConversationId(@Path() conversationId: string): Promise<{ message: string, data: IMessage[] }> {
    try {
      console.log('conversation id::: ', conversationId)
      const result = await this.messageService.getMessagesByConversationId(conversationId);

      return sendResponse<IMessage[]>({ message: 'Get messages successfully', data: result })
    } catch (error) {
      console.error('MessageController getMessagesByConversationId() method error::: ', error);
      throw error;
    }
  }
}
