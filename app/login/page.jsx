"use client";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { loginApi } from "../../lib/api";
import Link from "next/link";
import { toast } from "sonner";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access) router.replace("/dashboard");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginApi(form);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("role", data.role);
      login(data.role);
      router.push("/dashboard");
      toast.info("Login successfull");
    } catch (err) {
      toast.error("Login failed");
    }
  };

  const EyeIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const inputClass =
    "w-full bg-zinc-800/60 border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition";

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="1.8">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-white text-xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-zinc-500 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-white/[0.06] rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-zinc-400 text-xs font-medium">Username</label>
              <input
                type="input"
                placeholder="Username"
                className={inputClass}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-zinc-400 text-xs font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${inputClass} pr-10`}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition"
                >
                  <EyeIcon />
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-white text-zinc-900 font-medium text-sm rounded-lg py-2.5 mt-1 hover:bg-zinc-100 active:scale-[0.98] transition cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-500 text-sm mt-5">
          Don't have an account?{" "}
          <Link href="/signup" className="text-white hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}