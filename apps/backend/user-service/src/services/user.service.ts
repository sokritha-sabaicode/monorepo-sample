import UserRepository from "@/src/database/repositories/user.repository";
import { UserCreationParams } from "ms-libs/types";

class UserService {
  async getUserById(userId: string) {
    try {
      const user = await UserRepository.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error(`UserService - getUserById() method error: `, error)

      throw error;
    }

  }

  async createNewUser(userInfo: UserCreationParams) {
    try {
      const newUser = await UserRepository.create(userInfo);
      return newUser;
    } catch (error) {
      console.error(`UserService - createNewUser() method error: `, error)

      throw error;
    }
  }

}

export default new UserService();