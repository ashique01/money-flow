"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { deleteCategory } from "../services/categories.service";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),

    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      toast.success("Category deleted successfully");
    },

    onError(error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete category",
      );
    },
  });
}
