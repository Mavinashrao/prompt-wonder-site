import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useToast } from "@/components/Toast";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Civil Wala Kitchen" },
      { name: "description", content: "Sign in to Civil Wala Kitchen to order online, save favourites, and track orders." },
      { property: "og:title", content: "Login — Civil Wala Kitchen" },
      { property: "og:description", content: "Welcome back — sign in to continue." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: true });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.push("Enter email and password");
    toast.push("Welcome back!");
    setTimeout(() => nav({ to: "/" }), 400);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 hero-bg" />
      <div className="absolute inset-0 pointer-events-none">
        {["🍛", "🍜", "🥘", "🍲", "☕", "🥭"].map((e, i) => (
          <span
            key={i}
            className="absolute text-4xl opacity-30 animate-float"
            style={{
              top: `${10 + i * 13}%`,
              left: `${(i * 17) % 90}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            {e}
          </span>
        ))}
      </div>

      <div className="relative min-h-screen grid place-items-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="glass-dark rounded-3xl p-8 shadow-luxe animate-slide-up">
            <div className="flex justify-center">
              <Logo light />
            </div>
            <div className="mt-6 text-center text-cream">
              <h1 className="font-display text-3xl">Welcome Back</h1>
              <p className="mt-1 text-sm text-cream/70">Sign in to continue your culinary journey.</p>
            </div>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/60" />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/50 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/60" />
                <input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-xl bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/50 pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-cream/80">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} className="accent-accent" />
                  Remember me
                </label>
                <a href="#" className="hover:text-accent">Forgot password?</a>
              </div>

              <button type="submit" className="w-full btn-gold btn-gold-hover rounded-xl py-3 inline-flex items-center justify-center gap-2">
                Sign In <ArrowRight size={16} />
              </button>
            </form>

            <div className="my-5 flex items-center gap-3 text-xs text-cream/50">
              <div className="flex-1 h-px bg-cream/20" />
              or continue with
              <div className="flex-1 h-px bg-cream/20" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="rounded-xl bg-cream text-secondary px-4 py-2.5 text-sm font-button font-semibold hover:bg-cream/90 inline-flex items-center justify-center gap-2">
                <span className="text-lg">G</span> Google
              </button>
              <button
                onClick={() => { toast.push("Continuing as guest"); setTimeout(() => nav({ to: "/" }), 300); }}
                className="rounded-xl bg-cream/10 border border-cream/20 text-cream px-4 py-2.5 text-sm font-button font-semibold hover:bg-cream/20 inline-flex items-center justify-center gap-2"
              >
                <User size={14} /> Guest
              </button>
            </div>

            <p className="mt-6 text-center text-xs text-cream/70">
              New to Civil Wala Kitchen?{" "}
              <a href="#" className="text-accent font-semibold hover:underline">Create an account</a>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-cream/70 hover:text-accent text-xs font-heading tracking-wide">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
