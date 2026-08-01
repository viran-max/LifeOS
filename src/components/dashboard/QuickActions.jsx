import { useNavigate } from 'react-router-dom'
import { Target, History, BarChart3 } from 'lucide-react'

const ACTIONS = [
  { label: 'Add a goal', path: '/planner', icon: Target },
  { label: 'View history', path: '/history', icon: History },
  { label: 'View analytics', path: '/analytics', icon: BarChart3 },
]

export default function QuickActions() {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-3 gap-3">
      {ACTIONS.map((action) => {
        const Icon = action.icon
        return (
          <button
            key={action.path}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-xs text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900"
          >
            <Icon className="h-5 w-5 text-zinc-400" />
            {action.label}
          </button>
        )
      })}
    </div>
  )
}