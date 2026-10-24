import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Analytics } from "@/components/Analytics";
import { site } from "@/config/site";
import { siteUrl } from "@/config/url";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  description: site.tagline,
  url: siteUrl,
  logo: `${siteUrl}/brand/logo.jpeg`,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.postal.street,
    addressLocality: site.postal.locality,
    addressRegion: site.postal.region,
    postalCode: site.postal.postalCode,
    addressCountry: "IN",
  },
  hasMap: site.mapsUrl,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "10:00",
    closes: "18:30",
  },
  areaServed: [
    { "@type": "State", name: "Telangana" },
    { "@type": "State", name: "Andhra Pradesh" },
  ],
  sameAs: Object.values(site.social),
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
