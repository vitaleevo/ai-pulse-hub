import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArticleCard } from "@/components/site/ArticleCard";
import { ToolCard } from "@/components/site/ToolCard";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { ArrowRight, Zap, TrendingUp, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const articles = useQuery({
    queryKey: ["home-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("slug,title,excerpt,reading_time,published_at,type,featured,category:categories(name,slug)")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(7);
      if (error) throw error;
      return data ?? [];
    },
  });

  const tools = useQuery({
    queryKey: ["home-tools"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tools")
        .select("slug,name,short_desc,pricing_model,starting_price,score_overall,badge,cta_text")
        .eq("featured", true)
        .order("score_overall", { ascending: false })
        .limit(4);
      if (error) throw error;
      return data ?? [];
    },
  });

  const featured = articles.data?.find((a) => a.featured) ?? articles.data?.[0];
  const rest = (articles.data ?? []).filter((a) => a.slug !== featured?.slug).slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mesh-bg absolute inset-0 -z-10" />
        <div className="grid-bg absolute inset-0 -z-10 opacity-40" />
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> AI Pulse Weekly · Every Tuesday
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              The future of AI, <br />
              <span className="text-gradient">delivered daily.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              News, deep dives, and battle-tested tools for builders, founders, and operators
              working with AI and automation.
            </p>
            <div className="mx-auto mt-10 max-w-xl">
              <NewsletterForm source="hero" variant="hero" />
              <p className="mt-3 text-xs text-muted-foreground">
                Join 15,000+ tech leaders. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHead
          eyebrow={<><TrendingUp className="h-3 w-3" /> Latest</>}
          title="Today's top stories"
          link={{ to: "/blog", label: "All articles" }}
        />
        {articles.isLoading ? (
          <SkeletonGrid />
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured && (
              <div className="md:col-span-2 md:row-span-2">
                <ArticleCard a={featured} variant="featured" />
              </div>
            )}
            {rest.slice(0, 4).map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        )}
      </section>

      {/* TOOLS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHead
          eyebrow={<><Zap className="h-3 w-3" /> Tool Directory</>}
          title="Featured AI tools"
          link={{ to: "/tools", label: "Browse all tools" }}
        />
        {tools.isLoading ? (
          <SkeletonGrid cols={4} />
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(tools.data ?? []).map((t) => (
              <ToolCard key={t.slug} t={t} />
            ))}
          </div>
        )}
      </section>

      {/* NEWSLETTER CTA BAND */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="glass relative overflow-hidden rounded-3xl p-10 md:p-16">
          <div className="mesh-bg absolute inset-0 -z-10 opacity-60" />
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Stay ahead of the AI curve.
            </h2>
            <p className="mt-3 text-muted-foreground">
              The smartest 5 minutes of AI news, tools, and workflows in your inbox each week.
            </p>
            <div className="mx-auto mt-8 max-w-md">
              <NewsletterForm source="home-cta" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({
  eyebrow,
  title,
  link,
}: {
  eyebrow: React.ReactNode;
  title: string;
  link?: { to: string; label: string };
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-elevated/60 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {eyebrow}
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
      </div>
      {link && (
        <Link
          to={link.to}
          className="hidden items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground sm:inline-flex"
        >
          {link.label} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

function SkeletonGrid({ cols = 3 }: { cols?: number }) {
  return (
    <div className={`mt-10 grid gap-6 ${cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
      {Array.from({ length: cols * 2 }).map((_, i) => (
        <div key={i} className="glass h-56 animate-pulse rounded-2xl" />
      ))}
    </div>
  );
}
