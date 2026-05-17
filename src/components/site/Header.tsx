import { Link } from "@tanstack/react-router";
import { Sparkles, Search } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/tools", label: "AI Tools" },
  { to: "/newsletter", label: "Newsletter" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand glow-purple">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            AI <span className="text-gradient">Pulse</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              activeProps={{ className: "text-foreground bg-white/5" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link
            to="/newsletter"
            className="hidden rounded-lg bg-gradient-brand px-4 py-2 text-sm font-medium text-white shadow-lg shadow-primary/20 transition hover:shadow-primary/40 sm:block"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  );
}
