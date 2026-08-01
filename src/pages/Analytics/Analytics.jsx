import { useMemo } from 'react'
import { useSessions } from '../../hooks/useSessions'
import { useGoals } from '../../hooks/useGoals'
import { aggregateSessionsByDay } from '../../utils/aggregateSessionsByDay'
import { aggregateSessionsByGoal } from '../../utils/aggregateSessionByGoal';
import { formatDuration } from '../../utils/formatDuration'
import StatCard from '../../components/analytics/StatCard'
import WeeklyFocusChart from '../../components/analytics/WeeklyFocusChart'
import GoalBreakdownChart from '../../components/analytics/GoalBreakDown';
import EmptyState from '../../components/common/EmptyState'

export default function Analytics() {
  const { sessions, loading } = useSessions()
  const { goals } = useGoals()

  const dailyData = useMemo(() => aggregateSessionsByDay(sessions), [sessions])
  const goalData = useMemo(() => aggregateSessionsByGoal(sessions, goals), [sessions, goals])

  const totalSeconds = sessions.reduce((sum, s) => sum + s.durationSeconds, 0)
  const avgSeconds = sessions.length > 0 ? Math.round(totalSeconds / sessions.length) : 0

  if (loading) {
    return <p className="text-sm text-zinc-500">Loading analytics…</p>
  }

  if (sessions.length === 0) {
    return (
      <EmptyState
        title="No data yet"
        description="Finish a few focus sessions to see your trends here."
      />
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total focus time" value={formatDuration(totalSeconds)} />
        <StatCard label="Sessions" value={sessions.length} />
        <StatCard label="Average session" value={formatDuration(avgSeconds)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <WeeklyFocusChart data={dailyData} />
        <GoalBreakdownChart data={goalData} />
      </div>
    </div>
  )
}