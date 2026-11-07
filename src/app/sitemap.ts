import type { MetadataRoute } from "next";
import { CATEGORIES, RESOURCES } from "@/data/resources";

const BASE = "https://galaxy-setup-pro.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/search", "/pages/about-us", "/pages/contact-us", "/pages/privacy-policy", "/pages/disclaimer", "/pages/support-my-work"];

  return [
    ...staticPages.map((path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: path === "" ? 1 : 0.6,
    })),
    ...CATEGORIES.map((c) => ({
      url: `${BASE}/category/${c.id}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...RESOURCES.map((r) => ({
      url: `${BASE}/resource/${r.slug}`,
      lastModified: new Date(r.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
