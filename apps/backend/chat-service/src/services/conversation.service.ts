import { ConversationRepository } from "@/src/database/repositories/conversation.repository";
import { IConversation } from '../database/models/conversation.model';
import { generateRoomId } from '../utils/crypto';
import { CreateConversationParams } from "@/src/controllers/conversation.controller";

export class ConversationService {
  private conversationRepository: ConversationRepository;

  constructor() {
    this.conversationRepository = new ConversationRepository();
  }

  async getOrCreateConversation(params: CreateConversationParams): Promise<IConversation> {
    try {
      const conversationData = {
        companyName: params.companyName,
        companyProfile: params.companyProfile,
        username: params.username,
        userProfile: params.userProfile,
        roomId: generateRoomId(params.userId!, params.companyId)
      };

      // Perform find or create operation
      const conversation = await this.conversationRepository.findOrCreateConversation(params.userId!, params.companyId, conversationData);

      return conversation as IConversation;
    } catch (error) {
      console.error('ConversationService getOrCreateConversation() method error::: ', error);
      throw error;
    }
  }

  async createConversation(params: CreateConversationParams): Promise<IConversation> {
    try {
      const roomId = generateRoomId(params.userId!, params.companyId);
      const room: IConversation = {
        participants: [params.userId!, params.companyId],
        companyName: params.companyName,
        companyProfile: params.companyProfile,
        username: params.username,
        userProfile: params.userProfile,
        roomId,
      }

      const result = await this.conversationRepository.createConversation(room)
      return result;
    } catch (error) {
      console.error('ConversationService sendMessage() method error::: ', error);
      throw error;
    }
  }

  async getConversations(userId: string): Promise<IConversation[]> {
    try {
      const conversations = await this.conversationRepository.getUserConversations(userId);

      return conversations;
    } catch (error) {
      console.error('ConversationService getConversations() method error::: ', error);
      throw error;
    }
  }
}

