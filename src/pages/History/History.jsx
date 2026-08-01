import { useMemo } from 'react'
import { useSessions } from '../../hooks/useSessions'
import { useGoals } from '../../hooks/useGoals'
import { groupSessionsByDate } from '../../utils/groupSessionsByDate'
import SessionGroup from '../../components/history/SessionGroup'
import EmptyState from '../../components/common/EmptyState'

export default function History() {
  const { sessions, loading } = useSessions()
  const { goals } = useGoals()

  const goalsMap = useMemo(() => new Map(goals.map((g) => [g.id, g])), [goals])

  if (loading) {
    return <p className="text-sm text-zinc-500">Loading sessions…</p>
  }

  if (sessions.length === 0) {
    return (
      <EmptyState
        title="No sessions yet"
        description="Finish a focus session on the Dashboard to see it here."
      />
    )
  }

  const groups = groupSessionsByDate(sessions)

  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <SessionGroup key={group.label} label={group.label} items={group.items} goalsMap={goalsMap} />
      ))}
    </div>
  )
}