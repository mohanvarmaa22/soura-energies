"use client";

import { useMemo, useState } from "react";
import { track } from "@/lib/analytics";
import { estimate } from "@/lib/estimate";
import { estimatorConfig, type BrandKey, type StructureKey } from "@/config/estimator";
import { site } from "@/config/site";
import { Button } from "./Button";

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

const field =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted focus:border-accent";

export function EstimatorForm() {
  const [mode, setMode] = useState<"bill" | "units">("bill");
  const [value, setValue] = useState("");
  const [structure, setStructure] = useState<StructureKey>("rcc");
  const [brand, setBrand] = useState<BrandKey>("tata");
  const [area, setArea] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const amount = Number(value);
  const valid = value !== "" && Number.isFinite(amount) && amount >= (mode === "bill" ? 200 : 50) && amount <= (mode === "bill" ? 100000 : 10000);
  const error = submitted && !valid ? (mode === "bill" ? "Enter a monthly bill between ₹200 and ₹1,00,000." : "Enter monthly units between 50 and 10,000.") : null;

  const result = useMemo(() => {
    if (!submitted || !valid) return null;
    const base = { brand, structure, roofAreaSqFt: area ? Number(area) : undefined };
    return estimate(mode === "bill" ? { ...base, monthlyBill: amount } : { ...base, monthlyUnits: amount });
  }, [submitted, valid, mode, amount, brand, structure, area]);

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          track("estimator_calculate", { mode, brand, structure });
        }}
        className="space-y-6"
      >
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">I know my</legend>
          <div className="grid grid-cols-2 gap-2 rounded-full border border-line bg-surface p-1">
            {(["bill", "units"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setValue(""); setSubmitted(false); }}
                aria-pressed={mode === m}
                className={`rounded-full py-2 text-sm font-semibold transition-colors ${mode === m ? "bg-accent text-accent-ink" : "text-muted hover:text-foreground"}`}
              >
                {m === "bill" ? "Monthly bill" : "Monthly units"}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="text-sm font-semibold">
            {mode === "bill" ? "Average monthly electricity bill (₹)" : "Average monthly units (kWh)"}
          </label>
          <input
            id="amount"
            inputMode="numeric"
            className={field}
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/[^\d]/g, ""))}
            placeholder={mode === "bill" ? "e.g. 2500" : "e.g. 350"}
            aria-invalid={!!error}
            aria-describedby="amount-help"
          />
          <p id="amount-help" className={`text-sm ${error ? "text-red-600 dark:text-red-400" : "text-muted"}`}>
            {error ?? "Use an average of the last 6 to 12 months."}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="area" className="text-sm font-semibold">Shadow-free roof area (sq ft), optional</label>
          <input id="area" inputMode="numeric" className={field} value={area} onChange={(e) => setArea(e.target.value.replace(/[^\d]/g, ""))} placeholder="e.g. 600" aria-describedby="area-help" />
          <p id="area-help" className="text-sm text-muted">Limits the system size to what your roof can fit. Leave blank if unsure.</p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="structure" className="text-sm font-semibold">Roof and structure type</label>
          <select id="structure" className={field} value={structure} onChange={(e) => setStructure(e.target.value as StructureKey)}>
            {Object.entries(estimatorConfig.structures).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="brand" className="text-sm font-semibold">Panel brand</label>
          <select id="brand" className={field} value={brand} onChange={(e) => setBrand(e.target.value as BrandKey)}>
            {Object.entries(estimatorConfig.brands).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
          <p className="text-sm text-muted">Brand and structure change the price. Your final quote is confirmed after a site survey.</p>
        </div>

        <button type="submit" className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform active:scale-[0.98] sm:w-auto">
          Calculate my savings
        </button>
      </form>

      <div aria-live="polite">
        {result ? (
          <div className="rounded-3xl border border-line bg-surface p-6 md:p-8">
            <p className="text-sm text-muted">Recommended system</p>
            <p className="text-5xl font-bold tracking-tighter">{result.kw} kW</p>
            {result.roofLimited && (
              <p className="mt-2 text-sm text-muted">Your roof area fits {result.kw} kW. Your usage could support {result.wantedKw} kW.</p>
            )}
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
              <Stat label="System cost" value={inr(result.grossCost)} />
              <Stat label="Government subsidy" value={`- ${inr(result.subsidy)}`} accent />
              <Stat label="Your cost after subsidy" value={inr(result.netCost)} strong />
              <Stat label="Yearly savings" value={inr(result.annualSavings)} />
              <Stat label="Payback" value={result.paybackYears ? `${result.paybackYears.toFixed(1)} years` : "n/a"} />
              <Stat label="CO₂ avoided per year" value={`${result.co2TonnesPerYear.toFixed(1)} tonnes`} />
            </dl>
            <p className="mt-6 text-xs text-muted">
              Based on about {result.monthlyUnits} units a month. This is an estimate. Final design, price and subsidy are confirmed after a site survey.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/quote">{site.cta}</Button>
            </div>
          </div>
        ) : (
          <div className="flex min-h-64 items-center rounded-3xl border border-dashed border-line p-8 text-muted">
            Your system size, subsidy, cost and payback will appear here.
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, accent, strong }: { label: string; value: string; accent?: boolean; strong?: boolean }) {
  return (
    <div>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className={`mt-1 text-xl font-semibold tracking-tight ${accent ? "text-green-700 dark:text-green-400" : ""} ${strong ? "text-2xl" : ""}`}>{value}</dd>
    </div>
  );
}
