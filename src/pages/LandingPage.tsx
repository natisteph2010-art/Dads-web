import { Link } from "react-router-dom";
import {
  BookMarked,
  Timer,
  LineChart,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Star,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import DashboardMock from "../components/DashboardMock";
import GradeSelector from "../components/GradeSelector";

const FEATURES = [
  {
    icon: BookMarked,
    title: "100% MoE Syllabus Aligned",
    desc: "Strictly following the Ministry of Education curriculum, topic by topic, so you study exactly what is examined.",
    accent: "from-emerald2-400 to-emerald2-600",
  },
  {
    icon: Timer,
    title: "Past National Exams Portal",
    desc: "Simulated exam timers for Grade 8 and Grade 12 leaving exams, with real past papers and instant grading.",
    accent: "from-royal-400 to-royal-600",
  },
  {
    icon: LineChart,
    title: "Personalized Analytics",
    desc: "Track your strengths and weaknesses in specific subjects with clear, actionable insights.",
    accent: "from-amber-400 to-amber-600",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-royal-970">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-royal-500/20 blur-[120px]" />
          <div className="absolute top-20 right-10 h-80 w-80 rounded-full bg-emerald2-400/15 blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(31,217,134,0.06),transparent_60%)]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
          {/* Left */}
          <div className="animate-fade-in opacity-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald2-400/30 bg-emerald2-400/10 px-3.5 py-1.5 text-xs font-semibold text-emerald2-300">
              <Sparkles className="h-3.5 w-3.5" />
              Ethiopian National Curriculum · Grades 9–12
            </span>

            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Master the <span className="gradient-text">Ethiopian National Exams</span> with confidence.
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
              Prepare for the Grade 12 Matric and Grade 8 leaving exams with a
              platform built strictly on the Ministry of Education syllabus —
              past papers, timed mock exams, and analytics that reveal exactly
              where to improve.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/signup" className="btn-cta group">
                Create Free Account
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/login" className="btn-ghost">
                I already have an account
              </Link>
            </div>

            {/* Trust row */}
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald2-400" />
                MoE syllabus verified
              </span>
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 text-emerald2-400" />
                Loved by 12,000+ students
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald2-400" />
                Free forever
              </span>
            </div>
          </div>

          {/* Right — dashboard mock */}
          <div className="animate-scale-in opacity-0">
            <DashboardMock />
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Everything you need to <span className="gradient-text">score higher</span>
          </h2>
          <p className="mt-3 text-white/60">
            A complete preparation toolkit, designed for Ethiopian students.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              style={{ animationDelay: `${i * 100}ms` }}
              className="group animate-fade-in rounded-3xl border border-white/10 bg-white/[0.03] p-6 opacity-0 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${f.accent} shadow-lg`}
              >
                <f.icon className="h-6 w-6 text-white" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Grade selector */}
      <section className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-20">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
            <Sparkles className="h-3.5 w-3.5 text-emerald2-400" />
            Interactive Grade Preview
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Pick your grade, explore your subjects
          </h2>
          <p className="mt-3 text-white/60">
            Switch between Natural and Social Science streams to preview what
            you'll study.
          </p>
        </div>

        <GradeSelector />
      </section>

      {/* CTA banner */}
      <section className="relative mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-emerald2-400/20 bg-gradient-to-br from-royal-800/60 via-royal-900/60 to-royal-960/60 p-8 text-center sm:p-14">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-emerald2-400/20 blur-[100px]" />
          <h2 className="relative font-display text-3xl font-bold text-white sm:text-4xl">
            Your future starts with one free account
          </h2>
          <p className="relative mt-3 text-white/70">
            Join thousands of Ethiopian students preparing the smart way.
          </p>
          <Link to="/signup" className="btn-cta relative mt-7 mx-auto">
            Create Free Account
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-royal-980">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
          <p className="text-sm text-white/50">
            © 2026 ሐበሻLearn · Built for the Ethiopian National Curriculum
          </p>
          <div className="flex gap-5 text-sm text-white/50">
            <Link to="/login" className="hover:text-white">Sign In</Link>
            <Link to="/signup" className="hover:text-white">Create Account</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
