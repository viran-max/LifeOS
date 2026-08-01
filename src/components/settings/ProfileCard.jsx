import { format } from 'date-fns'

export default function ProfileCard({ user }) {
  const joined = user.metadata?.creationTime
    ? format(new Date(user.metadata.creationTime), 'MMMM yyyy')
    : null

  return (
    <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
      {user.photoURL ? (
        <img src={user.photoURL} alt={user.displayName} className="h-14 w-14 rounded-full" />
      ) : (
        <div className="h-14 w-14 rounded-full bg-zinc-800" />
      )}
      <div>
        <p className="text-sm font-medium text-zinc-100">{user.displayName}</p>
        <p className="text-xs text-zinc-500">{user.email}</p>
        {joined && <p className="mt-1 text-[11px] text-zinc-600">Member since {joined}</p>}
      </div>
    </div>
  )
}