import mongoose from 'mongoose';

// Define TypeScript interface for User
export interface IUser {
  _id: string;
  username: string;
  email: string;
  gender: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true }
}, {
  timestamps: true,
  toObject: {
    transform: function (_doc, ret) {
      delete ret.__v;
      ret._id = ret._id.toString();
    }
  }
});

// Create a Mongoose model
const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;