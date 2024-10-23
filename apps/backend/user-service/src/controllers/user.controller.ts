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
  Middlewares,
  Request
} from "tsoa";
import UserService from '@/src/services/user.service';
import sendResponse from '@/src/utils/send-response';
import validateRequest from '@/src/middewares/validate-input';
import userJoiSchema from '@/src/schemas/user.schema';
import { UsersPaginatedResponse, prettyObject, UserCreationRequestParams, UserProfileResponse, UserUpdateRequestParams, IUser } from "@sokritha-sabaicode/ms-libs";
import { UserGetAllControllerParams } from "@/src/controllers/types/user-controller.type";
import { Request as ExpressRequest } from 'express';
import agenda from "@/src/utils/agenda";
import { SCHEDULE_JOBS } from "@/src/jobs";


@Route("v1/users")
export class UsersController extends Controller {
  @Get()
  public async getAllUsers(@Queries() queries: UserGetAllControllerParams): Promise<UsersPaginatedResponse> {
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
  @Middlewares(validateRequest(userJoiSchema))
  public async createUser(
    @Body() requestBody: UserCreationRequestParams
  ): Promise<UserProfileResponse> {
    try {
      // Create New User
      const response = await UserService.createNewUser(requestBody);

      // Schedule Notification Job 1 Minute Later
      await agenda.schedule('in 1 minutes', SCHEDULE_JOBS.NOTIFICATION_NEW_REGISTRATION, { userId: response._id })

      this.setStatus(201); // set return status 201
      return sendResponse<IUser>({ message: 'success', data: response })
    } catch (error) {
      console.error(`UsersController - createUser() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  @Get("/me")
  public async getMe(
    @Request() request: ExpressRequest
  ): Promise<UserProfileResponse> {
    try {
      const sub = request.cookies['username']

      const response = await UserService.getUserBySub(sub);

      return sendResponse<IUser>({ message: 'success', data: response })
    } catch (error) {
      console.error(`UsersController - getUserProfile() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  @Post('/me/favorites')
  public async addFavorite(
    @Request() request: ExpressRequest,
    @Body() body: { jobId: string }
  ): Promise<UserProfileResponse> {
    try {
      const userId = request.cookies['user_id']
      const { jobId } = body;

      const response = await UserService.addFavorite(userId, jobId);

      return sendResponse<IUser>({ message: 'Favorite added successfully', data: response });
    } catch (error) {
      console.error(`UsersController - addFavorite() method error: `, prettyObject(error as {}));
      throw error;
    }
  }

  @Get('/me/favorites')
  public async getFavorites(
    @Request() request: ExpressRequest
  ): Promise<{ message: string; data: string[] }> {
    try {
      const userId = request.cookies['user_id']

      const favorites = await UserService.getUserFavorites(userId);

      return sendResponse<string[]>({ message: 'success', data: favorites });
    } catch (error) {
      console.error(`UsersController - getFavorites() method error: `, prettyObject(error as {}));
      throw error;
    }
  }

  @Delete('/me/favorites/{jobId}')
  public async removeFavorite(
    @Request() request: ExpressRequest,
    @Path() jobId: string
  ): Promise<UserProfileResponse> {
    try {
      const userId = request.cookies['user_id']

      const response = await UserService.removeFavorite(userId, jobId);

      return sendResponse<IUser>({ message: 'Favorite removed successfully', data: response });
    } catch (error) {
      console.error(`UsersController - removeFavorite() method error: `, prettyObject(error as {}));
      throw error;
    }
  }

  @Get("/{userId}")
  public async getUserProfile(
    @Path() userId: string
  ): Promise<UserProfileResponse> {
    try {
      console.log('userId: ', userId)
      const response = await UserService.getUserBySub(userId);

      return sendResponse<IUser>({ message: 'success', data: response })
    } catch (error) {
      console.error(`UsersController - getUserProfile() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  @Put("/{userId}")
  public async updateUserById(
    @Path() userId: string,
    @Body() updateUserInfo: UserUpdateRequestParams
  ): Promise<UserProfileResponse> {
    try {
      const newUpdateUserInfo = { id: userId, ...updateUserInfo }
      const response = await UserService.updateUserBySub(newUpdateUserInfo);

      return sendResponse<IUser>({ message: 'success', data: response })
    } catch (error) {
      console.error(`UsersController - createUser() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  @SuccessResponse("204", "Delete Successful")
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