import { api } from "@/lib/api";
import { API } from "@/lib/endpoints";

import {
  Account,
  CreateAccountInput,
  UpdateAccountInput,
} from "../types";

export interface CreateAccountPayload extends CreateAccountInput {
  email: string;
}

export interface ToggleAccountPayload {
  id: string;
  email: string;
}

export async function getAccounts(email: string): Promise<Account[]> {
  return api.get<Account[]>(API.ACCOUNTS, {
    email,
  });
}

export async function createAccount(data: CreateAccountPayload) {
  return api.post(API.CREATE_ACCOUNT, data);
}

export async function updateAccount(data: UpdateAccountInput) {
  return api.post(API.UPDATE_ACCOUNT, data);
}

export async function toggleAccountStatus(
  data: ToggleAccountPayload,
): Promise<{ status: string }> {
  return api.post(API.TOGGLE_ACCOUNT, data);
}

export async function deleteAccount(id: string, email: string) {
  return api.post(API.DELETE_ACCOUNT, {
    id,
    email,
  });
}