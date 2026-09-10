import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/ui";
import { NewsletterForm } from "@/components/newsletter";
import { LeafIcon } from "@/components/icons";
import { shopItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Gift cards, session packages, small-batch oils and hand-selected jewelry, coming soon from Mikailah's House of Healing.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="The shop"
        title="Being built, slowly and on purpose."
        intro="Gift cards first, then packages, then the oils and stones that live on the shelf in the treatment room. Add your email and you'll hear the moment each one opens."
        image="/images/shop-oils.jpg"
      />

      <section className="mx-auto max-w-[80rem] px-5 py-(--spacing-section) sm:px-8 lg:py-(--spacing-section)">
        <ul className="grid gap-8 sm:grid-cols-2">
          {shopItems.map((item, i) => (
            <Reveal as="li" key={item.name} delay={i * 90}>
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-stone bg-cream shadow-soft">
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 640px) 46vw, 92vw"
                    className="grade object-cover"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-cream/92 px-3.5 py-1.5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-cocoa backdrop-blur-sm">
                    {item.status}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <h2 className="text-[1.75rem]">{item.name}</h2>
                  <p className="mt-4 flex-1 text-muted">{item.blurb}</p>
                  <p className="mt-7 border-t border-stone pt-5 text-sm text-muted">
                    Not yet available to purchase online.
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="border-t border-stone bg-sand py-(--spacing-section)">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <LeafIcon className="mx-auto size-8 text-rust" />
              <h2 className="mt-6 text-[clamp(1.85rem,1.3rem+2vw,2.75rem)]">
                Want the gift cards the day they open?
              </h2>
              <p className="mt-5 text-lg text-muted">
                One email a month at most, and your address never goes anywhere else.
                Unsubscribe in a single click whenever you like.
              </p>
              <div className="mt-9 flex justify-center">
                <NewsletterForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
