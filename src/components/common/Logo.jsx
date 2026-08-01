import { Zap } from 'lucide-react'

export default function Logo({ collapsed = false }) {
  return (
    <div className="flex items-center gap-2 px-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600">
        <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
      </div>
      {!collapsed && (
        <span className="text-sm font-semibold tracking-tight text-zinc-100">
          LifeOS
        </span>
      )}
    </div>
  )
}