import { api } from "./apiInstance";
import type { PageResponse } from "./types";

export type UserResponse = {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
};

export type UserRequest = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
};

export const createUser = async (
  userData: UserRequest,
): Promise<UserResponse> => {
  const response = await api.post("/users", userData);
  return response.data;
};

export const getUser = async (userId: number): Promise<UserResponse> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await api.delete(`/users/${userId}`);
};

//patch user
export type UserPatchRequest = Partial<UserRequest>;

export const patchUser = async (
  userId: number,
  userData: UserPatchRequest,
): Promise<UserResponse> => {
  const response = await api.patch(`/users/${userId}`, userData);
  return response.data;
};

export const getAllUsers = async (
  page: number,
  size: number,
): Promise<PageResponse<UserResponse>> => {
  const response = await api.get(`/users?page=${page}&size=${size}`);
  return response.data;
};
