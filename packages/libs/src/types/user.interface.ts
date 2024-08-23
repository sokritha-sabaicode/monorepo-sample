import { PaginationResponse } from "./common.interface";

export interface IUser {
  _id?: string;
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
  email?: string;
  phone_number?: string;
  username: string;
}

export interface UserUpdateRequestParams {
  username?: string;
  gender?: string;
  age?: number;
}






