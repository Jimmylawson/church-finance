import { api } from "./apiInstance";
import type { PageResponse } from "./types";

export type ExpenseCategory =
  | "UTILITIES"
  | "EQUIPMENT"
  | "MORTGAGE"
  | "OTHER"
  | "OUTREACH"
  | "FOOD";

export type ExpenseResponse = {
  id: number;
  category: ExpenseCategory;
  amount: number;
  description?: string;
  reference?: string;
  date: string;
};

export type ExpenseRequest = {
  category: ExpenseCategory;
  amount: number;
  description?: string;
  reference?: string;
  date: string;
};

export type ExpensePatchRequest = Partial<ExpenseRequest>;

export type ExpenseFilters = {
  from?: string;
  to?: string;
};

export const createExpense = async (
  expenseData: ExpenseRequest,
): Promise<ExpenseResponse> => {
  const response = await api.post("/expenses", expenseData);
  return response.data;
};

export const getExpense = async (
  expenseId: number,
): Promise<ExpenseResponse> => {
  const response = await api.get(`/expenses/${expenseId}`);
  return response.data;
};

export const deleteExpense = async (expenseId: number): Promise<void> => {
  await api.delete(`/expenses/${expenseId}`);
};

export const patchExpense = async (
  expenseId: number,
  expenseData: ExpensePatchRequest,
): Promise<ExpenseResponse> => {
  const response = await api.patch(`/expenses/${expenseId}`, expenseData);
  return response.data;
};

export const getAllExpenses = async (
  page: number,
  size: number,
  filters?: ExpenseFilters,
): Promise<PageResponse<ExpenseResponse>> => {
  const response = await api.get("/expenses", {
    params: {
      page,
      size,
      ...(filters?.from ? { from: filters.from } : {}),
      ...(filters?.to ? { to: filters.to } : {}),
    },
  });

  return response.data;
};
