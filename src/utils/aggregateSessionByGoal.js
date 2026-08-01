export function aggregateSessionsByGoal(sessions, goals) {
  const totals = new Map()
  totals.set('none', { label: 'Just work', minutes: 0 })
  for (const goal of goals) {
    totals.set(goal.id, { label: goal.title, minutes: 0 })
  }

  for (const session of sessions) {
    const key = session.goalId ?? 'none'
    if (!totals.has(key)) totals.set(key, { label: 'Deleted goal', minutes: 0 })
    totals.get(key).minutes += Math.round(session.durationSeconds / 60)
  }

  return Array.from(totals.values()).filter((entry) => entry.minutes > 0)
}