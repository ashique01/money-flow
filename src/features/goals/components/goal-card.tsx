import { Goal } from "../types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  goal: Goal;

  onEdit?: (goal: Goal) => void;

  onDelete?: (goal: Goal) => void;
}

export default function GoalCard({ goal, onEdit, onDelete }: Props) {
  const progress = Math.min((goal.current / goal.target) * 100, 100);
  const isCompleted = goal.status === "Completed";
  const isNearComplete = progress >= 90 && !isCompleted;

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex justify-between">
        <h3 className="font-semibold">{goal.goal}</h3>

        <span
          className={cn(
            "text-xs",
            isCompleted
              ? "text-income"
              : goal.status === "Cancelled"
                ? "text-destructive"
                : "text-muted-foreground",
          )}
        >
          {goal.status}
        </span>
      </div>

      <div className="text-sm text-muted-foreground">Owner: {goal.owner}</div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>

          <span>
            ${goal.current.toFixed(2)} / ${goal.target.toFixed(2)}
          </span>
        </div>

        <div className="h-2 rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              isCompleted
                ? "bg-income"
                : isNearComplete
                ? "bg-warning"
                : "bg-primary",
            )}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          {progress.toFixed(0)}% complete
        </p>
      </div>

      <div className="text-xs text-muted-foreground">
        Deadline: {new Date(goal.deadline).toLocaleDateString()}
      </div>

      {/* Actions */}

      <div className="flex justify-end gap-1 border-t pt-3">
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onEdit?.(goal)}
        >
          Edit
        </Button>

        <Button
          variant="ghost"
          size="xs"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => onDelete?.(goal)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}