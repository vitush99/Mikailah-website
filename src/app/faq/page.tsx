import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Accordion, Button, Reveal } from "@/components/ui";
import { ArrowIcon } from "@/components/icons";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Questions & Policies",
  description:
    "What a session costs, what to expect at a first massage, draping and undressing, cancellation policy, pregnancy, HSA and FSA.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Before you come in"
        title="Everything people are too polite to ask."
        intro="If your question isn't here, send it. Most of what's on this page started as somebody's nervous email."
      />

      <section className="mx-auto max-w-[80rem] px-5 py-(--spacing-section) sm:px-8 lg:py-(--spacing-section)">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <Reveal>
            <Accordion items={faqs} />
          </Reveal>

          <Reveal delay={120}>
            <div className="lg:sticky lg:top-28">
              <div className="rounded-lg border border-stone bg-sand p-8">
                <h2 className="text-2xl">Still wondering?</h2>
                <p className="mt-4 text-muted">
                  Send a message and I'll answer it myself, usually the same day.
                  No booking obligation, no follow-up sequence.
                </p>
                <div className="mt-7 flex flex-col gap-3">
                  <Button href="/contact">
                    Ask a question
                    <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                  <Button href="/privacy" variant="outline">
                    Privacy & your rights
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
