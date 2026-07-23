import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/Loader";
import { CartProvider } from "@/lib/cart";
import { ToastProvider } from "@/components/Toast";

function NotFoundComponent() {
  return (
    <div className="min-h-screen grid place-items-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-8xl text-primary">404</h1>
        <p className="mt-3 font-heading text-secondary">This dish isn't on our menu.</p>
        <Link to="/" className="mt-6 inline-flex btn-gold btn-gold-hover rounded-full px-6 py-3">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="min-h-screen grid place-items-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-3xl text-primary">Something burnt in the kitchen</h1>
        <p className="mt-2 text-muted-foreground">Please try again.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 btn-gold btn-gold-hover rounded-full px-6 py-3"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Civil Wala Kitchen — Authentic Indian Cuisine" },
      { name: "description", content: "Civil Wala Kitchen — a premium restaurant serving authentic South & North Indian cuisine. Order online, book a table, or explore our menu." },
      { name: "theme-color", content: "#7B1E23" },
      { property: "og:title", content: "Civil Wala Kitchen — Authentic Indian Cuisine" },
      { property: "og:description", content: "Serving happiness with every bite. Explore our menu, order online, and taste tradition." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Montserrat:wght@500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAuth = pathname === "/login";

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <ToastProvider>
          <Loader />
          {!isAuth && <Navbar />}
          <main className={isAuth ? "" : "pt-16"}>
            <Outlet />
          </main>
          {!isAuth && <Footer />}
        </ToastProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
