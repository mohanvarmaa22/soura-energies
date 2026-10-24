import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { Faq } from "@/config/faqs";

/** Native details elements: keyboard and screen reader friendly, with a CSS-only open animation. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold transition-colors duration-150 hover:text-brand">
            {f.q}
            <Plus
              size={18}
              weight="bold"
              aria-hidden
              className="shrink-0 text-brand transition-transform duration-200 ease-out-strong group-open:rotate-45"
            />
          </summary>
          <p className="max-w-[60ch] pb-5 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
