import { PaginationResponse } from "./common.interface";

export interface IUser {
  _id?: string;
  sub?: string;
  googleSub?: string;
  facebookSub?: string;
  username?: string;
  email?: string;
  gender?: string;
  age?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserProfileResponse {
  message: string;
  data: IUser;
}

export interface UsersPaginatedResponse {
  message: string;
  data: PaginationResponse<IUser>;
}

export interface UserCreationRequestParams {
  sub?: string;
  googleSub?: string;
  facebookSub?: string;
  email?: string;
  phone_number?: string;
  username: string;
}

export interface UserUpdateRequestParams {
  sub?: string;
  googleSub?: string;
  facebookSub?: string;
  username?: string;
  gender?: string;
  age?: number;
}






