import { APIErrorResponse, APIResponse } from "./common.interface";

export interface SignupRequest {
  sur_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  role?: "admin" | "user";
}
export interface SignupResponse extends APIResponse, APIErrorResponse { }


export interface VerifyUserRequest {
  email?: string;
  phone_number?: string;
  code: string;
}
export interface VerifyUserResponse extends APIResponse, APIErrorResponse { }


export interface LoginRequest {
  email?: string;
  phone_number?: string;
  password?: string;
}
export interface LoginResponse extends APIResponse, APIErrorResponse { }


export interface GoogleCallbackRequest {
  code?: string;
  state?: string;
  error?: string;
}
export interface GoogleCallbackResponse extends APIResponse, APIErrorResponse { }