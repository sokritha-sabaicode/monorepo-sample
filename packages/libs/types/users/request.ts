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