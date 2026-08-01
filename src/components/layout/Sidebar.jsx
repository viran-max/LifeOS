import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import Logo from '../common/Logo'
import NavItem from './NavItem'
import { NAV_ITEMS } from '../../constants/navigation'
import { useLayout } from '../../hooks/useLayout'

export default function Sidebar() {
  const { collapsed, toggleCollapsed } = useLayout()
  const items = NAV_ITEMS.filter((item) => item.showInSidebar)

  return (
    <aside
      className={`hidden shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 py-4 transition-all duration-200 md:flex ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className="mb-6 px-2">
        <Logo collapsed={collapsed} />
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-2">
        {items.map((item) => (
          <NavItem key={item.id} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <button
        onClick={toggleCollapsed}
        className="mx-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
      >
        {collapsed ? (
          <PanelLeftOpen className="h-4 w-4" />
        ) : (
          <PanelLeftClose className="h-4 w-4" />
        )}
        {!collapsed && 'Collapse'}
      </button>
    </aside>
  )
}