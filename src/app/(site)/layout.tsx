import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Analytics } from "@/components/Analytics";
import { site } from "@/config/site";
import { siteUrl } from "@/config/url";

const hasRealPhone = !site.phone.includes("00000");
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  description: site.tagline,
  url: siteUrl,
  ...(hasRealPhone && { telephone: site.phone }),
  email: site.email,
  address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
  areaServed: { "@type": "State", name: "Telangana" },
  priceRange: "$$",
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileActionBar />
      <Analytics />
    </div>
  );
}
