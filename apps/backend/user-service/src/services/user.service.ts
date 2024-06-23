import UserRepository from "@/src/database/repositories/user.repository";
import { UserCreationParams } from "ms-libs/types";

class UserService {
  async getUserById(userId: string) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createNewUser(userInfo: UserCreationParams) {
    try {
      const newUser = await UserRepository.create(userInfo);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

}

export default new UserService();