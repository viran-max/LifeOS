import { format, subDays, startOfDay } from 'date-fns'

export function aggregateSessionsByDay(sessions, days = 7) {
  const buckets = []
  for (let i = days - 1; i >= 0; i--) {
    const date = startOfDay(subDays(new Date(), i))
    buckets.push({ date, label: format(date, 'EEE'), minutes: 0 })
  }

  for (const session of sessions) {
    const sessionDate = startOfDay(new Date(session.finishedAt))
    const bucket = buckets.find((b) => b.date.getTime() === sessionDate.getTime())
    if (bucket) bucket.minutes += Math.round(session.durationSeconds / 60)
  }

  return buckets.map(({ label, minutes }) => ({ label, minutes }))
}