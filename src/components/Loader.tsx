import { useEffect, useState } from "react";
import { UtensilsCrossed } from "lucide-react";

export function Loader() {
  const [gone, setGone] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 1800);
    const t2 = setTimeout(() => setGone(true), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-secondary transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* steam */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 0.5, 1].map((d) => (
            <span
              key={d}
              className="block h-8 w-1.5 rounded-full bg-cream/40 animate-steam"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-accent/40 blur-2xl animate-glow" />
          <div className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-accent to-amber-600">
            <UtensilsCrossed size={44} className="text-primary" strokeWidth={2.2} />
          </div>
        </div>

        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-cream">Civil Wala Kitchen</h1>
          <p className="mt-1 font-heading text-[11px] tracking-[0.4em] uppercase shimmer-text">
            A Taste of Tradition
          </p>
        </div>
      </div>
    </div>
  );
}
