import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Award, ChefHat, Clock, Leaf, Star, Truck, Utensils, Quote,
} from "lucide-react";
import { MENU } from "@/lib/menu-data";
import { useCart } from "@/lib/cart";
import { useToast } from "@/components/Toast";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Civil Wala Kitchen — Serving Happiness with Every Bite" },
      { name: "description", content: "A premium restaurant experience in Chittoor. Explore signature dishes, chef specials, and order authentic Indian cuisine online." },
      { property: "og:title", content: "Civil Wala Kitchen" },
      { property: "og:description", content: "Serving happiness with every bite — authentic Indian cuisine, crafted with love." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80" },
      { name: "twitter:image", content: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80" },
    ],
  }),
  component: Home,
});

function useCounter(target: number, duration = 1600, run = true) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, run]);
  return v;
}

function Counter({ n, suffix = "" }: { n: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setRun(true), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const v = useCounter(n, 1500, run);
  return <span ref={ref}>{v}{suffix}</span>;
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add("animate-slide-up"),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Home() {
  const { add } = useCart();
  const toast = useToast();
  const specials = MENU.filter((m) => m.popular).slice(0, 4);
  const bestsellers = MENU.filter((m) => m.rating >= 4.7).slice(0, 6);
  const aboutRef = useReveal<HTMLDivElement>();
  const whyRef = useReveal<HTMLDivElement>();

  const [taglineIdx, setTaglineIdx] = useState(0);
  const taglines = ["Serving Happiness with Every Bite", "A Taste of Tradition", "Where Flavor Meets Passion"];
  useEffect(() => {
    const i = setInterval(() => setTaglineIdx((x) => (x + 1) % taglines.length), 3200);
    return () => clearInterval(i);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] hero-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-accent/20 blur-3xl animate-float" />
          <div className="absolute bottom-24 right-16 w-40 h-40 rounded-full bg-primary/30 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-cream">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/40 px-4 py-1.5 text-xs font-heading tracking-wider uppercase text-accent">
              <Star size={12} fill="currentColor" /> Rated 4.9 · 2,500+ Reviews
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
              Where Every Meal <br />
              <span className="text-gold">Tells a Story</span>
            </h1>
            <p key={taglineIdx} className="mt-5 font-heading text-lg sm:text-xl text-cream/85 animate-fade-in">
              {taglines[taglineIdx]}
            </p>
            <p className="mt-3 max-w-lg text-cream/70">
              Handpicked spices, family recipes, and warm hospitality — crafted to make every visit unforgettable.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/menu" className="btn-gold btn-gold-hover rounded-full px-7 py-3.5 inline-flex items-center gap-2">
                Order Now <ArrowRight size={18} />
              </Link>
              <Link to="/menu" className="rounded-full border border-cream/40 px-7 py-3.5 font-button font-semibold text-cream hover:bg-cream/10 transition">
                View Menu
              </Link>
              <Link to="/contact" className="rounded-full border border-accent/60 text-accent px-7 py-3.5 font-button font-semibold hover:bg-accent/15 transition">
                Book a Table
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { n: 15, s: "+", l: "Years" },
                { n: 50, s: "k+", l: "Happy Guests" },
                { n: 120, s: "+", l: "Signature Dishes" },
              ].map((s) => (
                <div key={s.l} className="glass-dark rounded-2xl px-4 py-3 text-center">
                  <div className="font-display text-2xl font-bold text-accent">
                    <Counter n={s.n} suffix={s.s} />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-cream/70">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-square w-full max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-full bg-accent/30 blur-3xl animate-glow" />
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&q=80"
                alt="Signature biryani"
                className="relative rounded-full w-full h-full object-cover border-8 border-accent/40 animate-float"
              />
              <div className="absolute -top-4 -right-2 glass-dark rounded-2xl p-3 text-cream animate-float" style={{ animationDelay: "1s" }}>
                <ChefHat className="text-accent" />
                <div className="text-xs mt-1">Chef's Pick</div>
              </div>
              <div className="absolute -bottom-2 -left-4 glass-dark rounded-2xl px-4 py-2 text-cream animate-float" style={{ animationDelay: "2s" }}>
                <div className="text-xs">⭐ 4.9 rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div ref={aboutRef} className="opacity-0">
            <span className="font-heading text-xs tracking-[0.4em] uppercase text-primary">Our Story</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl text-secondary">
              A Legacy of <span className="text-gold">Flavour</span> Since 2010
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Civil Wala Kitchen began as a small family dream in Chittoor — a place where authentic Indian
              recipes could meet warm, modern hospitality. Today, we craft every plate with the same care,
              using locally sourced ingredients and time-honoured techniques.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { icon: Leaf, t: "Fresh Ingredients", d: "Sourced daily from local farms." },
                { icon: ChefHat, t: "Master Chefs", d: "Trained in traditional cuisines." },
                { icon: Award, t: "Award Winning", d: "Recognized for authentic taste." },
                { icon: Utensils, t: "Family Friendly", d: "A warm space for all ages." },
              ].map((v) => (
                <div key={v.t} className="flex gap-3 rounded-2xl border border-border bg-card p-4 hover:shadow-md transition">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/20 text-primary">
                    <v.icon size={18} />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-secondary">{v.t}</div>
                    <div className="text-xs text-muted-foreground">{v.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" alt="" className="rounded-3xl aspect-[3/4] object-cover shadow-lg" />
              <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80" alt="" className="rounded-3xl aspect-[3/4] object-cover shadow-lg mt-10" />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 glass rounded-2xl px-6 py-4 shadow-xl grid grid-cols-4 gap-2 text-center">
              {[
                { n: 15, s: "+", l: "Years" },
                { n: 200, s: "+", l: "Daily Orders" },
                { n: 50, s: "k", l: "Guests" },
                { n: 4.9, s: "★", l: "Rating" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-xl font-bold text-primary">
                    {s.n}{s.s}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6">
          <div ref={whyRef} className="text-center opacity-0 max-w-2xl mx-auto">
            <span className="font-heading text-xs tracking-[0.4em] uppercase text-primary">Why Choose Us</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl text-secondary">
              Crafted With <span className="text-gold">Love</span>, Served With <span className="text-gold">Pride</span>
            </h2>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ChefHat, t: "Master Chefs", d: "Decades of culinary heritage." },
              { icon: Leaf, t: "100% Fresh", d: "Farm-to-table ingredients daily." },
              { icon: Truck, t: "Fast Delivery", d: "Hot & fresh within 30 minutes." },
              { icon: Award, t: "Award Winning", d: "Recognised for authentic taste." },
            ].map((f) => (
              <div key={f.t} className="group rounded-3xl bg-card p-8 text-center border border-border hover:-translate-y-2 hover:shadow-luxe transition">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-accent to-amber-600 text-primary group-hover:scale-110 transition">
                  <f.icon size={28} strokeWidth={2.2} />
                </div>
                <h3 className="mt-5 font-display text-xl text-secondary">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHEF SPECIALS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <span className="font-heading text-xs tracking-[0.4em] uppercase text-primary">Chef Specials</span>
              <h2 className="mt-2 font-display text-4xl md:text-5xl text-secondary">
                Today's <span className="text-gold">Signature</span> Dishes
              </h2>
            </div>
            <Link to="/menu" className="font-heading text-primary hover:text-accent inline-flex items-center gap-1">
              View full menu <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specials.map((item) => (
              <div key={item.id} className="group rounded-3xl bg-card overflow-hidden border border-border hover:shadow-luxe transition">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <span className={`absolute top-3 left-3 text-[10px] px-2 py-1 rounded-full font-bold ${item.veg ? "bg-green-600" : "bg-red-600"} text-white`}>
                    {item.veg ? "VEG" : "NON-VEG"}
                  </span>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1 text-xs font-semibold">
                    <Star size={11} className="fill-accent text-accent" /> {item.rating}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-secondary">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="font-display text-xl text-primary font-bold">₹{item.price}</div>
                    <button
                      onClick={() => { add({ id: item.id, name: item.name, price: item.price, image: item.image }); toast.push(`${item.name} added`); }}
                      className="btn-gold btn-gold-hover rounded-full px-4 py-2 text-xs"
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS scroller */}
      <section className="py-16 bg-secondary text-cream">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-heading text-xs tracking-[0.4em] uppercase text-accent">Best Sellers</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">Loved by our guests</h2>
            </div>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
            {bestsellers.map((item) => (
              <div key={item.id} className="min-w-[260px] snap-start rounded-2xl overflow-hidden bg-cream text-secondary shadow-lg">
                <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <h4 className="font-display text-lg">{item.name}</h4>
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="text-primary font-bold">₹{item.price}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} /> {item.prepTime}m
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="font-heading text-xs tracking-[0.4em] uppercase text-primary">Guest Reviews</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl text-secondary">
              Words From <span className="text-gold">Our Family</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "Priya S.", t: "Best biryani in town — the aroma alone is worth the trip!", r: 5 },
              { n: "Rahul K.", t: "The masala dosa is huge, crisp, and the chutneys are perfect.", r: 5 },
              { n: "Anita M.", t: "Warm ambience, quick service, and every dish tastes home-made.", r: 5 },
            ].map((r) => (
              <div key={r.n} className="rounded-3xl bg-card p-8 border border-border shadow-sm hover:shadow-luxe transition">
                <Quote className="text-accent" />
                <p className="mt-4 text-muted-foreground italic">"{r.t}"</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="font-heading font-semibold text-secondary">{r.n}</div>
                  <div className="flex text-accent">
                    {Array.from({ length: r.r }).map((_, i) => (
                      <Star key={i} size={14} className="fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-[2rem] hero-bg px-8 py-16 md:p-16 text-center text-cream shadow-luxe">
            <h2 className="font-display text-4xl md:text-5xl">Hungry Already?</h2>
            <p className="mt-3 text-cream/80 max-w-lg mx-auto">
              Order your favourite dishes online and get them delivered piping hot to your door.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/menu" className="btn-gold btn-gold-hover rounded-full px-8 py-3.5">Order Now</Link>
              <Link to="/contact" className="rounded-full border border-cream/40 px-8 py-3.5 font-button font-semibold hover:bg-cream/10">
                Reserve a Table
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
