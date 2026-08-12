"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { updateCategory } from "../services/categories.service";

import { Category } from "../types";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Category>) => updateCategory(data),

    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      toast.success("Category updated successfully");
    },

    onError(error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update category",
      );
    },
  });
}
