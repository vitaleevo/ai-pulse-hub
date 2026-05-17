import { useState } from "react";
import { ArrowRight, Loader2, Check } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().trim().email().max(255),
});

export function NewsletterForm({ source = "footer", variant = "inline" }: { source?: string; variant?: "inline" | "hero" }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      toast.error("Please enter a valid email.");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data.email, source, status: "pending" });
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast.success("You're already on the list!");
        setDone(true);
        return;
      }
      toast.error("Could not subscribe. Try again.");
      return;
    }
    setDone(true);
    toast.success("Welcome aboard — check your inbox.");
  }

  if (done) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm">
        <Check className="h-4 w-4 text-primary" />
        <span>Subscribed. Watch your inbox for AI Pulse Weekly.</span>
      </div>
    );
  }

  const big = variant === "hero";
  return (
    <form onSubmit={handleSubmit} className={`flex w-full gap-2 ${big ? "flex-col sm:flex-row" : "flex-col sm:flex-row"}`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className={`flex-1 rounded-xl border border-border bg-elevated/60 px-4 ${big ? "py-3.5 text-base" : "py-2.5 text-sm"} text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20`}
      />
      <button
        type="submit"
        disabled={loading}
        className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand ${big ? "px-6 py-3.5 text-base" : "px-5 py-2.5 text-sm"} font-medium text-white shadow-lg shadow-primary/20 transition hover:shadow-primary/40 disabled:opacity-60`}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
        {!loading && <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}
