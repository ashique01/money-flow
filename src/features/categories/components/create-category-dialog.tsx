"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { useState } from "react";

import { useCreateCategory } from "../hooks/use-create-category";

import { CreateCategoryInput } from "../types";

interface Props {
  open: boolean;

  onClose: () => void;
}

export default function CreateCategoryDialog({ open, onClose }: Props) {
  const { mutate, isPending } = useCreateCategory();

  const [form, setForm] = useState<CreateCategoryInput>({
    name: "",

    type: "Expense",

    icon: "📁",

    color: "#000000",

    owner: "Ash",
  });

  function updateField(key: keyof CreateCategoryInput, value: string) {
    setForm((prev) => ({
      ...prev,

      [key]: value,
    }));
  }

  function handleSubmit() {
    mutate(form, {
      onSuccess() {
        onClose();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name</Label>

            <Input
              value={form.name}

              onChange={(e) => updateField("name", e.target.value)}

              placeholder="Food"
            />
          </div>

          <div>
            <Label>Type</Label>

            <select
              className="
              w-full
              rounded-md
              border
              p-2
              "

              value={form.type}

              onChange={(e) => updateField("type", e.target.value)}
            >
              <option>Expense</option>

              <option>Income</option>
            </select>
          </div>

          <div>
            <Label>Icon</Label>

            <Input
              value={form.icon}

              onChange={(e) => updateField("icon", e.target.value)}

              placeholder="🍔"
            />
          </div>

          <div>
            <Label>Color</Label>

            <Input
              type="color"

              value={form.color}

              onChange={(e) => updateField("color", e.target.value)}
            />
          </div>

          <div>
            <Label>Owner</Label>

            <select
              className="
              w-full
              rounded-md
              border
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

          <Button
            className="w-full"

            disabled={isPending}

            onClick={handleSubmit}
          >
            {isPending ? "Creating..." : "Create Category"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
