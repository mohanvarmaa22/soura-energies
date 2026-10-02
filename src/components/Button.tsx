import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-[transform,background-color] duration-200 active:scale-[0.98]";

const variants = {
  primary: "bg-accent text-accent-ink hover:brightness-95",
  secondary: "border border-line bg-surface text-foreground hover:bg-line/40",
  onDark: "border border-white/25 text-deep-foreground hover:bg-white/10",
} as const;

export function Button({
  href,
  variant = "primary",
  children,
  external,
}: {
  href: string;
  variant?: keyof typeof variants;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls = `${base} ${variants[variant]}`;
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
