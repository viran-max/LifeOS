import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function WeeklyFocusChart({ data }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <p className="mb-4 text-xs font-medium uppercase tracking-wide text-zinc-500">Last 7 days</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis dataKey="label" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8 }}
            labelStyle={{ color: '#f4f4f5' }}
            formatter={(value) => [`${value} min`, 'Focus time']}
          />
          <Bar dataKey="minutes" fill="#7c3aed" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}