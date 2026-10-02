import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/estimator", priority: 0.8 },
    { path: "/quote", priority: 0.9 },
    { path: "/privacy", priority: 0.2 },
  ];
  return pages.map(({ path, priority }) => ({ url: `${siteUrl}${path}`, priority }));
}
