"use client";

import { useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { track } from "@/lib/analytics";
import { estimate } from "@/lib/estimate";
import { estimatorConfig, type BrandKey, type StructureKey } from "@/config/estimator";
import { site } from "@/config/site";
import { Button } from "./Button";
import { AnimatedNumber } from "./AnimatedNumber";

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
const inrOff = (n: number) => "- " + inr(n);
const kw = (n: number) => `${Number.isInteger(n) ? Math.round(n) : n.toFixed(1)} kW`;
const years = (n: number) => `${n.toFixed(1)} years`;
const tonnes = (n: number) => `${n.toFixed(1)} tonnes`;

const field =
  "w-full rounded-xl border border-field bg-background px-4 py-3 text-base text-foreground placeholder:text-muted transition-[border-color,box-shadow] duration-150 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/20";

export function EstimatorForm() {
  const [mode, setMode] = useState<"bill" | "units">("bill");
  const [value, setValue] = useState("");
  const [structure, setStructure] = useState<StructureKey>("rcc");
  const [brand, setBrand] = useState<BrandKey>("tata");
  const [area, setArea] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const toggleId = useId();
  const reduce = useReducedMotion();

  const amount = Number(value);
  const valid = value !== "" && Number.isFinite(amount) && amount >= (mode === "bill" ? 200 : 50) && amount <= (mode === "bill" ? 100000 : 10000);
  const error = submitted && !valid ? (mode === "bill" ? "Enter a monthly bill between ₹200 and ₹1,00,000." : "Enter monthly units between 50 and 10,000.") : null;

  const result = useMemo(() => {
    if (!submitted || !valid) return null;
    const base = { brand, structure, roofAreaSqFt: area ? Number(area) : undefined };
    return estimate(mode === "bill" ? { ...base, monthlyBill: amount } : { ...base, monthlyUnits: amount });
  }, [submitted, valid, mode, amount, brand, structure, area]);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          track("estimator_calculate", { mode, brand, structure });
        }}
        className="space-y-6 rounded-3xl border border-line bg-surface p-6 shadow-card md:p-8"
      >
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">I know my</legend>
          <div className="grid grid-cols-2 gap-1 rounded-full border border-line bg-background p-1">
            {(["bill", "units"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setValue(""); setSubmitted(false); }}
                aria-pressed={mode === m}
                className={`relative rounded-full py-2 text-sm font-semibold transition-colors duration-150 ${mode === m ? "text-white" : "text-muted hover:text-foreground"}`}
              >
                {mode === m && (
                  <motion.span
                    layoutId={`${toggleId}-pill`}
                    className="absolute inset-0 rounded-full bg-brand"
                    transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.35, bounce: 0.15 }}
                  />
                )}
                <span className="relative">{m === "bill" ? "Monthly bill" : "Monthly units"}</span>
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
          <p id="amount-help" className={`text-sm ${error ? "text-red-700" : "text-muted"}`}>
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

        <button
          type="submit"
          className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_1px_2px_rgb(14_47_56/0.2)] transition-[transform,filter] duration-200 ease-out-strong hover:brightness-105 active:scale-[0.97] sm:w-auto"
        >
          Calculate my savings
        </button>
      </form>

      <div aria-live="polite" className="lg:sticky lg:top-24">
        {result ? (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden rounded-3xl border border-line bg-surface shadow-lift"
          >
            <div className="relative isolate bg-deep p-6 text-deep-foreground md:p-8">
              <div aria-hidden className="solar-cells absolute inset-0 -z-10 opacity-50" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_95%_0%,rgb(248_173_38/0.25),transparent_55%)]" />
              <p className="text-sm text-deep-foreground/70">Recommended system</p>
              <p className="mt-1 text-6xl font-bold tracking-tighter text-sun">
                <AnimatedNumber value={result.kw} format={kw} />
              </p>
              {result.roofLimited && (
                <p className="mt-3 text-sm text-deep-foreground/70">Your roof area fits {result.kw} kW. Your usage could support {result.wantedKw} kW.</p>
              )}
            </div>
            <div className="p-6 md:p-8">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
                <Stat label="System cost" value={result.grossCost} format={inr} />
                <Stat label="Government subsidy" value={result.subsidy} format={inrOff} positive />
                <Stat label="Your cost after subsidy" value={result.netCost} format={inr} strong />
                <Stat label="Yearly savings" value={result.annualSavings} format={inr} positive />
                {result.paybackYears ? (
                  <Stat label="Payback" value={result.paybackYears} format={years} positive />
                ) : (
                  <StatText label="Payback" text="n/a" />
                )}
                <Stat label="CO₂ avoided per year" value={result.co2TonnesPerYear} format={tonnes} positive />
              </dl>
              <p className="mt-6 text-xs text-muted">
                Based on about {result.monthlyUnits} units a month. This is an estimate. Final design, price and subsidy are confirmed after a site survey.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/quote" arrow>{site.cta}</Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex min-h-72 items-center justify-center rounded-3xl border border-dashed border-line p-8 text-center text-muted">
            Your system size, subsidy, cost and payback will appear here.
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, format, positive, strong }: { label: string; value: number; format: (n: number) => string; positive?: boolean; strong?: boolean }) {
  return (
    <div>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className={`mt-1 font-semibold tracking-tight tabular-nums ${positive ? "text-positive-text" : ""} ${strong ? "text-2xl" : "text-xl"}`}>
        <AnimatedNumber value={value} format={format} />
      </dd>
    </div>
  );
}

function StatText({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 text-xl font-semibold tracking-tight">{text}</dd>
    </div>
  );
}
