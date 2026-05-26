import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink,
  Code2, Brain, Database, Sparkles, GraduationCap, Briefcase,
  Award, Send, ArrowRight, Bot, Cpu, Layers,
} from "lucide-react";
import avinashPhoto from "@/assets/avinash.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M. Avinash Rao — Generative AI Engineer & Prompt Engineer" },
      { name: "description", content: "Portfolio of M. Avinash Rao — Generative AI Engineer specializing in LLMs, RAG pipelines, prompt engineering, and scalable Python AI systems." },
      { property: "og:title", content: "M. Avinash Rao — Generative AI Engineer" },
      { property: "og:description", content: "Building intelligent AI systems with LLMs, RAG pipelines, and scalable Python solutions." },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.12 },
    );
    el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
      node.style.opacity = "0";
      node.style.transform = "translateY(24px)";
      node.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
      io.observe(node);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

function useCounter(target: number, duration = 1500, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

function Portfolio() {
  const rootRef = useReveal();
  const [navOpen, setNavOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setStatsVisible(true);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const accuracy = useCounter(92, 1600, statsVisible);
  const prompts = useCounter(30, 1400, statsVisible);
  const accBoost = useCounter(25, 1400, statsVisible);
  const records = useCounter(50000, 1800, statsVisible);

  return (
    <div ref={rootRef} className="min-h-screen hero-bg text-foreground">
      <Nav open={navOpen} setOpen={setNavOpen} />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <BgOrbs />
        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div data-reveal>
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm text-muted-foreground">Available for opportunities</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
                M. Avinash <span className="text-gradient">Rao</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-display">
                Generative AI Engineer <span className="text-accent">/</span> Prompt Engineer
              </p>
              <p className="text-base md:text-lg text-muted-foreground/90 max-w-xl mb-8 leading-relaxed">
                Building intelligent AI systems with LLMs, RAG pipelines, and scalable Python solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="group inline-flex items-center gap-2 bg-gradient-to-r from-[oklch(0.7_0.13_195)] to-[oklch(0.9_0.15_190)] text-primary-foreground font-medium px-6 py-3 rounded-xl hover:scale-105 transition-all glow-ring">
                  View Projects <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 glass px-6 py-3 rounded-xl hover:border-accent/50 transition-all">
                  Contact Me <Send className="h-4 w-4" />
                </a>
              </div>
              <div className="flex items-center gap-5 mt-10 text-muted-foreground">
                <a href="https://github.com/mavinashrao" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors"><Github className="h-5 w-5" /></a>
                <a href="https://linkedin.com/in/mavinashrao" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors"><Linkedin className="h-5 w-5" /></a>
                <a href="mailto:mavinashrao5@gmail.com" className="hover:text-accent transition-colors"><Mail className="h-5 w-5" /></a>
                <span className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4" /> Chittoor, India</span>
              </div>
            </div>

            <div data-reveal className="relative mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[oklch(0.7_0.13_195)] to-[oklch(0.9_0.15_190)] opacity-30 blur-3xl rounded-full" />
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden glass glow-ring animate-float">
                <img src={avinashPhoto} alt="M. Avinash Rao" className="w-full h-full object-cover" />
              </div>
              <FloatBadge className="absolute -top-4 -left-6" icon={<Brain className="h-4 w-4" />} label="LLM Engineer" />
              <FloatBadge className="absolute -bottom-4 -right-4" icon={<Sparkles className="h-4 w-4" />} label="RAG · LangChain" />
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20" data-reveal>
            <Stat value={`${accuracy}%`} label="RAG Accuracy" />
            <Stat value={`${prompts}+`} label="Prompt Templates" />
            <Stat value={`+${accBoost}%`} label="LLM Accuracy Boost" />
            <Stat value={`${(records / 1000).toFixed(0)}K+`} label="Records Processed" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" eyebrow="01 — About" title="About Me">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div data-reveal className="md:col-span-2 glass rounded-2xl p-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Computer Science graduate specializing in <span className="text-accent">AI & Data Science</span> with hands-on experience in
              Prompt Engineering, Generative AI, and LLM integration. Proven ability to improve model accuracy by{" "}
              <span className="text-accent font-semibold">25%</span> and reduce inconsistencies by{" "}
              <span className="text-accent font-semibold">40%</span> using advanced prompt strategies.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mt-4">
              Passionate about building scalable AI systems using <span className="text-accent">Python, LangChain, and OpenAI APIs</span>.
            </p>
          </div>
          <div data-reveal className="space-y-3">
            {[
              { icon: <Bot className="h-5 w-5" />, label: "Prompt Engineering" },
              { icon: <Layers className="h-5 w-5" />, label: "RAG Pipelines" },
              { icon: <Cpu className="h-5 w-5" />, label: "LLM Integration" },
            ].map((f) => (
              <div key={f.label} className="glass rounded-xl px-5 py-4 flex items-center gap-3 hover:border-accent/40 transition-colors">
                <span className="text-accent">{f.icon}</span>
                <span className="font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" eyebrow="02 — Experience" title="Where I've Worked">
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-primary/30 to-transparent" />
          {EXPERIENCE.map((e, i) => (
            <div key={e.role} data-reveal className={`relative grid md:grid-cols-2 gap-8 mb-12 ${i % 2 ? "md:[direction:rtl]" : ""}`}>
              <div className={`md:[direction:ltr] pl-12 md:pl-0 ${i % 2 ? "md:pr-12" : "md:pl-12"}`}>
                <div className="absolute left-2 md:left-1/2 -translate-x-1/2 mt-2 h-4 w-4 rounded-full bg-accent glow-ring" />
                <div className="glass rounded-2xl p-6 hover:border-accent/40 transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-2 text-sm text-accent mb-2">
                    <Briefcase className="h-4 w-4" /> {e.period}
                  </div>
                  <h3 className="text-xl font-semibold">{e.role}</h3>
                  <p className="text-muted-foreground mb-4">{e.company} · {e.location}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-2"><span className="text-accent mt-1">▸</span><span>{b}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div />
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" eyebrow="03 — Projects" title="Featured Work">
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <article key={p.title} data-reveal className="group relative glass rounded-2xl p-7 overflow-hidden hover:border-accent/50 transition-all hover:-translate-y-1">
              <div className="absolute -top-20 -right-20 h-48 w-48 bg-gradient-to-br from-[oklch(0.7_0.13_195)] to-[oklch(0.9_0.15_190)] opacity-0 group-hover:opacity-20 blur-3xl transition-opacity" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[oklch(0.7_0.13_195)] to-[oklch(0.9_0.15_190)] flex items-center justify-center text-primary-foreground">
                    {p.icon}
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{p.desc}</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground mb-4">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2"><span className="text-accent">›</span>{b}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow="04 — Skills" title="Technical Toolkit">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((cat) => (
            <div key={cat.title} data-reveal className="glass rounded-2xl p-6 hover:border-accent/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-accent">{cat.icon}</span>
                <h3 className="font-semibold">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((s) => (
                  <span key={s} className="text-sm px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-default">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* EDUCATION + CERTS */}
      <Section id="education" eyebrow="05 — Education" title="Academic Journey">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <div className="space-y-4">
            {EDUCATION.map((ed) => (
              <div key={ed.school} data-reveal className="glass rounded-2xl p-6 flex gap-4 hover:border-accent/40 transition-colors">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold">{ed.degree}</h3>
                    <span className="text-sm text-accent">{ed.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{ed.school}</p>
                  <p className="text-sm mt-1"><span className="text-muted-foreground">Score:</span> <span className="text-accent font-medium">{ed.score}</span></p>
                </div>
              </div>
            ))}
          </div>
          <div data-reveal>
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Award className="h-5 w-5 text-accent" /> Certifications</h3>
            <div className="space-y-3">
              {CERTS.map((c) => (
                <div key={c.name} className="glass rounded-xl p-4 hover:border-accent/40 transition-colors">
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="06 — Contact" title="Let's Build Together">
        <div className="grid lg:grid-cols-2 gap-8">
          <div data-reveal className="space-y-4">
            <p className="text-lg text-muted-foreground">
              Open to opportunities in Generative AI, Prompt Engineering, and Python development.
              Let's talk about how we can bring intelligent systems to life.
            </p>
            <div className="space-y-3 mt-6">
              <ContactRow icon={<Mail className="h-5 w-5" />} label="mavinashrao5@gmail.com" href="mailto:mavinashrao5@gmail.com" />
              <ContactRow icon={<Phone className="h-5 w-5" />} label="+91 90141 55107" href="tel:+919014155107" />
              <ContactRow icon={<Linkedin className="h-5 w-5" />} label="linkedin.com/in/mavinashrao" href="https://linkedin.com/in/mavinashrao" />
              <ContactRow icon={<Github className="h-5 w-5" />} label="github.com/mavinashrao" href="https://github.com/mavinashrao" />
            </div>
          </div>
          <form
            data-reveal
            onSubmit={(e) => { e.preventDefault(); window.location.href = `mailto:mavinashrao5@gmail.com?subject=Portfolio%20Inquiry`; }}
            className="glass rounded-2xl p-6 space-y-4"
          >
            <Field label="Name"><input required className="w-full bg-input rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent" placeholder="Your name" /></Field>
            <Field label="Email"><input required type="email" className="w-full bg-input rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent" placeholder="you@example.com" /></Field>
            <Field label="Message"><textarea required rows={5} className="w-full bg-input rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent resize-none" placeholder="Tell me about your project..." /></Field>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[oklch(0.7_0.13_195)] to-[oklch(0.9_0.15_190)] text-primary-foreground font-medium px-6 py-3 rounded-xl hover:scale-[1.02] transition-transform">
              Send Message <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </Section>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 M. Avinash Rao. Built with intent.</p>
          <p>Designed & coded with <span className="text-accent">●</span> in India</p>
        </div>
      </footer>
    </div>
  );
}

function Nav({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-lg">
          <span className="text-gradient">MAR</span><span className="text-accent">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-muted-foreground hover:text-accent transition-colors">{n.label}</a>
          ))}
        </nav>
        <a href="#contact" className="hidden md:inline-flex items-center gap-2 bg-accent text-accent-foreground text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition">
          <Download className="h-4 w-4" /> Resume
        </a>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-foreground transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-foreground transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-foreground transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-accent">{n.label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-24 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="mb-12" data-reveal>
          <p className="text-sm tracking-[0.2em] uppercase text-accent mb-3">{eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass rounded-2xl p-5 text-center hover:border-accent/40 transition-colors">
      <div className="text-3xl md:text-4xl font-display font-bold text-gradient">{value}</div>
      <div className="text-xs md:text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function FloatBadge({ className, icon, label }: { className?: string; icon: React.ReactNode; label: string }) {
  return (
    <div className={`glass rounded-xl px-4 py-2 flex items-center gap-2 text-sm animate-float ${className ?? ""}`} style={{ animationDelay: "0.5s" }}>
      <span className="text-accent">{icon}</span>{label}
    </div>
  );
}

function BgOrbs() {
  return (
    <>
      <div className="pointer-events-none absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-[oklch(0.7_0.13_195)] opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-[oklch(0.9_0.15_190)] opacity-10 blur-3xl" />
    </>
  );
}

function ContactRow({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-3 glass rounded-xl px-4 py-3 hover:border-accent/50 transition-colors group">
      <span className="text-accent">{icon}</span>
      <span className="text-sm group-hover:text-accent transition-colors">{label}</span>
    </a>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm text-muted-foreground mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}

// ────────── DATA ──────────
const EXPERIENCE = [
  {
    role: "Prompt Engineering & Generative AI Intern",
    company: "Small Fare",
    location: "Hyderabad",
    period: "Oct 2025 – Feb 2026",
    bullets: [
      "Built 30+ prompt templates (Few-shot, Zero-shot, Chain-of-Thought)",
      "Improved LLM accuracy by 25% across product workflows",
      "Reduced response inconsistencies by 40% with structured prompting",
      "Integrated OpenAI & Gemini APIs into production pipelines",
      "Delivered weekly evaluation reports impacting product decisions",
    ],
  },
  {
    role: "Python Developer Intern",
    company: "Cognifyz Technologies",
    location: "Remote",
    period: "Jul 2025 – Sep 2025",
    bullets: [
      "Automated data processing with Pandas & NumPy (40% time saved)",
      "Processed 50,000+ records improving reporting accuracy by 35%",
      "Optimized legacy scripts for 20% faster execution",
    ],
  },
];

const PROJECTS = [
  {
    title: "SmartCampus Bot — RAG AI Assistant",
    desc: "A retrieval-augmented assistant for campus queries, powered by LangChain & FAISS.",
    icon: <Bot className="h-6 w-6" />,
    bullets: [
      "92% contextual accuracy on real student queries",
      "Reduced irrelevant responses by 35%",
      "Handles 200+ concurrent queries with <2s latency",
    ],
    tags: ["Python", "LangChain", "FAISS", "OpenAI API"],
  },
  {
    title: "Smart AI Coding Tutor",
    desc: "LLM-powered coding assistant with multi-language support and live analytics.",
    icon: <Code2 className="h-6 w-6" />,
    bullets: [
      "95% code generation accuracy across 10 languages",
      "Real-time analytics dashboard tracking 15+ metrics",
      "Reduced response latency by 45%",
    ],
    tags: ["LLMs", "Python", "Prompt Engineering", "Analytics"],
  },
];

const SKILLS = [
  { title: "Programming", icon: <Code2 className="h-5 w-5" />, items: ["Python", "C", "SQL"] },
  { title: "Generative AI & LLMs", icon: <Sparkles className="h-5 w-5" />, items: ["Prompt Engineering", "RAG", "LangChain", "OpenAI API", "Gemini API", "Transformers", "Hugging Face"] },
  { title: "AI / ML Concepts", icon: <Brain className="h-5 w-5" />, items: ["NLP", "Machine Learning", "Embeddings", "FAISS", "Context Engineering", "Model Evaluation"] },
  { title: "Libraries & Tools", icon: <Layers className="h-5 w-5" />, items: ["NumPy", "Pandas", "PyTorch", "Scikit-learn", "REST APIs"] },
  { title: "Platforms", icon: <Database className="h-5 w-5" />, items: ["Git", "GitHub", "Google Cloud", "VS Code", "Replit"] },
  { title: "Soft Skills", icon: <Cpu className="h-5 w-5" />, items: ["Problem Solving", "Communication", "Collaboration", "Research"] },
];

const EDUCATION = [
  { degree: "B.Tech — CSE (AI & Data Science)", school: "Siddharth Institute of Engineering and Technology", period: "2022 – 2026", score: "9.02 / 10.0 GPA" },
  { degree: "Intermediate (12th Grade)", school: "Sri Chaitanya Junior College", period: "2020 – 2022", score: "95%" },
  { degree: "Secondary School (10th Grade)", school: "Ushodaya High School", period: "2019 – 2020", score: "9.3 GPA" },
];

const CERTS = [
  { name: "Prompt Engineering", issuer: "CodeSignal" },
  { name: "Generative AI & LLMs", issuer: "Google Cloud · Coursera" },
  { name: "Joy of Computing Using Python", issuer: "NPTEL" },
  { name: "Python Programming", issuer: "Guvi · Great Learning" },
];
