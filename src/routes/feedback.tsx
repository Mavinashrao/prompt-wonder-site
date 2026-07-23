import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Send } from "lucide-react";
import { useToast } from "@/components/Toast";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback & Reviews — Civil Wala Kitchen" },
      { name: "description", content: "Share your experience at Civil Wala Kitchen and read what our guests say." },
      { property: "og:title", content: "Feedback — Civil Wala Kitchen" },
      { property: "og:description", content: "Rate your visit and read guest reviews." },
    ],
  }),
  component: FeedbackPage,
});

const INITIAL_REVIEWS = [
  { name: "Priya S.", rating: 5, text: "Absolute gem — the biryani is legendary and staff are so warm.", emoji: "🤩" },
  { name: "Rahul K.", rating: 5, text: "Crispy dosa, hot filter coffee — reminds me of home.", emoji: "😍" },
  { name: "Anita M.", rating: 4, text: "Loved the ambience, food came fast and fresh.", emoji: "😊" },
  { name: "Vikram R.", rating: 5, text: "Chicken 65 is fire! Will be back this weekend.", emoji: "🔥" },
];

function FeedbackPage() {
  const toast = useToast();
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [form, setForm] = useState({ name: "", email: "", rating: 0, text: "", emoji: "" });
  const [hover, setHover] = useState(0);

  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    pct: Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100),
  }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.rating || !form.text) return toast.push("Please add rating and review");
    setReviews([{ ...form }, ...reviews]);
    setForm({ name: "", email: "", rating: 0, text: "", emoji: "" });
    toast.push("Thank you for your review!");
  };

  const emojis = ["😍", "😊", "🙂", "😐", "☹️"];

  return (
    <>
      <section className="hero-bg pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 text-center text-cream">
          <span className="font-heading text-xs tracking-[0.4em] uppercase text-accent">Feedback</span>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">Tell Us <span className="text-gold">How We Did</span></h1>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-3 gap-10">
          {/* summary */}
          <aside className="rounded-3xl bg-card border border-border p-8 h-fit shadow-luxe text-center">
            <div className="font-display text-6xl font-bold text-primary">{avg}</div>
            <div className="mt-1 flex justify-center text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-accent text-accent" />
              ))}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{reviews.length} reviews</p>
            <div className="mt-6 space-y-2 text-left">
              {dist.map((d) => (
                <div key={d.star} className="flex items-center gap-2 text-xs">
                  <span className="w-4 text-muted-foreground">{d.star}</span>
                  <Star size={11} className="fill-accent text-accent shrink-0" />
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${d.pct}%` }} />
                  </div>
                  <span className="w-10 text-right text-muted-foreground">{d.pct}%</span>
                </div>
              ))}
            </div>
          </aside>

          {/* form */}
          <form onSubmit={submit} className="lg:col-span-2 rounded-3xl bg-card border border-border p-8 shadow-luxe">
            <h2 className="font-display text-2xl text-secondary">Leave a Review</h2>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Name *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
              </div>
            </div>

            <div className="mt-5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Rating *</label>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onMouseEnter={() => setHover(s)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setForm({ ...form, rating: s })}
                    className="p-1"
                  >
                    <Star
                      size={28}
                      className={`transition ${
                        (hover || form.rating) >= s ? "fill-accent text-accent scale-110" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Mood</label>
              <div className="mt-2 flex gap-2">
                {emojis.map((e) => (
                  <button
                    type="button"
                    key={e}
                    onClick={() => setForm({ ...form, emoji: e })}
                    className={`grid place-items-center h-11 w-11 rounded-full text-xl transition ${
                      form.emoji === e ? "bg-accent scale-110" : "bg-muted hover:bg-accent/40"
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Review *</label>
              <textarea
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                rows={4}
                className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Share your experience..."
              />
            </div>

            <button type="submit" className="mt-6 btn-gold btn-gold-hover rounded-full px-6 py-3 inline-flex items-center gap-2">
              Submit <Send size={16} />
            </button>
          </form>
        </div>

        {/* reviews list */}
        <div className="mx-auto max-w-7xl px-6 mt-14">
          <h3 className="font-display text-2xl text-secondary mb-6">What Guests Say</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <div key={i} className="rounded-2xl bg-card border border-border p-6 hover:shadow-md transition animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-cream font-heading font-bold">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-heading font-semibold text-secondary text-sm">{r.name}</div>
                      <div className="flex text-accent">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} size={12} className="fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </div>
                  {r.emoji && <span className="text-2xl">{r.emoji}</span>}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
