import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { siteUrl } from "@/config/url";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: { type: "website", locale: "en_IN", siteName: site.name },
  twitter: { card: "summary_large_image" },
  title: { default: `${site.name} | Rooftop Solar in Telangana`, template: `%s | ${site.name}` },
  description: `Rooftop solar installation in Telangana with subsidy of up to ${site.subsidyMax} and loan support handled for you. Get a free quote.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
