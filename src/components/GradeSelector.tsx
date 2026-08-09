import { useState } from "react";
import * as Lucide from "lucide-react";
import { GRADES, GRADE_LABELS, STREAMS, type Grade } from "../data/curriculum";

export default function GradeSelector() {
  const [active, setActive] = useState<Grade>(12);
  const [stream, setStream] = useState<"natural" | "social">("natural");

  const activeStream = STREAMS.find((s) => s.id === stream)!;

  return (
    <div className="card-glass rounded-3xl p-5 sm:p-7">
      {/* Grade tabs */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {GRADES.map((g) => {
          const isActive = active === g;
          return (
            <button
              key={g}
              onClick={() => setActive(g)}
              className={`group relative overflow-hidden rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${
                isActive
                  ? "border-emerald2-400/50 bg-emerald2-400/10 shadow-glow"
                  : "border-white/10 bg-royal-960/40 hover:border-white/20 hover:bg-royal-960/70"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-display text-2xl font-extrabold ${
                    isActive ? "text-emerald2-300" : "text-white/90"
                  }`}
                >
                  {g}
                </span>
                <span
                  className={`grid h-7 w-7 place-items-center rounded-lg text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-emerald2-400 text-royal-990"
                      : "bg-white/10 text-white/60 group-hover:bg-white/15"
                  }`}
                >
                  {isActive ? "✓" : "→"}
                </span>
              </div>
              <span className="mt-1 block text-[11px] font-medium text-white/50">
                {GRADE_LABELS[g].split("·")[g === 12 ? 1 : 0]?.trim() ||
                  `Grade ${g}`}
              </span>
              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald2-400 to-emerald2-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Stream toggle */}
      <div className="mt-6 inline-flex rounded-xl border border-white/10 bg-royal-960/50 p-1">
        {STREAMS.map((s) => (
          <button
            key={s.id}
            onClick={() => setStream(s.id)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              stream === s.id
                ? "bg-white/10 text-white shadow-sm"
                : "text-white/60 hover:text-white/80"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Stream description */}
      <p className="mt-3 text-sm text-white/60">{activeStream.description}</p>

      {/* Subject cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {activeStream.subjects.map((subj, i) => {
          const Icon = (Lucide as unknown as Record<string, React.ComponentType<{ className?: string }>>)[subj.icon] ?? Lucide.BookOpen;
          return (
            <div
              key={subj.name}
              style={{ animationDelay: `${i * 60}ms` }}
              className="group animate-fade-in rounded-2xl border border-white/10 bg-royal-960/40 p-4 opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-royal-960/70"
            >
              <span
                className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${subj.color} shadow-lg`}
              >
                <Icon className="h-5 w-5 text-white" />
              </span>
              <p className="mt-3 text-sm font-bold text-white">{subj.name}</p>
              <p className="mt-0.5 text-[11px] text-white/50">
                {GRADE_LABELS[active]} · {activeStream.name.split(" ")[0]}
              </p>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-royal-960/30 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-white">
            Preview {GRADE_LABELS[active]} · {activeStream.name}
          </p>
          <p className="text-xs text-white/50">
            Create a free account to unlock full lessons & past exams.
          </p>
        </div>
        <a href="/signup" className="btn-cta w-full shrink-0 sm:w-auto">
          Start Learning
        </a>
      </div>
    </div>
  );
}
