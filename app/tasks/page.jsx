'use client'

import { useState, useEffect } from 'react'
import { getHeader } from '../../lib/api'
import { toast } from 'sonner'

const STATUS_COLORS = {
  todo: 'bg-zinc-700 text-zinc-300',
  in_progress: 'bg-yellow-500/20 text-yellow-400',
  done: 'bg-green-500/20 text-green-400',
}

const STATUS_LABELS = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const STATUS_OPTIONS = ['todo', 'in_progress', 'done']
const FILTER_OPTIONS = ['all', 'todo', 'in_progress', 'done']

function TaskCard({ task, onUpdated }) {
  const [status, setStatus] = useState(task.status)
  const [saving, setSaving] = useState(false)

  const handleChange = async (newStatus) => {
      const prev = status;
    setStatus(newStatus)
    setSaving(true)
    try {
      const res = await fetch(`${BASE_URL}projects/api/tasks/${task.id}/`, {
        method: 'PATCH',
        headers: getHeader(),
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error()
      onUpdated(task.id, newStatus)
    } catch {
      setStatus(prev)
      toast.error('Failed to update status.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl px-5 py-4 transition-all duration-200 space-y-2.5">
      {/* Title + status */}
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium text-zinc-100 leading-snug">{task.title}</p>
        <div className="relative shrink-0">
          <select
            value={status}
            disabled={saving}
            onChange={(e) => handleChange(e.target.value)}
            className={`text-xs font-medium pl-2.5 pr-6 py-1 rounded-full appearance-none cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:opacity-50 transition
                        ${STATUS_COLORS[status]}`}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s} className="bg-zinc-800 text-white">
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 opacity-60"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Description */}
      {task.description
        ? <p className="text-sm text-zinc-400 leading-relaxed">{task.description}</p>
        : <p className="text-sm italic text-zinc-600">No description.</p>
      }

      {/* Meta */}
      <div className="flex flex-wrap gap-4 text-xs text-zinc-500 pt-0.5">
        {task.due_date && (
          <span>
            📅 Due:{' '}
            <span className={`font-medium ${
              new Date(task.due_date) < new Date() && status !== 'done'
                ? 'text-red-400'
                : 'text-zinc-300'
            }`}>
              {new Date(task.due_date).toLocaleDateString()}
            </span>
          </span>
        )}
        <span>🕒 Created: <span className="text-zinc-300">{new Date(task.created_at).toLocaleDateString()}</span></span>
      </div>
    </div>
  )
}

export default function MyTasksPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
      fetch(BASE_URL + 'projects/api/tasks/', {
        headers:getHeader(),
    })
      .then((r) => r.json())
      .then(setTasks)
      .catch(() => toast.error('Failed to load tasks.'))
      .finally(() => setLoading(false))
  }, [])

  const handleUpdated = (taskId, newStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)))
  }

  const filtered = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter)

  const counts = {
    all: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    in_progress: tasks.filter((t) => t.status === 'in_progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-start justify-center px-6 py-16">
      <div className="w-full max-w-2xl space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">My Tasks</h1>
          <p className="text-zinc-500 text-sm mt-1">Tasks assigned to you across all projects.</p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-xl p-1 w-fit">
          {FILTER_OPTIONS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
                filter === f ? 'bg-white text-zinc-900' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {f === 'all' ? 'All' : STATUS_LABELS[f]}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                filter === f ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {counts[f]}
              </span>
            </button>
          ))}
        </div>

        {/* Tasks */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 space-y-2.5 animate-pulse">
                <div className="h-4 bg-zinc-800 rounded w-2/3" />
                <div className="h-3 bg-zinc-800 rounded w-full" />
                <div className="h-3 bg-zinc-800 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 space-y-2">
            <p className="text-zinc-400 text-sm font-medium">
              {filter === 'all' ? 'No tasks assigned to you.' : `No ${STATUS_LABELS[filter]} tasks.`}
            </p>
            <p className="text-zinc-600 text-xs">Tasks assigned to you will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((t) => (
              <TaskCard key={t.id} task={t} onUpdated={handleUpdated} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}