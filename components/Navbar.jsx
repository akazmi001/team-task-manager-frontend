"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/projects", label: "Projects" },
    { href: "/tasks", label: "Tasks" },
  ];

  const NavLink = ({ href, label }) => (
    <Link
      href={href}
      className={`text-sm transition ${
        pathname === href
          ? "text-white font-medium"
          : "text-zinc-400 hover:text-zinc-200"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="w-full bg-zinc-950 border-b border-white/[0.06] px-6 py-3.5 flex items-center justify-between">

      {/* Left — Logo */}
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="1.8">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className="text-white text-sm font-semibold tracking-tight">Task Manager</span>
      </Link>

      {user && (
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>
      )}

      <div className="flex items-center gap-3">
        {!user ? (
          <>
            <Link
              href="/login"
              className="text-sm text-zinc-400 hover:text-zinc-200 transition"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-white text-zinc-900 font-medium px-3.5 py-1.5 rounded-lg hover:bg-zinc-100 active:scale-[0.98] transition"
            >
              Sign up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-sm text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/20 px-3.5 py-1.5 rounded-lg transition active:scale-[0.98] cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}