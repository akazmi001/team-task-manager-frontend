"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  CheckSquare,
  Users,
  BarChart3,
  ArrowRight,
  Menu,
  X,
  Sun,
  Moon,
  ChevronRight,
  Zap,
  Shield,
  Clock,
  Star,
  FolderKanban,
  UserPlus,
  ListTodo,
  TrendingUp,
  Sparkles,
  CirclePlay,
} from "lucide-react";

// ─── Minimal Button Component ────────────────────────────────────────────────
function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  [key: string]: unknown;
}) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none cursor-pointer";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-lg shadow-indigo-500/25 focus:ring-indigo-500",
    secondary:
      "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98] shadow-lg shadow-emerald-500/25 focus:ring-emerald-500",
    ghost:
      "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-400",
    outline:
      "border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 focus:ring-indigo-400",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({
  icon: Icon,
  title,
  description,
  accentColor,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  accentColor: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-7 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/20 hover:-translate-y-1 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl ${accentColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5 tracking-tight">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// ─── Step Card ────────────────────────────────────────────────────────────────
function StepCard({
  number,
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`relative flex flex-col items-center text-center transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="relative mb-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <Icon className="w-7 h-7 text-white" strokeWidth={1.75} />
        </div>
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shadow-sm">
          {number}
        </span>
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-[180px]">
        {description}
      </p>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  value,
  label,
  icon: Icon,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-indigo-400" />
        <span className="text-3xl font-extrabold text-white tracking-tight">
          {value}
        </span>
      </div>
      <span className="text-indigo-200 text-sm font-medium">{label}</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Replace with real auth check: const { user } = useAuth();
  const isAuthenticated = false;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(mq.matches);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add("dark") : root.classList.remove("dark");
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const features = [
    {
      icon: FolderKanban,
      title: "Project Management",
      description:
        "Organise work into focused projects with boards, timelines, and milestones. Keep every initiative on track from kickoff to delivery.",
      accentColor: "bg-gradient-to-br from-indigo-500 to-indigo-700",
    },
    {
      icon: CheckSquare,
      title: "Task Tracking",
      description:
        "Create, assign, and monitor tasks through To-Do, In Progress, and Done columns. Never lose sight of what matters most.",
      accentColor: "bg-gradient-to-br from-emerald-500 to-teal-600",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Invite members, assign roles, and collaborate in real time. Role-based access keeps sensitive projects secure.",
      accentColor: "bg-gradient-to-br from-violet-500 to-purple-700",
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description:
        "Visualise team velocity, completion rates, and bottlenecks with an intuitive dashboard built for data-driven decisions.",
      accentColor: "bg-gradient-to-br from-amber-500 to-orange-600",
    },
  ];

  const steps = [
    {
      icon: FolderKanban,
      title: "Create a Project",
      description: "Set up a workspace for your initiative in seconds.",
    },
    {
      icon: UserPlus,
      title: "Add Team Members",
      description: "Invite colleagues and assign admin or member roles.",
    },
    {
      icon: ListTodo,
      title: "Assign Tasks",
      description: "Break work down and assign owners with due dates.",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Watch the dashboard update as tasks move to Done.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 font-sans">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none select-none"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-indigo-100/60 via-violet-50/40 to-transparent dark:from-indigo-900/20 dark:via-violet-900/10 dark:to-transparent rounded-full blur-3xl" />
          <div className="absolute top-40 right-[10%] w-72 h-72 bg-emerald-100/50 dark:bg-emerald-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-[5%] w-64 h-64 bg-violet-100/50 dark:bg-violet-900/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700/50 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-8 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            Built for high-performance teams
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6">
            Manage your team&apos;s
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              tasks effortlessly
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-10">
            TaskFlow brings projects, people, and priorities together in one
            place. Assign work, track progress, and ship faster—without the
            chaos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/signup">
              <Button variant="primary" size="lg" className="min-w-[180px]">
                Get started free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <button className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150 group">
              <span className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center group-hover:border-indigo-400 transition-colors duration-150">
                <CirclePlay className="w-4 h-4 text-indigo-500" />
              </span>
              Watch demo
            </button>
          </div>

          {/* Social proof */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 dark:text-slate-500">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2">
                {["bg-indigo-400", "bg-violet-400", "bg-emerald-400", "bg-amber-400"].map(
                  (c, i) => (
                    <div
                      key={i}
                      className={`w-7 h-7 rounded-full border-2 border-white dark:border-slate-950 ${c}`}
                    />
                  )
                )}
              </div>
              <span className="font-medium text-slate-600 dark:text-slate-400">
                2,400+ teams
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <span className="font-medium text-slate-600 dark:text-slate-400">
                4.9 / 5 rating
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span className="font-medium text-slate-600 dark:text-slate-400">
                SOC 2 compliant
              </span>
            </div>
          </div>
        </div>

        {/* Mock dashboard preview */}
        <div className="relative max-w-5xl mx-auto mt-16">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-2xl shadow-indigo-200/30 dark:shadow-indigo-900/20 overflow-hidden bg-white dark:bg-slate-900">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <div className="flex-1 mx-4 h-5 rounded-md bg-slate-200 dark:bg-slate-700 text-xs text-slate-400 dark:text-slate-500 flex items-center px-3">
                app.taskflow.io/dashboard
              </div>
            </div>
            {/* Dashboard mock */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Stat cards */}
              {[
                {
                  label: "Active Projects",
                  val: "12",
                  color: "text-indigo-600 dark:text-indigo-400",
                  bg: "bg-indigo-50 dark:bg-indigo-900/20",
                  icon: FolderKanban,
                },
                {
                  label: "Tasks In Progress",
                  val: "38",
                  color: "text-amber-600 dark:text-amber-400",
                  bg: "bg-amber-50 dark:bg-amber-900/20",
                  icon: Clock,
                },
                {
                  label: "Completed This Week",
                  val: "74",
                  color: "text-emerald-600 dark:text-emerald-400",
                  bg: "bg-emerald-50 dark:bg-emerald-900/20",
                  icon: CheckSquare,
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`${s.bg} rounded-xl p-4 flex items-center gap-3`}
                >
                  <s.icon className={`w-8 h-8 ${s.color}`} strokeWidth={1.5} />
                  <div>
                    <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      {s.val}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {s.label}
                    </p>
                  </div>
                </div>
              ))}
              {/* Kanban preview */}
              <div className="sm:col-span-3 grid grid-cols-3 gap-3 mt-1">
                {[
                  {
                    col: "To Do",
                    items: ["Design mockups", "Write API docs"],
                    color: "bg-slate-100 dark:bg-slate-800",
                    dot: "bg-slate-400",
                  },
                  {
                    col: "In Progress",
                    items: ["Auth integration", "Dashboard UI"],
                    color: "bg-amber-50 dark:bg-amber-900/20",
                    dot: "bg-amber-400",
                  },
                  {
                    col: "Done",
                    items: ["Setup DB schema", "CI/CD pipeline"],
                    color: "bg-emerald-50 dark:bg-emerald-900/20",
                    dot: "bg-emerald-400",
                  },
                ].map((col) => (
                  <div key={col.col} className={`${col.color} rounded-xl p-3`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                        {col.col}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {col.items.map((item) => (
                        <div
                          key={item}
                          className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-xs text-slate-700 dark:text-slate-300 font-medium shadow-sm border border-slate-100 dark:border-slate-700/50"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Glow */}
          <div
            aria-hidden
            className="absolute -inset-4 bg-gradient-to-b from-transparent via-indigo-100/20 to-transparent dark:via-indigo-900/10 -z-10 rounded-3xl blur-xl"
          />
        </div>
      </section>

      {/* ── Stats Banner ─────────────────────────────────────────────────────── */}
      <section className="py-14 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            <StatCard value="2.4K+" label="Teams worldwide" icon={Users} />
            <StatCard value="120K+" label="Tasks completed" icon={CheckSquare} />
            <StatCard value="98%" label="Uptime SLA" icon={Zap} />
            <StatCard value="4.9★" label="Customer rating" icon={Star} />
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────────── */}
      <section
        id="features"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700/50 mb-4">
              Features
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
              Everything your team needs
            </h2>
            <p className="max-w-xl mx-auto text-lg text-slate-500 dark:text-slate-400">
              From kickoff to delivery, TaskFlow has the tools to keep your team
              aligned and productive.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/50 mb-4">
              How it works
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
              Up and running in minutes
            </h2>
            <p className="max-w-xl mx-auto text-lg text-slate-500 dark:text-slate-400">
              No lengthy onboarding. Just four simple steps and your team is
              shipping.
            </p>
          </div>

          {/* Connector line (desktop) */}
          <div className="relative">
            <div
              aria-hidden
              className="hidden sm:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-600 to-transparent"
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
              {steps.map((s, i) => (
                <StepCard key={s.title} number={i + 1} {...s} delay={i * 100} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonial / Trust ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="relative">
            <div
              aria-hidden
              className="text-8xl font-serif text-indigo-100 dark:text-indigo-900/50 leading-none select-none absolute -top-6 left-0"
            >
              &ldquo;
            </div>
            <p className="text-2xl sm:text-3xl font-medium text-slate-700 dark:text-slate-300 leading-snug italic relative z-10 px-8">
              TaskFlow cut our sprint planning time in half and gave every team
              member total clarity on what to work on next. It&apos;s become
              indispensable.
            </p>
            <footer className="mt-8 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                SR
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900 dark:text-white text-sm">
                  Sarah Roth
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  Engineering Manager, Acme Corp
                </p>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 p-12 overflow-hidden shadow-2xl shadow-indigo-500/30">
            {/* Decoration */}
            <div
              aria-hidden
              className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"
            />
            <div
              aria-hidden
              className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"
            />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Ready to streamline
                <br />
                your workflow?
              </h2>
              <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                Join thousands of teams already shipping faster with TaskFlow.
                Free forever for small teams.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/signup">
                  <button className="px-8 py-3.5 rounded-xl bg-white text-indigo-700 font-bold text-base hover:bg-indigo-50 active:scale-[0.98] transition-all duration-150 shadow-lg flex items-center gap-2">
                    Sign up free
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
                <button className="px-8 py-3.5 rounded-xl border-2 border-white/30 text-white font-semibold text-base hover:border-white/60 hover:bg-white/5 transition-all duration-150 flex items-center gap-2">
                  <CirclePlay className="w-4 h-4" />
                  View demo
                </button>
              </div>
              <p className="mt-5 text-indigo-200 text-sm">
                No credit card required · Free for up to 5 members
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
                  <LayoutGrid className="w-4 h-4 text-white" />
                </div>
                <span className="font-extrabold text-white text-lg tracking-tight">
                  TaskFlow
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-5">
                Helping high-performance teams stay aligned and ship faster.
              </p>
              {/* <div className="flex gap-3">
                {[
                  { Icon: Github, label: "GitHub" },
                  { Icon: Twitter, label: "Twitter" },
                  { Icon: Linkedin, label: "LinkedIn" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-colors duration-150"
                  >
                    <Icon className="w-4 h-4 text-slate-300" />
                  </a>
                ))}
              </div> */}
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">
                Product
              </h4>
              <ul className="space-y-2.5">
                {["Features", "Pricing", "Changelog", "Roadmap"].map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition-colors duration-150"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">
                Company
              </h4>
              <ul className="space-y-2.5">
                {["About", "Blog", "Careers", "Contact"].map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition-colors duration-150"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"].map(
                  (l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm hover:text-white transition-colors duration-150"
                      >
                        {l}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} TaskFlow, Inc. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}