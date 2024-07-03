export interface UserFilterParams {
  gender?: string;
}

export interface UserSortParams {
  username?: 'asc' | 'desc';
  createdAt?: 'asc' | 'desc';
}


export interface UserGetAllRepoParams {
  page?: number;
  limit?: number;
  filter?: UserFilterParams;
  sort?: UserSortParams;
}

export interface UserCreationRepoParams {
  email: string;
  username: string;
  gender: string;
  age: number;
}

export interface UserUpdateRepoParams {
  id?: string;
  username?: string;
  gender?: string;
  age?: number;
}

export interface MongoError extends Error {
  code?: number;
  keyPattern?: { [key: string]: number };
}