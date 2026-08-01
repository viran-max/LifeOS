import { differenceInCalendarDays, startOfDay } from 'date-fns'

export function calculateStreak(sessions) {
  if (sessions.length === 0) return 0

  const uniqueDays = Array.from(
    new Set(sessions.map((s) => startOfDay(new Date(s.finishedAt)).getTime()))
  ).sort((a, b) => b - a)

  const today = startOfDay(new Date()).getTime()
  const mostRecent = uniqueDays[0]

  // Streak breaks only if the most recent session is older than yesterday
  if (differenceInCalendarDays(today, mostRecent) > 1) return 0

  let streak = 1
  for (let i = 1; i < uniqueDays.length; i++) {
    const diff = differenceInCalendarDays(uniqueDays[i - 1], uniqueDays[i])
    if (diff === 1) streak++
    else break
  }

  return streak
}