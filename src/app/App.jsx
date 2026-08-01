// src/app/App.jsx
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import Providers from './providers'
import { useAuth } from '../hooks/useAuth'
import Login from '../pages/Login/Login'

function AuthGate() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-sm text-zinc-500">
        Loading…
      </div>
    )
  }

  return user ? <RouterProvider router={router} /> : <Login />
}

export default function App() {
  return (
    <Providers>
      <AuthGate />
    </Providers>
  )
}