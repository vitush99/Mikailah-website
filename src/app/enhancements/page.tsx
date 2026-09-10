import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Button, Reveal } from "@/components/ui";
import { ArrowIcon, ClockIcon, SparkIcon } from "@/components/icons";
import { enhancementCategories, enhancements } from "@/lib/data";

export const metadata: Metadata = {
  title: "Enhancements",
  description:
    "Aromatherapy, hot stone, targeted focus work, cupping and gua sha. Small additions folded into any session at Mikailah's House of Healing.",
};

export default function EnhancementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Enhancements"
        title="Add one thing, change the whole hour."
        intro="Everything here is folded into your session rather than bolted onto the end, so adding one never shortens the massage you came for. Choose when you book, or decide once you're on the table."
        image="/images/enh-aroma.jpg"
      />

      {/* Quick index */}
      <nav
        aria-label="Enhancement categories"
        className="border-b border-stone bg-cream/80 backdrop-blur-sm"
      >
        <ul className="mx-auto flex max-w-[80rem] gap-2 overflow-x-auto px-5 py-4 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {enhancementCategories.map((cat) => (
            <li key={cat.id}>
              <a
                href={`#${cat.id}`}
                className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-stone px-5 text-sm text-muted transition-colors duration-200 hover:border-cocoa hover:bg-sand hover:text-bark"
              >
                {cat.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {enhancementCategories.map((cat, catIndex) => {
        const items = enhancements.filter((e) => e.category === cat.id);
        return (
          <section
            key={cat.id}
            id={cat.id}
            className={`scroll-mt-32 py-(--spacing-section) ${
              catIndex % 2 === 1 ? "bg-sand" : ""
            }`}
          >
            <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
              <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
                <Reveal>
                  <div className="lg:sticky lg:top-28">
                    <div className="relative aspect-4/5 overflow-hidden rounded-lg shadow-lift">
                      <Image
                        src={cat.image}
                        alt={cat.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 92vw"
                        className="grade object-cover"
                      />
                    </div>
                    <h2 className="mt-8 text-[clamp(1.85rem,1.3rem+2vw,2.75rem)]">
                      {cat.name}
                    </h2>
                    <p className="mt-4 max-w-[42ch] text-muted">{cat.intro}</p>
                  </div>
                </Reveal>

                <Reveal delay={100}>
                  <ul className="flex flex-col">
                    {items.map((item) => (
                      <li
                        key={item.slug}
                        className={`group border-t border-stone py-7 last:border-b ${
                          catIndex % 2 === 1 ? "border-stone/80" : ""
                        }`}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                          <h3 className="text-2xl">{item.name}</h3>
                          <p className="font-display text-xl text-cocoa tabular-nums">
                            {item.price === 0 ? "Included" : `+$${item.price}`}
                          </p>
                        </div>
                        <p className="mt-3 max-w-[58ch] text-muted">{item.blurb}</p>
                        {item.minutes ? (
                          <p className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] text-muted">
                            <ClockIcon className="size-4 text-olive" />
                            About {item.minutes} minutes of focused time
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="border-t border-stone py-(--spacing-section)">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-8 rounded-lg border border-stone bg-sand p-10 sm:p-14 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <SparkIcon className="size-7 text-rust" />
                <h2 className="mt-5 text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)]">
                  Not sure which to add?
                </h2>
                <p className="mt-4 text-muted">
                  Book the session and leave it blank. We'll talk it through in the
                  first five minutes and you can add anything then. No pressure, no
                  upsell script.
                </p>
              </div>
              <Button href="/book" size="lg">
                Book a session
                <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
