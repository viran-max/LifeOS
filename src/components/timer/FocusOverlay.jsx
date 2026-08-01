import { Pause, Play, Square } from 'lucide-react'
import { formatTime } from '../../utils/formatTime'

export default function FocusOverlay({ status, elapsedSeconds, goalLabel, onPause, onResume, onFinish }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/98 backdrop-blur-sm">
      <p className="mb-2 text-sm text-zinc-500">Working on</p>
      <p className="mb-10 text-lg font-medium text-zinc-100">{goalLabel}</p>

      <p className="font-mono text-7xl font-semibold tracking-tight text-zinc-50 sm:text-8xl md:text-9xl">
        {formatTime(elapsedSeconds)}
      </p>

      <div className="mt-12 flex gap-3">
        {status === 'running' ? (
          <button
            onClick={onPause}
            className="flex items-center gap-2 rounded-xl bg-zinc-800 px-6 py-3 text-sm font-medium text-zinc-100 hover:bg-zinc-700"
          >
            <Pause className="h-5 w-5" /> Pause
          </button>
        ) : (
          <button
            onClick={onResume}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-medium text-white hover:bg-violet-500"
          >
            <Play className="h-5 w-5" /> Resume
          </button>
        )}

        <button
          onClick={onFinish}
          className="flex items-center gap-2 rounded-xl border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-300 hover:border-red-900 hover:text-red-400"
        >
          <Square className="h-5 w-5" /> Finish
        </button>
      </div>
    </div>
  )
}