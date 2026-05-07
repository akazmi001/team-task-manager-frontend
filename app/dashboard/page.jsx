"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  useEffect(() => {
    // your data fetching here
  }, []);

  const cards = [
    {
      label: "Total Tasks",
      value: data.total,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 12h6M9 15h4" />
        </svg>
      ),
    },
    {
      label: "Completed",
      value: data.completed,
      color: "text-green-400",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ),
    },
    {
      label: "Pending",
      value: data.pending,
      color: "text-yellow-400",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      label: "Overdue",
      value: data.overdue,
      color: "text-red-400",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-16">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-white text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-1">Here's an overview of your tasks.</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-3">
          {cards.map(({ label, value, color = "text-white", icon }) => (
            <div
              key={label}
              className="bg-zinc-900 border border-white/[0.06] rounded-2xl p-5 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 text-xs font-medium">{label}</span>
                <span className="text-zinc-600">{icon}</span>
              </div>
              <span className={`text-3xl font-semibold tracking-tight ${color}`}>{value}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}