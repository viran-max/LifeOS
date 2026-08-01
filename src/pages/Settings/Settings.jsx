import { useAuth } from '../../hooks/useAuth'
import { useSessions } from '../../hooks/useSessions'
import { useGoals } from '../../hooks/useGoals'
import ProfileCard from '../../components/settings/ProfileCard'
import StatsSection from '../../components/settings/StatsSection'
import AccountSection from '../../components/settings/AccountSection'

export default function Settings() {
  const { user } = useAuth()
  const { sessions } = useSessions()
  const { goals } = useGoals()

  return (
    <div className="flex max-w-lg flex-col gap-4">
      <ProfileCard user={user} />
      <StatsSection sessionsCount={sessions.length} goalsCount={goals.length} />
      <AccountSection />
    </div>
  )
}