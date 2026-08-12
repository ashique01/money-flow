"use client";

import CategoriesList from "@/features/categories/components/categories-list";

export default function CategoriesPage() {
  // Temporary user
  // Later this will come from authentication/session

  const email = "ashiquemurad@gmail.com";

  return (
    <div
      className="
      space-y-6
      "
    >
      <div>
        <h1
          className="
          text-3xl
          font-bold
          "
        >
          Categories
        </h1>

        <p
          className="
          text-muted-foreground
          "
        >
          Manage your income and expense categories
        </p>
      </div>

      <CategoriesList email={email} />
    </div>
  );
}
