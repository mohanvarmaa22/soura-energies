"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { CheckCircle } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";

const field =
  "w-full rounded-xl border border-field bg-background px-4 py-3 text-base text-foreground placeholder:text-muted transition-[border-color,box-shadow] duration-150 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/20";

type Errors = Record<string, string>;

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const [started, setStarted] = useState(false);
  function onFirstFocus() {
    if (started) return;
    setStarted(true);
    track("form_start");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      city: fd.get("city"),
      customerType: fd.get("customerType"),
      monthlyBill: fd.get("monthlyBill"),
      message: fd.get("message"),
      consent: fd.get("consent") === "on",
      website: fd.get("website"),
    };
    setStatus("sending");
    setErrors({});
    setFormError(null);
    try {
      const res = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        track("generate_lead", { customer_type: String(payload.customerType ?? "") });
        return setStatus("done");
      }
      setErrors(data.fieldErrors ?? {});
      setFormError(data.fieldErrors ? null : data.error ?? "Something went wrong. Please call us.");
    } catch {
      setFormError("Network problem. Please try again or call us.");
    }
    setStatus("idle");
  }

  if (status === "done") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="py-4"
      >
        <motion.span
          className="inline-block"
          initial={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.3, delay: 0.1 }}
        >
          <CheckCircle size={44} weight="duotone" className="text-positive-text" />
        </motion.span>
        <h2 className="mt-4 text-2xl font-bold tracking-tight">Thanks, we have your request.</h2>
        <p className="mt-2 max-w-[50ch] text-muted">Our team will call you soon to plan your site survey. In a hurry? Call {site.phone}.</p>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} onFocus={onFirstFocus} className="grid gap-5 sm:grid-cols-2">
      <Field label="Full name" name="name" error={errors.name} autoComplete="name" className="sm:col-span-1" />
      <Field label="Mobile number" name="phone" error={errors.phone} inputMode="tel" autoComplete="tel" help="10-digit Indian mobile number" />
      <Field label="City or area" name="city" error={errors.city} autoComplete="address-level2" placeholder="e.g. Kukatpally, Hyderabad" />
      <Field label="Email (optional)" name="email" error={errors.email} type="email" autoComplete="email" />

      <div className="flex flex-col gap-2">
        <label htmlFor="customerType" className="text-sm font-semibold">I need solar for</label>
        <select id="customerType" name="customerType" className={field} defaultValue="home">
          <option value="home">My home</option>
          <option value="business">My business</option>
        </select>
      </div>
      <Field label="Monthly electricity bill in ₹ (optional)" name="monthlyBill" inputMode="numeric" help="Helps us size your system" />

      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="message" className="text-sm font-semibold">Anything else we should know (optional)</label>
        <textarea id="message" name="message" rows={3} maxLength={500} className={field} />
      </div>

      {/* Honeypot: hidden from people, visible to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="consent" className="mt-0.5 size-5 shrink-0 accent-[var(--brand)]" aria-invalid={!!errors.consent} />
          <span>I agree to be contacted by Soura Energies about my solar enquiry by call or WhatsApp.</span>
        </label>
        {errors.consent && <p className="mt-2 text-sm text-red-700">{errors.consent}</p>}
      </div>

      {formError && <p role="alert" className="text-sm text-red-700 sm:col-span-2">{formError}</p>}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_1px_2px_rgb(14_47_56/0.2)] transition-[transform,filter,opacity] duration-200 ease-out-strong hover:brightness-105 active:scale-[0.97] disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Request my free quote"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label, name, error, help, className = "", ...rest
}: { label: string; name: string; error?: string; help?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <input id={name} name={name} className={field} aria-invalid={!!error} aria-describedby={`${name}-help`} {...rest} />
      <p id={`${name}-help`} className={`text-sm ${error ? "text-red-700" : "text-muted"}`}>{error ?? help ?? ""}</p>
    </div>
  );
}
