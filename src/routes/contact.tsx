import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram, Facebook, Youtube } from "lucide-react";
import { useToast } from "@/components/Toast";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Civil Wala Kitchen" },
      { name: "description", content: "Visit us in Chittoor, call, or send us a message. We'd love to hear from you." },
      { property: "og:title", content: "Contact — Civil Wala Kitchen" },
      { property: "og:description", content: "Reach out for reservations, catering, or feedback." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const toast = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.push("Please fill required fields");
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", phone: "", message: "" });
      toast.push("Message sent — we'll be in touch!");
    }, 900);
  };

  return (
    <>
      <section className="hero-bg pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 text-center text-cream">
          <span className="font-heading text-xs tracking-[0.4em] uppercase text-accent">Get In Touch</span>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">We'd Love To <span className="text-gold">Hear From You</span></h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-3xl text-secondary">Visit our Kitchen</h2>
            <p className="mt-2 text-muted-foreground">Come by for a warm meal or reach out — we're always happy to help.</p>

            <div className="mt-8 space-y-4">
              {[
                { icon: MapPin, t: "Address", d: "Civil Bazaar Road, Chittoor, Andhra Pradesh 517001" },
                { icon: Phone, t: "Phone", d: "+91 90141 55107" },
                { icon: Mail, t: "Email", d: "hello@civilwalakitchen.in" },
                { icon: Clock, t: "Hours", d: "Mon–Sun · 10:00 AM – 11:00 PM" },
              ].map((c) => (
                <div key={c.t} className="flex gap-4 rounded-2xl border border-border bg-card p-4 hover:shadow-md transition">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/20 text-primary">
                    <c.icon size={18} />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-secondary">{c.t}</div>
                    <div className="text-sm text-muted-foreground">{c.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://wa.me/919014155107" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-green-600 text-white px-5 py-2.5 text-sm font-button font-semibold hover:bg-green-700 transition">
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href="https://maps.google.com/?q=Chittoor,India" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-button font-semibold hover:bg-muted transition">
                <MapPin size={16} /> Get Directions
              </a>
            </div>

            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-cream hover:bg-primary transition" aria-label="social">
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <div className="mt-8 rounded-2xl overflow-hidden border border-border shadow-md">
              <iframe
                title="map"
                src="https://www.google.com/maps?q=Chittoor,India&output=embed"
                width="100%"
                height="260"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form onSubmit={submit} className="rounded-3xl bg-card border border-border p-8 shadow-luxe h-fit">
            <h2 className="font-display text-2xl text-secondary">Send a Message</h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Field label="Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label="Email *" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              <Field label="Subject" value="" onChange={() => {}} placeholder="Reservation / Feedback" />
            </div>
            <div className="mt-4">
              <label className="text-xs font-heading uppercase tracking-wider text-muted-foreground">Message *</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Tell us how we can help..."
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="mt-6 btn-gold btn-gold-hover rounded-full px-6 py-3 inline-flex items-center gap-2 disabled:opacity-60"
            >
              {sending ? "Sending..." : <>Send Message <Send size={16} /></>}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-heading uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
      />
    </div>
  );
}
