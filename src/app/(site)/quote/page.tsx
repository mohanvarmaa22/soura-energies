import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: "Request a free rooftop solar site survey and quote in Telangana. We also handle subsidy and loan paperwork.",
};

export default function QuotePage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-20">
      <h1 className="text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl">Get a free quote.</h1>
      <p className="mt-4 max-w-[55ch] text-lg text-muted">Tell us a little about your place. We will call you to plan a site survey. It takes under two minutes.</p>
      <div className="relative mt-10">
        <QuoteForm />
      </div>
      <p className="mt-10 text-sm text-muted">Prefer to talk? Call {site.phone}.</p>
    </section>
  );
}
