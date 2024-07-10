import { UserGetAllControllerParams } from "@/src/controllers/types/user-controller.type";
import { UserCreationRepoParams, UserUpdateRepoParams } from "@/src/database/repositories/types/user-repository.type";
import UserRepository from "@/src/database/repositories/user.repository";
import { prettyObject } from 'ms-libs/utils/logger';

class UserService {
  async getAllUsers(queries: UserGetAllControllerParams) {
    try {
      const { page, limit, filter, sort } = queries

      const newQueries = {
        page,
        limit,
        filter: filter && JSON.parse(filter),
        sort: sort && JSON.parse(sort)
      }
      const result = await UserRepository.getAll(newQueries);

      return result;
    } catch (error) {
      console.error(`UserService - getAllUsers() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await UserRepository.findById(userId);

      return user;
    } catch (error) {
      console.error(`UserService - getUserById() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  async createNewUser(userInfo: UserCreationRepoParams) {
    try {
      const newUser = await UserRepository.create(userInfo);

      return newUser;
    } catch (error) {
      console.error(`UserService - createNewUser() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  async updateUserById(userInfo: UserUpdateRepoParams) {
    try {
      const updatedUser = await UserRepository.updateById(userInfo);

      return updatedUser;
    } catch (error) {
      console.error(`UserService - createNewUser() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  async deleteUserById(userId: string) {
    try {
      await UserRepository.deleteById(userId);
    } catch (error) {
      console.error(`UserService - createNewUser() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

}

export default new UserService();