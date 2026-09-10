import Link from "next/link";
import { business, hours, nav } from "@/lib/data";
import { NewsletterForm } from "./newsletter";
import { MailIcon, MapPinIcon, PhoneIcon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-bark text-cream">
      {/* Newsletter band */}
      <div className="border-b border-cream/12">
        <div className="mx-auto grid max-w-[80rem] gap-10 px-5 py-(--spacing-section) sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:py-(--spacing-section)">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2.5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-marigold">
              <span aria-hidden className="h-px w-6 bg-marigold" />
              The Slow Letter
            </span>
            <h2 className="mt-5 text-[clamp(1.85rem,1.3rem+2vw,2.75rem)] text-cream">
              Seasonal care notes, once a month.
            </h2>
            <p className="mt-4 max-w-md text-cream/70">
              What the body tends to need this time of year, new enhancements on the
              menu, and the occasional open slot before it goes public. Your address
              never goes anywhere else.
            </p>
          </div>
          <NewsletterForm tone="dark" />
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto grid max-w-[80rem] gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl leading-tight text-cream">
            Mikailah&rsquo;s
            <span className="mt-1 block font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-avocado">
              House of Healing
            </span>
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/65">
            {business.tagline} Licensed therapeutic massage in {business.city},{" "}
            {business.state}.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-cream/55">
            Explore
          </h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {[{ href: "/book", label: "Book a session" }, ...nav, { href: "/privacy", label: "Privacy & your rights" }].map(
              (item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/75 underline-offset-4 transition-colors hover:text-cream hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-cream/55">
            Visit
          </h2>
          <ul className="mt-5 flex flex-col gap-4 text-sm text-cream/75">
            <li className="flex gap-3">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-cream/45" />
              {business.addressLine}
            </li>
            <li className="flex gap-3">
              <PhoneIcon className="mt-0.5 size-4 shrink-0 text-cream/45" />
              <a href={`tel:${business.phone.replace(/\D/g, "")}`} className="underline-offset-4 hover:underline">
                {business.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <MailIcon className="mt-0.5 size-4 shrink-0 text-cream/45" />
              <a href={`mailto:${business.email}`} className="break-all underline-offset-4 hover:underline">
                {business.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-cream/55">
            Hours
          </h2>
          <dl className="mt-5 flex flex-col gap-2.5 text-sm">
            {hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-4 text-cream/75">
                <dt>{h.day}</dt>
                <dd className="tabular-nums text-cream/60">{h.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-cream/12">
        <div className="mx-auto flex max-w-[80rem] flex-col gap-3 px-5 py-7 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            &copy; {new Date().getFullYear()} {business.name}. {business.licenseNumber}.
          </p>
          <p>
            Photography is temporary stock, used under the Pexels licence, pending
            Mikailah&rsquo;s own photos.
          </p>
        </div>
      </div>
    </footer>
  );
}
