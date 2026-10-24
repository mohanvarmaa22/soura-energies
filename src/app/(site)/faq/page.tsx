import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { FaqList } from "@/components/FaqList";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { faqGroups } from "@/config/faqs";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Solar FAQ",
  description: "Plain answers on rooftop solar in Telangana and Andhra Pradesh: subsidy, loans, net metering, installation, cost and maintenance.",
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
      <PageHeader title="Solar, answered." lead="Subsidy, loans, installation and upkeep, in plain language." />

      {faqGroups.map((g) => (
        <Reveal key={g.title} className="mt-12">
          <h2 className="mb-3 text-xl font-bold tracking-tight">{g.title}</h2>
          <FaqList items={g.items} />
        </Reveal>
      ))}

      <Reveal className="mt-14 rounded-3xl border border-line bg-surface p-8 shadow-card">
        <p className="text-lg font-semibold">Still have a question?</p>
        <p className="mt-1 text-muted">Ask us, or get a free quote for your roof.</p>
        <div className="mt-5"><Button href="/quote" arrow>{site.cta}</Button></div>
      </Reveal>
    </section>
  );
}
