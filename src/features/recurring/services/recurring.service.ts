import { api } from "@/lib/api";

import { API } from "@/lib/endpoints";

import { RecurringTransaction, CreateRecurringInput } from "../types";

export async function getRecurring() {
  return api.get<RecurringTransaction[]>(API.RECURRING);
}

export async function createRecurring(data: CreateRecurringInput) {
  return api.post(API.CREATE_RECURRING, data);
}

export async function updateRecurring(
  recurring_id: string,
  data: Partial<CreateRecurringInput>,
) {
  return api.post(API.UPDATE_RECURRING, { recurring_id, ...data });
}

export async function deleteRecurring(id: string) {
  return api.post(API.DELETE_RECURRING, {
    id,
  });
}
