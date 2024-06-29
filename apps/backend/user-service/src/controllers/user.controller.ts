import { UserProfileError, UserCreationParams, UserProfileResponse, UserProfile } from 'ms-libs/types';
import {
  Controller,
  Get,
  Post,
  Path,
  Route,
  SuccessResponse,
  Body,
  Middlewares
} from "tsoa";
import UserService from '@/src/services/user.service';
import sendResponse from '@/src/utils/send-response';
import loggerRequest from '@/src/middewares/logger-request';


@Route("v1/users")
export class UsersController extends Controller {
  @Get("{userId}")
  @Middlewares(loggerRequest)
  public async getUserProfile(
    @Path() userId: string
  ): Promise<UserProfileResponse | UserProfileError> {
    try {
      const response = await UserService.getUserById(userId);

      const user: UserProfile = {
        id: response._id.toString(),
        email: response.email,
        username: response.username
      };

      return sendResponse<UserProfile>({ message: 'success', data: user })
    } catch (error) {
      console.error(`UsersController - getUserProfile() method error: `, error)

      this.setStatus(404); // Set HTTP status code to 404
      return { message: 'failed', error: "not found" };
    }
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<UserProfileResponse | UserProfileError> {
    try {
      const response = await UserService.createNewUser(requestBody);

      const newUser = {
        id: response._id.toString(),
        username: response.username,
        email: response.email
      }

      this.setStatus(201); // set return status 201
      return sendResponse({ message: 'success', data: newUser })
    } catch (error) {
      console.error(`UsersController - createUser() method error: `, error)

      this.setStatus(500); // Set HTTP status code to 404
      return { message: 'failed', error: "something went wrong" };
    }
  }
}