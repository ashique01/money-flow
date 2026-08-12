"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";

import BudgetList from "@/features/budgets/components/budget-list";
import CreateBudgetDialog from "@/features/budgets/components/create-budget-dialog";

export default function BudgetsPage() {
  const [open, setOpen] = useState(false);

  return (
    <PageContainer title="Budgets" subtitle="Manage your spending limits">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Budgets</h2>

          <Button onClick={() => setOpen(true)}>
            <Plus size={16} className="mr-1.5" />
            Create Budget
          </Button>
        </div>

        <BudgetList />

        <CreateBudgetDialog open={open} onClose={() => setOpen(false)} />
      </div>
    </PageContainer>
  );
}
