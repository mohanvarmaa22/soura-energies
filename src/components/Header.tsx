import Link from "next/link";
import { site, nav } from "@/config/site";
import { Button } from "./Button";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Soura<span className="text-accent-text"> Energies</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-muted transition-colors hover:text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="/quote">{site.cta}</Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/quote" className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink">
            Quote
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
