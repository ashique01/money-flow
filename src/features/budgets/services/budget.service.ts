import { Budget, CreateBudgetInput } from "../types";
import { api } from "@/lib/api";
import { API } from "@/lib/endpoints";

export async function getBudgets(): Promise<Budget[]> {
  return api.get<Budget[]>(API.BUDGETS);
}

export async function createBudget(data: CreateBudgetInput) {
  return api.post(API.CREATE_BUDGET, data);
}

export async function updateBudget(budget_id: string, data: CreateBudgetInput) {
  return api.post(API.UPDATE_BUDGET, {
    budget_id,
    ...data,
  });
}

export async function deleteBudget(budget_id: string) {
  return api.post(API.DELETE_BUDGET, {
    budget_id,
  });
}
