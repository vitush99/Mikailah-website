import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Button, Eyebrow, Reveal } from "@/components/ui";
import { ArrowIcon, CheckIcon, ClockIcon, HandIcon } from "@/components/icons";
import { priceFor, pricing, pricingNote, sessions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sessions & Pricing",
  description:
    "Three signature massage sessions at 60, 90 or 120 minutes. $85, $120 or $155, the same price whichever session you book.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="The menu"
        title="Three sessions, and what happens in each."
        intro="Three sessions instead of thirty. Each one below is real therapeutic bodywork, and the price depends only on how long you book for."
        image="/images/texture-eucalyptus.jpg"
      />

      {/* Sessions */}
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        {sessions.map((session, i) => (
          <section
            key={session.slug}
            id={session.slug}
            className="scroll-mt-12 border-b border-stone py-(--spacing-section) last:border-b-0 lg:py-(--spacing-section)"
          >
            <div
              className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-10 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <div className="relative aspect-4/3 overflow-hidden rounded-lg shadow-lift">
                  <Image
                    src={session.image}
                    alt={session.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 48vw, 92vw"
                    className="grade object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={100}>
                <p className="font-sans text-[0.8125rem] uppercase tracking-[0.2em] text-cocoa">
                  0{i + 1} &middot; {session.subtitle}
                </p>
                <h2 className="mt-4 text-[clamp(2rem,1.4rem+2.2vw,3rem)]">
                  {session.name}
                </h2>
                <p className="mt-6 max-w-[56ch] text-lg text-muted">
                  {session.description}
                </p>

                <dl className="mt-9 grid gap-6 sm:grid-cols-2">
                  <div>
                    <dt className="flex items-center gap-2 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
                      <ClockIcon className="size-4 text-rust" />
                      Lengths
                    </dt>
                    <dd className="mt-3 flex flex-wrap gap-2">
                      {session.durations.map((d) => (
                        <span
                          key={d}
                          className="rounded-full border border-stone px-3.5 py-1.5 text-sm tabular-nums"
                        >
                          {d} min &middot; ${priceFor(d)}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
                      <HandIcon className="size-4 text-rust" />
                      Pressure
                    </dt>
                    <dd className="mt-3 text-muted">{session.pressure}</dd>
                  </div>
                </dl>

                <div className="mt-8">
                  <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
                    Especially good for
                  </p>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {session.bestFor.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-muted">
                        <CheckIcon className="mt-1 size-4 shrink-0 text-olive" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <Button href={`/book?session=${session.slug}`}>
                    Book {session.name}
                    <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                  <span className="text-sm text-muted">From $85 &middot; 60 minutes</span>
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      {/* Sliding scale detail */}
      <section className="bg-sand py-(--spacing-section)">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Reveal>
            <Eyebrow>Pricing, plainly</Eyebrow>
            <h2 className="mt-6 max-w-[20ch] text-[clamp(2rem,1.35rem+2.6vw,3.4rem)]">
              Three lengths, one price each.
            </h2>
            <p className="mt-6 max-w-[58ch] text-lg text-muted">{pricingNote}</p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {pricing.map((tier, i) => (
                <li
                  key={tier.minutes}
                  className={`flex flex-col rounded-lg border p-8 ${
                    i === 1 ? "border-rust/35 bg-cream shadow-soft" : "border-stone bg-cream"
                  }`}
                >
                  <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa tabular-nums">
                    {tier.minutes} minutes
                  </p>
                  <p className="mt-4 font-display text-[3rem] leading-none text-rust tabular-nums">
                    ${tier.price}
                  </p>
                  <p className="mt-5 flex-1 text-muted">{tier.blurb}</p>
                  <div className="mt-7 border-t border-stone pt-5">
                    <Button href={`/book?minutes=${tier.minutes}`} variant="outline">
                      Book {tier.minutes} minutes
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-12 flex flex-wrap items-center gap-6 rounded-lg border border-stone bg-cream p-8">
              <p className="max-w-[52ch] text-muted">
                Enhancements are added on top and priced individually. Most fall
                between $10 and $30, and the heated table is always included.
              </p>
              <Button href="/enhancements" variant="outline">
                See enhancements
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
