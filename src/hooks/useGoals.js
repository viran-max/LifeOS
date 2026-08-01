import { useCallback, useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import { getGoals, saveGoal, deleteGoal } from '../services/goalService'

export function useGoals() {
  const { user } = useAuth()
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)

  const refetch = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const data = await getGoals(user.uid)
    setGoals(data)
    setLoading(false)
  }, [user])

  useEffect(() => {
    refetch()
  }, [refetch])

  const addGoal = useCallback(
    async (goal) => {
      const saved = await saveGoal(user.uid, goal)
      setGoals((prev) => [saved, ...prev])
    },
    [user]
  )

  const removeGoal = useCallback(
    async (goalId) => {
      await deleteGoal(user.uid, goalId)
      setGoals((prev) => prev.filter((g) => g.id !== goalId))
    },
    [user]
  )

  return { goals, loading, addGoal, removeGoal }
}