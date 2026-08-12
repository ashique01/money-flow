"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { toggleAccountStatus } from "../services/accounts.service";

import { useAuthStore } from "@/store/auth-store";

interface Props {
  id: string;
}

export function ToggleStatusButton({ id }: Props) {
  const queryClient = useQueryClient();

  const email = useAuthStore((state) => state.email);

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!email) {
        throw new Error("User not logged in");
      }

      return toggleAccountStatus({
        id,
        email,
      });
    },

    onSuccess: (data) => {
      toast.success(`Account marked ${data.status}`);

      queryClient.invalidateQueries({
        queryKey: ["accounts", email],
      });
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update account",
      );
    },
  });

  return (
    <button
      type="button"
      disabled={isPending}
      className="text-sm text-primary underline hover:text-primary/80 disabled:opacity-50"
      onClick={() => mutate()}
    >
      {isPending ? "Updating..." : "Toggle Status"}
    </button>
  );
}
