"use client";

import Image from "next/image";
import { useState } from "react";
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
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
            value === o.value ? "border-accent bg-accent text-accent-ink" : "border-line text-muted hover:text-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function ProjectGallery({ projects }: { projects: GalleryProject[] }) {
  const [type, setType] = useState<(typeof types)[number]["value"]>("all");
  const [size, setSize] = useState<(typeof sizes)[number]["value"]>("all");

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
        <p className="mt-6 rounded-2xl border border-dashed border-line p-10 text-center text-muted">
          No projects match these filters. Try a different type or size.
        </p>
      ) : (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.id} className="overflow-hidden rounded-3xl border border-line bg-surface">
              <div className="relative aspect-[4/3]">
                {p.imageSrc ? (
                  <Image src={p.imageSrc} alt={p.imageAlt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                ) : (
                  <ImageSlot label={p.title} className="absolute inset-0" />
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
                      <dd className="font-semibold">₹{p.annualSavings.toLocaleString("en-IN")}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
