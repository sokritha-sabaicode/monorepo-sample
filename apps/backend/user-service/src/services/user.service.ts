import { UserGetAllControllerParams } from "@/src/controllers/types/user-controller.type";
import { IUser } from "@/src/database/models/user.model";
import { UserCreationRepoParams, UserUpdateRepoParams } from "@/src/database/repositories/types/user-repository.type";
import UserRepository from "@/src/database/repositories/user.repository";
import { prettyObject } from '@sokritha-sabaicode/ms-libs';

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

  async getUserBySub(sub: string) {
    try {
      const user = await UserRepository.findBySub(sub);

      return user;
    } catch (error) {
      console.error(`UserService - getUserById() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  async createNewUser(userInfo: UserCreationRepoParams) {
    try {
      console.log('userInfo', userInfo)
      const newUser = await UserRepository.create(userInfo);

      return newUser;
    } catch (error) {
      console.error(`UserService - createNewUser() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  async updateUserBySub(userInfo: UserUpdateRepoParams) {
    try {
      const updatedUser = await UserRepository.updateBySub(userInfo);

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

  async addFavorite(userId: string, jobId: string): Promise<IUser> {
    try {
      const user = await UserRepository.addFavorite(userId, jobId);
      return user;
    } catch (error) {
      console.error(`UserService - addFavorite() method error: `, prettyObject(error as {}));
      throw error;
    }
  }

  async removeFavorite(userId: string, jobId: string): Promise<IUser> {
    try {
      const user = await UserRepository.removeFavorite(userId, jobId);
      return user;
    } catch (error) {
      console.error(`UserService - removeFavorite() method error: `, prettyObject(error as {}));
      throw error;
    }
  }

  async getUserFavorites(userId: string): Promise<string[]> {
    try {
      const favorites = await UserRepository.getUserFavorites(userId);
      return favorites;
    } catch (error) {
      console.error(`UserService - getUserFavorites() method error: `, prettyObject(error as {}));
      throw error;
    }
  }
}

export default new UserService();