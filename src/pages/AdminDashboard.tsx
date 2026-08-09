import { FormEvent, useEffect, useState } from "react";
import { BookOpen, CheckCircle2, Link2, Loader2, Plus, Trash2 } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import { supabase } from "../lib/supabase";

const subjects = ["Maths", "Physics", "Chemistry", "Biology", "Geography", "History", "Economics"];
const grades = [9, 10, 11, 12];
interface Resource { id: string; title: string; download_url: string; subject: string; grade: number; created_at?: string; }

export default function AdminDashboard() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [title, setTitle] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [subject, setSubject] = useState(subjects[0]);
  const [grade, setGrade] = useState(9);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);

  async function loadResources() {
    setLoading(true);
    const { data, error } = await supabase.from("resources").select("id, title, download_url, subject, grade, created_at").order("created_at", { ascending: false });
    if (error) setMessage({ text: error.message, error: true });
    else setResources((data ?? []) as Resource[]);
    setLoading(false);
  }

  useEffect(() => { loadResources(); }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    setSubmitting(true);
    const { error } = await supabase.from("resources").insert({ title, download_url: downloadUrl, subject, grade });
    if (error) setMessage({ text: error.message, error: true });
    else {
      setTitle("");
      setDownloadUrl("");
      setMessage({ text: "Resource added to the library." });
      await loadResources();
    }
    setSubmitting(false);
  }

  async function deleteResource(id: string) {
    const { error } = await supabase.from("resources").delete().eq("id", id);
    if (error) setMessage({ text: error.message, error: true });
    else setResources((current) => current.filter((resource) => resource.id !== id));
  }

  return (
    <DashboardShell admin eyebrow="Owner controls" title="Resource library" description="Publish and curate the curriculum resources available to every student account.">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="card-glass rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-3"><div className="rounded-xl bg-emerald2-400/15 p-3 text-emerald2-300"><Plus className="h-5 w-5" /></div><div><h2 className="font-display text-xl font-bold">Upload resource</h2><p className="mt-1 text-sm text-white/50">Add a chapter, lesson, or exam paper.</p></div></div>
          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <label className="block text-sm font-semibold text-white/80">Resource Title<input required value={title} onChange={(event) => setTitle(event.target.value)} className="input-field mt-2" placeholder="e.g. Grade 12 Algebra Review" /></label>
            <label className="block text-sm font-semibold text-white/80">Download Link/PDF URL<div className="relative mt-2"><Link2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" /><input required type="url" value={downloadUrl} onChange={(event) => setDownloadUrl(event.target.value)} className="input-field pl-10" placeholder="https://..." /></div></label>
            <div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-semibold text-white/80">Subject<select value={subject} onChange={(event) => setSubject(event.target.value)} className="input-field mt-2">{subjects.map((item) => <option key={item}>{item}</option>)}</select></label><label className="block text-sm font-semibold text-white/80">Grade<select value={grade} onChange={(event) => setGrade(Number(event.target.value))} className="input-field mt-2">{grades.map((item) => <option key={item} value={item}>Grade {item}</option>)}</select></label></div>
            {message && <div className={`rounded-xl border px-4 py-3 text-sm ${message.error ? "border-rose-400/30 bg-rose-400/10 text-rose-200" : "border-emerald2-400/30 bg-emerald2-400/10 text-emerald2-200"}`}>{message.text}</div>}
            <button disabled={submitting} className="btn-cta w-full">{submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}{submitting ? "Publishing..." : "Publish resource"}</button>
          </form>
        </div>
        <div className="card-glass overflow-hidden rounded-3xl"><div className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8"><div><h2 className="font-display text-xl font-bold">Published resources</h2><p className="mt-1 text-sm text-white/50">{resources.length} resource{resources.length === 1 ? "" : "s"} in the library</p></div><BookOpen className="h-5 w-5 text-emerald2-300" /></div><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-white/40"><tr><th className="px-6 py-4 font-semibold">Resource</th><th className="px-4 py-4 font-semibold">Subject</th><th className="px-4 py-4 font-semibold">Grade</th><th className="px-6 py-4 text-right font-semibold">Action</th></tr></thead><tbody className="divide-y divide-white/10">{loading ? <tr><td colSpan={4} className="px-6 py-10 text-center text-white/50"><Loader2 className="mx-auto h-5 w-5 animate-spin" /></td></tr> : resources.length === 0 ? <tr><td colSpan={4} className="px-6 py-10 text-center text-white/50">No resources have been published yet.</td></tr> : resources.map((resource) => <tr key={resource.id} className="transition hover:bg-white/[0.03]"><td className="max-w-[250px] px-6 py-4"><p className="truncate font-semibold text-white">{resource.title}</p><a href={resource.download_url} target="_blank" rel="noreferrer" className="mt-1 block truncate text-xs text-emerald2-300 hover:text-emerald2-200">{resource.download_url}</a></td><td className="px-4 py-4 text-white/70">{resource.subject}</td><td className="px-4 py-4 text-white/70">{resource.grade}</td><td className="px-6 py-4 text-right"><button type="button" onClick={() => deleteResource(resource.id)} className="rounded-lg p-2 text-rose-300 transition hover:bg-rose-400/10" aria-label={`Delete ${resource.title}`}><Trash2 className="h-4 w-4" /></button></td></tr>)}</tbody></table></div></div>
      </section>
    </DashboardShell>
  );
}
