import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/studio"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
