import type { MetadataRoute } from "next"
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/cockpit", "/internal", "/api/", "/login"] }, sitemap: "https://sararin.ai/sitemap.xml" } }
