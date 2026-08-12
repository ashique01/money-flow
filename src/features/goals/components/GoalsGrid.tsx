import GoalCard from "./goal-card";
import { Goal } from "../types";

interface Props {
  goals: Goal[];
}

export const GoalsGrid = ({ goals }: Props) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {goals.map((goal) => (
      <GoalCard key={goal.goal_id} goal={goal} />
    ))}
  </div>
);
