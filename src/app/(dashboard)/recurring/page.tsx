"use client";

import PageContainer from "@/components/layout/page-container";
import RecurringList from "@/features/recurring/components/recurring-list";

export default function RecurringPage() {
  return (
    <PageContainer
      title="Recurring"
      subtitle="Manage your automated transactions"
    >
      <RecurringList />
    </PageContainer>
  );
}