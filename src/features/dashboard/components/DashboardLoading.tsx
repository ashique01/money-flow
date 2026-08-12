export const DashboardLoading = () => (
  <div className="animate-pulse space-y-6">
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="glass-card h-24 p-5" />
      ))}
    </div>
  </div>
);