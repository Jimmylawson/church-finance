import { api } from "./apiInstance";
import type { PageResponse } from "./types";

export type MemberResponse = {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  active: boolean;
};

export type MemberRequest = {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  active?: boolean;
};

export const createMember = async (
  memberData: MemberRequest,
): Promise<MemberResponse> => {
  const response = await api.post("/members", memberData);
  return response.data;
};

export const getMember = async (memberId: number): Promise<MemberResponse> => {
  const response = await api.get(`/members/${memberId}`);
  return response.data;
};

export const deleteMember = async (memberId: number): Promise<void> => {
  await api.delete(`/members/${memberId}`);
};

export type MemberPatchRequest = Partial<MemberRequest>;

export const patchMember = async (
  memberId: number,
  memberData: MemberPatchRequest,
): Promise<MemberResponse> => {
  const response = await api.patch(`/members/${memberId}`, memberData);
  return response.data;
};

export const getAllMembers = async (
  page: number,
  size: number,
): Promise<PageResponse<MemberResponse>> => {
  const response = await api.get(`/members?page=${page}&size=${size}`);
  return response.data;
};
