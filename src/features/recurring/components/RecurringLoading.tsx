export const RecurringLoading = () => (
  <div className="space-y-5">
    <div className="flex justify-end">
      <div className="h-9 w-36 animate-pulse rounded-lg bg-muted" />
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="glass-card animate-pulse space-y-3 p-5">
          <div className="flex justify-between">
            <div className="space-y-1.5">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-3 w-12 rounded bg-muted" />
            </div>
            <div className="h-5 w-14 rounded-full bg-muted" />
          </div>
          <div className="h-3 w-32 rounded bg-muted" />
          <div className="h-8 w-20 rounded bg-muted" />
          <div className="h-3 w-28 rounded bg-muted" />
          <div className="h-3 w-24 rounded bg-muted" />
        </div>
      ))}
    </div>
  </div>
);