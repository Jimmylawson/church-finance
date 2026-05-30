import { api } from "./apiInstance";

export type DashboardResponse = {
  year: number;
  month: number;
  totalContributions: number;
  totalExpenses: number;
  totalBalance: number;
};

export type DashboardParams = {
  year?: number;
  month?: number;
  startDate?: string;
  endDate?: string;
};

export const getDashboardData = async (
  params?: DashboardParams,
): Promise<DashboardResponse> => {
  const response = await api.post("/dashboard", undefined, { params });
  return response.data;
};
