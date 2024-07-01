export interface UserCreationRequestParams {
  email: string;
  username: string;
  gender: string;
}

export interface UserUpdateRequestParams {
  username?: string;
  gender?: string;
}