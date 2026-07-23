import { Link } from "@tanstack/react-router";
import { UtensilsCrossed } from "lucide-react";

export function Logo({ size = "md", light = false }: { size?: "sm" | "md" | "lg"; light?: boolean }) {
  const scale = size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl";
  const iconSize = size === "sm" ? 20 : size === "lg" ? 32 : 24;
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-accent/40 blur-md group-hover:blur-lg transition-all" />
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-accent to-amber-600 gold-ring">
          <UtensilsCrossed size={iconSize} className="text-primary" strokeWidth={2.2} />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-display font-bold ${scale} ${light ? "text-cream" : "text-primary"}`}>
          Civil Wala
        </span>
        <span className={`font-heading text-[10px] tracking-[0.3em] uppercase ${light ? "text-accent" : "text-brown"}`}>
          Kitchen
        </span>
      </div>
    </Link>
  );
}
