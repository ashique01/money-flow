"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useCategories } from "../hooks/use-categories";

import { Category } from "../types";

import { CategoriesGrid } from "./CategoriesGrid";
import { CategoriesLoading } from "./CategoriesLoading";
import { CategoriesEmpty } from "./CategoriesEmpty";
import { CategoriesPagination } from "./CategoriesPagination";

import CreateCategoryDialog from "./create-category-dialog";

import EditCategoryDialog from "./edit-category-dialog";

import DeleteCategoryDialog from "./delete-category-dialog";

interface Props {
  email: string;
}

export default function CategoriesList({ email }: Props) {
  const { data, isLoading, error } = useCategories(email);

  const [createOpen, setCreateOpen] = useState(false);

  const [editing, setEditing] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState<Category | null>(null);
  const [page, setPage] = useState(1);

  if (isLoading) return <CategoriesLoading />;

  if (error) {
    return <p className="text-red-500">Failed to load categories.</p>;
  }

  const pageSize = 9;
  const pageCount = Math.max(1, Math.ceil((data?.length || 0) / pageSize));
  const pagedData = (data ?? []).slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-5">
      {/* Header */}

      <div className="flex justify-end">
        <Button onClick={() => setCreateOpen(true)}>Add Category</Button>
      </div>

      {/* Empty State */}

      {!data || data.length === 0 ? (
        <CategoriesEmpty />
      ) : (
        <>
          <CategoriesGrid
            categories={pagedData}
            onEdit={setEditing}
            onDelete={setDeleting}
          />
          {/* Pagination Controls */}
          <CategoriesPagination page={page} pageCount={pageCount} setPage={setPage} />
        </>
      )}

      {/* Create Dialog */}
      <CreateCategoryDialog open={createOpen} onClose={() => setCreateOpen(false)} />

      {/* Edit Dialog */}
      <EditCategoryDialog open={editing !== null} category={editing} onClose={() => setEditing(null)} />

      {/* Delete Dialog */}
      <DeleteCategoryDialog open={deleting !== null} category={deleting} onClose={() => setDeleting(null)} />
    </div>
  );
}