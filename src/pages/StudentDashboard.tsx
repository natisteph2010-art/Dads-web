import { useEffect, useState } from "react";
import { LockKeyhole, Sparkles } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import ActivationModal from "../components/ActivationModal";
import { supabase } from "../lib/supabase";
import { GRADES, GRADE_LABELS, STREAMS } from "../data/curriculum";

interface Resource { id: string; title: string; download_url: string; subject: string; grade: number; }
const fallbackResources = STREAMS.flatMap((stream) => stream.subjects.map((subject, index) => ({ id: `${stream.id}-${subject.name}`, title: `${subject.name} curriculum`, download_url: "", subject: subject.name, grade: 12 + index * 0 })));

export default function StudentDashboard() {
  const [grade, setGrade] = useState<number>(12);
  const [resources, setResources] = useState<Resource[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadStudentData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase.from("profiles").select("grade").eq("id", user.id).maybeSingle();
      const selectedGrade = Number(profile?.grade ?? user.user_metadata?.grade_level);
      if (active && GRADES.includes(selectedGrade as (typeof GRADES)[number])) setGrade(selectedGrade);
      const { data } = await supabase.from("resources").select("id, title, download_url, subject, grade").eq("grade", selectedGrade || 12).order("created_at", { ascending: false });
      if (active && data) setResources(data as Resource[]);
    }
    loadStudentData();
    return () => { active = false; };
  }, []);

  const visibleResources = resources.length ? resources : fallbackResources;

  return (
    <>
      <DashboardShell eyebrow="Your learning space" title={`${GRADE_LABELS[grade as keyof typeof GRADE_LABELS] ?? "Grade 12"} exam preparation`} description="Build your confidence chapter by chapter with a focused study plan made for the Ethiopian National Exam.">
        <button type="button" onClick={() => setModalOpen(true)} className="group mb-10 flex w-full items-start gap-4 rounded-2xl border border-amber-300/30 bg-gradient-to-r from-amber-300/15 via-amber-200/10 to-emerald2-400/10 p-5 text-left shadow-[0_16px_60px_-30px_rgba(251,191,36,0.6)] transition hover:border-amber-300/50 sm:items-center sm:p-6"><div className="rounded-xl bg-amber-300/20 p-3 text-amber-200"><LockKeyhole className="h-6 w-6" /></div><div className="flex-1"><p className="font-bold text-amber-100">Account Status: Pending Activation.</p><p className="mt-1 text-sm leading-6 text-white/70">To unlock your full Grade curriculum and national exam prep portal, please complete your payment.</p></div><Sparkles className="hidden h-5 w-5 text-amber-200 transition group-hover:rotate-12 sm:block" /></button>
        <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald2-400">Locked library</p><h2 className="mt-2 font-display text-2xl font-bold">Your chapters and subjects</h2></div><span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/60">{visibleResources.length} resources</span></div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{visibleResources.map((resource, index) => <button type="button" key={resource.id} onClick={() => setModalOpen(true)} className="group relative min-h-[190px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left transition hover:-translate-y-1 hover:border-amber-300/40 hover:bg-white/[0.07]"><div className="pointer-events-none select-none blur-[2px]"><div className="flex items-center justify-between"><span className="rounded-full bg-emerald2-400/10 px-3 py-1 text-xs font-bold text-emerald2-300">{resource.subject}</span><span className="text-xs font-semibold text-white/40">Chapter {index + 1}</span></div><h3 className="mt-8 font-display text-xl font-bold text-white/90">{resource.title}</h3><div className="mt-5 h-2 w-2/3 rounded-full bg-white/10" /><div className="mt-2 h-2 w-1/2 rounded-full bg-white/10" /></div><div className="absolute inset-0 flex flex-col items-center justify-center bg-royal-970/25 text-center"><div className="rounded-2xl border border-amber-300/40 bg-amber-300/15 p-3 text-amber-200 shadow-[0_0_30px_-8px_rgba(251,191,36,0.8)]"><LockKeyhole className="h-7 w-7" /></div><span className="mt-3 text-sm font-bold text-amber-100">Unlock after activation</span></div></button>)}</div>
      </DashboardShell>
      <ActivationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
