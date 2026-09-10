/**
 * Canonical origin, used by the sitemap, robots.txt and page metadata.
 *
 * Set NEXT_PUBLIC_SITE_URL in the environment once the real domain is live —
 * any host that can run a Node process (or a static export) will do. Until
 * then the fallback below is what gets written into those files.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.example.com"; // TODO: real domain once hosting is chosen
