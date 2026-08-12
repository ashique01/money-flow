import { Category } from "../types";
import { Button } from "@/components/ui/button";

interface Props {
  category: Category;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
}

export default function CategoryCard({ category, onEdit, onDelete }: Props) {
  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{category.icon || "📁"}</div>

          <div>
            <h3 className="font-semibold">{category.name}</h3>

            <span
              className="
              text-xs
              rounded-full
              bg-primary/10
              px-2
              py-0.5
              "
            >
              {category.type}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => onEdit?.(category)}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
            onClick={() => onDelete?.(category)}
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <div
          className="
          w-4
          h-4
          rounded-full
          "
          style={{
            backgroundColor: category.color || "#cccccc",
          }}
        />

        <span>{category.owner}</span>
      </div>
    </div>
  );
}