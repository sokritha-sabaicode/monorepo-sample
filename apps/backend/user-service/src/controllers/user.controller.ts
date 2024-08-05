import { UserProfileResponse, UserCreationRequestParams, UserUpdateRequestParams, UsersPaginatedResponse, UserGetAllControllerParams, prettyObject } from '@sokritha-sabaicode/ms-libs';
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
} from "tsoa";
import UserService from '@/src/services/user.service';
import sendResponse from '@/src/utils/send-response';
import { IUser } from '@/src/database/models/user.model';
import validateRequest from '@/src/middewares/validate-input';
import userJoiSchema from '@/src/schemas/user.schema';


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
      const response = await UserService.createNewUser(requestBody);

      this.setStatus(201); // set return status 201
      return sendResponse<IUser>({ message: 'success', data: response })
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
      const response = await UserService.updateUserById(newUpdateUserInfo);

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