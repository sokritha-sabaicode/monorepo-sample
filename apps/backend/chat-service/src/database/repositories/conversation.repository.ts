import ConversationModel, { IConversation } from "@/src/database/models/conversation.model";
import { Types } from "mongoose";


export class ConversationRepository {
  async createConversation(conversation: IConversation): Promise<IConversation> {
    try {
      const result = await ConversationModel.create(conversation);
      return result;
    } catch (error) {
      console.error("ConversationRepository createConversation() method error::: ", error);
      throw error;
    }
  }

  async checkIfConversationExist(userId: string, companyId: string): Promise<IConversation | null | undefined> {
    try {
      const userObjectId = new Types.ObjectId(userId);
      const companyObjectId = new Types.ObjectId(companyId);

      const result = await ConversationModel.findOne({
        participants: { $all: [userObjectId, companyObjectId] },
      })

      return result || null;
    } catch (error) {
      console.error("ConversationRepository checkIfConversationExist() method error::: ", error)
      throw error;
    }
  }

  async getUserConversations(userId: string) {
    try {
      // Find all conversations where the userId is in the participants array
      const conversations = await ConversationModel.find({ participants: userId });
  
      // Return the list of conversations (or an empty array if none are found)
      return conversations;
    } catch (error) {
      console.error("ConversationRepository getUserConversations() method error::: ", error);
      throw error;
    }
  }
}
