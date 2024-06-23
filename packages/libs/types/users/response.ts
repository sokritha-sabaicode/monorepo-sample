export interface UserProfileResponse {
  id: string;
  email: string;
  username: string;
}

export interface UserProfileError {
  message: string;
  error: string | object[];
}