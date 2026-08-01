import { useState } from 'react'
import toast from 'react-hot-toast'
import { createSession } from '../../models/Session'
import { saveSession } from '../../services/sessionService'

export default function SessionModal({ durationSeconds,uid, onClose, onSaved }) {
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!description.trim()) {
      toast.error('Describe what you worked on')
      return
    }

    setSaving(true)
    const session = createSession({ description, tags, durationSeconds })
    await saveSession(uid, session);
    setSaving(false)

    toast.success('Session saved')
    onSaved?.(session)
    onClose()
  }

  const minutes = Math.floor(durationSeconds / 60)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-950 p-5"
      >
        <h2 className="text-sm font-medium text-zinc-100">Session finished</h2>
        <p className="mb-4 text-xs text-zinc-500">{minutes} min focused — nice work.</p>

        <label className="mb-1 block text-xs text-zinc-400">What did you work on?</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          autoFocus
          className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-600"
          placeholder="e.g. Built the sidebar navigation"
        />

        <label className="mb-1 block text-xs text-zinc-400">Tags (comma separated)</label>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mb-4 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-600"
          placeholder="e.g. react, frontend"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-xs text-zinc-400 hover:bg-zinc-900"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-medium text-white hover:bg-violet-500 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save session'}
          </button>
        </div>
      </form>
    </div>
  )
}