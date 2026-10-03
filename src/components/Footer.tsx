import Link from "next/link";
import { site } from "@/config/site";
import { CookieSettingsButton } from "@/components/Analytics";

export function Footer() {
  return (
    <footer className="border-t border-line pb-24 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold tracking-tight">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm text-muted">{site.tagline}. Installation, subsidy and loan support under one roof.</p>
        </div>
        <div className="text-sm text-muted">
          <p className="font-semibold text-foreground">Contact</p>
          <p className="mt-2">{site.phone}</p>
          <p>{site.email}</p>
          <p>{site.address}</p>
        </div>
        <div className="text-sm text-muted">
          <p className="font-semibold text-foreground">Explore</p>
          <p className="mt-2"><Link href="/#process" className="hover:text-foreground">Process</Link></p>
          <p><Link href="/projects" className="hover:text-foreground">Projects</Link></p>
          <p><Link href="/faq" className="hover:text-foreground">FAQ</Link></p>
          <p><Link href="/privacy" className="hover:text-foreground">Privacy policy</Link></p>
          <p><CookieSettingsButton /></p>
        </div>
      </div>
      <p className="border-t border-line px-4 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. Savings and subsidy figures are estimates.
        {" "}Developed by{" "}
        <a
          href="https://mohanvarmaa22.github.io/mohan-portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          Mohan Varma
        </a>
      </p>
    </footer>
  );
}
