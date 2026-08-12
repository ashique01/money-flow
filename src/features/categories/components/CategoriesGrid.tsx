import CategoryCard from "./category-card";
import { Category } from "../types";

interface Props {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export const CategoriesGrid = ({ categories, onEdit, onDelete }: Props) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {categories.map((item) => (
      <CategoryCard
        key={item.category_id}
        category={item}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </div>
);