import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Star, Clock, Plus, Filter } from "lucide-react";
import { CATEGORIES, MENU } from "@/lib/menu-data";
import { useCart } from "@/lib/cart";
import { useToast } from "@/components/Toast";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Civil Wala Kitchen" },
      { name: "description", content: "Explore our full menu — biryanis, dosas, curries, Chinese, snacks, desserts and more. Order online in seconds." },
      { property: "og:title", content: "Menu — Civil Wala Kitchen" },
      { property: "og:description", content: "Chef-crafted Indian, South Indian, Chinese and more. Filter, search, and order." },
    ],
  }),
  component: MenuPage,
});

type Sort = "popular" | "price-asc" | "price-desc" | "newest";

function MenuPage() {
  const { add } = useCart();
  const toast = useToast();
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [q, setQ] = useState("");
  const [veg, setVeg] = useState<"all" | "veg" | "nonveg">("all");
  const [sort, setSort] = useState<Sort>("popular");

  const items = useMemo(() => {
    let list = MENU.slice();
    if (cat !== "All") list = list.filter((i) => i.category === cat);
    if (veg !== "all") list = list.filter((i) => (veg === "veg" ? i.veg : !i.veg));
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((i) => i.name.toLowerCase().includes(s) || i.description.toLowerCase().includes(s));
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "newest") list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    else list.sort((a, b) => Number(!!b.popular) - Number(!!a.popular) || b.rating - a.rating);
    return list;
  }, [cat, veg, q, sort]);

  return (
    <>
      {/* header */}
      <section className="relative hero-bg pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 text-center text-cream">
          <span className="font-heading text-xs tracking-[0.4em] uppercase text-accent">Our Menu</span>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">A Feast For <span className="text-gold">The Senses</span></h1>
          <p className="mt-3 text-cream/80 max-w-xl mx-auto">Explore signature dishes crafted with heritage recipes and the freshest ingredients.</p>
        </div>
      </section>

      {/* filters */}
      <section className="sticky top-16 z-30 bg-background/85 backdrop-blur-lg border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search dishes..."
                className="w-full rounded-full border border-border bg-card pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="flex rounded-full border border-border bg-card p-1 text-xs font-heading">
              {(["all", "veg", "nonveg"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVeg(v)}
                  className={`px-3 py-1.5 rounded-full transition ${veg === v ? "bg-primary text-cream" : "text-secondary hover:bg-muted"}`}
                >
                  {v === "all" ? "All" : v === "veg" ? "Veg" : "Non-veg"}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-full border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="popular">Popular</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-heading transition ${
                  cat === c
                    ? "bg-primary text-cream shadow-md"
                    : "bg-card border border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* items */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          {items.length === 0 ? (
            <div className="text-center py-24">
              <Filter className="mx-auto text-muted-foreground" />
              <p className="mt-3 text-muted-foreground">No dishes match your filters.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-3xl bg-card overflow-hidden border border-border hover:shadow-luxe hover:-translate-y-1 transition duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${item.veg ? "bg-green-600" : "bg-red-600"} text-white`}>
                        {item.veg ? "VEG" : "NON-VEG"}
                      </span>
                      {item.popular && (
                        <span className="text-[10px] px-2 py-1 rounded-full font-bold bg-accent text-primary">POPULAR</span>
                      )}
                      {item.isNew && (
                        <span className="text-[10px] px-2 py-1 rounded-full font-bold bg-primary text-cream">NEW</span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 rounded-full px-2 py-1 text-xs font-semibold">
                      <Star size={11} className="fill-accent text-accent" /> {item.rating}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg text-secondary">{item.name}</h3>
                      <span className="font-display text-lg font-bold text-primary shrink-0">₹{item.price}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={12} /> {item.prepTime} min
                      </span>
                      <button
                        onClick={() => { add({ id: item.id, name: item.name, price: item.price, image: item.image }); toast.push(`${item.name} added to cart`); }}
                        className="btn-gold btn-gold-hover rounded-full px-4 py-2 text-xs inline-flex items-center gap-1"
                      >
                        <Plus size={14} /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
