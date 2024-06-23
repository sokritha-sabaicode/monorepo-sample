import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Create a Mongoose model
const UserModel = mongoose.model('User', userSchema);

export default UserModel;