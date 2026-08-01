import { useLocation } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { NAV_ITEMS } from '../../constants/navigation'

export default function Navbar() {
  const location = useLocation()
  const current = NAV_ITEMS.find((item) => item.path === location.pathname)

  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 md:px-6">
      <div>
        <h1 className="text-sm font-medium text-zinc-100">
          {current?.label ?? 'LifeOS'}
        </h1>
        {current?.description && (
          <p className="hidden text-xs text-zinc-500 sm:block">
            {current.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100">
          <Bell className="h-4 w-4" />
        </button>
        <div className="h-8 w-8 rounded-full bg-zinc-800" />
      </div>
    </header>
  )
}