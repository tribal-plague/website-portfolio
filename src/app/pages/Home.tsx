import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { serifItalic, serif, EXPERIENCES, CONTACT } from "../data";
import { useProjects } from "../hooks/useProjects";

export default function Home() {
  const { projects, loading } = useProjects();

  return (
    <>
      {/* ── Hero ── */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-24 pb-16 max-w-6xl mx-auto"
      >
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2.5 border border-border rounded-full px-4 py-1.5 mb-10 self-start">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
          <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            Visual & UI Design Lead
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-black leading-[0.88] tracking-[-0.02em] mb-7 text-foreground"
          style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)" }}
        >
          Hi. I&apos;m Shreesh,
          <br />
          and I design stuff.
        </h1>

        <p
          className="text-lg text-muted-foreground mb-12 max-w-md leading-relaxed"
          style={serif}
        >
          Brands, interfaces, campaigns, motion — crafted across 7+ years and four industries.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase bg-foreground text-background px-7 py-4 hover:opacity-80 transition-opacity"
          >
            Get in touch <ArrowUpRight size={12} />
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase border border-border px-7 py-4 hover:bg-accent transition-colors"
          >
            Portfolio
          </Link>
        </div>
      </section>

      {/* ── Featured projects ── */}
      <section className="border-t border-border py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
              Selected work
            </span>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors group"
            >
              All projects
              <ArrowUpRight
                size={10}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-4 animate-pulse">
                    <div className="bg-accent" style={{ aspectRatio: "4/3" }} />
                    <div className="h-3 bg-accent w-3/4" />
                    <div className="h-2.5 bg-accent w-1/3" />
                  </div>
                ))
              : projects.slice(0, 3).map((project) => (
              <Link
                key={project.id}
                to={`/portfolio/${project.id}`}
                className="group flex flex-col"
              >
                {/* Thumbnail */}
                <div
                  className="relative overflow-hidden bg-accent mb-4"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={project.thumb}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 pointer-events-none" />
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
                  <span className="text-[11px] text-muted-foreground/60 tabular-nums shrink-0 pt-0.5">
                    {project.year}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── About teaser ── */}
      <section className="border-t border-border py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3 pt-1">
            <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
              About
            </span>
          </div>
          <div className="md:col-span-9">
            <p
              className="text-xl md:text-2xl leading-[1.65] text-foreground mb-6"
              style={serif}
            >
              Visual and UI Design Lead with{" "}
              <em>7+ years of experience</em> delivering impactful design
              solutions across UI, web design, visual design, branding, print
              and graphic design.
            </p>
            <p className="text-[15px] leading-[1.8] text-muted-foreground max-w-2xl mb-8">
              Adept at managing multiple projects simultaneously, leading
              cross-functional teams, and collaborating with stakeholders to
              produce high-quality creative outputs within deadlines.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase border-b border-foreground pb-px hover:text-muted-foreground hover:border-muted-foreground transition-colors duration-200"
            >
              Full profile <ArrowUpRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Experience — Company Roster ── */}
      <section className="border-t border-border py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">

          {/* Section label + CTA */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
              Experience
            </span>
            <Link
              to="/experience"
              className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors group"
            >
              Full detail <ArrowUpRight size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Roster rows */}
          <div className="mt-0">
            {EXPERIENCES.map((exp) => (
              <Link
                key={exp.company}
                to="/experience"
                className="group flex items-stretch border-t border-border py-0 hover:bg-accent/40 transition-colors duration-200 -mx-6 lg:-mx-12 px-6 lg:px-12"
              >
                {/* Index */}
                <span className="text-[11px] tracking-[0.12em] text-muted-foreground/50 w-8 shrink-0 pt-7 select-none">
                  {exp.index}
                </span>

                {/* Company name — large */}
                <div className="flex-1 py-6 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <span
                      className="font-black uppercase leading-none tracking-[-0.02em] transition-colors group-hover:text-foreground"
                      style={{ fontSize: "clamp(1.5rem, 4vw, 2.75rem)" }}
                    >
                      {exp.company}
                    </span>
                    <span
                      className="text-base text-muted-foreground leading-none hidden sm:inline"
                      style={serifItalic}
                    >
                      {exp.role}
                    </span>
                  </div>
                  <span
                    className="text-base text-muted-foreground leading-none sm:hidden block mt-1"
                    style={serifItalic}
                  >
                    {exp.role}
                  </span>
                </div>

                {/* Right meta */}
                <div className="flex items-center gap-6 shrink-0 pl-4 py-6">
                  <div className="hidden md:flex flex-col items-end gap-1">
                    <span className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground">
                      {exp.industry}
                    </span>
                    <span className="text-[11px] text-muted-foreground/60">
                      {exp.location}
                    </span>
                  </div>

                  <div className="text-right">
                    <span
                      className="block text-[11px] tracking-[0.12em] font-medium tabular-nums text-muted-foreground"
                    >
                      {exp.year}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={14}
                    className="text-muted-foreground/30 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
                  />
                </div>
              </Link>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="border-t border-border px-6 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8 py-20">
          <div>
            <h2
              className="font-black uppercase tracking-tight leading-[0.88] mb-3"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Let&apos;s work
              <br />
              <span
                className="font-normal"
                style={{ ...serifItalic, fontSize: "inherit" }}
              >
                together.
              </span>
            </h2>
            <p className="text-[14px] text-muted-foreground mt-4">
              Open to design leadership roles and select project work.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase bg-foreground text-background px-7 py-4 hover:opacity-80 transition-opacity"
            >
              Get in touch <ArrowUpRight size={12} />
            </Link>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase border border-border px-7 py-4 hover:bg-accent transition-colors"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
