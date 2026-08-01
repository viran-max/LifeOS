import { useMemo } from 'react'

export function useGoalProgress(goal, sessions) {
  return useMemo(() => {
    const totalSeconds = sessions
      .filter((s) => s.goalId === goal.id)
      .reduce((sum, s) => sum + s.durationSeconds, 0)

    const totalMinutes = Math.round(totalSeconds / 60)
    const percent = Math.min(100, Math.round((totalMinutes / goal.targetMinutes) * 100))

    return { totalMinutes, percent }
  }, [goal, sessions])
}