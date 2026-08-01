import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../../constants/navigation'

export default function MobileNav() {
  const items = NAV_ITEMS.filter((item) => item.showInMobile)

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-zinc-800 bg-zinc-950/95 py-2 backdrop-blur md:hidden">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1 text-[11px] ${
                isActive ? 'text-violet-400' : 'text-zinc-500'
              }`
            }
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
            {item.label}
          </NavLink>
        )
      })}
    </nav>
  )
}