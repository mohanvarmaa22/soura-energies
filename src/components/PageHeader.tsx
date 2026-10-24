/** Title block shared by the inner pages. Enters with the same staggered rise as the home hero. */
export function PageHeader({ title, lead, maxTitle = "max-w-[20ch]" }: { title: string; lead: string; maxTitle?: string }) {
  return (
    <div>
      <h1 className={`rise text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl ${maxTitle}`}>{title}</h1>
      <p style={{ "--i": 1 } as React.CSSProperties} className="rise mt-4 max-w-[55ch] text-lg text-muted">
        {lead}
      </p>
    </div>
  );
}
