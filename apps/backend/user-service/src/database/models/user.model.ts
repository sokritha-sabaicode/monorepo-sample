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
  role: string;
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
  age: { type: Number },
  role: { type: String, default: 'user' }
}, {
  timestamps: true,
  toObject: {
    transform: function (_doc, ret) {
      delete ret.__v;
      ret._id = ret._id.toString();
    }
  }
});

userSchema.index({ email: 1 }, { unique: true });


// Add custom validation to ensure that either email or phone_number is present
userSchema.path('email').validate(function (value) {
  // If email is not provided, phone_number must be present
  if (!value && !this.phone_number) {
    return false;
  }
  return true;
}, 'Either email or phone_number must be provided.');

userSchema.path('phone_number').validate(function (value) {
  // If phone_number is not provided, email must be present
  if (!value && !this.email) {
    return false;
  }
  return true;
}, 'Either phone_number or email must be provided.');

// Create a Mongoose model
const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;