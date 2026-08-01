import { Trash2 } from 'lucide-react'
import { useGoalProgress } from '../../hooks/useGoalProgress'
import { formatDuration } from '../../utils/formatDuration'

export default function GoalCard({ goal, sessions, onDelete }) {
  const { totalMinutes, percent } = useGoalProgress(goal, sessions)

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="flex items-start justify-between">
        <p className="text-sm text-zinc-100">{goal.title}</p>
        <button onClick={() => onDelete(goal.id)} className="text-zinc-600 hover:text-red-400">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-1 text-xs text-zinc-500">
        {formatDuration(totalMinutes * 60)} of {formatDuration(goal.targetMinutes * 60)}
      </p>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-violet-600 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}