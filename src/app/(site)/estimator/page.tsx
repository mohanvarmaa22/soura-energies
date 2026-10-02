import type { Metadata } from "next";
import { EstimatorForm } from "@/components/EstimatorForm";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Solar Savings Estimator",
  description: `Estimate your rooftop solar system size, cost after the subsidy of up to ${site.subsidyMax}, yearly savings and payback in Telangana.`,
};

export default function EstimatorPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20">
      <h1 className="max-w-[18ch] text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl">See what solar would save you.</h1>
      <p className="mt-4 max-w-[55ch] text-lg text-muted">Enter your bill. Get a system size, cost after subsidy and payback time.</p>
      <div className="mt-10">
        <EstimatorForm />
      </div>
    </section>
  );
}
