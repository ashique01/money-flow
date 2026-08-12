"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import GoalsList from "@/features/goals/components/goals-list";
import CreateGoalDialog from "@/features/goals/components/create-goal-dialog";

export default function GoalsPage() {
  const [open, setOpen] = useState(false);

  return (
    <PageContainer
      title="Goals"
      subtitle="Set savings targets and track your progress"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Goals</h2>
          <Button onClick={() => setOpen(true)}>
            <Plus size={16} className="mr-1.5" />
            Create Goal
          </Button>
        </div>

        <GoalsList />

        <CreateGoalDialog
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </PageContainer>
  );
}