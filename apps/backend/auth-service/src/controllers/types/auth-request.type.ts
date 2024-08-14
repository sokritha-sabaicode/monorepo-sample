export interface SignupRequest {
  name?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  role?: "admin" | "user";
}

export interface VerifyUserRequest {
  email?: string;
  phone_number?: string;
  code: string;
}

export interface LoginRequest {
  email?: string;
  phone_number?: string;
  password?: string;
}

export interface GoogleCallbackRequest {
  code?: string;
  state?: string;
  error?: string;
}