import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Button, Eyebrow, Reveal } from "@/components/ui";
import { ArrowIcon } from "@/components/icons";
import { business, intro } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Mikailah",
  description:
    "Mikailah is a licensed massage therapist in Burnsville, Minnesota, offering unhurried therapeutic bodywork in a single quiet room.",
};

// TODO: every paragraph on this page is placeholder written from the brief —
// replace with Mikailah's own words before launch.
const story = [
  {
    heading: "How I got here",
    body: "I came to bodywork the way a lot of therapists do, through my own body and a stretch of years where it stopped cooperating. What helped was the first person who slowed down, asked what I wanted, and then did exactly that. I've been trying to be that person for other people ever since.",
  },
  {
    heading: "How I work",
    body: "Slowly, and in conversation. I'd rather spend forty minutes on the one shoulder that's been running your whole week than tick through a routine on all of you. Most sessions end up somewhere other than where we planned, and that is usually the right call.",
  },
  {
    heading: "What I trained in",
    body: "The list below matters less than what it lets me do. A frozen shoulder, a postpartum body and a marathon week all need different hands, and I would rather change approach halfway through a session than finish the routine I planned. I keep adding to the list.",
  },
];

const credentials = [
  { label: "Licensed", value: `${business.state} Licensed Massage Therapist` },
  { label: "Trained in", value: intro.techniques.join(", ") },
  { label: "Continuing education", value: "Trauma-informed touch, oncology massage" }, // TODO
  { label: "In practice since", value: String(business.established) },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="The whole practice is one person and one room."
        intro="When you book here you're booking me, and the hour gets built around whatever your body brought through the door that day."
        image="/images/texture-ceramic.jpg"
      />

      <section className="mx-auto max-w-[80rem] px-5 py-(--spacing-section) sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-4/5 overflow-hidden rounded-lg shadow-lift">
                <Image
                  src="/images/mikailah.jpg"
                  alt="Mikailah, licensed massage therapist, smiling outdoors in front of blossoming branches"
                  fill
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="object-cover"
                  priority
                />
              </div>
              {/* TODO: reshoot at higher resolution — this crop is ~380px at
                  source, lifted from her current practice page. */}
            </div>
          </Reveal>

          <Reveal delay={110}>
            <blockquote className="border-l-2 border-rust pl-7 font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] leading-[1.25]">
              I'll tell you what I'm feeling under my hands and what I think it
              means, and I'll believe you over my own assumptions every time.
            </blockquote>

            <div className="mt-10 flex flex-col gap-12">
              {story.map((part) => (
                <div key={part.heading}>
                  <h2 className="text-[1.75rem]">{part.heading}</h2>
                  <p className="mt-4 max-w-[58ch] text-lg text-muted">{part.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-lg border border-stone bg-sand p-8">
              <Eyebrow>Credentials</Eyebrow>
              <dl className="mt-6 flex flex-col gap-5">
                {credentials.map((c) => (
                  <div key={c.label} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
                      {c.label}
                    </dt>
                    <dd className="text-muted">{c.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Button href="/book" size="lg">
                Book a session
                <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button href="/contact" size="lg" variant="outline">
                Ask me something first
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
