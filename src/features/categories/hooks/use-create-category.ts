"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { createCategory } from "../services/categories.service";

import { CreateCategoryInput } from "../types";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryInput) => createCategory(data),

    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      toast.success("Category created successfully");
    },

    onError(error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create category",
      );
    },
  });
}
