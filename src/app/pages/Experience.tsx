import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { serif, serifItalic, EXPERIENCES, CONTACT } from "../data";

const OVERVIEW = [
  { value: "4", label: "Companies" },
  { value: "7+", label: "Years" },
  { value: "3", label: "Cities" },
  { value: "4", label: "Industries" },
];

export default function Experience() {
  return (
    <>
      {/* ── Page header ── */}
      <section className="pt-36 pb-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-8">
              Work Experience
            </p>
            <h1
              className="font-extrabold uppercase leading-[0.88] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
            >
              Seven years
              <br />
              <span className="font-normal" style={serifItalic}>
                of experience.
              </span>
            </h1>
          </div>
          <div className="md:col-span-4 pb-2">
            <p
              className="text-lg text-muted-foreground leading-relaxed"
              style={serif}
            >
              Four companies. Three cities. One consistent thread — design that
              moves the needle.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* ── Overview bar ── */}
      <section className="border-t border-border px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {OVERVIEW.map((item, i) => (
            <div
              key={item.label}
              className={`py-10 pr-8 ${
                i < OVERVIEW.length - 1 ? "border-r border-border" : ""
              } ${i > 0 ? "pl-8" : ""}`}
            >
              <div
                className="text-[2.5rem] font-bold leading-none tracking-tight mb-2"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {item.value}
              </div>
              <div className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience entries ── */}
      {EXPERIENCES.map((exp, i) => (
        <section
          key={exp.company}
          className="border-t border-border px-6 lg:px-12"
        >
          <div className="max-w-6xl mx-auto">
            {/* Company header row */}
            <div className="grid md:grid-cols-12 gap-8 pt-16 pb-10">
              <div className="md:col-span-3">
                <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
                  {exp.index} — {exp.industry}
                </p>
                <h2
                  className="font-extrabold uppercase leading-none tracking-[-0.02em] mb-3"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  {exp.company}
                </h2>
                <a
                  href={`https://${exp.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {exp.url} <ArrowUpRight size={9} />
                </a>
              </div>

              <div className="md:col-span-5 md:pt-2">
                <div className="flex flex-wrap items-baseline gap-3 mb-5">
                  <span
                    className="text-lg font-medium"
                    style={serifItalic}
                  >
                    {exp.role}
                  </span>
                  <span className="text-muted-foreground text-xs">·</span>
                  <span className="text-xs text-muted-foreground">
                    {exp.period}
                  </span>
                  <span className="text-muted-foreground text-xs">·</span>
                  <span className="text-xs text-muted-foreground">
                    {exp.location}
                  </span>
                </div>
                <p
                  className="text-[15px] text-muted-foreground leading-[1.8] max-w-prose"
                >
                  {exp.summary}
                </p>
              </div>

              {/* Key metric */}
              <div className="md:col-span-4 md:text-right md:pt-2">
                <div
                  className="font-extrabold leading-none tracking-tight text-foreground/10"
                  style={{
                    fontSize: "clamp(3.5rem, 7vw, 6rem)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {exp.keyMetric.value}
                </div>
                <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground mt-2">
                  {exp.keyMetric.label}
                </p>
              </div>
            </div>

            {/* Detail row */}
            <div className="grid md:grid-cols-12 gap-8 border-t border-border/60 pb-16 pt-10">
              {/* Highlights */}
              <div className="md:col-span-8">
                <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-6">
                  Key contributions
                </p>
                <ul className="space-y-3">
                  {exp.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="flex gap-5 text-[13.5px] text-muted-foreground leading-[1.8]"
                    >
                      <span className="shrink-0 text-foreground/20 select-none mt-0.5">
                        —
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills used */}
              <div className="md:col-span-4">
                <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-6">
                  Skills & tools
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] tracking-wide border border-border px-3 py-1.5 text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Career snapshot (inverted) ── */}
      <section
        className="border-t border-border py-20 px-6 lg:px-12"
        style={{ background: "#1A1917", color: "#F7F5F1" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3 pt-1">
            <span
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{ color: "#8A877F" }}
            >
              At a glance
            </span>
          </div>
          <div className="md:col-span-9">
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
              {[
                { label: "Current role", value: "Design Lead at Zopper" },
                { label: "Based in", value: "Noida, Uttar Pradesh" },
                {
                  label: "Industries covered",
                  value: "InsurTech · Web3 · Beauty · Fashion",
                },
                { label: "Career span", value: "2018 – Present" },
                { label: "Specialisations", value: "UI, Brand, Motion, Print" },
                { label: "Education", value: "B.Des, NIFT Mumbai (2019)" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span
                    className="text-[11px] tracking-[0.15em] uppercase"
                    style={{ color: "#8A877F" }}
                  >
                    {item.label}
                  </span>
                  <span className="text-[15px]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <h2
              className="font-extrabold uppercase tracking-tight leading-[0.88]"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            >
              Open to new
              <br />
              <span
                className="font-normal"
                style={{ ...serifItalic, fontSize: "inherit" }}
              >
                opportunities.
              </span>
            </h2>
            <p className="text-[15px] text-muted-foreground mt-6 max-w-md leading-relaxed">
              Available for design leadership roles, senior IC positions, and
              select freelance briefs. Let's talk.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col md:items-end gap-4">
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase bg-foreground text-background px-6 py-4 hover:opacity-80 transition-opacity"
            >
              Get in touch <ArrowUpRight size={12} />
            </a>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase border border-border px-6 py-4 hover:bg-accent transition-colors"
            >
              View full profile <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
