import mongoose, { Schema } from "mongoose";

export interface IConversation {
  participants: string[];
  roomId: string;
  username: string;
  userProfile: string;
  companyName: string;
  companyProfile: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ConversationSchema: Schema = new Schema({
  participants: { type: [String], required: true },
  roomId: { type: String, required: true, unique: true },
  username: String,
  userProfile: String,
  companyName: String,
  companyProfile: String
},
  { timestamps: true }
)

// Add a unique compound index for participants
ConversationSchema.index({ participants: 1 }, { unique: true });

const ConversationModel = mongoose.model<IConversation>("Conversation", ConversationSchema)

export default ConversationModel