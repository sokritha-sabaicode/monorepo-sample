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
import { IUser } from '@/src/database/models/user.model';
import validateRequest from '@/src/middewares/validate-input';
import userJoiSchema from '@/src/schemas/user.schema';
import { UsersPaginatedResponse, prettyObject, UserCreationRequestParams, UserProfileResponse, UserUpdateRequestParams } from "@sokritha-sabaicode/ms-libs";
import { UserGetAllControllerParams } from "@/src/controllers/types/user-controller.type";
import { Request as ExpressRequest } from 'express';


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
      console.log('requestBody', requestBody)
      const response = await UserService.createNewUser(requestBody);

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
      console.log('sub', sub)

      const response = await UserService.getUserBySub(sub);

      return sendResponse<IUser>({ message: 'success', data: response })
    } catch (error) {
      console.error(`UsersController - getUserProfile() method error: `, prettyObject(error as {}))
      throw error;
    }
  }

  @Get("{userId}")
  public async getUserProfile(
    @Path() userId: string
  ): Promise<UserProfileResponse> {
    try {
      const response = await UserService.getUserById(userId);

      return sendResponse<IUser>({ message: 'success', data: response })
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