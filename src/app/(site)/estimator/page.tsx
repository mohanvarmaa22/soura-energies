import type { Metadata } from "next";
import { EstimatorForm } from "@/components/EstimatorForm";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Solar Savings Estimator",
  description: `Estimate your rooftop solar system size, cost after the subsidy of up to ${site.subsidyMax}, yearly savings and payback in Telangana.`,
};

export default function EstimatorPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20">
      <PageHeader
        title="See what solar would save you."
        lead="Enter your bill. Get a system size, cost after subsidy and payback time."
        maxTitle="max-w-[18ch]"
      />
      <div className="mt-12">
        <EstimatorForm />
      </div>
    </section>
  );
}
