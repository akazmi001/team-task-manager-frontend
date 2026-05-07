'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { createTask, getTasks, updateTask, getHeader } from '../../../../lib/api'

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

function EditModal({ task, onClose, onSave }) {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || '',
    status: task.status,
    due_date: task.due_date ? task.due_date.split('T')[0] : '',
  })

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await onSave(task.id, form)
      onClose()
    } catch {
      alert('You are not admin!')
    }
  }

  const inputClass =
    'w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-zinc-900 border border-white/[0.06] rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white font-semibold text-base tracking-tight">Edit Task</h2>
            <p className="text-zinc-500 text-xs mt-0.5">Update the task details below.</p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 transition p-1 rounded-lg hover:bg-white/5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-zinc-400 text-xs font-medium">Title</label>
            <input
              required
              value={form.title}
              placeholder="Task title"
              className={inputClass}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-400 text-xs font-medium">Description</label>
            <textarea
              rows={3}
              value={form.description}
              placeholder="What needs to be done?"
              className={`${inputClass} resize-none`}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="flex gap-3">
            <div className="space-y-1.5 flex-1">
              <label className="text-zinc-400 text-xs font-medium">Status</label>
              <select
                value={form.status}
                className={inputClass}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="space-y-1.5 flex-1">
              <label className="text-zinc-400 text-xs font-medium">Due Date</label>
              <input
                type="date"
                value={form.due_date}
                className={inputClass}
                onChange={(e) => setForm({ ...form, due_date: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              className="flex-1 bg-white text-zinc-900 font-medium text-sm rounded-lg py-2.5 hover:bg-zinc-100 active:scale-[0.98] transition cursor-pointer"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-sm text-zinc-400 border border-white/[0.08] hover:border-white/20 hover:text-white rounded-lg py-2.5 transition active:scale-[0.98] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function TaskAccordion({ task, onEdit, projectId }) {
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [assignedId, setAssignedId] = useState(task.asigned_to?.id ?? null)
  const [assigning, setAssigning] = useState(false)
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!open || users.length > 0) return
    fetch(BASE_URL + 'users/api/users/list', {
      headers: getHeader()
    })
      .then((r) => r.json())
      .then(setUsers)
      .catch(() => {})
  }, [open])

  const handleAssign = async (userId) => {
    const newId = userId === '' ? null : Number(userId)
    setAssignedId(newId)
    setAssigning(true)
    try {
      console.log()
      const res = await fetch(BASE_URL + `projects/api/${projectId}/tasks/${task.id}/`, {
        method: 'PATCH',
        headers: getHeader(),
        body: JSON.stringify({ asigned_to_id: newId }),
      })
      if (!res.ok) throw new Error()
    } catch {
      alert('Failed to assign task.')
      setAssignedId(task.asigned_to?.id ?? null)
    } finally {
      setAssigning(false)
    }
  }

  return (
    <div
      className={`bg-zinc-900 border rounded-xl overflow-hidden transition-all duration-200 ${
        open ? 'border-zinc-600' : 'border-zinc-800 hover:border-zinc-600'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
          <p className="text-sm text-zinc-200 font-medium">{task.title}</p>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[task.status]}`}>
            {STATUS_LABELS[task.status]}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-4 border-t border-zinc-800 pt-3 space-y-3">
          <p className="text-sm text-zinc-400">
            {task.description || <span className="italic text-zinc-600">No description.</span>}
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
            {task.due_date && (
              <span>📅 Due: <span className="text-zinc-300">{new Date(task.due_date).toLocaleDateString()}</span></span>
            )}
            <span>🕒 Created: <span className="text-zinc-300">{new Date(task.created_at).toLocaleDateString()}</span></span>
          </div>

          {/* Assign To Dropdown */}
          <div className="space-y-1.5">
            <label className="text-zinc-500 text-xs font-medium flex items-center gap-1.5">
              👤 Assign to
              {assigning && (
                <span className="text-zinc-600 text-[10px] animate-pulse">saving…</span>
              )}
            </label>
            <select
              value={assignedId ?? ''}
              disabled={assigning || users.length === 0}
              onChange={(e) => handleAssign(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded-lg
                         focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500
                         disabled:opacity-50 transition cursor-pointer"
            >
              <option value="">
                {users.length === 0 ? 'Loading…' : 'Unassigned'}
              </option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username}{u.role ? ` · ${u.role}` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Edit Button */}
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(task) }}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white border border-white/[0.08]
                       hover:border-white/20 px-3 py-1.5 rounded-lg transition active:scale-[0.98] cursor-pointer"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Task
          </button>
        </div>
      )}
    </div>
  )
}

export default function TasksPage() {
  const { projectId } = useParams()
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    due_date: '',
  })

  useEffect(() => {
    fetchTasks()
  }, [projectId])

  const fetchTasks = async () => {
    const resp = await getTasks(projectId)
    setTasks(resp)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createTask(form, projectId)
      fetchTasks()
      setForm({ title: '', description: '', status: 'todo', due_date: '' })
      alert('Task Created.')
    } catch {
      alert('You are not admin')
    }
  }

  const handleUpdate = async (taskId, updatedForm) => {
    await updateTask(taskId, updatedForm, projectId)
    fetchTasks()
  }

  const inputClass =
    'w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition'

  return (
    <div className="min-h-screen bg-zinc-950 flex items-start justify-center px-6 py-16">
      <div className="w-full max-w-2xl space-y-10">

        {/* Back link */}
        <a href="/projects" className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition w-fit">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </a>

        {/* Form Card */}
        <div className="bg-zinc-900 border border-white/[0.06] rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-white">New Task</h2>
            <p className="text-zinc-500 text-sm mt-1">Add a task to this project.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-1.5">
              <label className="text-zinc-400 text-xs font-medium">Title</label>
              <input
                value={form.title}
                required
                className={inputClass}
                placeholder="Task title"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-400 text-xs font-medium">Description</label>
              <textarea
                rows={3}
                value={form.description}
                className={`${inputClass} resize-none`}
                placeholder="What needs to be done?"
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="flex gap-4">
              <div className="space-y-1.5 flex-1">
                <label className="text-zinc-400 text-xs font-medium">Status</label>
                <select
                  value={form.status}
                  className={inputClass}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="space-y-1.5 flex-1">
                <label className="text-zinc-400 text-xs font-medium">Due Date</label>
                <input
                  type="date"
                  value={form.due_date}
                  className={inputClass}
                  onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="self-start bg-white text-zinc-900 font-medium text-sm px-6 py-2.5 rounded-lg hover:bg-zinc-100 active:scale-[0.98] transition cursor-pointer"
            >
              Create Task
            </button>
          </form>
        </div>

        {/* Tasks List */}
        {tasks.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Tasks</h3>
            {tasks.map((t) => (
              <TaskAccordion key={t.id} task={t} onEdit={setEditingTask} projectId={projectId} />
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingTask && (
        <EditModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  )
}