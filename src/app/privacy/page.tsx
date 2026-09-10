import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Button, Reveal } from "@/components/ui";
import { HandIcon, LockIcon, ShieldIcon } from "@/components/icons";
import { business } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy, Consent & Your Rights",
  description:
    "How your information is handled, what the consent waiver covers, licensing and scope of practice at Mikailah's House of Healing.",
};

// TODO: have this reviewed by an attorney or the MN licensing board before launch.
const sections = [
  {
    id: "information",
    icon: LockIcon,
    title: "Your information",
    body: [
      "Your name, contact details, health intake and session notes are collected so I can give you safe, informed bodywork. That's the only thing they're ever used for.",
      "Your information is never sold, rented, traded, or shared with a third party for marketing. That covers advertisers, data brokers and other practitioners, and there's no fine print further down the page reversing it.",
      "Records are stored encrypted and only I can access them. They go to anyone else, whether a physician, an insurer or a family member, only with your written request, or where a court order or mandatory-reporting law leaves me no choice. If that ever happened I'd tell you, unless the law forbade it.",
      "You can ask to see everything on file about you, ask for corrections, or ask for your records to be deleted, at any time, by email. Deletion requests are honoured within 30 days, except where I'm legally required to retain treatment records.",
    ],
  },
  {
    id: "consent",
    icon: HandIcon,
    title: "Consent and what happens in the room",
    body: [
      "Before your first session you complete a health intake and a consent waiver. Both are sent with your booking confirmation so you can read them in advance and nothing gets signed in a hurry at the door.",
      "You're draped with a sheet for the entire session. Only the area being worked on is uncovered, and it's re-covered before we move on. Breasts, genitals and gluteal cleft are never uncovered or worked on.",
      "Undress only to the level you're comfortable with. Plenty of clients keep underwear on, and some sessions happen fully clothed. None of it changes the quality of the work.",
      "Consent keeps going for the whole session. At any moment, for any reason or none, you can change the pressure, ask me to skip an area, ask for the music or the talking to stop, put clothes back on, or end the session entirely. There's no cost or awkwardness attached to doing any of it.",
    ],
  },
  {
    id: "scope",
    icon: ShieldIcon,
    title: "Licensing and scope of practice",
    body: [
      `This is a licensed therapeutic massage practice in ${business.city}, ${business.state}. Massage here is strictly non-sexual bodywork. Any request otherwise ends the session immediately and permanently, and is charged in full.`,
      "Massage therapy isn't medical care. I don't diagnose conditions, prescribe treatment, or adjust anything your physician has told you to do. When something is outside my scope I'll say so and refer you on rather than guess.",
      "I carry professional liability insurance and maintain continuing education as required for licensure. Licence and insurance details are available on request and are posted in the treatment room.",
    ],
  },
  {
    id: "site",
    icon: LockIcon,
    title: "This website",
    body: [
      "This site runs no advertising trackers, third-party marketing pixels, or cross-site profiling of any kind. There's no cookie banner because there's nothing here that would need one.",
      "If you join the newsletter, your email address is used to send the newsletter and nothing else, and every message carries a one-click unsubscribe. Booking details you enter are used to schedule and confirm your appointment.",
      "Payment is taken in person at the studio, so no card details are ever entered on or stored by this website.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legality & privacy"
        title="What you agree to, in plain language."
        intro="Massage asks for a lot of trust: your body, your health history, your hour. Here is exactly what happens with all three."
      />

      <section className="mx-auto max-w-[80rem] px-5 py-(--spacing-section) sm:px-8 lg:py-(--spacing-section)">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-10">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
              On this page
            </h2>
            <ul className="mt-5 flex flex-col gap-1 border-l border-stone">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px flex min-h-11 items-center border-l border-transparent pl-5 text-[0.9375rem] text-muted transition-colors duration-200 hover:border-cocoa hover:text-bark"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-12">
            {sections.map((section, i) => (
              <Reveal key={section.id} delay={i * 60}>
                <section id={section.id} className="scroll-mt-12">
                  <section.icon className="size-7 text-rust" />
                  <h2 className="mt-5 text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)]">
                    {section.title}
                  </h2>
                  <div className="mt-6 flex max-w-[64ch] flex-col gap-5 text-lg text-muted">
                    {section.body.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}

            <Reveal>
              <div className="rounded-lg border border-stone bg-sand p-8 sm:p-10">
                <h2 className="text-2xl">Questions about any of this?</h2>
                <p className="mt-4 max-w-[54ch] text-muted">
                  Ask before you book. I'd far rather answer an awkward question by
                  email than have you lying on a table wondering.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/contact">Send a question</Button>
                  <Button href="/faq" variant="outline">
                    Read the FAQ
                  </Button>
                </div>
                <p className="mt-8 border-t border-stone pt-6 text-sm text-muted">
                  Last updated {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}.
                  This page is written for clarity, not as legal advice. Have it
                  reviewed before launch.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
