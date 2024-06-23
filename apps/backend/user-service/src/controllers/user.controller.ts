import { UserProfileError, UserProfileResponse, UserCreationParams } from 'ms-libs/types';
import {
  Controller,
  Get,
  Post,
  Path,
  Route,
  SuccessResponse,
  Body
} from "tsoa";
import UserService from '@/src/services/user.service';


@Route("v1/users")
export class UsersController extends Controller {
  @Get("{userId}")
  public async getUser(
    @Path() userId: string
  ): Promise<UserProfileResponse | UserProfileError> {
    try {
      const user = await UserService.getUserById(userId);
      return {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
      };
    } catch (error) {
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
      this.setStatus(201); // set return status 201
      const newUser = await UserService.createNewUser(requestBody);

      return {
        id: newUser._id.toString(),
        email: newUser.email,
        username: newUser.username
      }
    } catch (error) {
      throw error;
    }
  }
}