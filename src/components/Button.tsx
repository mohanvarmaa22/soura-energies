import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-[transform,background-color,box-shadow,filter] duration-200 ease-out-strong active:scale-[0.97]";

const variants = {
  primary:
    "bg-accent text-accent-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_1px_2px_rgb(14_47_56/0.2)] hover:brightness-105 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_6px_18px_-6px_rgb(248_126_19/0.6)]",
  secondary: "border border-brand/35 bg-surface text-brand-strong shadow-card hover:border-brand/70",
  onDark: "border border-white/25 text-deep-foreground hover:border-white/50 hover:bg-white/10",
} as const;

export function Button({
  href,
  variant = "primary",
  children,
  external,
  arrow,
}: {
  href: string;
  variant?: keyof typeof variants;
  children: React.ReactNode;
  external?: boolean;
  /** Adds an arrow that nudges forward on hover. */
  arrow?: boolean;
}) {
  const cls = `${base} ${variants[variant]}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowRight size={16} weight="bold" aria-hidden className="transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5" />}
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
