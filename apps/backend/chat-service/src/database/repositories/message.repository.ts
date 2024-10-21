import MessageModel, { IMessage } from "@/src/database/models/message.model";


export class MessageRepository {
  async createMessage(data: IMessage): Promise<IMessage> {
    try {
      const message = new MessageModel(data);
      const result = message.save();

      return result;
    } catch (error) {
      console.error('MessageRepository createMessage() method error::: ', error)
      throw error;
    }
  }

  async getMessagesByConversationId(conversationId: string): Promise<IMessage[]> {
    try {
      const messages = MessageModel.find({ conversationId }).sort({ createdAt: 1 }).exec();

      return messages;
    } catch (error) {
      console.error('MessageRepository getMessagesByConversationId() method error::: ', error)
      throw error;
    }
  }
}
