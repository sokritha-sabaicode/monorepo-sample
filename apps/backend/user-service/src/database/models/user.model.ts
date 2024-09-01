import mongoose from 'mongoose';

// Define TypeScript interface for User
export interface IUser {
  _id: string;
  sub: string;
  googleSub: string;
  facebookSub: string;
  username: string;
  email: string;
  phone_number: string;
  profile: string;
  gender: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const userSchema = new mongoose.Schema({
  sub: { type: String },
  googleSub: { type: String },
  facebookSub: { type: String },
  username: { type: String, required: true },
  email: { type: String, unique: true },
  phone_number: { type: String },
  profile: { type: String, default: 'https://postimg.cc/Mn1MzLLT' },
  gender: { type: String },
  age: { type: Number }
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