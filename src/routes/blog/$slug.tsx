import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Clock, ArrowLeft } from "lucide-react";
import { NewsletterForm } from "@/components/site/NewsletterForm";

export const Route = createFileRoute("/blog/$slug")({
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*, category:categories(name,slug)")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data;
    },
  });

  if (isLoading) {
    return <div className="mx-auto max-w-3xl animate-pulse px-6 py-20"><div className="glass h-96 rounded-2xl" /></div>;
  }
  if (error || !data) {
    return <div className="mx-auto max-w-3xl px-6 py-20 text-center text-muted-foreground">Article not found.</div>;
  }

  return (
    <article className="relative">
      <div className="mesh-bg absolute inset-x-0 top-0 -z-10 h-[400px] opacity-50" />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to blog
        </Link>

        <header className="mt-6">
          {data.category && (
            <Link
              to="/blog"
              className="inline-block rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {(data.category as any).name}
            </Link>
          )}
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            {data.title}
          </h1>
          {data.excerpt && (
            <p className="mt-4 text-lg text-muted-foreground">{data.excerpt}</p>
          )}
          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            {data.published_at && (
              <time>{new Date(data.published_at).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}</time>
            )}
            {data.reading_time && (
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {data.reading_time} min read</span>
            )}
          </div>
        </header>

        <div className="prose-content mt-12 space-y-5 text-[17px] leading-relaxed text-foreground/90">
          {renderMarkdown(data.content)}
        </div>

        <div className="my-16 rounded-2xl border border-primary/30 bg-primary/5 p-6">
          <h3 className="font-display text-xl font-semibold">Get more like this</h3>
          <p className="mt-1 text-sm text-muted-foreground">Weekly AI insights in your inbox. No fluff.</p>
          <div className="mt-4"><NewsletterForm source="article" /></div>
        </div>
      </div>
    </article>
  );
}

// Minimal markdown rendering: headings, paragraphs, lists, bold.
function renderMarkdown(src: string) {
  const blocks = src.split(/\n\n+/);
  return blocks.map((block, i) => {
    if (block.startsWith("# ")) return <h1 key={i} className="font-display text-3xl font-bold mt-12">{inline(block.slice(2))}</h1>;
    if (block.startsWith("## ")) return <h2 key={i} className="font-display text-2xl font-semibold mt-10">{inline(block.slice(3))}</h2>;
    if (block.startsWith("### ")) return <h3 key={i} className="font-display text-xl font-semibold mt-8">{inline(block.slice(4))}</h3>;
    if (/^(\d+)\.\s/.test(block)) {
      const items = block.split("\n").filter(Boolean).map((l) => l.replace(/^\d+\.\s/, ""));
      return <ol key={i} className="ml-6 list-decimal space-y-2">{items.map((it, j) => <li key={j}>{inline(it)}</li>)}</ol>;
    }
    if (block.startsWith("- ")) {
      const items = block.split("\n").map((l) => l.replace(/^-\s/, ""));
      return <ul key={i} className="ml-6 list-disc space-y-2">{items.map((it, j) => <li key={j}>{inline(it)}</li>)}</ul>;
    }
    return <p key={i}>{inline(block)}</p>;
  });
}

function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") ? <strong key={i} className="font-semibold text-foreground">{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>
  );
}
