export const BudgetsLoading = () => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="glass-card animate-pulse space-y-4 p-5">
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <div className="h-4 w-20 rounded bg-muted" />
            <div className="h-3 w-12 rounded bg-muted" />
          </div>
          <div className="h-3 w-14 rounded bg-muted" />
        </div>
        <div className="space-y-1.5">
          <div className="h-8 w-24 rounded bg-muted" />
          <div className="h-3 w-16 rounded bg-muted" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-3 w-10 rounded bg-muted" />
            <div className="h-3 w-14 rounded bg-muted" />
          </div>
          <div className="flex justify-between">
            <div className="h-3 w-14 rounded bg-muted" />
            <div className="h-3 w-14 rounded bg-muted" />
          </div>
          <div className="h-2 w-full rounded-full bg-muted" />
          <div className="h-3 w-12 rounded bg-muted" />
        </div>
      </div>
    ))}
  </div>
);