import { createFileRoute } from "@tanstack/react-router";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { Check } from "lucide-react";

export const Route = createFileRoute("/newsletter")({
  component: Newsletter,
  head: () => ({
    meta: [{ title: "Newsletter — AI Pulse" }, { name: "description", content: "Join AI Pulse Weekly: the smartest 5 minutes of AI news, tools and workflows." }],
  }),
});

const perks = [
  "AI Pulse Weekly — every Tuesday",
  "Curated tools and reviews",
  "Practical automation workflows",
  "Exclusive deals and early access",
];

function Newsletter() {
  return (
    <section className="relative mx-auto max-w-3xl px-6 py-24 text-center">
      <div className="mesh-bg absolute inset-0 -z-10 opacity-60" />
      <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        AI Pulse Weekly
      </span>
      <h1 className="mt-6 font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl">
        Stay ahead of <span className="text-gradient">AI</span>, in 5 minutes a week.
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
        Join 15,000+ builders, founders and operators reading the most useful AI newsletter
        on the internet.
      </p>

      <div className="mx-auto mt-10 max-w-md">
        <NewsletterForm source="newsletter-page" variant="hero" />
      </div>

      <ul className="mx-auto mt-12 grid max-w-md gap-3 text-left text-sm">
        {perks.map((p) => (
          <li key={p} className="flex items-center gap-2">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/20 text-primary">
              <Check className="h-3 w-3" />
            </span>
            {p}
          </li>
        ))}
      </ul>
    </section>
  );
}
