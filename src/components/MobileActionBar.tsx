import { PhoneCall, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/config/site";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-background/95 p-3 backdrop-blur md:hidden">
      <a href={site.phoneHref} className="flex items-center justify-center gap-2 rounded-full border border-line bg-surface py-3 text-sm font-semibold">
        <PhoneCall size={18} weight="bold" /> Call
      </a>
      <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-semibold text-accent-ink">
        <WhatsappLogo size={18} weight="bold" /> WhatsApp
      </a>
    </div>
  );
}
