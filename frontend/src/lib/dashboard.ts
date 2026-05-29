import { api } from "./apiInstance";

export type DashboardResponse = {
  year: number;
  month: number;
  totalContributions: number;
  totalExpenses: number;
  totalBalance: number;
};

export const getDashBoardDate = async (
  dashboard: DashboardResponse,
): Promise<DashboardResponse> => {
  const response = await api.get(
    `/dashboard?year=${dashboard.year}&month=${dashboard.month}`,
  );
  return response.data;
};
