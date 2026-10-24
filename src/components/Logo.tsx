import Image from "next/image";

/** The full Soura Energies logo, used exactly as designed. On dark surfaces it sits on a white tile so the teal wordmark stays legible. */
export function Logo({ onDark = false, className = "h-12" }: { onDark?: boolean; className?: string }) {
  const img = (
    <Image src="/brand/logo.png" alt="Soura Energies" width={390} height={240} priority={!onDark} className={`w-auto ${className}`} />
  );
  return onDark ? <span className="inline-block rounded-2xl bg-white px-3 py-2">{img}</span> : img;
}
