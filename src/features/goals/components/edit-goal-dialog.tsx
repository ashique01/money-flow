"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Goal } from "../types";

import { useUpdateGoal } from "../hooks/use-update-goal";

interface Props {
  goal: Goal | null;

  open: boolean;

  onClose: () => void;
}

export default function EditGoalDialog({ goal, open, onClose }: Props) {
  const mutation = useUpdateGoal();

  const [form, setForm] = useState({
    goal: "",
    owner: "Ash",
    target: 0,
    current: 0,
    deadline: "",
    status: "Active",
  });

  useEffect(() => {
    if (goal) {
      setForm({
        goal: goal.goal,
        owner: goal.owner,
        target: goal.target,
        current: goal.current,
        deadline: goal.deadline,
        status: goal.status,
      });
    }
  }, [goal]);

  function updateField(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit() {
    if (!goal) return;

    mutation.mutate(
      {
        goal_id: goal.goal_id,
        goal: form.goal,
        owner: form.owner as "Ash" | "Rifa" | "Shared",
        target: form.target,
        current: form.current,
        deadline: form.deadline,
        status: form.status as "Active" | "Completed" | "Cancelled",
      },
      {
        onSuccess() {
          onClose();
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Goal</DialogTitle>

          <p className="text-sm text-muted-foreground">
            Update the goal details below.
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Goal Name</Label>

            <Input
              value={form.goal}
              onChange={(e) => updateField("goal", e.target.value)}
              placeholder="Emergency Fund"
            />
          </div>

          <div>
            <Label>Owner</Label>

            <select
              className="w-full rounded-md border bg-background p-2"
              value={form.owner}
              onChange={(e) => updateField("owner", e.target.value)}
            >
              <option>Ash</option>

              <option>Rifa</option>

              <option>Shared</option>
            </select>
          </div>

          <div>
            <Label>Target Amount</Label>

            <Input
              type="number"
              value={form.target}
              onChange={(e) => updateField("target", Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Current Amount</Label>

            <Input
              type="number"
              value={form.current}
              onChange={(e) => updateField("current", Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Deadline</Label>

            <Input
              type="date"
              value={form.deadline}
              onChange={(e) => updateField("deadline", e.target.value)}
            />
          </div>

          <div>
            <Label>Status</Label>

            <select
              className="w-full rounded-md border bg-background p-2"
              value={form.status}
              onChange={(e) => updateField("status", e.target.value)}
            >
              <option>Active</option>

              <option>Completed</option>

              <option>Cancelled</option>
            </select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="button"
              disabled={mutation.isPending}
              onClick={handleSubmit}
            >
              {mutation.isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}