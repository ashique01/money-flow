"use client";

import { GoalsGrid } from "./GoalsGrid";
import { GoalsLoading } from "./GoalsLoading";
import { GoalsEmpty } from "./GoalsEmpty";

import { Button } from "@/components/ui/button";

import { useState } from "react";

import CreateGoalDialog from "./create-goal-dialog";
import { useGoals } from "../hooks/use-goals";
import GoalCard from "./goal-card";

export default function GoalsList() {
  const email = "ashiquemurad@gmail.com";
  const { data, isLoading, error } = useGoals(email);

  const [open, setOpen] = useState(false);

  if (isLoading) return <GoalsLoading />;

  return (
    <div className="space-y-5">

      {!data || data.length === 0 ? (
        <div className="glass-card p-6 text-center">No goals found</div>
      ) : (
        <div
          className="
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
            "
        >
          {data.map((item) => (
            <GoalCard
              key={item.goal_id}

              goal={item}
            />
          ))}
        </div>
      )}

      <CreateGoalDialog
        open={open}

        onClose={() => setOpen(false)}
      />
    </div>
  );
}
