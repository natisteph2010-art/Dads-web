import { ReactNode } from "react";
import { BookOpen, LogOut, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Logo from "./Logo";

interface DashboardShellProps {
  children: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  admin?: boolean;
}

export default function DashboardShell({ children, eyebrow, title, description, admin = false }: DashboardShellProps) {
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-royal-970 text-white">
      <header className="border-b border-white/10 bg-royal-980/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" aria-label="Go to home"><Logo /></Link>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/60 sm:flex">
              {admin ? <ShieldCheck className="h-4 w-4 text-emerald2-400" /> : <BookOpen className="h-4 w-4 text-emerald2-400" />}
              {admin ? "Administrator" : "Student portal"}
            </span>
            <button type="button" onClick={signOut} className="btn-ghost px-3 py-2 text-sm" aria-label="Sign out">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald2-400">{eyebrow}</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-7 text-white/60 sm:text-lg">{description}</p>
        </div>
        {children}
      </main>
    </div>
  );
}
