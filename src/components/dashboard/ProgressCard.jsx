import { useMemo } from 'react'
import { TrendingUp } from 'lucide-react'
import { useSessions } from '../../hooks/useSessions'
import { aggregateSessionsByDay } from '../../utils/aggregateSessionsByDay'
import { formatDuration } from '../../utils/formatDuration'

export default function ProgressCard() {
  const { sessions } = useSessions()
  const daily = useMemo(() => aggregateSessionsByDay(sessions, 7), [sessions])

  const todayMinutes = daily[daily.length - 1]?.minutes ?? 0
  const avgMinutes = Math.round(daily.reduce((sum, d) => sum + d.minutes, 0) / daily.length)
  const diff = todayMinutes - avgMinutes

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <TrendingUp className="h-4 w-4 text-violet-400" />
        Today's focus
      </div>
      <p className="mt-1 text-2xl font-semibold text-zinc-50">
        {formatDuration(todayMinutes * 60)}
      </p>
      <p className="mt-1 text-xs text-zinc-600">
        {diff >= 0 ? `${diff}m above` : `${Math.abs(diff)}m below`} your 7-day average
      </p>
    </div>
  )
}