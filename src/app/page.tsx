import Image from "next/image";
import Link from "next/link";
import { Button, Eyebrow, Reveal, SectionHeading } from "@/components/ui";
import { Reviews } from "@/components/reviews";
import {
  ArrowIcon,
  ClockIcon,
  HandIcon,
  LeafIcon,
  LockIcon,
  ShieldIcon,
} from "@/components/icons";
import {
  enhancementCategories,
  intro,
  pricing,
  pricingNote,
  sessions,
  shopItems,
} from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[86svh] items-end overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="grade -z-20 object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(30,22,17,0.88)_0%,rgba(30,22,17,0.55)_38%,rgba(30,22,17,0.28)_70%,rgba(30,22,17,0.45)_100%)]"
        />

        <div className="mx-auto w-full max-w-[80rem] px-5 pb-14 pt-28 sm:px-8 sm:pb-16 lg:pb-20">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-cream/80">
                <span aria-hidden className="h-px w-6 bg-rust" />
                Burnsville, Minnesota
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-5 text-[clamp(2.6rem,1.5rem+4.4vw,5.25rem)] text-cream">
                Come back to
                <span className="block italic text-sand">your own body.</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-cream/80 sm:text-lg">
                Unhurried, licensed therapeutic massage. Three signature sessions,
                one price per length, and add-ons blended by hand. One therapist,
                one room, and all the time you need.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/book" size="lg" variant="light">
                  Book a session
                  <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
                <Button href="/services" size="lg" variant="outlineLight">
                  See the menu
                </Button>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <ul className="mt-9 flex flex-wrap gap-x-9 gap-y-4 border-t border-cream/20 pt-6 text-[0.8125rem] text-cream/70">
                {[
                  { icon: ShieldIcon, label: "MN licensed & insured" },
                  { icon: ClockIcon, label: "60 / 90 / 120 minute sessions" },
                  { icon: LeafIcon, label: "$85 – $155, one price per length" },
                ].map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2.5">
                    <Icon className="size-4 text-rust" />
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Meet Mikailah ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[80rem] px-5 py-(--spacing-section) sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <Reveal className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div className="relative aspect-square overflow-hidden rounded-full border-8 border-sand shadow-lift">
              <Image
                src={intro.portrait}
                alt={intro.portraitAlt}
                fill
                sizes="(min-width: 1024px) 34vw, 24rem"
                className="object-cover"
              />
            </div>
            <span
              aria-hidden
              className="absolute -right-2 top-4 hidden size-20 rounded-full bg-marigold/25 blur-2xl sm:block"
            />
            <span
              aria-hidden
              className="absolute -left-4 bottom-8 hidden size-24 rounded-full bg-teal/25 blur-2xl sm:block"
            />
          </Reveal>

          <Reveal delay={120}>
            <Eyebrow>{intro.eyebrow}</Eyebrow>
            <h2 className="mt-6 text-[clamp(2rem,1.35rem+2.6vw,3.4rem)]">
              {intro.heading}
            </h2>
            <div className="mt-7 flex max-w-[58ch] flex-col gap-5 text-lg text-muted">
              {intro.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>

            <div className="mt-9">
              <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
                Trained in
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {intro.techniques.map((technique) => (
                  <li
                    key={technique}
                    className="rounded-full border border-stone bg-sand px-4 py-2 text-[0.8125rem] text-bark"
                  >
                    {technique}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Button href="/book">
                Book with Mikailah
                <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button href="/about" variant="quiet">
                Read her full story
                <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Sessions ─────────────────────────────────────────────────────── */}
      <section className="bg-sand py-(--spacing-section)">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The menu"
              title="Three sessions. Pick the one your week calls for."
              intro="Each runs 60, 90 or 120 minutes at the same price. If you're not sure, book The Grounding and we can change direction once we talk."
            />
          </Reveal>

          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {sessions.map((session, i) => (
              <Reveal as="li" key={session.slug} delay={i * 110}>
                <Link
                  href={`/services#${session.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-stone bg-cream shadow-soft transition-shadow duration-300 ease-[var(--ease-calm)] hover:shadow-lift"
                >
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={session.image}
                      alt={session.imageAlt}
                      fill
                      sizes="(min-width: 768px) 33vw, 92vw"
                      className="grade object-cover transition-transform duration-700 ease-[var(--ease-calm)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-[1.75rem]">{session.name}</h3>
                    <p className="mt-2 font-sans text-[0.8125rem] uppercase tracking-[0.16em] text-cocoa">
                      {session.subtitle}
                    </p>
                    <p className="mt-4 flex-1 text-muted">{session.summary}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-stone pt-4 text-sm">
                      <span className="text-muted">
                        {session.durations.join(" · ")} min
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-medium text-cocoa">
                        From $85
                        <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[80rem] px-5 py-(--spacing-section) sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <Reveal>
            <Eyebrow>Pricing, plainly</Eyebrow>
            <h2 className="mt-6 text-[clamp(2rem,1.35rem+2.6vw,3.4rem)]">
              One price per length. That's the whole menu.
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg text-muted">{pricingNote}</p>
            <div className="mt-9">
              <Button href="/services" variant="outline">
                See what is in each session
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ul className="flex flex-col gap-4">
              {pricing.map((tier, i) => (
                <li
                  key={tier.minutes}
                  className={`flex flex-wrap items-baseline gap-x-6 gap-y-3 rounded-lg border p-8 transition-colors duration-300 ${
                    i === 1 ? "border-rust/35 bg-sand" : "border-stone bg-cream"
                  }`}
                >
                  <h3 className="text-2xl tabular-nums">{tier.minutes} minutes</h3>
                  <p className="ml-auto font-display text-[2.5rem] leading-none text-rust tabular-nums">
                    ${tier.price}
                  </p>
                  <p className="w-full max-w-[52ch] text-muted">{tier.blurb}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Enhancements ─────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-bark py-(--spacing-section) text-cream">
        <Image
          src="/images/texture-linen.jpg"
          alt=""
          fill
          sizes="100vw"
          className="grade -z-20 object-cover opacity-15"
        />
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col gap-5">
              <span className="inline-flex items-center gap-2.5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-marigold">
                <span aria-hidden className="h-px w-6 bg-marigold" />
                Enhancements
              </span>
              <h2 className="max-w-[19ch] text-[clamp(2rem,1.35rem+2.6vw,3.4rem)] text-cream">
                Small additions, disproportionate effect.
              </h2>
              <p className="max-w-[54ch] text-lg text-cream/70">
                Add one when you book, or decide once you're on the table. Most are
                folded into your time rather than tacked onto the end, so nothing here
                shortens the massage you came for.
              </p>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {enhancementCategories.map((cat, i) => (
              <Reveal as="li" key={cat.id} delay={i * 90}>
                <Link
                  href={`/enhancements#${cat.id}`}
                  className="group relative flex aspect-3/4 flex-col justify-end overflow-hidden rounded-lg"
                >
                  <Image
                    src={cat.image}
                    alt={cat.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
                    className="grade -z-20 object-cover transition-transform duration-700 ease-[var(--ease-calm)] group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(30,22,17,0.9),rgba(30,22,17,0.15)_60%)]"
                  />
                  <div className="p-6">
                    <h3 className="text-[1.375rem] text-cream">{cat.name}</h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[0.8125rem] text-marigold">
                      See options
                      <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Reviews"
              title="What clients say afterwards."
              intro="Reviews from clients seen at the practice. Nothing here is incentivised or edited."
            />
          </Reveal>
          <div className="mt-10">
            <Reviews />
          </div>
        </div>
      </section>

      {/* ── Trust & privacy ──────────────────────────────────────────────── */}
      <section className="bg-sand py-(--spacing-section)">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            <Reveal>
              <Eyebrow>Your rights on the table</Eyebrow>
              <h2 className="mt-6 text-[clamp(2rem,1.35rem+2.6vw,3.4rem)]">
                Safety is written down.
              </h2>
              <p className="mt-6 max-w-[48ch] text-lg text-muted">
                Massage asks a lot of trust. So every assurance is in writing, where
                you can read it before you ever get in the car.
              </p>
              <div className="mt-9">
                <Button href="/privacy" variant="outline">
                  Read the full policy
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ul className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    icon: LockIcon,
                    tone: "text-rust",
                    title: "Your information stays here",
                    body: "Intake forms and health history are never sold, shared, or handed to a third party for marketing. Records are kept encrypted and released only when you ask for them in writing.",
                  },
                  {
                    icon: ShieldIcon,
                    tone: "text-olive",
                    title: "Licensed and accountable",
                    body: "Minnesota licensed massage therapist, fully insured, working strictly within the legal scope of therapeutic massage. Licence details are on the policy page.",
                  },
                  {
                    icon: HandIcon,
                    tone: "text-rust",
                    title: "Consent, continuously",
                    body: "You're draped at all times. Pressure, areas worked, and conversation are confirmed as we go, and any part of the session stops the moment you say so.",
                  },
                  {
                    icon: LeafIcon,
                    tone: "text-olive",
                    title: "A waiver you can read first",
                    body: "The health intake and consent waiver go out ahead of your appointment, so nothing gets signed in a hurry at the door.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="rounded-lg border border-stone bg-cream p-7"
                  >
                    <item.icon className={`size-6 ${item.tone}`} />
                    <h3 className="mt-5 text-xl">{item.title}</h3>
                    <p className="mt-3 text-[0.9375rem] text-muted">{item.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Shop teaser ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[80rem] px-5 py-(--spacing-section) sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Coming to the shop"
            title="Gift cards, packages, and things made by hand."
            intro="The shelf is being built. Add your name and you'll hear the moment gift cards go live, in time for the holidays."
          />
          <div className="mt-8">
            <Button href="/shop" variant="outline">
              Join the waitlist
            </Button>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shopItems.map((item, i) => (
            <Reveal as="li" key={item.name} delay={i * 90}>
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-stone bg-cream">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
                    className="grade object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-cream/92 px-3 py-1.5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-cocoa backdrop-blur-sm">
                    {item.status}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl">{item.name}</h3>
                  <p className="mt-3 text-[0.9375rem] text-muted">{item.blurb}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/enh-focus.jpg"
          alt=""
          fill
          sizes="100vw"
          className="grade -z-20 object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(30,22,17,0.92)_0%,rgba(30,22,17,0.7)_55%,rgba(30,22,17,0.4)_100%)]"
        />
        <div className="mx-auto max-w-[80rem] px-5 py-(--spacing-section) sm:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-[clamp(2.1rem,1.4rem+3vw,4rem)] text-cream">
              The next hour is
              <span className="block italic text-marigold">already yours.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg text-cream/75">
              Booking takes about a minute. Pick a session, pick a length, add
              anything that sounds good, and I'll see you in the room.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/book" size="lg" variant="light">
                Book a session
                <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button href="/contact" size="lg" variant="outlineLight">
                Ask a question first
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
