export interface UserProfile {
  id: string;
  email: string;
  username: string;
}

export interface UserProfileResponse {
  message: string;
  data: UserProfile
}