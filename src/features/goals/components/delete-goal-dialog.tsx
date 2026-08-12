"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Goal } from "../types";

import { useDeleteGoal } from "../hooks/use-delete-goal";

interface Props {
  goal: Goal | null;

  open: boolean;

  onClose: () => void;
}

export default function DeleteGoalDialog({ goal, open, onClose }: Props) {
  const mutation = useDeleteGoal();

  function handleDelete() {
    if (!goal) return;

    mutation.mutate(goal.goal_id, {
      onSuccess() {
        onClose();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-xl sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Delete Goal</DialogTitle>
        </DialogHeader>

        <div className="py-4 text-sm text-muted-foreground">
          Are you sure you want to delete the{" "}
          <span className="font-medium text-foreground">{goal?.goal}</span>{" "}
          goal
          {goal?.owner ? ` for ${goal.owner}` : ""}? This action cannot be
          undone.
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            disabled={mutation.isPending}
            onClick={handleDelete}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}