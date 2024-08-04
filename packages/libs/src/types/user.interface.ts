// =======================================
// User Model Interfaces
// =======================================

export interface IUser {
  _id: string;
  username: string;
  email: string;
  gender: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

// =======================================
// User Request Interfaces
// =======================================

export interface UserCreationRequestParams {
  email: string;
  username: string;
  gender: string;
  age: number;
}

export interface UserUpdateRequestParams {
  username?: string;
  gender?: string;
  age?: number;
}

export interface UserGetAllControllerParams {
  page?: number;
  limit?: number;
  filter?: string;
  sort?: string;
}

// =======================================
// User Response Interfaces
// =======================================

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

