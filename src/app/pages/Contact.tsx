import { useState, FormEvent } from "react";
import { Link } from "react-router";
import { ArrowUpRight, Send } from "lucide-react";
import { serifItalic, serif, CONTACT } from "../data";

type FormState = {
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
};

const INITIAL: FormState = { name: "", email: "", phone: "", role: "", message: "" };

const CONTACT_DETAILS = [
  {
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    external: false,
  },
  {
    label: "Phone",
    value: CONTACT.phone,
    href: `tel:${CONTACT.phone}`,
    external: false,
  },
  {
    label: "LinkedIn",
    value: CONTACT.linkedinLabel,
    href: CONTACT.linkedin,
    external: true,
  },
  {
    label: "Portfolio",
    value: CONTACT.behanceLabel,
    href: CONTACT.behance,
    external: true,
  },
];

function UnderlineInput({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  id: keyof FormState;
  type?: string;
  value: string;
  onChange: (id: keyof FormState, val: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={id}
        className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground"
      >
        {label}
        {required && <span className="ml-1 text-foreground/40">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground/50 pb-3 border-b outline-none transition-colors duration-200"
        style={{
          borderColor: focused
            ? "var(--foreground)"
            : "var(--border)",
        }}
      />
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (id: keyof FormState, val: string) => {
    setForm((f) => ({ ...f, [id]: val }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      message: form.message,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/contact_submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Prefer": "return=representation"
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSubmitted(true);
      setForm(INITIAL);
    } catch (err) {
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* ── Page header ── */}
      <section className="pt-36 pb-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-8">
            Contact
          </p>
          <h1
            className="font-extrabold uppercase leading-[0.88] tracking-[-0.02em] mb-10"
            style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
          >
            Let&apos;s start
            <br />
            <span className="font-normal" style={serifItalic}>
              a conversation.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-md" style={serif}>
            Open to design leadership roles, senior IC positions, and select
            freelance briefs.
          </p>
        </div>
      </section>

      {/* ── Main content: info + form ── */}
      <section className="border-t border-border py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-16">

          {/* ── Left: Contact details ── */}
          <div className="md:col-span-4 flex flex-col gap-14">

            {/* Contact links */}
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-8">
                Reach out directly
              </p>
              <div className="flex flex-col gap-7">
                {CONTACT_DETAILS.map((item) => (
                  <div key={item.label}>
                    <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5">
                      {item.label}
                    </p>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 text-[14px] text-foreground hover:text-muted-foreground transition-colors group"
                    >
                      {item.value}
                      <ArrowUpRight
                        size={11}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-8">
                Based in
              </p>
              <p className="text-[14px] text-foreground leading-relaxed">
                {CONTACT.location}
                <br />
                <span className="text-muted-foreground">India</span>
              </p>
            </div>

            {/* Availability */}
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-8">
                Availability
              </p>
              <div className="flex items-center gap-3 mb-3">
                                <span className="text-[14px] text-foreground">
                  Open to opportunities
                </span>
              </div>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Available for full-time design leadership and select project
                work. Response within 24 hours.
              </p>
            </div>

          </div>

          {/* ── Divider (vertical on desktop) ── */}
          <div className="hidden md:block md:col-span-1">
            <div className="h-full border-l border-border mx-auto w-px" />
          </div>

          {/* ── Right: Form ── */}
          <div className="md:col-span-7">
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-10">
              Send a message
            </p>

            {submitted ? (
              <div className="py-16 flex flex-col gap-5">
                <div
                  className="font-extrabold uppercase leading-none tracking-[-0.02em]"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                >
                  Message
                  <br />
                  <span className="font-normal" style={serifItalic}>
                    received.
                  </span>
                </div>
                <p className="text-[15px] text-muted-foreground max-w-sm leading-relaxed">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase border-b border-foreground pb-px w-fit hover:text-muted-foreground hover:border-muted-foreground transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">

                {/* Row 1: Name + Email */}
                <div className="grid sm:grid-cols-2 gap-10">
                  <UnderlineInput
                    label="Full name"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                  <UnderlineInput
                    label="Email address"
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {/* Row 2: Phone + Role */}
                <div className="grid sm:grid-cols-2 gap-10">
                  <UnderlineInput
                    label="Phone number"
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                  />
                  <UnderlineInput
                    label="Your role / company"
                    id="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="e.g. Head of Product, Acme Inc."
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="message"
                    className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground"
                  >
                    Message <span className="ml-1 text-foreground/40">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Tell me about your project, role, or what you have in mind…"
                    required
                    className="w-full bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground/50 pb-3 border-b outline-none resize-none transition-colors duration-200 focus:border-foreground"
                    style={{ borderColor: "var(--border)" }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--foreground)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-[12px] text-muted-foreground">
                    <span className="text-foreground/40">*</span> Required fields
                  </p>
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-3 text-xs tracking-[0.18em] uppercase bg-foreground text-background px-7 py-4 hover:opacity-80 transition-opacity disabled:opacity-50"
                  >
                    {sending ? "Sending…" : "Send message"}
                    {!sending && <Send size={12} />}
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Alternate paths (inverted) ── */}
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
              Explore more
            </span>
          </div>
          <div className="md:col-span-9 grid md:grid-cols-3 gap-y-10">
            {[
              {
                label: "Work Experience",
                desc: "7 years across 4 companies and 3 cities.",
                to: "/experience",
              },
              {
                label: "About",
                desc: "Background, approach, skills, and tools.",
                to: "/about",
              },
              {
                label: "Behance Portfolio",
                desc: "Selected visual work and case studies.",
                href: CONTACT.behance,
              },
            ].map((item) => (
              <div key={item.label} className={item !== [{ label: "Work Experience", desc: "7 years across 4 companies and 3 cities.", to: "/experience" }][0] ? "md:pl-0" : ""}>
                <p
                  className="text-[11px] tracking-[0.15em] uppercase mb-3"
                  style={{ color: "#8A877F" }}
                >
                  {item.label}
                </p>
                <p className="text-[13.5px] mb-4" style={{ color: "#C8C4BC" }}>
                  {item.desc}
                </p>
                {"to" in item ? (
                  <Link
                    to={item.to!}
                    className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase hover:opacity-70 transition-opacity group"
                  >
                    View <ArrowUpRight size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase hover:opacity-70 transition-opacity group"
                  >
                    Visit <ArrowUpRight size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
