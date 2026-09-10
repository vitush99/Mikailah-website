import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { business, hours } from "@/lib/data";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} · Therapeutic Massage in ${business.city}, ${business.state}`,
    template: `%s · ${business.name}`,
  },
  description:
    "Licensed therapeutic massage in Burnsville, Minnesota with Mikailah. Three unhurried signature sessions at 60, 90 or 120 minutes, plus enhancements blended in-house.",
  openGraph: {
    title: business.name,
    description: business.tagline,
    type: "website",
    locale: "en_US",
    siteName: business.name,
  },
  alternates: { canonical: "/" },
};

/**
 * LocalBusiness schema so Google and Apple Maps can pick the practice up.
 * TODO: fill in the real street address, phone, geo coordinates and licence
 * number in src/lib/data.ts — the placeholders below flow straight from there.
 */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: business.name,
  description: business.tagline,
  url: siteUrl,
  telephone: business.phone,
  email: business.email,
  priceRange: "$85 - $155",
  address: {
    "@type": "PostalAddress",
    addressLocality: business.city,
    addressRegion: business.state,
    addressCountry: "US",
  },
  openingHoursSpecification: hours
    .filter((h) => h.value.includes("–"))
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      description: h.value,
    })),
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      serviceType: "Therapeutic massage",
    },
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: 85,
      maxPrice: 155,
      priceCurrency: "USD",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // the inline script below stamps data-js on <html> before React hydrates
      suppressHydrationWarning
      className={`${fraunces.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Enables the scroll-reveal styles only when scripting is available. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.setAttribute('data-js', '')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
