export default function StatsSection({ sessionsCount, goalsCount }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <p className="text-xs text-zinc-500">Total sessions</p>
        <p className="mt-1 text-2xl font-semibold text-zinc-50">{sessionsCount}</p>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <p className="text-xs text-zinc-500">Active goals</p>
        <p className="mt-1 text-2xl font-semibold text-zinc-50">{goalsCount}</p>
      </div>
    </div>
  )
}