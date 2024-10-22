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

  async findOrCreateConversation(userId: string, companyId: string, conversationData: Partial<IConversation>): Promise<IConversation | null> {
    try {
      const userObjectId = new Types.ObjectId(userId);
      const companyObjectId = new Types.ObjectId(companyId);

      // Sort the participants to ensure uniqueness regardless of order
      const participants = [userObjectId, companyObjectId].sort();

      const conversation = await ConversationModel.findOneAndUpdate(
        {
          participants
        },
        {
          $setOnInsert: {
            ...conversationData,
            participants
          }
        },
        {
          new: true, // Return the new document if created
          upsert: true, // Create the document if not found
        }
      );

      return conversation;
    } catch (error) {
      console.error("ConversationRepository findOrCreateConversation() error::: ", error);
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
