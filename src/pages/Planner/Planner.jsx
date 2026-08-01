import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useGoals } from '../../hooks/useGoals'
import { useSessions } from '../../hooks/useSessions'
import GoalCard from '../../components/planner/GoalCard'
import GoalForm from '../../components/planner/GoalForm'
import EmptyState from '../../components/common/EmptyState'

export default function Planner() {
  const { goals, loading, addGoal, removeGoal } = useGoals()
  const { sessions } = useSessions()
  const [showForm, setShowForm] = useState(false)

  const weeklyGoals = goals.filter((g) => g.type === 'weekly')
  const monthlyGoals = goals.filter((g) => g.type === 'monthly')

  if (loading) {
    return <p className="text-sm text-zinc-500">Loading goals…</p>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
        >
          <Plus className="h-4 w-4" /> New goal
        </button>
      </div>

      <section>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">This week</p>
        {weeklyGoals.length === 0 ? (
          <EmptyState title="No weekly goals" description="Add one to track this week's focus." />
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {weeklyGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} sessions={sessions} onDelete={removeGoal} />
            ))}
          </div>
        )}
      </section>

      <section>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">This month</p>
        {monthlyGoals.length === 0 ? (
          <EmptyState title="No monthly goals" description="Add one to track this month's focus." />
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {monthlyGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} sessions={sessions} onDelete={removeGoal} />
            ))}
          </div>
        )}
      </section>

      {showForm && <GoalForm onClose={() => setShowForm(false)} onAdd={addGoal} />}
    </div>
  )
}