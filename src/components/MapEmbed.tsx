"use client";

import { useState } from "react";
import { MapTrifold } from "@phosphor-icons/react";

/**
 * Google Maps loads only after a tap, so no Google cookies are set before the visitor asks for the map
 * (the privacy policy promises nothing third-party loads without consent).
 */
export function MapEmbed({ query, title }: { query: string; title: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface">
      {show ? (
        <iframe
          title={title}
          src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
          className="absolute inset-0 size-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button
          type="button"
          onClick={() => setShow(true)}
          className="absolute inset-0 grid place-items-center gap-2 text-sm font-semibold text-brand-strong transition-colors duration-150 hover:bg-line/30"
        >
          <span className="grid place-items-center gap-2">
            <MapTrifold size={32} weight="duotone" aria-hidden className="text-brand" />
            Show map
            <span className="text-xs font-normal text-muted">Loads Google Maps</span>
          </span>
        </button>
      )}
    </div>
  );
}
