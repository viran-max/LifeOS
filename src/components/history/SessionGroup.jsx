import SessionListItem from './SessionListItem'

export default function SessionGroup({ label, items }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <div className="flex flex-col gap-2">
        {items.map((session) => (
          <SessionListItem key={session.id} session={session} />
        ))}
      </div>
    </div>
  )
}