import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://roott.md";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/ro/order", "/ru/order"] },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
