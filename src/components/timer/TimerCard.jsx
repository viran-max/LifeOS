import { useState } from 'react'
import { Play } from 'lucide-react'
import { useTimer } from '../../hooks/useTimer'
import { useAuth } from '../../hooks/useAuth'
import { useGoals } from '../../hooks/useGoals'
import { formatTime } from '../../utils/formatTime'
import SessionModal from './SessionModal'
import GoalSelect from './GoalSelect'
import FocusOverlay from './FocusOverlay'

export default function TimerCard() {
  const { user } = useAuth()
  const { goals } = useGoals()
  const { status, elapsedSeconds, start, pause, resume, finish } = useTimer()
  const [pendingDuration, setPendingDuration] = useState(null)
  const [selectedGoalId, setSelectedGoalId] = useState('none')

  const activeGoal = goals.find((g) => g.id === selectedGoalId)
  const goalLabel = activeGoal ? activeGoal.title : 'Just work'

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
        <GoalSelect goals={goals} value={selectedGoalId} onChange={setSelectedGoalId} />
      </div>

      <button
        onClick={start}
        className="mt-5 flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
      >
        <Play className="h-4 w-4" /> Start
      </button>

      {status !== 'idle' && (
        <FocusOverlay
          status={status}
          elapsedSeconds={elapsedSeconds}
          goalLabel={goalLabel}
          onPause={pause}
          onResume={resume}
          onFinish={handleFinish}
        />
      )}

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