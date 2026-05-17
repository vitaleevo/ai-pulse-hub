import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Star, Check, X, ExternalLink, Sparkles } from "lucide-react";

export const Route = createFileRoute("/tools/$slug")({
  component: ToolPage,
});

async function trackClick(toolId: string, position: string) {
  await supabase.from("affiliate_clicks").insert({ tool_id: toolId, position });
}

function ToolPage() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["tool", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tools")
        .select("*, category:categories(name,slug)")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="mx-auto max-w-4xl px-6 py-20"><div className="glass h-96 animate-pulse rounded-2xl" /></div>;
  }
  if (!data) {
    return <div className="mx-auto max-w-4xl px-6 py-20 text-center text-muted-foreground">Tool not found.</div>;
  }

  const link = data.affiliate_url || data.website;

  return (
    <article className="relative">
      <div className="mesh-bg absolute inset-x-0 top-0 -z-10 h-[420px] opacity-50" />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link to="/tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> All tools
        </Link>

        <header className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-5">
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-brand text-3xl font-bold text-white glow-purple">
              {data.name.charAt(0)}
            </div>
            <div>
              {data.badge && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                  <Sparkles className="h-3 w-3" /> {data.badge.replace("_", " ")}
                </span>
              )}
              <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">{data.name}</h1>
              <p className="mt-2 max-w-xl text-muted-foreground">{data.short_desc}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                {data.score_overall != null && (
                  <span className="flex items-center gap-1 rounded-full border border-border bg-elevated/60 px-2.5 py-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <strong>{Number(data.score_overall).toFixed(1)}</strong> / 10
                  </span>
                )}
                <span className="rounded-full border border-border px-2.5 py-1 capitalize text-muted-foreground">
                  {data.pricing_model.replace("_", " ")}
                  {data.starting_price != null && Number(data.starting_price) > 0 && (
                    <> · from ${Number(data.starting_price).toFixed(0)}/mo</>
                  )}
                </span>
                {data.category && (
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-primary">
                    {(data.category as any).name}
                  </span>
                )}
              </div>
            </div>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick(data.id, "tool_header")}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-lg shadow-primary/30 transition hover:shadow-primary/50"
          >
            {data.cta_text ?? "Visit site"} <ExternalLink className="h-4 w-4" />
          </a>
        </header>

        {data.long_desc && (
          <p className="mt-12 text-lg leading-relaxed text-foreground/90">{data.long_desc}</p>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {data.pros?.length > 0 && (
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold">Pros</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {data.pros.map((p: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.cons?.length > 0 && (
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold">Cons</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {data.cons.map((c: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:flex-row">
          <div>
            <p className="font-display text-lg font-semibold">Ready to try {data.name}?</p>
            <p className="text-sm text-muted-foreground">Get started with the official site.</p>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick(data.id, "tool_footer")}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-medium text-white shadow-lg shadow-primary/30 transition hover:shadow-primary/50"
          >
            {data.cta_text ?? "Visit site"} <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
