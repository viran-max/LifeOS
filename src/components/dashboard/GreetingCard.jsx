import { useAuth } from '../../hooks/useAuth'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function GreetingCard() {
  const { user } = useAuth()
  const firstName = user?.displayName?.split(' ')[0] ?? 'there'

  return (
    <div>
      <h2 className="text-xl font-semibold text-zinc-50">
        {getGreeting()}, {firstName}
      </h2>
      <p className="text-sm text-zinc-500">
        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </p>
    </div>
  )
}