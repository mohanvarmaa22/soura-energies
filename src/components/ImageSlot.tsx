// Placeholder for real project photography. Drop files in /public/images and swap for next/image.
// The visible caption shows in development only, so production never displays "Photo: ..." text.
export function ImageSlot({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div role="img" aria-label={label} className={`relative isolate overflow-hidden bg-deep ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#1f5563_0%,#0e2f38_70%)]" />
      <div className="solar-cells absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgb(248_126_19/0.4),transparent_46%)]" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
      {process.env.NODE_ENV === "development" && (
        <p className="absolute bottom-3 left-3 text-xs text-deep-foreground/70">Photo: {label}</p>
      )}
    </div>
  );
}
