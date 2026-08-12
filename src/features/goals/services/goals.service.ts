import { api } from "@/lib/api";

import { API } from "@/lib/endpoints";

import { Goal, CreateGoalInput } from "../types";

export async function getGoals(email: string) {
  return api.get<Goal[]>(API.GOALS, {
    email,
  });
}

export async function createGoal(data: CreateGoalInput) {
  return api.post(API.CREATE_GOAL, data);
}

export async function updateGoal(data: Partial<Goal>) {
  return api.post(API.UPDATE_GOAL, data);
}

export async function deleteGoal(id: string) {
  return api.post(API.DELETE_GOAL, {
    id,
  });
}