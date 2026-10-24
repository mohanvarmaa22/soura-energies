import Link from "next/link";
import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/config/site";
import { CookieSettingsButton } from "@/components/Analytics";
import { Logo } from "@/components/Logo";

const link = "inline-block py-1.5 transition-colors duration-150 hover:text-deep-foreground";

export function Footer() {
  return (
    <footer className="bg-deep pb-20 text-deep-foreground md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-sm text-sm text-deep-foreground/70">
            {site.tagline}. Installation, subsidy and loan support under one roof.
          </p>
        </div>
        <div className="text-sm text-deep-foreground/70">
          <p className="font-semibold text-deep-foreground">Contact</p>
          <ul className="mt-3 space-y-1.5">
            <li>
              <a href={site.phoneHref} className={link}>{site.phone}</a>
            </li>
            <li>
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={link}>WhatsApp</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={link}>{site.email}</a>
            </li>
            <li>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${link} max-w-[32ch]`}>{site.address}</a>
            </li>
            <li className="py-1.5">{site.hours}</li>
          </ul>
          <div className="mt-4 flex gap-2">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-10 place-items-center rounded-full border border-white/15 transition-colors duration-150 hover:border-white/40 hover:text-deep-foreground">
              <InstagramLogo size={20} aria-hidden />
            </a>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-10 place-items-center rounded-full border border-white/15 transition-colors duration-150 hover:border-white/40 hover:text-deep-foreground">
              <FacebookLogo size={20} aria-hidden />
            </a>
          </div>
        </div>
        <div className="text-sm text-deep-foreground/70">
          <p className="font-semibold text-deep-foreground">Explore</p>
          <ul className="mt-3">
            <li><Link href="/#process" className={link}>Process</Link></li>
            <li><Link href="/projects" className={link}>Projects</Link></li>
            <li><Link href="/estimator" className={link}>Estimator</Link></li>
            <li><Link href="/faq" className={link}>FAQ</Link></li>
            <li><Link href="/privacy" className={link}>Privacy policy</Link></li>
            <li><CookieSettingsButton /></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 px-4 py-6 text-center text-xs text-deep-foreground/60">
        © {new Date().getFullYear()} {site.name}. Savings and subsidy figures are estimates.
        {" "}Developed by{" "}
        <a
          href="https://mohanvarmaa22.github.io/mohan-portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block py-1 font-medium text-deep-foreground underline underline-offset-2 transition-colors duration-150 hover:text-sun"
        >
          Mohan Varma
        </a>
      </p>
    </footer>
  );
}
