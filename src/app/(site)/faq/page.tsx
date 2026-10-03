import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { faqGroups } from "@/config/faqs";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Solar FAQ",
  description: "Plain answers on rooftop solar in Telangana: subsidy, loans, net metering, installation, cost and maintenance.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((g) =>
      g.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    ),
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <h1 className="text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl">Solar, answered.</h1>
      <p className="mt-4 text-lg text-muted">Subsidy, loans, installation and upkeep, in plain language.</p>

      {faqGroups.map((g) => (
        <div key={g.title} className="mt-12">
          <h2 className="text-xl font-bold tracking-tight">{g.title}</h2>
          <div className="mt-2 divide-y divide-line">
            {g.items.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {f.q}
                  <span className="text-accent transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 max-w-[60ch] text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-14 rounded-3xl border border-line bg-surface p-8">
        <p className="text-lg font-semibold">Still have a question?</p>
        <p className="mt-1 text-muted">Ask us, or get a free quote for your roof.</p>
        <div className="mt-5"><Button href="/quote">{site.cta}</Button></div>
      </div>
    </section>
  );
}
