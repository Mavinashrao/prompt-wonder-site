import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink,
  Code2, Brain, Database, Sparkles, GraduationCap, Briefcase,
  Award, Send, ArrowRight, Bot, Cpu, Layers, MessageCircle, X,
  Zap, Target, Rocket,
} from "lucide-react";
import avinashPhoto from "@/assets/avinash.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M. Avinash Rao — AI Engineer · Prompt Engineer · NLP Engineer" },
      { name: "description", content: "Portfolio of M. Avinash Rao — AI Engineer specializing in LLMs, RAG pipelines, prompt engineering, and scalable Python AI systems." },
      { property: "og:title", content: "M. Avinash Rao — AI Engineer" },
      { property: "og:description", content: "Building intelligent AI systems with LLMs, RAG pipelines, and scalable Python architectures." },
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

const RESUME_URL = "/Avinash_Rao_Resume.pdf";

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

function useTyping(words: string[], speed = 55, pause = 1600) {
  const [text, setText] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[wIdx % words.length];
    const t = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDel(true), pause);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setWIdx((i) => i + 1); }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, del, wIdx, words, speed, pause]);
  return text;
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

  const llmBoost = useCounter(25, 1400, statsVisible);
  const inconsistency = useCounter(40, 1400, statsVisible);
  const queries = useCounter(200, 1600, statsVisible);
  const accuracy = useCounter(92, 1600, statsVisible);

  const typed = useTyping([
    "Building intelligent AI systems with LLMs & RAG pipelines.",
    "Engineering prompts that boost LLM accuracy by 25%.",
    "Scaling Python architectures for production AI.",
  ]);

  return (
    <div ref={rootRef} className="min-h-screen hero-bg text-foreground">
      <Nav open={navOpen} setOpen={setNavOpen} />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <NeuralBackground />
        <BgOrbs />
        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div data-reveal>
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm text-muted-foreground">Available for AI Engineer roles</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
                M. Avinash <span className="text-gradient">Rao</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-5 font-display">
                AI Engineer <span className="text-accent">/</span> Prompt Engineer <span className="text-accent">/</span> NLP Engineer
              </p>
              <p className="text-base md:text-lg text-foreground/90 max-w-xl mb-8 leading-relaxed min-h-[3.5rem]">
                {typed}<span className="inline-block w-[2px] h-5 bg-accent ml-1 align-middle animate-pulse" />
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#projects" className="group inline-flex items-center gap-2 bg-gradient-to-r from-[oklch(0.7_0.13_195)] to-[oklch(0.9_0.15_190)] text-primary-foreground font-medium px-6 py-3 rounded-xl hover:scale-105 transition-all glow-ring">
                  View Projects <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href={RESUME_URL} download className="inline-flex items-center gap-2 glass px-6 py-3 rounded-xl hover:border-accent/50 transition-all">
                  <Download className="h-4 w-4" /> Download Resume
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
              <FloatBadge className="absolute top-1/2 -right-8" icon={<Zap className="h-4 w-4" />} label="Prompt Optimizer" />
              <FloatBadge className="absolute -bottom-4 -left-4" icon={<Sparkles className="h-4 w-4" />} label="RAG Systems" />
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20" data-reveal>
            <Stat icon={<Target className="h-5 w-5" />} value={`+${llmBoost}%`} label="LLM Accuracy Boost" />
            <Stat icon={<Zap className="h-5 w-5" />} value={`-${inconsistency}%`} label="Response Inconsistency" />
            <Stat icon={<Rocket className="h-5 w-5" />} value={`${queries}+`} label="Concurrent Queries" />
            <Stat icon={<Sparkles className="h-5 w-5" />} value={`${accuracy}%`} label="RAG Contextual Accuracy" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" eyebrow="01 — About" title="About Me">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div data-reveal className="md:col-span-2 glass rounded-2xl p-8 space-y-5">
            <div>
              <h3 className="text-accent text-sm tracking-widest uppercase mb-2">Who I Am</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                AI & Data Science graduate with hands-on experience in <span className="text-accent">Prompt Engineering</span>,
                Generative AI, and LLM integration — turning research-grade techniques into production systems.
              </p>
            </div>
            <div>
              <h3 className="text-accent text-sm tracking-widest uppercase mb-2">What I Build</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Scalable AI systems using <span className="text-accent">RAG, LangChain, OpenAI APIs</span>, and clean Python pipelines.
              </p>
            </div>
            <div>
              <h3 className="text-accent text-sm tracking-widest uppercase mb-2">Impact</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Improved model accuracy by <span className="text-accent font-semibold">25%</span> and reduced inconsistencies by{" "}
                <span className="text-accent font-semibold">40%</span> through advanced prompt engineering and evaluation loops.
              </p>
            </div>
          </div>
          <div data-reveal className="space-y-3">
            {[
              { icon: <Rocket className="h-5 w-5" />, label: "LLM Engineer" },
              { icon: <Zap className="h-5 w-5" />, label: "Prompt Optimization Specialist" },
              { icon: <Brain className="h-5 w-5" />, label: "RAG Systems Developer" },
              { icon: <Cpu className="h-5 w-5" />, label: "NLP & Python Pipelines" },
            ].map((f) => (
              <div key={f.label} className="glass rounded-xl px-5 py-4 flex items-center gap-3 hover:border-accent/40 hover:-translate-y-0.5 transition-all">
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
                  <a href={p.link} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{p.desc}</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground mb-4">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2"><span className="text-accent">›</span>{b}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">{t}</span>
                  ))}
                </div>
                <div className="flex gap-3 pt-2 border-t border-border/50">
                  <a href={p.link} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline inline-flex items-center gap-1">
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow="04 — Skills" title="Technical Toolkit">
        {/* Circular progress */}
        <div data-reveal className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {CORE_SKILLS.map((s) => (
            <SkillRing key={s.label} label={s.label} value={s.value} />
          ))}
        </div>

        {/* Stack grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

        {/* AI Pipeline visualization */}
        <div data-reveal className="glass rounded-2xl p-8">
          <h3 className="font-display font-semibold text-lg mb-1">AI Pipeline I Build</h3>
          <p className="text-sm text-muted-foreground mb-6">End-to-end RAG flow used across my projects</p>
          <PipelineFlow />
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
              Open to opportunities in AI Engineering, Prompt Engineering, and NLP.
              Let's talk about how we can ship intelligent systems together.
            </p>
            <div className="space-y-3 mt-6">
              <ContactRow icon={<Mail className="h-5 w-5" />} label="mavinashrao5@gmail.com" href="mailto:mavinashrao5@gmail.com" />
              <ContactRow icon={<Phone className="h-5 w-5" />} label="+91 90141 55107" href="tel:+919014155107" />
              <ContactRow icon={<Linkedin className="h-5 w-5" />} label="linkedin.com/in/mavinashrao" href="https://linkedin.com/in/mavinashrao" />
              <ContactRow icon={<Github className="h-5 w-5" />} label="github.com/mavinashrao" href="https://github.com/mavinashrao" />
            </div>
            <a href={RESUME_URL} download className="inline-flex items-center gap-2 mt-4 bg-accent text-accent-foreground font-medium px-5 py-3 rounded-xl hover:opacity-90 transition">
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>
          <form
            data-reveal
            onSubmit={(e) => {
              e.preventDefault();
              const f = e.currentTarget as HTMLFormElement;
              const name = (f.elements.namedItem("name") as HTMLInputElement).value;
              const email = (f.elements.namedItem("email") as HTMLInputElement).value;
              const msg = (f.elements.namedItem("message") as HTMLTextAreaElement).value;
              window.location.href = `mailto:mavinashrao5@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(msg + "\n\n— " + name + " (" + email + ")")}`;
            }}
            className="glass rounded-2xl p-6 space-y-4"
          >
            <Field label="Name"><input name="name" required className="w-full bg-input rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent" placeholder="Your name" /></Field>
            <Field label="Email"><input name="email" required type="email" className="w-full bg-input rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent" placeholder="you@example.com" /></Field>
            <Field label="Message"><textarea name="message" required rows={5} className="w-full bg-input rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent resize-none" placeholder="Tell me about your project..." /></Field>
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

      <ChatBot />
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
        <a href={RESUME_URL} download className="hidden md:inline-flex items-center gap-2 bg-accent text-accent-foreground text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition">
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
            <a href={RESUME_URL} download className="inline-flex items-center gap-2 text-accent"><Download className="h-4 w-4" /> Resume</a>
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

function Stat({ icon, value, label }: { icon?: React.ReactNode; value: string; label: string }) {
  return (
    <div className="glass rounded-2xl p-5 text-center hover:border-accent/40 transition-colors">
      {icon && <div className="text-accent flex justify-center mb-2">{icon}</div>}
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

/* Neural-network animated background */
function NeuralBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];

    const resize = () => {
      const parent = canvas.parentElement!;
      w = parent.clientWidth; h = parent.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const count = Math.min(70, Math.floor((w * h) / 18000));
    for (let i = 0; i < count; i++) {
      nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 });
    }
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.strokeStyle = `rgba(100, 255, 218, ${0.18 * (1 - d / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(100, 255, 218, 0.7)";
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 pointer-events-none opacity-60" />;
}

/* Circular progress ring */
function SkillRing({ label, value }: { label: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const v = useCounter(value, 1400, visible);
  const r = 42, c = 2 * Math.PI * r;
  const offset = c - (v / 100) * c;
  return (
    <div ref={ref} className="glass rounded-2xl p-5 flex flex-col items-center hover:border-accent/40 transition-colors">
      <div className="relative h-28 w-28">
        <svg className="-rotate-90" viewBox="0 0 100 100" width="112" height="112">
          <circle cx="50" cy="50" r={r} stroke="oklch(1 0 0 / 0.08)" strokeWidth="8" fill="none" />
          <circle cx="50" cy="50" r={r} stroke="url(#gr)" strokeWidth="8" fill="none"
            strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.4s ease-out" }} />
          <defs>
            <linearGradient id="gr" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.7 0.13 195)" />
              <stop offset="100%" stopColor="oklch(0.9 0.15 190)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-xl text-gradient">{v}%</div>
      </div>
      <p className="mt-3 text-sm font-medium">{label}</p>
    </div>
  );
}

/* AI Pipeline */
function PipelineFlow() {
  const steps = [
    { icon: <MessageCircle className="h-5 w-5" />, label: "User Query" },
    { icon: <Layers className="h-5 w-5" />, label: "Embeddings" },
    { icon: <Database className="h-5 w-5" />, label: "FAISS Vector Store" },
    { icon: <Brain className="h-5 w-5" />, label: "LLM (OpenAI / Gemini)" },
    { icon: <Sparkles className="h-5 w-5" />, label: "Response" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center gap-3">
          <div className="glass rounded-xl px-4 py-3 flex items-center gap-2 hover:border-accent/50 transition-colors">
            <span className="text-accent">{s.icon}</span>
            <span className="text-sm font-medium whitespace-nowrap">{s.label}</span>
          </div>
          {i < steps.length - 1 && <ArrowRight className="h-4 w-4 text-accent shrink-0" />}
        </div>
      ))}
    </div>
  );
}

/* "Ask about Avinash" rule-based chatbot */
function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Hi! I'm Avinash's AI assistant. Ask me about his skills, projects, experience, or education." },
  ]);
  const [input, setInput] = useState("");
  const scrollerRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => ["What are his skills?", "Tell me about his projects", "His experience?", "Education?", "How to contact him?"], []);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [messages, open]);

  const answer = (q: string): string => {
    const t = q.toLowerCase();
    if (/(skill|tech|stack|tool)/.test(t)) return "Avinash works with Python, LangChain, OpenAI & Gemini APIs, FAISS, RAG, NLP, Prompt Engineering, PyTorch, Pandas, and SQL.";
    if (/(project|build|portfolio|work)/.test(t)) return "Two flagship projects: SmartCampus Bot — a RAG assistant (92% accuracy, 200+ concurrent queries) and Smart AI Coding Tutor (95% code accuracy, 45% latency drop).";
    if (/(experience|intern|job|company|work)/.test(t)) return "Prompt Engineering Intern at Small Fare (Oct 2025–Feb 2026): +25% LLM accuracy, -40% inconsistencies. Python Developer Intern at Cognifyz Technologies (Jul–Sep 2025): automated 50K+ records.";
    if (/(educat|degree|college|school|gpa|study)/.test(t)) return "B.Tech in CSE (AI & Data Science) at Siddharth Institute (2022–2026), GPA 9.02. Intermediate 95%, 10th GPA 9.3.";
    if (/(contact|email|reach|phone|hire)/.test(t)) return "Email: mavinashrao5@gmail.com · Phone: +91 90141 55107 · LinkedIn: linkedin.com/in/mavinashrao";
    if (/(resume|cv|download)/.test(t)) return "You can download his resume from the top-right button, or directly at /Avinash_Rao_Resume.pdf.";
    if (/(certif|cours|award)/.test(t)) return "Certifications: Prompt Engineering (CodeSignal), Generative AI & LLMs (Google Cloud · Coursera), Joy of Computing in Python (NPTEL), Python Programming (Guvi · Great Learning).";
    if (/(location|where|based|city)/.test(t)) return "Based in Chittoor, India — open to remote and relocation.";
    if (/(hello|hi|hey)/.test(t)) return "Hey there! Ask me about Avinash's projects, skills, experience, or how to reach him.";
    return "I can answer about Avinash's skills, projects, experience, education, certifications, or contact details. Try one of the suggestions below!";
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, { from: "bot", text: answer(text) }]), 350);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-[oklch(0.7_0.13_195)] to-[oklch(0.9_0.15_190)] text-primary-foreground shadow-lg glow-ring flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Open chatbot"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[22rem] max-w-[calc(100vw-3rem)] glass rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-accent/30 animate-fade-in">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2 bg-gradient-to-r from-[oklch(0.7_0.13_195)]/20 to-[oklch(0.9_0.15_190)]/20">
            <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent"><Bot className="h-4 w-4" /></div>
            <div>
              <p className="text-sm font-semibold">Ask about Avinash</p>
              <p className="text-xs text-muted-foreground">AI-powered Q&A</p>
            </div>
          </div>
          <div ref={scrollerRef} className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`text-sm px-3 py-2 rounded-2xl max-w-[85%] ${m.from === "user" ? "bg-accent text-accent-foreground rounded-br-sm" : "bg-secondary text-secondary-foreground rounded-bl-sm"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="px-3 pb-2 flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition">
                {s}
              </button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-3 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-input rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
            />
            <button type="submit" className="h-9 w-9 rounded-lg bg-accent text-accent-foreground flex items-center justify-center hover:opacity-90 transition" aria-label="Send">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
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
      "Delivered evaluation reports influencing product decisions",
    ],
  },
  {
    role: "Python Developer Intern",
    company: "Cognifyz Technologies",
    location: "Remote",
    period: "Jul 2025 – Sep 2025",
    bullets: [
      "Automated workflows reducing manual effort by 40% (Pandas & NumPy)",
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
    link: "https://github.com/mavinashrao",
    bullets: [
      "92% contextual accuracy on real student queries",
      "Reduced irrelevant responses by 35%",
      "Handles 200+ concurrent queries with sub-2s latency",
      "REST API backend with RAG architecture",
    ],
    tags: ["Python", "LangChain", "FAISS", "OpenAI API"],
  },
  {
    title: "Smart AI Coding Tutor",
    desc: "LLM-powered coding assistant with multi-language support and live analytics.",
    icon: <Code2 className="h-6 w-6" />,
    link: "https://github.com/mavinashrao",
    bullets: [
      "95% code generation accuracy across 10+ languages",
      "Real-time analytics dashboard tracking 15+ metrics",
      "Reduced response latency by 45%",
      "Transformer-based reasoning layer",
    ],
    tags: ["LLMs", "Python", "Transformers", "Prompt Engineering"],
  },
];

const CORE_SKILLS = [
  { label: "Prompt Engineering", value: 95 },
  { label: "Python", value: 90 },
  { label: "NLP", value: 85 },
  { label: "RAG & LangChain", value: 88 },
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
