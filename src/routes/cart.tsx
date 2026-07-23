import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Tag, Trash2, CheckCircle2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useToast } from "@/components/Toast";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Civil Wala Kitchen" },
      { name: "description", content: "Review your order, apply coupons, and check out securely." },
      { property: "og:title", content: "Your Cart — Civil Wala Kitchen" },
      { property: "og:description", content: "Review your order and check out." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, clear } = useCart();
  const toast = useToast();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [placed, setPlaced] = useState(false);

  const gst = Math.round(subtotal * 0.05);
  const delivery = subtotal > 0 && subtotal < 500 ? 40 : 0;
  const total = Math.max(0, subtotal + gst + delivery - discount);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "TASTE10") {
      setDiscount(Math.round(subtotal * 0.1));
      toast.push("Coupon applied: 10% off");
    } else {
      setDiscount(0);
      toast.push("Invalid coupon");
    }
  };

  if (placed) {
    return (
      <section className="min-h-[70vh] grid place-items-center px-6 py-20">
        <div className="text-center max-w-md">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-100 text-green-600 animate-glow">
            <CheckCircle2 size={44} />
          </div>
          <h1 className="mt-6 font-display text-4xl text-secondary">Order Placed!</h1>
          <p className="mt-2 text-muted-foreground">Your delicious meal is being prepared. We'll notify you shortly.</p>
          <Link to="/menu" className="mt-8 inline-flex btn-gold btn-gold-hover rounded-full px-6 py-3">
            Order More
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="min-h-[60vh] grid place-items-center px-6 py-20">
        <div className="text-center max-w-md">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-muted text-muted-foreground">
            <ShoppingBag size={40} />
          </div>
          <h1 className="mt-6 font-display text-3xl text-secondary">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added anything yet.</p>
          <Link to="/menu" className="mt-6 inline-flex btn-gold btn-gold-hover rounded-full px-6 py-3">
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="font-display text-4xl text-secondary">Your Cart</h1>
        <p className="text-muted-foreground text-sm mt-1">{items.length} item(s) · Review and checkout</p>

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((it) => (
              <div key={it.id} className="flex gap-4 rounded-2xl bg-card border border-border p-4 shadow-sm">
                <img src={it.image} alt={it.name} className="h-24 w-24 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading font-semibold text-secondary truncate">{it.name}</h3>
                      <div className="text-primary font-display font-bold">₹{it.price}</div>
                    </div>
                    <button onClick={() => remove(it.id)} className="text-muted-foreground hover:text-destructive shrink-0" aria-label="Remove">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="inline-flex items-center rounded-full border border-border bg-background">
                      <button onClick={() => setQty(it.id, it.qty - 1)} className="p-2 hover:text-primary" aria-label="Decrease"><Minus size={14} /></button>
                      <span className="w-8 text-center text-sm font-semibold">{it.qty}</span>
                      <button onClick={() => setQty(it.id, it.qty + 1)} className="p-2 hover:text-primary" aria-label="Increase"><Plus size={14} /></button>
                    </div>
                    <div className="font-display font-bold text-secondary">₹{it.price * it.qty}</div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={clear} className="text-xs text-muted-foreground hover:text-destructive">Clear cart</button>
          </div>

          <aside className="rounded-3xl bg-card border border-border p-6 h-fit shadow-luxe">
            <h3 className="font-display text-xl text-secondary">Order Summary</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">GST (5%)</span><span>₹{gst}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{delivery === 0 ? "Free" : `₹${delivery}`}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount}</span></div>
              )}
              <div className="pt-3 mt-3 border-t border-border flex justify-between font-display text-lg font-bold text-primary">
                <span>Total</span><span>₹{total}</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <div className="relative flex-1">
                <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon (try TASTE10)"
                  className="w-full rounded-full border border-border bg-background pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <button onClick={applyCoupon} className="rounded-full bg-secondary text-cream px-4 py-2 text-xs font-button font-semibold hover:bg-primary transition">
                Apply
              </button>
            </div>

            <button
              onClick={() => { setPlaced(true); clear(); toast.push("Order placed successfully!"); }}
              className="mt-6 w-full btn-gold btn-gold-hover rounded-full py-3.5 text-sm"
            >
              Checkout · ₹{total}
            </button>
            <p className="mt-3 text-[11px] text-center text-muted-foreground">Secure checkout · Cash / UPI / Cards</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
