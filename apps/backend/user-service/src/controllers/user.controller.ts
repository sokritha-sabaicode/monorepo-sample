import { UserProfileResponse } from 'ms-libs/types';
import {
  Controller,
  Get,
  Path,
  Route,
} from "tsoa";


@Route("users")
export class UsersController extends Controller {
  @Get("{userId}")
  public getUser(
    @Path() userId: string
  ): UserProfileResponse {
    return {
      id: userId,
      email: "sokritha.it@gmail.com",
      username: "sokritha"
    };
  }
}