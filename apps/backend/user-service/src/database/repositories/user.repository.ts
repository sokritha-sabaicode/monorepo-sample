import UserModel from "@/src/database/models/user.model";
import { UserCreationParams } from "ms-libs/types";

class UserRepository {
  async findById(userId: string) {
    try {
      const result = await UserModel.findById(userId);
      return result;
    } catch (error) {
      throw error
    }
  }

  async create(newInfo: UserCreationParams) {
    try {
      const result = await UserModel.create(newInfo);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserRepository();
