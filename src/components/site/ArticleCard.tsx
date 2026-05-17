import { Link } from "@tanstack/react-router";
import { Clock, ArrowUpRight } from "lucide-react";

export type ArticleCardData = {
  slug: string;
  title: string;
  excerpt: string | null;
  reading_time: number | null;
  published_at: string | null;
  type: string;
  featured?: boolean;
  category?: { name: string; slug: string } | null;
};

function timeAgo(iso: string | null) {
  if (!iso) return "";
  const d = (Date.now() - new Date(iso).getTime()) / 1000;
  if (d < 3600) return `${Math.round(d / 60)}m ago`;
  if (d < 86400) return `${Math.round(d / 3600)}h ago`;
  if (d < 86400 * 14) return `${Math.round(d / 86400)}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function ArticleCard({ a, variant = "default" }: { a: ArticleCardData; variant?: "default" | "featured" }) {
  const featured = variant === "featured";
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: a.slug }}
      className={`glass glass-hover group flex flex-col overflow-hidden rounded-2xl p-6 ${featured ? "md:p-8" : ""}`}
    >
      <div className="flex items-center gap-2 text-xs">
        {a.category && (
          <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
            {a.category.name}
          </span>
        )}
        <span className="text-muted-foreground capitalize">{a.type.replace("_", " ")}</span>
      </div>

      <h3 className={`mt-4 font-display font-semibold leading-tight ${featured ? "text-3xl md:text-4xl" : "text-xl"}`}>
        {a.title}
      </h3>

      {a.excerpt && (
        <p className={`mt-3 text-muted-foreground ${featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"}`}>
          {a.excerpt}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between pt-5 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span>{timeAgo(a.published_at)}</span>
          {a.reading_time && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {a.reading_time} min
            </span>
          )}
        </div>
        <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
    </Link>
  );
}
