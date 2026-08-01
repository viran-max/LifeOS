import { useCallback, useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import { getSessions } from '../services/sessionService'

export function useSessions() {
  const { user } = useAuth()
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const data = await getSessions(user.uid)
      setSessions(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { sessions, loading, error, refetch }
}