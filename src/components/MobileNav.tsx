"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { nav } from "@/config/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close when the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="grid size-10 place-items-center rounded-full border border-line"
      >
        {open ? <X size={20} /> : <List size={20} />}
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="absolute inset-x-0 top-16 border-b border-line bg-background px-4 pb-6 shadow-lg shadow-black/5"
        >
          <ul className="divide-y divide-line">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="block py-4 text-base font-semibold">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
