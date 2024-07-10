import { IUser } from "@/src/database/models/user.model";


export interface UsersPaginatedResponse {
  message: string;
  data: {
    [key: string]: IUser[] | number;
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }
}

export interface UserProfileResponse {
  message: string;
  data: IUser
}

