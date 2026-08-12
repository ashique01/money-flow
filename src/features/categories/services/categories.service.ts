import { api } from "@/lib/api";

import { API } from "@/lib/endpoints";

import {
  Category,
  CreateCategoryInput,
} from "../types";

export async function getCategories(email: string) {
  return api.get<Category[]>(
    API.CATEGORIES,
    {
      email,
    }
  );
}

export async function createCategory(
  data: CreateCategoryInput
) {
  return api.post(
    API.CREATE_CATEGORY,
    data
  );
}

export async function updateCategory(
  data: Partial<Category>
) {
  return api.post(
    API.UPDATE_CATEGORY,
    data
  );
}

export async function deleteCategory(
  id: string
) {
  return api.post(
    API.DELETE_CATEGORY,
    {
      id,
    }
  );
}