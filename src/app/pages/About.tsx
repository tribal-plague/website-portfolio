import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import {
  serif,
  serifItalic,
  SKILLS,
  TOOLS,
  ACHIEVEMENTS,
  CONTACT,
} from "../data";

const APPROACH = [
  {
    index: "01",
    heading: "Design as Communication",
    body: "Every visual decision is a message. I treat design not as decoration but as a system of intentional choices — hierarchy, contrast, whitespace — each one guiding the viewer precisely where they need to go.",
  },
  {
    index: "02",
    heading: "Brand Coherence at Scale",
    body: "Consistency is the hardest thing to maintain across a growing team or product. I build design systems and shared languages so that visual integrity holds whether it's a social post or a full-page campaign.",
  },
  {
    index: "03",
    heading: "AI as a Creative Collaborator",
    body: "I integrate AI-powered tools — Midjourney, Firefly, Claude — not as a shortcut but as an accelerant. The ideas remain human; the iteration speed becomes superhuman.",
  },
];

const TIMELINE = [
  { year: "2015", event: "Enrolled at NIFT Mumbai — Bachelor of Design" },
  { year: "2018", event: "Joined Bewakoof as Graphic Designer & Illustrator" },
  { year: "2021", event: "Moved to Nykaa as Visual Designer, Mumbai" },
  { year: "2022", event: "Sr. Visual Designer at Polygon, Bangalore" },
  { year: "2023", event: "Design Lead at Zopper, Noida — present" },
];

const SKILL_GROUPS = [
  {
    category: "Design",
    items: [
      "UI Design",
      "Web Design & Development",
      "Branding & Visual Identity",
      "Graphic Design",
      "Design Systems",
      "Responsive Design",
    ],
  },
  {
    category: "Production",
    items: [
      "Motion Graphics & Animation",
      "Print Collaterals",
      "Illustration",
      "Business Presentations",
    ],
  },
  {
    category: "Strategy",
    items: ["AI-Assisted Design", "Prompt Engineering", "Problem Solving"],
  },
];

const TOOL_GROUPS = [
  {
    category: "Adobe Suite",
    items: [
      "Photoshop",
      "Illustrator",
      "After Effects",
      "Premiere Pro",
    ],
  },
  {
    category: "Design & Web",
    items: ["Figma", "Webflow"],
  },
  {
    category: "AI Tools",
    items: ["Midjourney", "Adobe Firefly", "ChatGPT", "Claude", "Google AI Suite"],
  },
];

export default function About() {
  return (
    <>
      {/* ── Page header ── */}
      <section className="pt-36 pb-20 px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-8">
              About
            </p>
            <h1
              className="font-black uppercase leading-[0.88] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
            >
              The Designer
              <br />
              <span className="font-normal" style={serifItalic}>
                behind the work.
              </span>
            </h1>
          </div>
          <div className="md:col-span-4 pb-2">
            <p
              className="text-lg text-muted-foreground leading-relaxed"
              style={serif}
            >
              7+ years of crafting visual systems that communicate, convert,
              and endure.
            </p>
          </div>
        </div>
      </section>

      {/* ── Bio ── */}
      <section className="border-t border-border py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3 pt-1">
            <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
              Biography
            </span>
          </div>
          <div className="md:col-span-9 space-y-6">
            <p
              className="text-xl md:text-2xl leading-[1.7] text-foreground"
              style={serif}
            >
              I'm Shreesh Singh — a Visual and UI Design Lead based in Noida,
              India, with deep roots in both digital and print craft.
            </p>
            <p className="text-[15px] leading-[1.85] text-muted-foreground">
              My career spans four companies across Mumbai, Bangalore and Noida
              — from illustrating licensed T-shirts for Marvel and DC Comics at
              Bewakoof, to leading end-to-end brand campaigns across multiple
              cities for Polygon, to independently designing and developing the
              entire Zopper website as its sole designer.
            </p>
            <p className="text-[15px] leading-[1.85] text-muted-foreground">
              What connects all of it is a belief that design should do
              something. Every visual decision — a typeface, a layout, a motion
              curve — carries intent. I bring that rigour to every brief, at
              every scale, whether it's a single icon or a full brand identity
              system.
            </p>
            <p className="text-[15px] leading-[1.85] text-muted-foreground">
              I've also made AI tools a genuine part of my workflow —
              Midjourney, Adobe Firefly, Claude, and the Google AI suite — using
              them to accelerate ideation and iteration without compromising on
              craft or creative direction.
            </p>
          </div>
        </div>
      </section>

      {/* ── Journey / Timeline ── */}
      <section className="border-t border-border py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3 pt-1">
            <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
              Journey
            </span>
          </div>
          <div className="md:col-span-9">
            <div className="space-y-0">
              {TIMELINE.map((t, i) => (
                <div
                  key={t.year}
                  className={`flex gap-10 py-6 ${
                    i < TIMELINE.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span
                    className="text-[11px] tracking-[0.15em] text-muted-foreground shrink-0 pt-0.5 w-10"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {t.year}
                  </span>
                  <span
                    className={`text-[15px] leading-snug ${
                      i === TIMELINE.length - 1
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {t.event}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Approach ── */}
      <section className="border-t border-border py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-3">
              <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                Approach
              </span>
            </div>
            <div className="md:col-span-9">
              <p className="text-[15px] text-muted-foreground">
                Three principles that shape how I work.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 border-t border-border">
            {APPROACH.map((item, i) => (
              <div
                key={item.index}
                className={`py-10 ${
                  i < APPROACH.length - 1
                    ? "md:border-r border-border border-b md:border-b-0 md:pr-10"
                    : ""
                } ${i > 0 ? "md:pl-10" : ""}`}
              >
                <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-5">
                  {item.index}
                </p>
                <h3
                  className="text-lg font-bold mb-4 leading-snug"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {item.heading}
                </h3>
                <p className="text-[13.5px] text-muted-foreground leading-[1.8]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="border-t border-border py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3 pt-1">
            <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
              Skills
            </span>
          </div>
          <div className="md:col-span-9 space-y-12">
            {SKILL_GROUPS.map((group) => (
              <div key={group.category}>
                <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-5">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-[12px] tracking-wide border border-border px-4 py-2 cursor-default transition-colors duration-200 hover:bg-foreground hover:text-background hover:border-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools (inverted) ── */}
      <section
        className="py-24 px-6 lg:px-12"
        style={{ background: "#1A1917", color: "#F7F5F1" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3 pt-1">
            <span
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{ color: "#8A877F" }}
            >
              Tools
            </span>
          </div>
          <div className="md:col-span-9 space-y-10">
            {TOOL_GROUPS.map((group) => (
              <div key={group.category}>
                <p
                  className="text-[11px] tracking-[0.18em] uppercase mb-5"
                  style={{ color: "#8A877F" }}
                >
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tool) => (
                    <span
                      key={tool}
                      className="text-[12px] tracking-wide border px-4 py-2 cursor-default transition-all duration-200 hover:bg-[#F7F5F1] hover:text-[#1A1917]"
                      style={{ borderColor: "rgba(247,245,241,0.15)" }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Achievements ── */}
      <section className="border-t border-border py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-10 mb-4">
            <div className="md:col-span-3">
              <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                Recognition
              </span>
            </div>
            <div className="md:col-span-9" />
          </div>

          <div className="grid md:grid-cols-2 border-t border-border">
            {ACHIEVEMENTS.map((a, i) => (
              <div
                key={a.title}
                className={`py-12 ${
                  i === 0
                    ? "md:pr-16 md:border-r border-border border-b md:border-b-0"
                    : "md:pl-16"
                }`}
              >
                <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-5">
                  {a.index}
                </p>
                <h3 className="text-xl font-bold mb-4 leading-snug">
                  {a.title}
                </h3>
                <p className="text-[14px] text-muted-foreground leading-[1.8]">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section className="border-t border-border py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-3">
            <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
              Education
            </span>
          </div>
          <div className="md:col-span-9 grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Degree
              </p>
              <h3 className="text-lg font-bold mb-1">Bachelor of Design</h3>
              <p className="text-sm text-muted-foreground">
                National Institute of Fashion Technology
              </p>
              <p className="text-sm text-muted-foreground">Mumbai</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Period
              </p>
              <p className="text-lg font-bold">2015 – 2019</p>
              <p className="text-sm text-muted-foreground mt-1">
                4-year full-time programme
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="border-t border-border py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-8">
              <h2
                className="font-black uppercase tracking-tight leading-[0.88] mb-4"
                style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
              >
                Ready to build
                <br />
                <span className="font-normal" style={{ ...serifItalic, fontSize: "inherit" }}>
                  something great?
                </span>
              </h2>
              <p className="text-[15px] text-muted-foreground mt-6">
                Open to design leadership roles, senior IC positions, and select
                freelance briefs.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-4 md:items-end">
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase bg-foreground text-background px-6 py-4 hover:opacity-80 transition-opacity"
              >
                Get in touch <ArrowUpRight size={12} />
              </a>
              <a
                href={CONTACT.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase border border-border px-6 py-4 hover:bg-accent transition-colors"
              >
                View Behance <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-y-8 border-t border-border mt-16 pt-12">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Email
              </p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-[13.5px] hover:text-muted-foreground transition-colors"
              >
                {CONTACT.email}
              </a>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Phone
              </p>
              <a
                href={`tel:${CONTACT.phone}`}
                className="text-[13.5px] hover:text-muted-foreground transition-colors"
              >
                {CONTACT.phone}
              </a>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Location
              </p>
              <span className="text-[13.5px] text-muted-foreground">
                {CONTACT.location}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
