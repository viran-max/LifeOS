import { Zap } from 'lucide-react'
import toast from 'react-hot-toast'
import { signInWithGoogle } from '../../firebase/auth'

export default function Login() {
  const handleLogin = async () => {
    try {
      await signInWithGoogle()
    } catch {
      toast.error('Could not sign in — try again')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950">
      <div className="w-full max-w-xs rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600">
          <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
        <h1 className="mb-1 text-sm font-semibold text-zinc-100">Sign in to LifeOS</h1>
        <p className="mb-5 text-xs text-zinc-500">
          Your sessions, goals and history — synced everywhere.
        </p>
        <button
          onClick={handleLogin}
          className="w-full rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-white"
        >
          Continue with Google
        </button>
      </div>
    </div>
  )
}