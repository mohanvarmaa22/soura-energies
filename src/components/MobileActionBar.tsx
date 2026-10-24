import { PhoneCall, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/config/site";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-background/90 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <a
        href={site.phoneHref}
        className="flex items-center justify-center gap-2 rounded-full border border-brand/40 bg-surface py-3 text-sm font-semibold text-brand-strong transition-transform duration-150 ease-out-strong active:scale-[0.97]"
      >
        <PhoneCall size={18} weight="bold" /> Call
      </a>
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-semibold text-accent-ink transition-transform duration-150 ease-out-strong active:scale-[0.97]"
      >
        <WhatsappLogo size={18} weight="bold" /> WhatsApp
      </a>
    </div>
  );
}
