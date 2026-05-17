import { Link } from "@tanstack/react-router";
import { Star, ArrowUpRight, Sparkles } from "lucide-react";

export type ToolCardData = {
  slug: string;
  name: string;
  short_desc: string;
  pricing_model: string;
  starting_price: number | null;
  score_overall: number | null;
  badge: string | null;
  cta_text: string | null;
};

const badgeLabel: Record<string, string> = {
  editors_choice: "Editor's Choice",
  trending: "Trending",
  new: "New",
  deal: "Deal",
  top_rated: "Top Rated",
};

export function ToolCard({ t }: { t: ToolCardData }) {
  return (
    <Link
      to="/tools/$slug"
      params={{ slug: t.slug }}
      className="glass glass-hover group flex h-full flex-col rounded-2xl p-5"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-lg font-bold text-white">
          {t.name.charAt(0)}
        </div>
        {t.score_overall != null && (
          <div className="flex items-center gap-1 rounded-full border border-border bg-elevated/60 px-2.5 py-1 text-xs">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{Number(t.score_overall).toFixed(1)}</span>
          </div>
        )}
      </div>

      {t.badge && (
        <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          <Sparkles className="h-3 w-3" /> {badgeLabel[t.badge] ?? t.badge}
        </span>
      )}

      <h3 className="font-display text-lg font-semibold">{t.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{t.short_desc}</p>

      <div className="mt-auto flex items-center justify-between pt-4 text-xs">
        <span className="rounded-full border border-border px-2 py-0.5 capitalize text-muted-foreground">
          {t.pricing_model.replace("_", " ")}
          {t.starting_price != null && Number(t.starting_price) > 0 && (
            <> · from ${Number(t.starting_price).toFixed(0)}</>
          )}
        </span>
        <span className="flex items-center gap-1 font-medium text-primary opacity-0 transition group-hover:opacity-100">
          View <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
