import { useState } from 'react'
import toast from 'react-hot-toast'
import { createGoal } from '../../models/Goal'

export default function GoalForm({ onClose, onAdd }) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('weekly')
  const [targetMinutes, setTargetMinutes] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!title.trim() || !targetMinutes) {
      toast.error('Fill in title and target')
      return
    }

    setSaving(true)
    await onAdd(createGoal({ title, type, targetMinutes }))
    setSaving(false)
    toast.success('Goal added')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-950 p-5"
      >
        <h2 className="mb-4 text-sm font-medium text-zinc-100">New goal</h2>

        <label className="mb-1 block text-xs text-zinc-400">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-600"
          placeholder="e.g. Deep work on LifeOS"
        />

        <label className="mb-1 block text-xs text-zinc-400">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-600"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <label className="mb-1 block text-xs text-zinc-400">Target (minutes)</label>
        <input
          type="number"
          min="1"
          value={targetMinutes}
          onChange={(e) => setTargetMinutes(e.target.value)}
          className="mb-4 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-600"
          placeholder="e.g. 300"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-xs text-zinc-400 hover:bg-zinc-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-medium text-white hover:bg-violet-500 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Add goal'}
          </button>
        </div>
      </form>
    </div>
  )
}