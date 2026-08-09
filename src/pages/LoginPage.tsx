import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, ArrowRight } from "lucide-react";
import Logo from "../components/Logo";
import PasswordInput from "../components/PasswordInput";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const navigate = useNavigate();
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPhone = /^\+?\d[\d\s-]{6,}$/.test(contact.trim());

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!contact || !password) {
      setError("Please enter your email/phone and password.");
      return;
    }
    setLoading(true);
    try {
      const email = isPhone
        ? `${contact.replace(/[^0-9+]/g, "")}@phone.local`
        : contact;
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      navigate("/");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not sign in.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-royal-970 px-5 py-10">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-royal-500/20 blur-[120px]" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-emerald2-400/15 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(31,217,134,0.06),transparent_60%)]" />
      </div>

      <div className="relative w-full max-w-md animate-scale-in">
        {/* Top logo */}
        <div className="mb-7 flex justify-center">
          <Logo />
        </div>

        {/* Card */}
        <div className="card-glass rounded-3xl p-7 shadow-royal sm:p-9">
          <h1 className="font-display text-2xl font-bold text-white">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-white/60">
            Sign in to continue your exam prep.
          </p>

          {error && (
            <div className="mt-5 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email or Phone */}
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
            </div>

            {/* Password */}
            <PasswordInput
              id="password"
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
              label="Password"
            />

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-royal-960 text-emerald2-400 focus:ring-emerald2-400/40"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-sm font-semibold text-emerald2-400 hover:text-emerald2-300"
                onClick={() => setError("Password recovery is not available in this demo.")}
              >
                Forgot Password?
              </button>
            </div>

            {/* CTA */}
            <button type="submit" disabled={loading} className="btn-cta w-full">
              {loading ? "Signing in…" : "Sign In"}
              {!loading && <ArrowRight className="h-5 w-5" />}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-white/60">
          Don't have an account?{" "}
          <Link to="/signup" className="font-bold text-emerald2-400 hover:text-emerald2-300">
            Create an account
          </Link>
        </p>

        <p className="mt-4 text-center text-xs text-white/40">
          <Link to="/" className="hover:text-white/70">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
