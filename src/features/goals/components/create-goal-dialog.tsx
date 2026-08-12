"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { useState } from "react";

import { useCreateGoal } from "../hooks/use-create-goal";

import { CreateGoalInput } from "../types";

interface Props {
  open: boolean;

  onClose: () => void;
}

export default function CreateGoalDialog({ open, onClose }: Props) {
  const { mutate, isPending } = useCreateGoal();

  const [form, setForm] = useState<CreateGoalInput>({
    goal: "",

    owner: "Ash",

    target: 0,

    current: 0,

    deadline: new Date().toISOString().split("T")[0],

    status: "Active",
  });

  function updateField(key: keyof CreateGoalInput, value: any) {
    setForm((prev) => ({
      ...prev,

      [key]: value,
    }));
  }

  function handleSubmit() {
    mutate(form, {
      onSuccess() {
        onClose();

        setForm({
          goal: "",

          owner: "Ash",

          target: 0,

          current: 0,

          deadline: new Date().toISOString().split("T")[0],

          status: "Active",
        });
      },
    });
  }

  return (
    <Dialog
      open={open}

      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Goal</DialogTitle>
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
              className="
              w-full
              rounded-md
              border
              bg-background
              p-2
              "

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
              className="
              w-full
              rounded-md
              border
              bg-background
              p-2
              "

              value={form.status}

              onChange={(e) => updateField("status", e.target.value)}
            >
              <option>Active</option>

              <option>Completed</option>

              <option>Cancelled</option>
            </select>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button type="button" disabled={isPending} onClick={handleSubmit}>
              {isPending ? "Creating..." : "Create Goal"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
