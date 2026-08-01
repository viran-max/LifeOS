import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'lifeos_active_timer'

function readStoredTimer() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeStoredTimer(state) {
  if (state) localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  else localStorage.removeItem(STORAGE_KEY)
}

export function useTimer() {
  const [status, setStatus] = useState('idle') // idle | running | paused
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const accumulatedRef = useRef(0) // seconds banked before current running segment
  const runningSinceRef = useRef(null) // timestamp (ms) when current segment started

  // Rehydrate on mount — this is what makes it survive a page refresh
  useEffect(() => {
    const stored = readStoredTimer()
    if (!stored) return

    accumulatedRef.current = stored.accumulatedSeconds
    if (stored.status === 'running') {
      runningSinceRef.current = stored.runningSince
      setElapsedSeconds(
        stored.accumulatedSeconds + Math.floor((Date.now() - stored.runningSince) / 1000)
      )
    } else {
      setElapsedSeconds(stored.accumulatedSeconds)
    }
    setStatus(stored.status)
  }, [])

  // Tick every second while running
  useEffect(() => {
    if (status !== 'running') return
    const interval = setInterval(() => {
      setElapsedSeconds(
        accumulatedRef.current + Math.floor((Date.now() - runningSinceRef.current) / 1000)
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [status])

  const persist = useCallback((nextStatus) => {
    writeStoredTimer(
      nextStatus === 'idle'
        ? null
        : {
            status: nextStatus,
            accumulatedSeconds: accumulatedRef.current,
            runningSince: runningSinceRef.current,
          }
    )
  }, [])

  const start = useCallback(() => {
    accumulatedRef.current = 0
    runningSinceRef.current = Date.now()
    setElapsedSeconds(0)
    setStatus('running')
    persist('running')
  }, [persist])

  const pause = useCallback(() => {
    accumulatedRef.current += Math.floor((Date.now() - runningSinceRef.current) / 1000)
    runningSinceRef.current = null
    setStatus('paused')
    persist('paused')
  }, [persist])

  const resume = useCallback(() => {
    runningSinceRef.current = Date.now()
    setStatus('running')
    persist('running')
  }, [persist])

  const finish = useCallback(() => {
    const finalSeconds =
      status === 'running'
        ? accumulatedRef.current + Math.floor((Date.now() - runningSinceRef.current) / 1000)
        : accumulatedRef.current

    accumulatedRef.current = 0
    runningSinceRef.current = null
    setStatus('idle')
    setElapsedSeconds(0)
    persist('idle')

    return finalSeconds
  }, [status, persist])

  return { status, elapsedSeconds, start, pause, resume, finish }
}