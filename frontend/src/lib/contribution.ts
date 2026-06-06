import { api } from "./apiInstance";
import type { PageResponse } from "./types";

export type ContributionResponse = {
  id: number;
  amount: number;
  contributionType: string;
  memberId: number;
  memberFullName: string;
  description?: string;
  reference: string;
  date: string;
};

export type ContributionRequest = {
  amount: number;
  contributionType: "DONATION" | "OFFERING" | "OTHER" | "TITHE";
  memberId: number;
  description?: string;
  reference: string;
  date: string;
};

export const createContribution = async (
  contributionData: ContributionRequest,
): Promise<ContributionResponse> => {
  const response = await api.post("/contributions", contributionData);
  return response.data;
};

export const getContribution = async (
  contributionId: number,
): Promise<ContributionResponse> => {
  const response = await api.get(`/contributions/${contributionId}`);
  return response.data;
};


export const getContributionByMemberId = async (
  memberId: number,
  page: number,
  size: number,
): Promise<PageResponse<ContributionResponse>> => {
  const response = await api.get(
    `/contributions/member/${memberId}?page=${page}&size=${size}`,
  );
  return response.data;
};


export const getAllContributions = async (page: number, size: number): Promise<PageResponse<ContributionResponse>> => {
  const response = await api.get(`/contributions?page=${page}&size=${size}`);
  return response.data;
};

export const getContributionByDateRange = async(
  startDate:string, endDate:string, page:number,size:number
): Promise<PageResponse<ContributionResponse>> => {
  const response = await api.get(`/contributions/date-range?from=${startDate}&to=${endDate}&page=${page}&size=${size}`);
  return response.data;
}
