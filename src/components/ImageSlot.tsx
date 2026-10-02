// Placeholder for real project photography. Drop files in /public/images and swap for next/image.
export function ImageSlot({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden bg-gradient-to-br from-deep to-[#1d3340] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(240,163,10,0.35),transparent_45%)]" />
      <p className="absolute bottom-3 left-3 text-xs text-deep-foreground/70">Photo: {label}</p>
    </div>
  );
}
