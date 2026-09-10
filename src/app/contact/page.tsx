import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/ui";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { business, hours } from "@/lib/data";

export const metadata: Metadata = {
  title: "Visit & Contact",
  description: `Find Mikailah's House of Healing in ${business.city}, ${business.state}. Hours, directions, and a direct line to Mikailah.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visit"
        title="Come find the quiet room."
        intro="Free parking at the door, a short walk in, and a kettle on when you get here. If you're running late, text me. It's fine."
        image="/images/texture-linen.jpg"
      />

      <section className="mx-auto max-w-[80rem] px-5 py-(--spacing-section) sm:px-8 lg:py-(--spacing-section)">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
          <Reveal>
            <h2 className="text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)]">The details</h2>

            <dl className="mt-9 flex flex-col gap-8">
              <div className="flex gap-4">
                <MapPinIcon className="mt-1 size-5 shrink-0 text-rust" />
                <div>
                  <dt className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
                    Studio
                  </dt>
                  <dd className="mt-2 text-lg">{business.addressLine}</dd>
                  <dd className="mt-1 text-sm text-muted">
                    Full address is sent with your booking confirmation.
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <PhoneIcon className="mt-1 size-5 shrink-0 text-rust" />
                <div>
                  <dt className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
                    Phone & text
                  </dt>
                  <dd className="mt-2 text-lg">
                    <a
                      href={`tel:${business.phone.replace(/\D/g, "")}`}
                      className="underline decoration-stone underline-offset-[6px] transition-colors hover:decoration-cocoa"
                    >
                      {business.phone}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <MailIcon className="mt-1 size-5 shrink-0 text-rust" />
                <div>
                  <dt className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
                    Email
                  </dt>
                  <dd className="mt-2 break-all text-lg">
                    <a
                      href={`mailto:${business.email}`}
                      className="underline decoration-stone underline-offset-[6px] transition-colors hover:decoration-cocoa"
                    >
                      {business.email}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-12 rounded-lg border border-stone bg-sand p-8">
              <h3 className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
                Hours
              </h3>
              <dl className="mt-5 flex flex-col gap-3">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4 border-b border-stone/60 pb-3 last:border-b-0 last:pb-0">
                    <dt className="text-muted">{h.day}</dt>
                    <dd className="tabular-nums">{h.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Map placeholder — drop in an embedded map once the address is public. */}
            <div
              aria-hidden
              className="grain relative mt-8 flex aspect-16/9 items-center justify-center overflow-hidden rounded-lg border border-stone bg-[repeating-linear-gradient(45deg,var(--color-sand)_0px,var(--color-sand)_14px,var(--color-cream)_14px,var(--color-cream)_28px)]"
            >
              <p className="rounded-full bg-cream/90 px-5 py-2.5 text-sm text-muted backdrop-blur-sm">
                Map goes here once the address is public
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-lg border border-stone bg-cream p-8 shadow-soft sm:p-10">
              <h2 className="text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)]">
                Send a message
              </h2>
              <p className="mt-4 text-muted">
                Questions about pressure, pregnancy, an injury, what to book, or
                whether massage is the right call at all. I answer these myself.
              </p>
              <div className="mt-9">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
