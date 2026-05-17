import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArticleCard } from "@/components/site/ArticleCard";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [{ title: "Blog — AI Pulse" }, { name: "description", content: "AI news, deep dives, tutorials, and tool reviews." }],
  }),
});

function BlogIndex() {
  const { data, isLoading } = useQuery({
    queryKey: ["blog-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("slug,title,excerpt,reading_time,published_at,type,featured,category:categories(name,slug)")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <header className="max-w-2xl">
        <span className="text-xs font-medium uppercase tracking-wide text-primary">Blog</span>
        <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
          Sharp takes on <span className="text-gradient">AI & automation</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          News, comparisons, tutorials, and reviews — written by builders, for builders.
        </p>
      </header>

      {isLoading ? (
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass h-56 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(data ?? []).map((a) => (
            <ArticleCard key={a.slug} a={a} />
          ))}
        </div>
      )}
    </section>
  );
}
