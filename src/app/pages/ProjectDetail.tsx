import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Link2,
  Mail,
  Linkedin,
  Twitter,
  MessageCircle,
  Check,
} from "lucide-react";
import { serifItalic, serif } from "../data";
import { useProject, useProjects } from "../hooks/useProjects";

/* ── Share helpers ── */
function buildShareUrl(path: string) {
  return `${window.location.origin}${path}`;
}

function shareLinks(title: string, description: string, url: string) {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedBody = encodeURIComponent(`${description}\n\n${url}`);
  return {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedBody}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
  };
}

/* ── Share bar component ── */
function ShareBar({ title, description }: { title: string; description: string }) {
  const [copied, setCopied] = useState(false);
  const url = buildShareUrl(window.location.pathname);
  const links = shareLinks(title, description, url);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const buttons = [
    {
      label: "WhatsApp",
      href: links.whatsapp,
      icon: <MessageCircle size={14} strokeWidth={1.5} />,
    },
    {
      label: "Email",
      href: links.email,
      icon: <Mail size={14} strokeWidth={1.5} />,
    },
    {
      label: "LinkedIn",
      href: links.linkedin,
      icon: <Linkedin size={14} strokeWidth={1.5} />,
    },
    {
      label: "Twitter / X",
      href: links.twitter,
      icon: <Twitter size={14} strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {buttons.map((btn) => (
        <a
          key={btn.label}
          href={btn.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${btn.label}`}
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase border border-border px-4 py-2.5 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-150"
        >
          {btn.icon}
          <span className="hidden sm:inline">{btn.label}</span>
        </a>
      ))}

      {/* Copy link */}
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className={`inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase border px-4 py-2.5 transition-colors duration-150 ${
          copied
            ? "border-foreground text-foreground bg-foreground/5"
            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
        }`}
      >
        {copied ? <Check size={14} strokeWidth={1.5} /> : <Link2 size={14} strokeWidth={1.5} />}
        <span className="hidden sm:inline">{copied ? "Copied!" : "Copy link"}</span>
      </button>
    </div>
  );
}

/* ── Main page ── */
export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = Number(id);

  const { project, loading: projectLoading } = useProject(projectId);
  const { projects: allProjects, loading: listLoading } = useProjects();
  const loading = projectLoading || listLoading;

  const currentIndex = allProjects.findIndex((p) => p.id === projectId);
  const prevProject = allProjects[currentIndex - 1] ?? null;
  const nextProject = allProjects[currentIndex + 1] ?? null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-border border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
          Project not found
        </p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase border-b border-foreground pb-px"
        >
          <ArrowLeft size={12} /> Back to portfolio
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* ── Top bar: back + share ── */}
      <div className="pt-[60px] border-b border-border">
        <div className="px-6 lg:px-12">
        <div className="max-w-6xl mx-auto py-4 flex items-center justify-between gap-4 flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft
              size={13}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Back
          </button>

          <ShareBar title={project.title} description={project.description} />
        </div>
        </div>
      </div>

      {/* ── Project header + thumbnail ── */}
      <section className="px-6 lg:px-12 pt-16 pb-16">
        <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: text */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="text-[11px] tracking-[0.18em] uppercase border border-border px-3 py-1 text-muted-foreground">
                {project.category}
              </span>
              <span className="text-muted-foreground/40 text-xs">·</span>
              <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                {project.company}
              </span>
              <span className="text-muted-foreground/40 text-xs">·</span>
              <span className="text-[11px] tracking-[0.15em] text-muted-foreground tabular-nums">
                {project.year}
              </span>
            </div>

            <h1
              className="font-extrabold uppercase leading-[0.88] tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              {project.title}
            </h1>

            <p
              className="text-lg text-muted-foreground leading-relaxed"
              style={serif}
            >
              {project.description}
            </p>

            <p className="mt-3 text-[12px] text-muted-foreground/60 tracking-wide" style={serifItalic}>
              Role: {project.role}
            </p>
          </div>

          {/* Right: thumbnail */}
          <div>
            <img
              src={project.thumb}
              alt={project.title}
              className="w-full"
            />
          </div>
        </div>
        </div>
      </section>

      {/* ── Outcomes ── */}
      <section className="border-t border-border px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {project.outcomes.map((o, i) => (
            <div
              key={o.label}
              className={`py-10 pr-6 ${i > 0 ? "pl-6 border-l border-border" : ""}`}
            >
              <div
                className="font-extrabold leading-none tracking-tight mb-2"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {o.value}
              </div>
              <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                {o.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="border-t border-border py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col">
            {project.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${project.title} — view ${i + 2}`}
                loading="lazy"
                className="w-full"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Description + Skills ── */}
      <section className="border-t border-border py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12">

          {/* Long description */}
          <div className="md:col-span-8">
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-8">
              About this project
            </p>
            <div className="space-y-5">
              {project.longDescription.map((para, i) => (
                <p
                  key={i}
                  className="text-[15px] leading-[1.85] text-muted-foreground"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Skills + Tools */}
          <div className="md:col-span-4 space-y-10">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-5">
                Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] tracking-wide border border-border px-3 py-1.5 text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-5">
                Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] tracking-wide border border-border px-3 py-1.5 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Share section (bottom) ── */}
      <section className="border-t border-border py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
              Share this project
            </p>
            <p className="text-[15px] text-muted-foreground leading-relaxed" style={serif}>
              Enjoyed this work? Pass it along.
            </p>
          </div>
          <div className="md:col-span-7">
            <ShareBar title={project.title} description={project.description} />
          </div>
        </div>
      </section>

      {/* ── Prev / Next navigation ── */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2">
          {/* Previous */}
          <div className={`${nextProject ? "md:border-r border-border" : ""}`}>
            {prevProject ? (
              <Link
                to={`/portfolio/${prevProject.id}`}
                className="group flex flex-col gap-2 px-6 lg:px-12 py-10 hover:bg-accent/40 transition-colors"
              >
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                  <ArrowLeft size={11} className="group-hover:-translate-x-0.5 transition-transform" />
                  Previous
                </span>
                <span className="text-base font-bold tracking-tight leading-snug">
                  {prevProject.title}
                </span>
                <span className="text-[12px] text-muted-foreground">
                  {prevProject.company} · {prevProject.year}
                </span>
              </Link>
            ) : (
              <div className="px-6 lg:px-12 py-10 text-muted-foreground/30 text-[12px] tracking-wide">
                First project
              </div>
            )}
          </div>

          {/* Next */}
          <div>
            {nextProject ? (
              <Link
                to={`/portfolio/${nextProject.id}`}
                className="group flex flex-col gap-2 px-6 lg:px-12 py-10 md:items-end hover:bg-accent/40 transition-colors"
              >
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                  Next
                  <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="text-base font-bold tracking-tight leading-snug md:text-right">
                  {nextProject.title}
                </span>
                <span className="text-[12px] text-muted-foreground md:text-right">
                  {nextProject.company} · {nextProject.year}
                </span>
              </Link>
            ) : (
              <div className="px-6 lg:px-12 py-10 text-right text-muted-foreground/30 text-[12px] tracking-wide">
                Last project
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
