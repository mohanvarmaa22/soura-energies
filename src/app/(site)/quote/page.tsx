import type { Metadata } from "next";
import { Bank, ClipboardText, Timer } from "@phosphor-icons/react/dist/ssr";
import { QuoteForm } from "@/components/QuoteForm";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: "Request a free rooftop solar site survey and quote in Telangana. We also handle subsidy and loan paperwork.",
};

const assurances = [
  { icon: ClipboardText, text: "A free site survey of your roof" },
  { icon: Bank, text: "Subsidy and loan paperwork handled" },
  { icon: Timer, text: "Under two minutes to fill in" },
];

export default function QuotePage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 md:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div>
        <PageHeader
          title="Get a free quote."
          lead="Tell us a little about your place. We will call you to plan a site survey."
          maxTitle="max-w-[12ch]"
        />
        <ul style={{ "--i": 2 } as React.CSSProperties} className="rise mt-8 space-y-4">
          {assurances.map((a) => (
            <li key={a.text} className="flex items-center gap-3 text-sm">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface shadow-card">
                <a.icon size={20} weight="duotone" className="text-brand" aria-hidden />
              </span>
              {a.text}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-muted">Prefer to talk? Call {site.phone}.</p>
      </div>
      <div style={{ "--i": 2 } as React.CSSProperties} className="rise relative rounded-3xl border border-line bg-surface p-6 shadow-card md:p-8">
        <QuoteForm />
      </div>
    </section>
  );
}
