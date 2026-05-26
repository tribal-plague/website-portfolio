import { useState, useEffect, useRef, type KeyboardEvent, type DragEvent } from "react";
import { Link } from "react-router";
import { Plus, Trash2, X, Pencil, ArrowLeft, Eye, Save, Copy, Check, Loader2, Upload, Link2 } from "lucide-react";
import {
  getCMSProjects,
  upsertCMSProject,
  deleteCMSProject,
  nextCMSId,
  uploadImage,
} from "../lib/cms";
import { isSanityConfigured } from "../../sanity/client";
import { PROJECTS, type Project } from "../data";

// ── Constants ────────────────────────────────────────────────────────────────


// ── Form state ───────────────────────────────────────────────────────────────

type FormData = {
  title: string;
  company: string;
  role: string;
  category: string;
  year: string;
  uploadDate: string;
  featured: boolean;
  description: string;
  longDescription: string[];
  thumb: string;
  images: string[];
  skills: string[];
  tools: string[];
  outcomes: { value: string; label: string }[];
};

const DEFAULT_FORM: FormData = {
  title: "",
  company: "",
  role: "",
  category: "UI Design",
  year: new Date().getFullYear().toString(),
  uploadDate: new Date().toISOString().split("T")[0],
  featured: false,
  description: "",
  longDescription: [""],
  thumb: "",
  images: [""],
  skills: [],
  tools: [],
  outcomes: [{ value: "", label: "" }],
};

function projectToForm(p: Project): FormData {
  return {
    title: p.title,
    company: p.company,
    role: p.role,
    category: p.category,
    year: p.year,
    uploadDate: p.uploadDate ?? "",
    featured: p.featured,
    description: p.description,
    longDescription: p.longDescription.length ? p.longDescription : [""],
    thumb: p.thumb,
    images: p.images.length ? p.images : [""],
    skills: p.skills,
    tools: p.tools,
    outcomes: p.outcomes.length ? p.outcomes : [{ value: "", label: "" }],
  };
}

function formToProject(form: FormData, id: number): Project {
  return {
    id,
    title: form.title.trim(),
    company: form.company.trim(),
    role: form.role.trim(),
    category: form.category as Project["category"],
    year: form.year.trim(),
    uploadDate: form.uploadDate || undefined,
    featured: form.featured,
    description: form.description.trim(),
    longDescription: form.longDescription.filter((p) => p.trim()),
    thumb: form.thumb.trim(),
    images: form.images.filter((u) => u.trim()),
    skills: form.skills,
    tools: form.tools,
    outcomes: form.outcomes.filter((o) => o.value.trim() || o.label.trim()),
  };
}

// ── Shared primitives ────────────────────────────────────────────────────────

const inputCls =
  "w-full bg-transparent border-b border-border text-[14px] py-2 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/40";

function FieldLabel({
  label,
  required,
  note,
}: {
  label: string;
  required?: boolean;
  note?: string;
}) {
  return (
    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground flex items-baseline gap-2">
      {label}
      {required && <span className="text-foreground">*</span>}
      {note && (
        <span className="normal-case tracking-normal text-muted-foreground/50 font-normal">
          {note}
        </span>
      )}
    </label>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-6 pb-4 border-b border-border">
      {title}
    </p>
  );
}

// ── Tag input ────────────────────────────────────────────────────────────────

function TagInput({
  label,
  tags,
  onChange,
}: {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const v = input.trim();
    if (v && !tags.includes(v)) {
      onChange([...tags, v]);
      setInput("");
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
    if (e.key === "Backspace" && !input && tags.length) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <FieldLabel label={label} />
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 text-[11px] tracking-wide border border-border px-2.5 py-1 text-muted-foreground"
            >
              {t}
              <button
                type="button"
                onClick={() => onChange(tags.filter((x) => x !== t))}
                className="hover:text-foreground transition-colors"
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Type and press Enter"
          className={inputCls + " flex-1"}
        />
        <button
          type="button"
          onClick={add}
          className="text-[10px] tracking-[0.15em] uppercase border border-border px-3 py-1.5 hover:bg-foreground hover:text-background transition-colors shrink-0"
        >
          Add
        </button>
      </div>
    </div>
  );
}

// ── Image upload row ─────────────────────────────────────────────────────────

function ImageRow({
  url,
  label,
  canRemove,
  onChange,
  onRemove,
}: {
  url: string;
  label: string;
  canRemove: boolean;
  onChange: (v: string) => void;
  onRemove: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [urlMode, setUrlMode] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    try {
      const hosted = await uploadImage(file);
      onChange(hosted);
    } finally {
      setUploading(false);
    }
  };

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex gap-4 items-start">
      {/* Drop zone / preview */}
      <div
        className={`relative shrink-0 w-28 h-20 border overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-colors ${
          dragOver
            ? "border-foreground bg-foreground/5"
            : "border-dashed border-border bg-accent hover:border-foreground/50"
        }`}
        onClick={() => !uploading && fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        {uploading ? (
          <Loader2 size={18} className="animate-spin text-muted-foreground" />
        ) : url ? (
          <>
            <img
              src={url}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
            />
            <div className="absolute inset-0 bg-background/0 hover:bg-background/50 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
              <Upload size={14} className="text-foreground" />
            </div>
          </>
        ) : (
          <>
            <Upload size={14} className="text-muted-foreground/50 mb-1" />
            <span className="text-[8px] tracking-[0.12em] uppercase text-muted-foreground/40 text-center px-1">
              {dragOver ? "Drop here" : "Click or drag"}
            </span>
          </>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileInput}
        />
      </div>

      {/* URL input or toggle */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <div className="flex items-center justify-between">
          <FieldLabel label={label} />
          <button
            type="button"
            onClick={() => setUrlMode((v) => !v)}
            className="text-[9px] tracking-[0.12em] uppercase text-muted-foreground/50 hover:text-muted-foreground transition-colors flex items-center gap-1"
          >
            <Link2 size={9} />
            {urlMode ? "Hide URL" : "Paste URL"}
          </button>
        </div>

        {urlMode && (
          <input
            value={url}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            className={inputCls}
          />
        )}

        {url && !urlMode && (
          <p className="text-[10px] text-muted-foreground/50 truncate">{url}</p>
        )}
      </div>

      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="mt-5 text-muted-foreground hover:text-foreground transition-colors p-1 shrink-0"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

// ── Export helper ────────────────────────────────────────────────────────────

function generateEntry(p: Project): string {
  const q = (s: string) => `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  const strArr = (arr: string[]) =>
    arr.length === 0
      ? "[]"
      : `[\n${arr.map((s) => `      ${q(s)}`).join(",\n")},\n    ]`;
  const longDesc =
    p.longDescription.length === 0
      ? "[]"
      : `[\n${p.longDescription.map((s) => `      ${q(s)}`).join(",\n")},\n    ]`;
  const outcomes =
    p.outcomes.length === 0
      ? "[]"
      : `[\n${p.outcomes
          .map((o) => `      { value: ${q(o.value)}, label: ${q(o.label)} }`)
          .join(",\n")},\n    ]`;

  return `  {
    id: ${p.id},
    title: ${q(p.title)},
    category: "${p.category}",
    company: ${q(p.company)},
    year: ${q(p.year)},
    role: ${q(p.role)},
    description: ${q(p.description)},
    longDescription: ${longDesc},
    outcomes: ${outcomes},
    skills: ${strArr(p.skills)},
    tools: ${strArr(p.tools)},
    thumb: ${q(p.thumb)},
    images: ${strArr(p.images)},
    featured: false,
  },`;
}

// ── Admin page ───────────────────────────────────────────────────────────────

export default function Admin() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [cmsProjects, setCmsProjects] = useState<Project[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormData>(DEFAULT_FORM);
  const [toast, setToast] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const refresh = async () => {
    setListLoading(true);
    const data = await getCMSProjects();
    setCmsProjects(data);
    setListLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  // ── List view actions ──

  const startNew = () => {
    setForm(DEFAULT_FORM);
    setEditingId(null);
    setErrors([]);
    setView("form");
  };

  const startEdit = (p: Project) => {
    setForm(projectToForm(p));
    setEditingId(p.id);
    setErrors([]);
    setView("form");
  };

  const copyEntry = async (p: Project) => {
    await navigator.clipboard.writeText(generateEntry(p));
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: number) => {
    setSaving(true);
    await deleteCMSProject(id);
    await refresh();
    setSaving(false);
    setDeleteConfirm(null);
    flash("Project deleted.");
  };

  // ── Form actions ──

  const handleSave = async () => {
    const errs: string[] = [];
    if (!form.title.trim()) errs.push("Title is required.");
    if (!form.description.trim()) errs.push("Short description is required.");
    if (errs.length) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setErrors([]);
    setSaving(true);
    try {
      const id = editingId ?? nextCMSId();
      await upsertCMSProject(formToProject(form, id));
      await refresh();
      flash(editingId ? "Project updated." : "Project saved.");
      setView("list");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Save failed.";
      setErrors([`Sanity error: ${msg}`]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSaving(false);
    }
  };

  // ── LIST VIEW ─────────────────────────────────────────────────────────────

  if (view === "list") {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-background border-b border-border px-6 lg:px-12 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={12} /> Back to site
            </Link>
            <span className="text-border">|</span>
            <span className="text-[11px] tracking-[0.25em] uppercase font-black">
              CMS
            </span>
          </div>
          <button
            onClick={startNew}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase bg-foreground text-background px-5 py-2.5 hover:opacity-80 transition-opacity"
          >
            <Plus size={12} /> New Project
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div className="bg-foreground text-background text-[11px] tracking-[0.15em] uppercase text-center py-2.5">
            {toast}
          </div>
        )}

        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
          {/* Page heading */}
          <div className="mb-14">
            <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
              Portfolio
            </p>
            <h1 className="text-4xl font-black uppercase tracking-tight mb-3">
              Project Manager
            </h1>
            <p className="text-[13px] text-muted-foreground max-w-lg leading-relaxed">
              {isSanityConfigured
                ? <>Projects save directly to <strong className="text-foreground font-semibold">Sanity CMS</strong> and appear live instantly — no code push needed.</>
                : <>Add and manage portfolio projects. Projects are saved and appear on the site immediately.</>
              }
            </p>
            {!isSanityConfigured && (
              <div className="mt-5 border border-border/50 bg-accent/40 p-4 max-w-lg">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">Sanity not connected</p>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  Projects are saved locally in this browser. To access them from anywhere,{" "}
                  <span className="text-foreground">set up Sanity</span> — see <code className="text-[11px]">.env.example</code> for instructions.
                </p>
              </div>
            )}
          </div>

          {/* CMS projects */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <p className="text-[11px] tracking-[0.2em] uppercase">
                Your Projects
                <span className="ml-2 text-muted-foreground">
                  ({cmsProjects.length})
                </span>
              </p>
            </div>

            {listLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 border border-border p-4 animate-pulse">
                    <div className="shrink-0 w-16 h-12 bg-accent" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-accent w-1/3" />
                      <div className="h-2.5 bg-accent w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : cmsProjects.length === 0 ? (
              <div className="py-16 border border-dashed border-border text-center">
                <p className="text-muted-foreground text-[13px] mb-5">
                  No projects yet.
                </p>
                <button
                  onClick={startNew}
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase border border-border px-5 py-2.5 hover:bg-foreground hover:text-background hover:border-foreground transition-colors"
                >
                  <Plus size={12} /> Add your first project
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cmsProjects.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 border border-border p-4 hover:border-foreground/30 transition-colors"
                  >
                    <div className="shrink-0 w-16 h-12 overflow-hidden bg-accent">
                      {p.thumb ? (
                        <img
                          src={p.thumb}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-accent" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-bold leading-snug truncate">
                        {p.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {p.company} · {p.year} · {p.category}
                        {p.featured && (
                          <span className="ml-2 text-foreground">
                            ★ Featured
                          </span>
                        )}
                      </p>
                      {p.uploadDate && (
                        <p className="text-[10px] text-muted-foreground/50 mt-0.5 tabular-nums">
                          Uploaded{" "}
                          {new Date(p.uploadDate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                      <Link
                        to={`/portfolio/${p.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                      >
                        <Eye size={11} /> View
                      </Link>
                      <button
                        onClick={() => copyEntry(p)}
                        className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase border px-3 py-1.5 transition-colors ${
                          copiedId === p.id
                            ? "border-foreground text-foreground bg-foreground/5"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                        }`}
                      >
                        {copiedId === p.id ? <Check size={11} /> : <Copy size={11} />}
                        {copiedId === p.id ? "Copied!" : "Copy entry"}
                      </button>
                      <button
                        onClick={() => startEdit(p)}
                        className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                      >
                        <Pencil size={11} /> Edit
                      </button>
                      {deleteConfirm === p.id ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="text-[10px] tracking-[0.15em] uppercase bg-foreground text-background px-3 py-1.5 hover:opacity-80 transition-opacity"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-[10px] tracking-[0.15em] uppercase border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(p.id)}
                          className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                        >
                          <Trash2 size={11} /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Bundled projects (read-only reference) */}
          <section>
            <div className="mb-6 pb-4 border-b border-border">
              <p className="text-[11px] tracking-[0.2em] uppercase">
                Bundled Projects
                <span className="ml-2 text-muted-foreground">
                  ({PROJECTS.length}) — hardcoded in data.ts
                </span>
              </p>
            </div>
            <div className="space-y-2 opacity-50">
              {PROJECTS.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 border border-border p-3"
                >
                  <div className="shrink-0 w-12 h-9 overflow-hidden bg-accent">
                    {p.thumb && (
                      <img
                        src={p.thumb}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold leading-snug truncate">
                      {p.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {p.company} · {p.year}
                    </p>
                  </div>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground border border-border px-2.5 py-1 shrink-0">
                    Bundled
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ── FORM VIEW ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-6 lg:px-12 py-4 flex items-center justify-between gap-4">
        <button
          onClick={() => setView("list")}
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={12} /> All Projects
        </button>
        <span className="text-[11px] tracking-[0.25em] uppercase font-black">
          {editingId ? "Edit Project" : "New Project"}
        </span>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase bg-foreground text-background px-5 py-2.5 hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12 space-y-16">
        {/* Validation errors */}
        {errors.length > 0 && (
          <div className="border border-foreground p-4 space-y-1">
            {errors.map((e) => (
              <p key={e} className="text-[12px] text-foreground">
                {e}
              </p>
            ))}
          </div>
        )}

        {/* ── IDENTITY ── */}
        <section>
          <SectionHeader title="Identity" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Title — full width */}
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <FieldLabel label="Project Title" required />
              <input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Zopper Website Redesign"
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <FieldLabel label="Company / Client" />
              <input
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder="Zopper"
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <FieldLabel label="Your Role" />
              <input
                value={form.role}
                onChange={(e) => set("role", e.target.value)}
                placeholder="Designer & Developer"
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <FieldLabel label="Category" />
              <input
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                placeholder="UI Design"
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <FieldLabel label="Year" />
              <input
                value={form.year}
                onChange={(e) => set("year", e.target.value)}
                placeholder="2024"
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <FieldLabel label="Upload Date" note="auto-set to today" />
              <input
                type="date"
                value={form.uploadDate}
                onChange={(e) => set("uploadDate", e.target.value)}
                className={inputCls}
              />
            </div>

          </div>
        </section>

        {/* ── DESCRIPTION ── */}
        <section>
          <SectionHeader title="Description" />
          <div className="space-y-8">
            {/* Short description */}
            <div className="flex flex-col gap-1.5">
              <FieldLabel
                label="Short Description"
                required
                note="shown on portfolio card + project header"
              />
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="A one-to-two sentence summary of the project and its impact."
                rows={3}
                className="w-full bg-transparent border-b border-border text-[14px] py-2 focus:outline-none focus:border-foreground transition-colors resize-none placeholder:text-muted-foreground/40"
              />
            </div>

            {/* Long description paragraphs */}
            <div>
              <FieldLabel
                label="Long Description"
                note="each block = one paragraph shown on project page"
              />
              <div className="space-y-4 mt-3">
                {form.longDescription.map((para, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-[10px] text-muted-foreground/40 pt-3 tabular-nums shrink-0 w-5 text-right">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <textarea
                      value={para}
                      onChange={(e) => {
                        const updated = [...form.longDescription];
                        updated[i] = e.target.value;
                        set("longDescription", updated);
                      }}
                      placeholder="Write a paragraph about this project — the brief, process, or outcome..."
                      rows={4}
                      className="flex-1 bg-transparent border border-border text-[14px] p-3 focus:outline-none focus:border-foreground transition-colors resize-none placeholder:text-muted-foreground/40"
                    />
                    {form.longDescription.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          set(
                            "longDescription",
                            form.longDescription.filter((_, j) => j !== i)
                          )
                        }
                        className="mt-2 text-muted-foreground hover:text-foreground transition-colors p-1 shrink-0"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  set("longDescription", [...form.longDescription, ""])
                }
                className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase border border-dashed border-border px-4 py-2 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <Plus size={11} /> Add paragraph
              </button>
            </div>
          </div>
        </section>

        {/* ── MEDIA ── */}
        <section>
          <SectionHeader title="Media" />
          <div className="space-y-8">
            {/* Thumbnail */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Thumbnail{" "}
                <span className="normal-case tracking-normal text-muted-foreground/50">
                  (card image — 4:3 ratio recommended)
                </span>
              </p>
              <ImageRow
                url={form.thumb}
                label="Thumbnail URL"
                canRemove={false}
                onChange={(v) => set("thumb", v)}
                onRemove={() => {}}
              />
            </div>

            {/* Image series */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Project Images{" "}
                <span className="normal-case tracking-normal text-muted-foreground/50">
                  (gallery series shown on project page — like Behance)
                </span>
              </p>
              <div className="space-y-4">
                {form.images.map((url, i) => (
                  <ImageRow
                    key={i}
                    url={url}
                    label={`Image ${i + 1}`}
                    canRemove={form.images.length > 1}
                    onChange={(v) => {
                      const updated = [...form.images];
                      updated[i] = v;
                      set("images", updated);
                    }}
                    onRemove={() =>
                      set(
                        "images",
                        form.images.filter((_, j) => j !== i)
                      )
                    }
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => set("images", [...form.images, ""])}
                className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase border border-dashed border-border px-4 py-2 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <Plus size={11} /> Add image
              </button>
            </div>
          </div>
        </section>

        {/* ── SKILLS & TOOLS ── */}
        <section>
          <SectionHeader title="Skills & Tools" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <TagInput
              label="Skills"
              tags={form.skills}
              onChange={(v) => set("skills", v)}
            />
            <TagInput
              label="Tools"
              tags={form.tools}
              onChange={(v) => set("tools", v)}
            />
          </div>
        </section>

        {/* ── NUMERICALS / OUTCOMES ── */}
        <section>
          <SectionHeader title="Numericals / Outcomes" />
          <p className="text-[11px] text-muted-foreground mb-6 -mt-2">
            Up to 4 metrics displayed as big numbers on the project page (e.g.
            "25%" / "Increase in click rates").
          </p>
          <div className="space-y-4">
            {form.outcomes.map((o, i) => (
              <div key={i} className="flex items-end gap-4">
                <span className="text-[10px] text-muted-foreground/40 pb-2.5 tabular-nums shrink-0 w-5 text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-28 shrink-0 flex flex-col gap-1.5">
                  <FieldLabel label="Value" />
                  <input
                    value={o.value}
                    onChange={(e) => {
                      const updated = [...form.outcomes];
                      updated[i] = { ...updated[i], value: e.target.value };
                      set("outcomes", updated);
                    }}
                    placeholder="25%"
                    className={inputCls}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <FieldLabel label="Label" />
                  <input
                    value={o.label}
                    onChange={(e) => {
                      const updated = [...form.outcomes];
                      updated[i] = { ...updated[i], label: e.target.value };
                      set("outcomes", updated);
                    }}
                    placeholder="Increase in click rates"
                    className={inputCls}
                  />
                </div>
                {form.outcomes.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      set(
                        "outcomes",
                        form.outcomes.filter((_, j) => j !== i)
                      )
                    }
                    className="pb-2 text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {form.outcomes.length < 4 && (
            <button
              type="button"
              onClick={() =>
                set("outcomes", [...form.outcomes, { value: "", label: "" }])
              }
              className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase border border-dashed border-border px-4 py-2 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            >
              <Plus size={11} /> Add metric
            </button>
          )}
        </section>

        {/* ── Footer actions ── */}
        <div className="border-t border-border pt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setView("list")}
            className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase bg-foreground text-background px-8 py-3.5 hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
            {saving ? "Saving…" : editingId ? "Update Project" : "Save Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
