export default function GoalSelect({ goals, value, onChange, disabled }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-zinc-500">Working on</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-600 disabled:opacity-50"
      >
        <option value="none">Just work (no goal)</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>
            {goal.title} · {goal.type === 'weekly' ? 'Weekly' : 'Monthly'}
          </option>
        ))}
      </select>
    </div>
  )
}