import { Clock, FileText, TrendingUp, Award } from "lucide-react";

export default function DashboardMock() {
  return (
    <div className="relative mx-auto w-full max-w-md animate-float">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald2-400/20 via-royal-500/20 to-transparent blur-2xl" />

      <div className="relative card-glass rounded-3xl p-5 shadow-royal ring-1 ring-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald2-400/15 text-emerald2-400">
              <Award className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">Matric Prep</p>
              <p className="text-[11px] text-white/50">Grade 12 · Natural</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald2-400/15 px-2.5 py-1 text-[11px] font-bold text-emerald2-300">
            On Track
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-royal-960/50 p-4">
            <div className="flex items-center justify-center">
              <div className="relative h-20 w-20">
                <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3.5" />
                  <circle
                    cx="18" cy="18" r="15.5" fill="none" stroke="#1fd986" strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="97.4"
                    strokeDashoffset="24.3"
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-lg font-bold text-white">75%</span>
                </div>
              </div>
            </div>
            <p className="mt-2 text-center text-[11px] font-semibold text-white/60">
              Syllabus Covered
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-2xl border border-white/10 bg-royal-960/50 p-3">
              <div className="flex items-center gap-2 text-white/70">
                <Clock className="h-4 w-4 text-emerald2-400" />
                <span className="text-[11px] font-semibold">Exam Timer</span>
              </div>
              <p className="mt-1 font-display text-base font-bold text-white">
                02:59:47
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-royal-960/50 p-3">
              <div className="flex items-center gap-2 text-white/70">
                <FileText className="h-4 w-4 text-emerald2-400" />
                <span className="text-[11px] font-semibold">Past Exams</span>
              </div>
              <p className="mt-1 font-display text-base font-bold text-white">
                42 papers
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2.5">
          {[
            { s: "Mathematics", v: 82, c: "bg-blue-400" },
            { s: "Physics", v: 68, c: "bg-purple-400" },
            { s: "Biology", v: 91, c: "bg-rose-400" },
          ].map((row) => (
            <div key={row.s}>
              <div className="mb-1 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-white/70">{row.s}</span>
                <span className="font-bold text-white/80">{row.v}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${row.c}`}
                  style={{ width: `${row.v}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald2-400/20 bg-emerald2-400/10 px-3 py-2.5">
          <TrendingUp className="h-4 w-4 text-emerald2-400" />
          <span className="text-[11px] font-semibold text-emerald2-200">
            Strength rising in Chemistry · +12% this week
          </span>
        </div>
      </div>
    </div>
  );
}
