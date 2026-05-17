import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ToolCard } from "@/components/site/ToolCard";

export const Route = createFileRoute("/tools/")({
  component: ToolsIndex,
  head: () => ({
    meta: [{ title: "AI Tools Directory — AI Pulse" }, { name: "description", content: "Browse, compare and review the best AI tools, hand-picked by AI Pulse editors." }],
  }),
});

const PRICING = ["all", "free", "freemium", "paid", "open_source"] as const;

function ToolsIndex() {
  const [pricing, setPricing] = useState<string>("all");
  const [q, setQ] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["tools-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tools")
        .select("slug,name,short_desc,pricing_model,starting_price,score_overall,badge,cta_text")
        .order("featured", { ascending: false })
        .order("score_overall", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const filtered = (data ?? []).filter((t) => {
    if (pricing !== "all" && t.pricing_model !== pricing) return false;
    if (q && !t.name.toLowerCase().includes(q.toLowerCase()) && !t.short_desc.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <header className="max-w-2xl">
        <span className="text-xs font-medium uppercase tracking-wide text-primary">Directory</span>
        <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
          The best <span className="text-gradient">AI tools</span>, tested and ranked.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Editorial reviews, scores and pricing for the tools we actually use.
        </p>
      </header>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tools..."
          className="w-full max-w-xs rounded-xl border border-border bg-elevated/60 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <div className="flex flex-wrap gap-2">
          {PRICING.map((p) => (
            <button
              key={p}
              onClick={() => setPricing(p)}
              className={`rounded-full border px-3 py-1.5 text-xs capitalize transition ${
                pricing === p
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass h-52 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((t) => <ToolCard key={t.slug} t={t} />)}
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">No tools match your filters.</p>
      )}
    </section>
  );
}
