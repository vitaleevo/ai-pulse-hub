import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand">
                <Sparkles className="h-4 w-4 text-white" />
              </span>
              <span className="font-display font-bold">
                AI <span className="text-gradient">Pulse</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              The future of AI, delivered daily. News, tools, and workflows for builders.
            </p>
          </div>

          <FooterCol title="Explore" links={[
            { to: "/blog", label: "Blog" },
            { to: "/tools", label: "AI Tools" },
            { to: "/newsletter", label: "Newsletter" },
          ]} />
          <FooterCol title="Categories" links={[
            { to: "/blog", label: "AI News" },
            { to: "/blog", label: "Automation" },
            { to: "/blog", label: "Tutorials" },
          ]} />
          <FooterCol title="Company" links={[
            { to: "/", label: "About" },
            { to: "/", label: "Privacy" },
            { to: "/", label: "Terms" },
          ]} />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} AI Pulse. All rights reserved.</span>
          <span>Built with intention.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="transition hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
