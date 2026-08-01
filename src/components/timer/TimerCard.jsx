import { useState } from 'react'
import { Pause, Play, Square } from 'lucide-react'
import { useTimer } from '../../hooks/useTimer'
import { useAuth } from '../../hooks/useAuth'
import { useGoals } from '../../hooks/useGoals'
import SessionModal from './SessionModal'
import GoalSelect from './GoalSelect'

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const pad = (n) => String(n).padStart(2, '0')
  return hours > 0 ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`
}

export default function TimerCard() {
  const { user } = useAuth()
  const { goals } = useGoals()
  const { status, elapsedSeconds, start, pause, resume, finish } = useTimer()
  const [pendingDuration, setPendingDuration] = useState(null)
  const [selectedGoalId, setSelectedGoalId] = useState('none')

  const activeGoal = goals.find((g) => g.id === selectedGoalId)

  const handleFinish = () => {
    const duration = finish()
    if (duration > 0) setPendingDuration(duration)
  }

  const handleSessionSaved = () => {
    setPendingDuration(null)
    setSelectedGoalId('none')
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <p className="text-xs text-zinc-500">Focus session</p>
      <p className="mt-1 font-mono text-4xl font-semibold tracking-tight text-zinc-50">
        {formatTime(elapsedSeconds)}
      </p>

      <div className="mt-4">
        {status === 'idle' ? (
          <GoalSelect goals={goals} value={selectedGoalId} onChange={setSelectedGoalId} />
        ) : (
          <p className="text-xs text-zinc-500">
            Working on:{' '}
            <span className="text-zinc-300">{activeGoal ? activeGoal.title : 'Just work'}</span>
          </p>
        )}
      </div>

      <div className="mt-5 flex gap-2">
        {status === 'idle' && (
          <button
            onClick={start}
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
          >
            <Play className="h-4 w-4" /> Start
          </button>
        )}

        {status === 'running' && (
          <>
            <button
              onClick={pause}
              className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-700"
            >
              <Pause className="h-4 w-4" /> Pause
            </button>
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
            >
              <Square className="h-4 w-4" /> Finish
            </button>
          </>
        )}

        {status === 'paused' && (
          <>
            <button
              onClick={resume}
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
            >
              <Play className="h-4 w-4" /> Resume
            </button>
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
            >
              <Square className="h-4 w-4" /> Finish
            </button>
          </>
        )}
      </div>

      {pendingDuration !== null && (
        <SessionModal
          durationSeconds={pendingDuration}
          uid={user.uid}
          goalId={selectedGoalId === 'none' ? null : selectedGoalId}
          onClose={() => setPendingDuration(null)}
          onSaved={handleSessionSaved}
        />
      )}
    </div>
  )
}