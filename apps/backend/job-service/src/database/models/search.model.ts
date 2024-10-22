import mongoose, { Schema } from 'mongoose';

// Interface for the search history document
export interface IUserSearchHistory {
  userId?: string; // Optional because anonymous users don't have a userId
  query: string;
  timestamp: Date;
}

// Define the schema for search history
const UserSearchHistorySchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Refers to the User model
    default: null, // Anonymous users won't have a userId
  },
  query: {
    type: String,
    required: true, // The search query is required
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set the timestamp when the search is made
  },
});

// Create the model
const UserSearchHistoryModel = mongoose.model<IUserSearchHistory>(
  'UserSearchHistory',
  UserSearchHistorySchema
);

export default UserSearchHistoryModel;
