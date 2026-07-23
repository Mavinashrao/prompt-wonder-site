import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-secondary text-cream/90 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="text-sm text-cream/70 leading-relaxed">
            Serving happiness with every bite. Authentic recipes, fresh ingredients, unforgettable moments.
          </p>
          <div className="flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 hover:bg-accent hover:text-primary transition"
                aria-label="social"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-accent mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/menu", label: "Menu" },
              { to: "/cart", label: "Cart" },
              { to: "/feedback", label: "Feedback" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-cream/70 hover:text-accent transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-accent mb-4">Opening Hours</h4>
          <ul className="space-y-1.5 text-sm text-cream/70">
            <li>Mon – Fri · 11:00 – 23:00</li>
            <li>Saturday · 10:00 – 00:00</li>
            <li>Sunday · 10:00 – 23:00</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-accent mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li className="flex items-start gap-2"><MapPin size={14} className="mt-1 text-accent" /> Chittoor, India</li>
            <li className="flex items-center gap-2"><Phone size={14} className="text-accent" /> +91 90141 55107</li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-accent" /> hello@civilwalakitchen.in</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream/60">
          <p>© {new Date().getFullYear()} Civil Wala Kitchen. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent">Privacy</a>
            <a href="#" className="hover:text-accent">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
