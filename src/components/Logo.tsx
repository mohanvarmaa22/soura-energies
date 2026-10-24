import Image from "next/image";

/** Sun mark from the logo plus an HTML wordmark, so the name stays sharp at header size. */
export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/brand/sun.png"
        alt=""
        width={292}
        height={256}
        priority
        className="h-9 w-auto transition-transform duration-300 ease-out-strong group-hover:rotate-12"
      />
      <span className="flex flex-col leading-none">
        <span className={`text-lg font-extrabold tracking-wide ${onDark ? "text-deep-foreground" : "text-brand"}`}>SOURA</span>
        <span className={`mt-0.5 text-[0.62rem] font-semibold tracking-[0.32em] ${onDark ? "text-positive" : "text-positive-text"}`}>
          ENERGIES
        </span>
      </span>
    </span>
  );
}
