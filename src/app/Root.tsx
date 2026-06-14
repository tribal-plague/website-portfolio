import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { Menu, X, Moon, Sun } from "lucide-react";
import { sans, NAV_LINKS } from "./data";

export default function Root() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={sans}>
      {/* ── Navigation ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/96 backdrop-blur-md border-b border-border"
            : ""
        }`}
      >
        <div className="px-6 lg:px-12">
          <div className="max-w-6xl mx-auto h-[60px] flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="Shreesh Singh" className="h-6 w-auto dark:invert" />
              <span className="sr-only">Shreesh Singh</span>
            </Link>

            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-10">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 ${
                      isActive(link.href) && link.href !== "/#contact"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <a
                href="/Shreesh_Singh_Design_Lead.pdf"
                download="Shreesh Singh - Design Lead - 7+ years.pdf"
                className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase bg-foreground text-background px-7 py-4 hover:opacity-80 transition-opacity"
              >
                Download Resume
              </a>

              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="md:hidden text-foreground"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[60px] bottom-0 z-40 bg-background border-b border-border px-6 py-8 flex items-center">
            <div className="w-full max-w-md mx-auto">
              <div className="divide-y divide-border/70">
                {NAV_LINKS.map((link) => (
                  <div key={link.label} className="py-5 first:pt-0 last:pb-0">
                    <Link
                      to={link.href}
                      className="block text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground text-center transition-colors"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="pt-6 mt-4 border-t border-border/70">
                <a
                  href="/Shreesh_Singh_Design_Lead.pdf"
                  download="Shreesh Singh - Design Lead - 7+ years.pdf"
                  className="inline-flex w-full items-center justify-center gap-2 text-xs tracking-[0.18em] uppercase bg-foreground text-background px-7 py-4 hover:opacity-80 transition-opacity"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── Page content ── */}
      <Outlet />

      {/* ── Dark mode toggle ── */}
      <button
        onClick={() => setIsDark((d) => !d)}
        aria-label="Toggle dark mode"
        className="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center bg-foreground text-background border border-border hover:opacity-80 transition-opacity shadow-lg"
      >
        {isDark ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
      </button>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-7 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-3">
          <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            Shreesh Singh © 2025
          </p>
          <p className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
            Designed and Developed with AI
          </p>
        </div>
      </footer>
    </div>
  );
}
