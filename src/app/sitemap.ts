import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const routes = ["", "/services", "/enhancements", "/about", "/book", "/shop", "/faq", "/privacy", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/book" ? 0.9 : 0.7,
  }));
}
