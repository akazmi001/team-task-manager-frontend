"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
export function Accordion({ project }) {
  const [open, setOpen] = useState(false)
  const router = useRouter() // import { useRouter } from 'next/navigation'

  return (
    <div className={`bg-zinc-900 border rounded-xl overflow-hidden transition-all duration-200 ${
      open ? 'border-zinc-600' : 'border-zinc-800 hover:border-zinc-600'
    }`}>
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
          <p className="text-sm text-zinc-200 font-medium">{project.name}</p>
        </div>
        <svg
          className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Body */}
      {open && (
        <div className="px-5 pb-4 border-t border-zinc-800 pt-3 space-y-3">
          <p className="text-sm text-zinc-400">
            {project.description || <span className="italic text-zinc-600">No description provided.</span>}
          </p>
          <button
            onClick={() => router.push(`/projects/${project.id}/tasks`)}
            className="flex items-center gap-2 text-xs font-medium text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View Tasks
          </button>
        </div>
      )}
    </div>
  )
}