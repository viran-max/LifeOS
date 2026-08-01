import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#7c3aed', '#a78bfa', '#c4b5fd', '#4c1d95', '#8b5cf6', '#5b21b6']

export default function GoalBreakdownChart({ data }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <p className="mb-4 text-xs font-medium uppercase tracking-wide text-zinc-500">Time by goal</p>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="minutes" nameKey="label" innerRadius={50} outerRadius={80} paddingAngle={2}>
            {data.map((entry, index) => (
              <Cell key={entry.label} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8 }}
            formatter={(value) => [`${value} min`, '']}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: '#a1a1aa' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}