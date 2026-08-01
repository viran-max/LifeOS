import { useSessions } from '../../hooks/useSessions'
import { groupSessionsByDate } from '../../utils/groupSessionsByDate'
import SessionGroup from '../../components/history/SessionGroup'
import EmptyState from '../../components/common/EmptyState'

export default function History() {
  const { sessions, loading } = useSessions()

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
        <SessionGroup key={group.label} label={group.label} items={group.items} />
      ))}
    </div>
  )
}