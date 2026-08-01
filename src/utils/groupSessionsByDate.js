import { format, isToday, isYesterday } from 'date-fns'

export function groupSessionsByDate(sessions) {
  const groups = new Map()

  for (const session of sessions) {
    const date = new Date(session.finishedAt)
    let label
    if (isToday(date)) label = 'Today'
    else if (isYesterday(date)) label = 'Yesterday'
    else label = format(date, 'MMMM d, yyyy')

    if (!groups.has(label)) groups.set(label, [])
    groups.get(label).push(session)
  }

  return Array.from(groups.entries()).map(([label, items]) => ({ label, items }))
}