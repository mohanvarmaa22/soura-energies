"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MapPin } from "@phosphor-icons/react";
import { ImageSlot } from "@/components/ImageSlot";

export type GalleryProject = {
  id: string;
  title: string;
  type: "residential" | "commercial";
  capacityKw: number;
  city: string;
  year?: number;
  annualSavings?: number;
  summary?: string;
  imageSrc: string | null;
  imageAlt: string;
};

const types = [
  { value: "all", label: "All" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
] as const;

const sizes = [
  { value: "all", label: "Any size", test: () => true },
  { value: "small", label: "Up to 3 kW", test: (kw: number) => kw <= 3 },
  { value: "mid", label: "3 to 10 kW", test: (kw: number) => kw > 3 && kw <= 10 },
  { value: "large", label: "Over 10 kW", test: (kw: number) => kw > 10 },
] as const;

function Chips<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const id = useId();
  const reduce = useReducedMotion();
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1 rounded-full border border-line bg-surface p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
            value === o.value ? "text-white" : "text-muted hover:text-foreground"
          }`}
        >
          {value === o.value && (
            <motion.span
              layoutId={`${id}-chip`}
              className="absolute inset-0 rounded-full bg-brand"
              transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.35, bounce: 0.15 }}
            />
          )}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  );
}

export function ProjectGallery({ projects }: { projects: GalleryProject[] }) {
  const [type, setType] = useState<(typeof types)[number]["value"]>("all");
  const [size, setSize] = useState<(typeof sizes)[number]["value"]>("all");
  const reduce = useReducedMotion();

  const test = sizes.find((s) => s.value === size)!.test;
  const shown = projects.filter((p) => (type === "all" || p.type === type) && test(p.capacityKw));

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Chips label="Project type" options={types} value={type} onChange={setType} />
        <Chips label="System size" options={sizes} value={size} onChange={setSize} />
      </div>

      <p className="mt-6 text-sm text-muted" role="status">
        {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>

      {shown.length === 0 ? (
        <p className="mt-6 rounded-3xl border border-dashed border-line p-10 text-center text-muted">
          No projects match these filters. Try a different type or size.
        </p>
      ) : (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p) => (
            <motion.li
              key={p.id}
              layout={!reduce}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.97, transition: { duration: 0.15 } }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="group overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition-[box-shadow,transform] duration-300 ease-out-strong hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {p.imageSrc ? (
                  <Image src={p.imageSrc} alt={p.imageAlt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out-strong group-hover:scale-[1.04]" />
                ) : (
                  <ImageSlot label={p.title} className="absolute inset-0 transition-transform duration-700 ease-out-strong group-hover:scale-[1.04]" />
                )}
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {p.type === "residential" ? "Residential" : "Commercial"}
                  {p.year ? ` · ${p.year}` : ""}
                </p>
                <h2 className="mt-1 text-lg font-bold tracking-tight">{p.title}</h2>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                  <MapPin size={16} aria-hidden /> {p.city}
                </p>
                {p.summary && <p className="mt-3 text-sm text-muted">{p.summary}</p>}
                <dl className="mt-4 flex gap-6 border-t border-line pt-4 text-sm">
                  <div>
                    <dt className="text-muted">Capacity</dt>
                    <dd className="font-semibold">{p.capacityKw} kW</dd>
                  </div>
                  {p.annualSavings ? (
                    <div>
                      <dt className="text-muted">Saves per year</dt>
                      <dd className="font-semibold text-positive-text">₹{p.annualSavings.toLocaleString("en-IN")}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </motion.li>
          ))}
          </AnimatePresence>
        </ul>
      )}
    </>
  );
}
