import { NavLink } from 'react-router-dom'

export default function NavItem({ item, collapsed = false, onClick }) {
  const Icon = item.icon

  return (
    <NavLink
      to={item.path}
      end={item.path === '/'}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
          isActive
            ? 'bg-zinc-800 text-zinc-50'
            : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
        }`
      }
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  )
}