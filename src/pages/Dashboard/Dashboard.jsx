import TimerCard from '../../components/timer/TimerCard'
import GreetingCard from '../../components/dashboard/GreetingCard'
import StreakCard from '../../components/dashboard/StreakCard'
import ProgressCard from '../../components/dashboard/ProgressCard'
import QuickActions from '../../components/dashboard/QuickActions'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <GreetingCard />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TimerCard />
        </div>
        <div className="flex flex-col gap-4">
          <StreakCard />
          <ProgressCard />
        </div>
      </div>

      <QuickActions />
    </div>
  )
}