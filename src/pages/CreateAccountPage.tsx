import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  ChevronDown,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import Logo from "../components/Logo";
import PasswordInput from "../components/PasswordInput";
import { supabase } from "../lib/supabase";
import { GRADES } from "../data/curriculum";

export default function CreateAccountPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPhone = /^\+?\d[\d\s-]{6,}$/.test(contact.trim());

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!fullName || !contact || !password || !grade) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const email = isPhone
        ? `${contact.replace(/[^0-9+]/g, "")}@phone.local`
        : contact;
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, grade_level: grade },
        },
      });
      if (signUpError) throw signUpError;
      navigate("/login");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not create account.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-royal-800 via-royal-900 to-royal-970 p-10 lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-10 h-80 w-80 rounded-full bg-royal-500/30 blur-[110px]" />
          <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-emerald2-400/20 blur-[110px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(31,217,134,0.08),transparent_55%)]" />
        </div>

        <div className="relative">
          <Logo />
        </div>

        <div className="relative max-w-md">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald2-400/30 bg-emerald2-400/10 px-3.5 py-1.5 text-xs font-semibold text-emerald2-300">
            <Sparkles className="h-3.5 w-3.5" />
            Join 12,000+ Ethiopian students
          </span>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white">
            Your path to <span className="gradient-text">Matric success</span> begins here.
          </h2>
          <p className="mt-4 text-white/70">
            Sign up free and get instant access to MoE-aligned lessons, past
            national exams, and personalized analytics.
          </p>

          <div className="mt-8 space-y-3">
            {[
              { icon: GraduationCap, text: "Grades 9–12 · Natural & Social streams" },
              { icon: Target, text: "Mock exams with real timers for Grade 8 & 12" },
              { icon: ShieldCheck, text: "100% aligned to the Ministry of Education" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-white/80">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-emerald2-400">
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-sm text-white/40">
          "I improved my Maths from 58% to 89% in one term." — Selam, Grade 12, Addis Ababa
        </p>
      </div>

      <div className="flex flex-col bg-royal-970 px-5 py-8 sm:px-8 lg:px-14">
        <div className="flex items-center justify-between lg:hidden">
          <Logo />
          <Link to="/" className="text-sm font-semibold text-white/60 hover:text-white">
            Home
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8">
          <h1 className="font-display text-3xl font-bold text-white">
            Create your free account
          </h1>
          <p className="mt-2 text-white/60">
            Start preparing for your national exams today.
          </p>

          {error && (
            <div className="mt-5 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold text-white/80">
                Full Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Abebe Bekele"
                  autoComplete="name"
                  className="input-field pl-11"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact" className="mb-1.5 block text-sm font-semibold text-white/80">
                Email or Phone Number
              </label>
              <div className="relative">
                {isPhone ? (
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                ) : (
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                )}
                <input
                  id="contact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="abebe@email.com or +251 9..."
                  autoComplete="email"
                  className="input-field pl-11"
                />
              </div>
              <p className="mt-1.5 text-xs text-white/40">
                Use your email or local Ethiopian phone number.
              </p>
            </div>

            <PasswordInput
              id="password"
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
              label="Password"
              placeholder="At least 6 characters"
            />

            <div>
              <label htmlFor="grade" className="mb-1.5 block text-sm font-semibold text-white/80">
                Grade Level
              </label>
              <div className="relative">
                <select
                  id="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="input-field appearance-none pr-11 [&>option]:bg-royal-960"
                >
                  <option value="" disabled>
                    Select your grade
                  </option>
                  {GRADES.map((g) => (
                    <option key={g} value={g}>
                      Grade {g}
                      {g === 12 ? " (Matric)" : ""}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-cta w-full">
              {loading ? "Creating account…" : "Create Free Account"}
              {!loading && <ArrowRight className="h-5 w-5" />}
            </button>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-royal-970 px-3 text-xs text-white/40">
                  or
                </span>
              </div>
            </div>

            <button type="button" className="btn-ghost w-full">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/60">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-emerald2-400 hover:text-emerald2-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
