import { format } from 'date-fns'
import { formatDuration } from '../../utils/formatDuration'

export default function SessionListItem({ session }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm text-zinc-100">{session.description}</p>
        {session.tags?.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {session.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="shrink-0 text-right">
        <p className="text-sm font-medium text-zinc-100">
          {formatDuration(session.durationSeconds)}
        </p>
        <p className="text-xs text-zinc-500">{format(new Date(session.finishedAt), 'h:mm a')}</p>
      </div>
    </div>
  )
}