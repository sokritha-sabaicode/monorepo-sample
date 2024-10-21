import mongoose, { Schema, Types } from "mongoose";

export interface IMessage {
  text: string;
  senderId: string;
  recipientId: string;
  conversationId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const MessageSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    senderId: { type: String, required: true },
    recipientId: { type: String, required: true },
    conversationId: { type: Types.ObjectId, required: true, ref: 'Conversation' },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
