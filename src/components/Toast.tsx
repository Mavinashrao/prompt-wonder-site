import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { CheckCircle2, X } from "lucide-react";

type Toast = { id: number; msg: string };
const Ctx = createContext<{ push: (m: string) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const push = useCallback((msg: string) => {
    const id = Date.now() + Math.random();
    setItems((p) => [...p, { id, msg }]);
    setTimeout(() => setItems((p) => p.filter((t) => t.id !== id)), 2800);
  }, []);
  return (
    <Ctx.Provider value={{ push }}>
      {children}
      <div className="fixed top-20 right-4 z-[90] flex flex-col gap-2 pointer-events-none">
        {items.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-2 rounded-xl bg-secondary text-cream px-4 py-3 shadow-lg animate-slide-down min-w-[220px]"
          >
            <CheckCircle2 size={18} className="text-accent" />
            <span className="text-sm">{t.msg}</span>
            <button
              className="ml-auto opacity-60 hover:opacity-100"
              onClick={() => setItems((p) => p.filter((x) => x.id !== t.id))}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const c = useContext(Ctx);
  if (!c) return { push: (_: string) => {} };
  return c;
}
