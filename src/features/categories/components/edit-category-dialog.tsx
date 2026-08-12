"use client";

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

import { useState, useEffect } from "react";

import { useUpdateCategory } from "../hooks/use-update-category";

import { Category } from "../types";

interface Props {
  open: boolean;

  category: Category | null;

  onClose: () => void;
}

export default function EditCategoryDialog({
  open,
  category,
  onClose,
}: Props) {
  const { mutate, isPending } = useUpdateCategory();

  const [form, setForm] = useState<Category>({
    category_id: "",
    name: "",
    type: "Expense",
    icon: "📁",
    color: "#000000",
    owner: "Ash",
  });

  useEffect(() => {
    if (category) {
      setForm({
        category_id: category.category_id,
        name: category.name,
        type: category.type,
        icon: category.icon,
        color: category.color,
        owner: category.owner,
      });
    }
  }, [category]);

  function updateField(key: keyof Category, value: string) {
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
      <DialogContent
        className="
          max-h-[90vh]
          overflow-y-auto
          rounded-xl
          sm:max-w-[500px]
        "
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Edit Category
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Category Name</Label>
            <Input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Food"
            />
          </div>

          <div>
            <Label>Type</Label>
            <select
              className="w-full rounded-md border bg-background p-2"
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
              className="w-full rounded-md border bg-background p-2"
              value={form.owner}
              onChange={(e) => updateField("owner", e.target.value)}
            >
              <option>Ash</option>
              <option>Rifa</option>
              <option>Shared</option>
            </select>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            className="rounded-lg"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            className="rounded-lg"
            onClick={handleSubmit}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}