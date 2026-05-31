import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { serifItalic, serif, type Project } from "../data";
import { useProjects } from "../hooks/useProjects";


const PAGE_SIZE = 6;
const LOAD_MORE_COUNT = 3;

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/portfolio/${project.id}`} className="group flex flex-col">
      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-accent mb-4" style={{ aspectRatio: "4/3" }}>
        <img
          src={project.thumb}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 pointer-events-none" />
        {/* Category badge */}
        <span className="absolute top-3 left-3 text-[10px] tracking-[0.18em] uppercase bg-background/90 backdrop-blur-sm text-foreground px-2.5 py-1">
          {project.category}
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[15px] font-bold leading-snug tracking-tight mb-1 group-hover:text-muted-foreground transition-colors">
            {project.title}
          </h3>
          <p className="text-[12px] text-muted-foreground">
            {project.company}
          </p>
        </div>
        <span
          className="text-[11px] text-muted-foreground/60 tabular-nums shrink-0 pt-0.5"
        >
          {project.year}
        </span>
      </div>
    </Link>
  );
}


export default function Portfolio() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { projects: allProjects, loading } = useProjects();

  const visible = allProjects.slice(0, visibleCount);
  const hasMore = visibleCount < allProjects.length;

  return (
    <>
      {/* ── Page header ── */}
      <section className="pt-36 pb-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-8">
            Portfolio
          </p>
          <h1
            className="font-black uppercase leading-[0.88] tracking-[-0.02em] mb-10"
            style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
          >
            Selected
            <br />
            <span className="font-normal" style={serifItalic}>
              work.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg" style={serif}>
            A collection of projects spanning UI design, branding, campaign
            design, motion graphics, and illustration across 7+ years.
          </p>
        </div>
      </section>

      {/* Filter bar removed as requested */}

      {/* ── Project grid ── */}
      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4 animate-pulse">
                  <div className="bg-accent" style={{ aspectRatio: "4/3" }} />
                  <div className="h-3 bg-accent w-3/4" />
                  <div className="h-2.5 bg-accent w-1/3" />
                </div>
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-muted-foreground text-sm">No projects in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {visible.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="flex flex-col items-center gap-3 mt-20 pt-16 border-t border-border">
              <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                Showing {visible.length} of {allProjects.length}
              </p>
              {/* Progress bar */}
              <div className="w-32 h-px bg-border overflow-hidden">
                <div
                  className="h-full bg-foreground transition-all duration-500"
                  style={{ width: `${(visible.length / allProjects.length) * 100}%` }}
                />
              </div>
              <button
                onClick={() =>
                  setVisibleCount((n: number) => Math.min(n + LOAD_MORE_COUNT, allProjects.length))
                }
                className="mt-4 inline-flex items-center gap-3 text-xs tracking-[0.18em] uppercase border border-border px-8 py-4 hover:bg-foreground hover:text-background hover:border-foreground transition-colors duration-200"
              >
                Load more
              </button>
            </div>
          )}

          {!hasMore && allProjects.length > PAGE_SIZE && (
            <div className="mt-20 pt-16 border-t border-border text-center">
              <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                All {allProjects.length} projects shown
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA strip (inverted) ── */}
      <section
        className="border-t border-border py-20 px-6 lg:px-12"
        style={{ background: "#1A1917", color: "#F7F5F1" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p
              className="text-[11px] tracking-[0.2em] uppercase mb-4"
              style={{ color: "#8A877F" }}
            >
              See more work
            </p>
            <p className="text-xl leading-relaxed max-w-sm" style={serif}>
              The full archive lives on Behance — including process work,
              sketches, and extended case studies.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://behance.net/shreeshvikramsingh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase bg-[#F7F5F1] text-[#1A1917] px-7 py-4 hover:opacity-80 transition-opacity"
            >
              Visit Behance <ArrowUpRight size={12} />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase border px-7 py-4 hover:bg-[#F7F5F1] hover:text-[#1A1917] transition-colors"
              style={{ borderColor: "rgba(247,245,241,0.2)" }}
            >
              Get in touch <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
