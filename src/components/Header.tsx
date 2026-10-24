"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, nav } from "@/config/site";
import { Button } from "./Button";
import { MobileNav } from "./MobileNav";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Watch a 1px sentinel at the top of the page instead of listening to scroll events.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute top-0 h-px w-px" />
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ease-out-strong ${
          scrolled ? "border-line bg-background/85 shadow-card" : "border-transparent bg-background/60"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" aria-label={`${site.name} home`} className="group">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {nav.map((n) => {
              const active = n.href === pathname;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative px-3 py-2 text-sm transition-colors duration-150 hover:text-foreground ${active ? "font-medium text-brand" : "text-muted"}`}
                >
                  {n.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 bottom-1 h-px origin-left bg-brand transition-transform duration-200 ease-out-strong ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Button href="/quote">{site.cta}</Button>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/quote"
              className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-transform duration-200 ease-out-strong active:scale-[0.97]"
            >
              Quote
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
