import { LogOut } from 'lucide-react'
import { signOutUser } from '../../firebase/auth'

export default function AccountSection() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
      <p className="mb-1 text-sm font-medium text-zinc-100">Account</p>
      <p className="mb-4 text-xs text-zinc-500">Sign out of LifeOS on this device.</p>
      <button
        onClick={signOutUser}
        className="flex items-center gap-2 rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:border-red-900 hover:text-red-400"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </div>
  )
}