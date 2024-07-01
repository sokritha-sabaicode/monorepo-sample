import { UserProfileResponse, UserProfile, UserCreationRequestParams, UserUpdateRequestParams } from 'ms-libs/types';
import {
  Controller,
  Get,
  Post,
  Path,
  Route,
  SuccessResponse,
  Body,
  Put,
  Delete,
  Queries,
} from "tsoa";
import UserService from '@/src/services/user.service';
import sendResponse from '@/src/utils/send-response';
import { prettyObject } from 'ms-libs/utils/logger';
import { UserGetAllControllerParams } from '@/src/controllers/types/user-controller.type';


@Route("v1/users")
export class UsersController extends Controller {
  @Get()
  public async getAllUsers(@Queries() queries: UserGetAllControllerParams) {
    try {
      const response = await UserService.getAllUsers(queries);

      return sendResponse({ message: 'success', data: response })
    } catch (error) {
      console.error(`UsersController - createUser() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationRequestParams
  ): Promise<UserProfileResponse> {
    try {
      const response = await UserService.createNewUser(requestBody);

      const newUser = {
        id: response._id.toString(),
        username: response.username,
        email: response.email,
        gender: response.gender
      }

      this.setStatus(201); // set return status 201
      return sendResponse({ message: 'success', data: newUser })
    } catch (error) {
      console.error(`UsersController - createUser() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  @Get("{userId}")
  public async getUserProfile(
    @Path() userId: string
  ): Promise<UserProfileResponse> {
    try {
      const response = await UserService.getUserById(userId);

      const user = {
        id: response._id.toString(),
        email: response.email,
        username: response.username,
        gender: response.gender
      };

      return sendResponse<UserProfile>({ message: 'success', data: user })
    } catch (error) {
      console.error(`UsersController - getUserProfile() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  @Put("{userId}")
  public async updateUserById(
    @Path() userId: string,
    @Body() updateUserInfo: UserUpdateRequestParams
  ): Promise<UserProfileResponse> {
    try {
      const newUpdateUserInfo = { id: userId, ...updateUserInfo }
      const response = await UserService.updateUserById(newUpdateUserInfo);

      const newUser = {
        id: response._id.toString(),
        username: response.username,
        email: response.email,
        gender: response.gender
      }

      return sendResponse({ message: 'success', data: newUser })
    } catch (error) {
      console.error(`UsersController - createUser() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  @SuccessResponse("204", "No Content")
  @Delete("{userId}")
  public async deleteUserById(
    @Path() userId: string,
  ): Promise<void> {
    try {
      await UserService.deleteUserById(userId);

    } catch (error) {
      console.error(`UsersController - createUser() method error: `, prettyObject(error as {}))
      throw error;
    }
  }
}