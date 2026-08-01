import { Flame } from 'lucide-react'
import { useSessions } from '../../hooks/useSessions'
import { calculateStreak } from '../../utils/calculateStreak'

export default function StreakCard() {
  const { sessions } = useSessions()
  const streak = calculateStreak(sessions)

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <Flame className="h-4 w-4 text-orange-500" />
        Streak
      </div>
      <p className="mt-1 text-2xl font-semibold text-zinc-50">
        {streak} {streak === 1 ? 'day' : 'days'}
      </p>
      <p className="mt-1 text-xs text-zinc-600">
        {streak === 0 ? 'Start a session today' : 'Keep it going'}
      </p>
    </div>
  )
}