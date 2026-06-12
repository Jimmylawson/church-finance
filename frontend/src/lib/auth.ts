import axios from "axios";
import { SERVER_BASE_URL } from "./apiInstance";
import type { UserResponse } from "./users";

const authApi = axios.create({
  baseURL: `${SERVER_BASE_URL}/v1/api/auth`,
  withCredentials: true,
});

const OAUTH_BASE_URL = SERVER_BASE_URL.replace(/\/v1\/api\/?$/, "");
export const googleOAuthUrl = `${OAUTH_BASE_URL}/oauth2/authorize/google`;

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string | null;
  tokenType: string;
  expiresIn: number;
  expiresAt: string;
  user: UserResponse;
};

export const login = async (
  loginData: LoginRequest,
): Promise<LoginResponse> => {
  const response = await authApi.post("/login", loginData);
  return response.data;
};

export const register = async (
  registerData: RegisterRequest,
): Promise<LoginResponse> => {
  const response = await authApi.post("/register", registerData);
  return response.data;
};

export const refreshToken = async (): Promise<LoginResponse> => {
  const response = await authApi.post("/refresh-token");
  return response.data;
};

export const logout = async (): Promise<void> => {
  await authApi.post("/logout");
};

export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await authApi.get("/me");
  return response.data;
};
