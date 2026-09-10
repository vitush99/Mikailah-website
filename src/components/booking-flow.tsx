"use client";

/**
 * Front-end booking prototype.
 *
 * Availability is generated locally so the flow can be clicked through end to
 * end. Swap `useAvailability` and `handleConfirm` for real calls when a
 * scheduling provider is chosen — nothing else in this component needs to move.
 */

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  enhancementCategories,
  enhancements,
  priceFor,
  pricing,
  sessions,
} from "@/lib/data";
import { Button, Eyebrow, cn } from "./ui";
import { ArrowIcon, CheckIcon, ClockIcon, LockIcon } from "./icons";

const STEPS = [
  { id: "session", label: "Session & length" },
  { id: "extras", label: "Enhancements" },
  { id: "time", label: "Date & time" },
  { id: "details", label: "Your details" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

const TIME_SLOTS = ["9:00a", "10:30a", "12:00p", "1:30p", "3:00p", "4:30p", "6:00p"];

/** Deterministic pseudo-availability so the same day always looks the same. */
function slotsForDate(date: Date, durationMin: number) {
  const seed = date.getDate() * 31 + date.getMonth() * 7;
  const needed = durationMin >= 120 ? 2 : 1;
  return TIME_SLOTS.filter((_, i) => (seed + i * 5) % 3 !== 0).slice(
    0,
    TIME_SLOTS.length - needed,
  );
}

function formatDay(date: Date) {
  return {
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    day: date.getDate(),
    month: date.toLocaleDateString("en-US", { month: "short" }),
    long: date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
    iso: date.toISOString().slice(0, 10),
  };
}

export function BookingFlow({
  initialSession,
  initialMinutes,
}: {
  initialSession?: string;
  initialMinutes?: number;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [sessionSlug, setSessionSlug] = useState(
    sessions.some((s) => s.slug === initialSession) ? initialSession! : sessions[0].slug,
  );
  const [duration, setDuration] = useState(
    pricing.some((p) => p.minutes === initialMinutes) ? initialMinutes! : 60,
  );
  const [extras, setExtras] = useState<string[]>([]);
  const [dateIso, setDateIso] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    firstVisit: "yes",
    focus: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState(false);

  /** Update one detail field and drop any error still shown against it. */
  function setDetail<K extends keyof typeof details>(key: K, value: (typeof details)[K]) {
    setDetails((d) => ({ ...d, [key]: value }));
    setErrors((e) => {
      if (!(key in e)) return e;
      const { [key as string]: _removed, ...rest } = e;
      return rest;
    });
  }

  /* Dates are built after mount so the server and client never disagree. */
  const [days, setDays] = useState<Date[]>([]);
  useEffect(() => {
    const out: Date[] = [];
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    cursor.setDate(cursor.getDate() + 1);
    while (out.length < 14) {
      if (cursor.getDay() !== 0) out.push(new Date(cursor)); // closed Sundays
      cursor.setDate(cursor.getDate() + 1);
    }
    setDays(out);
  }, []);

  const step = STEPS[stepIndex].id;
  const session = sessions.find((s) => s.slug === sessionSlug)!;
  const chosenExtras = enhancements.filter((e) => extras.includes(e.slug));

  const total = useMemo(
    () => priceFor(duration) + chosenExtras.reduce((sum, e) => sum + e.price, 0),
    [duration, chosenExtras],
  );

  const extraMinutes = chosenExtras.reduce((sum, e) => sum + (e.minutes ?? 0), 0);
  const selectedDate = days.find((d) => formatDay(d).iso === dateIso) ?? null;

  const canAdvance: Record<StepId, boolean> = {
    session: Boolean(sessionSlug && duration),
    extras: true,
    time: Boolean(dateIso && time),
    details: true, // validated on submit so errors can be specific
  };

  function next() {
    if (!canAdvance[step]) return;
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
    document.getElementById("booking-top")?.scrollIntoView({ block: "start" });
  }

  function back() {
    setStepIndex((i) => Math.max(i - 1, 0));
    document.getElementById("booking-top")?.scrollIntoView({ block: "start" });
  }

  function handleConfirm() {
    const next: Record<string, string> = {};
    if (!details.firstName.trim()) next.firstName = "Please add a first name.";
    if (!details.lastName.trim()) next.lastName = "Please add a last name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(details.email))
      next.email = "Please enter an email we can send the confirmation to.";
    if (details.phone.replace(/\D/g, "").length < 10)
      next.phone = "A 10-digit phone number, in case I need to reach you.";
    if (!details.consent)
      next.consent = "Please confirm you have read how your information is handled.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = document.getElementById(Object.keys(next)[0]);
      first?.focus();
      return;
    }
    // Prototype: no request is sent. Hand off to the scheduling provider here.
    setConfirmed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* The page heading belongs to this component so it can change once the
     booking is placed. The confirmation is a new page state, not a banner. */
  const header = (
    <header className="border-b border-stone bg-sand">
      <div className="mx-auto max-w-[80rem] px-5 pb-12 pt-28 sm:px-8 sm:pt-32">
        <Eyebrow>Booking</Eyebrow>
        <h1 className="mt-6 max-w-[16ch] text-[clamp(2.4rem,1.5rem+3.6vw,4.5rem)]">
          {confirmed ? (
            <>That&rsquo;s you, {details.firstName || "friend"}.</>
          ) : (
            <>Four short steps and you&rsquo;re booked.</>
          )}
        </h1>
        <p className="mt-6 max-w-[54ch] text-lg text-muted">
          {confirmed
            ? "Your request is in. Nothing more is needed from you right now."
            : "Nothing is charged now, and nothing is final until I confirm by email. If you'd rather talk to a person instead, that works too."}
        </p>
      </div>
    </header>
  );

  const shell = (children: React.ReactNode) => (
    <>
      {header}
      <div className="mx-auto max-w-[80rem] px-5 py-(--spacing-section) sm:px-8">
        {children}
      </div>
    </>
  );

  if (confirmed) {
    return shell(
      <Confirmation
        session={session.name}
        duration={duration}
        dateLabel={selectedDate ? formatDay(selectedDate).long : ""}
        time={time ?? ""}
        total={total}
        email={details.email}
      />,
    );
  }

  return shell(
    <div id="booking-top" className="scroll-mt-10">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
        {/* minmax(0,1fr): without it the horizontally scrolling day strip below
            widens this track and pushes the summary column off screen. */}
        <div className="min-w-0">
          {/* Progress */}
          <ol className="flex flex-wrap gap-x-2 gap-y-3 border-b border-stone pb-6">
            {STEPS.map((s, i) => {
              const state =
                i === stepIndex ? "current" : i < stepIndex ? "done" : "todo";
              return (
                <li key={s.id} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => i < stepIndex && setStepIndex(i)}
                    disabled={i > stepIndex}
                    aria-current={state === "current" ? "step" : undefined}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2.5 rounded-full px-3.5 text-[0.8125rem] transition-colors duration-200",
                      state === "current" && "bg-sand font-medium text-bark",
                      state === "done" && "cursor-pointer text-cocoa hover:bg-sand",
                      state === "todo" && "cursor-not-allowed text-muted/60",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "inline-flex size-6 items-center justify-center rounded-full border text-[0.6875rem] tabular-nums",
                        state === "current" && "border-cocoa bg-cocoa text-cream",
                        state === "done" && "border-olive bg-olive text-cream",
                        state === "todo" && "border-stone text-muted/70",
                      )}
                    >
                      {state === "done" ? <CheckIcon className="size-3.5" /> : i + 1}
                    </span>
                    {s.label}
                  </button>
                  {i < STEPS.length - 1 ? (
                    <span aria-hidden className="hidden h-px w-4 bg-stone sm:block" />
                  ) : null}
                </li>
              );
            })}
          </ol>

          <div className="pt-10">
            {/* ── Step 1: session + length ───────────────────────────────── */}
            {step === "session" ? (
              <Fieldset
                legend="Which session?"
                hint="Not sure? Choose The Grounding. We can change direction once we talk."
              >
                <div className="grid gap-4 sm:grid-cols-3">
                  {sessions.map((s) => (
                    <label
                      key={s.slug}
                      className={cn(
                        "group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border bg-cream transition-all duration-200",
                        sessionSlug === s.slug
                          ? "border-cocoa shadow-lift"
                          : "border-stone hover:border-cocoa/45 hover:shadow-soft",
                      )}
                    >
                      <input
                        type="radio"
                        name="session"
                        value={s.slug}
                        checked={sessionSlug === s.slug}
                        onChange={() => setSessionSlug(s.slug)}
                        className="sr-only"
                      />
                      <span className="relative block aspect-16/10 overflow-hidden">
                        <Image
                          src={s.image}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 30vw, 92vw"
                          className="grade object-cover"
                        />
                        {sessionSlug === s.slug ? (
                          <span className="absolute right-3 top-3 inline-flex size-7 items-center justify-center rounded-full bg-cocoa text-cream">
                            <CheckIcon className="size-4" />
                          </span>
                        ) : null}
                      </span>
                      <span className="flex flex-1 flex-col p-5">
                        <span className="font-display text-xl">{s.name}</span>
                        <span className="mt-2 text-[0.8125rem] text-muted">
                          {s.summary}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>

                <div className="mt-10">
                  <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
                    How long?
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {session.durations.map((d) => (
                      <label
                        key={d}
                        className={cn(
                          "inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-full border px-6 transition-colors duration-200",
                          duration === d
                            ? "border-cocoa bg-cocoa text-cream"
                            : "border-stone hover:border-cocoa/50 hover:bg-sand",
                        )}
                      >
                        <input
                          type="radio"
                          name="duration"
                          value={d}
                          checked={duration === d}
                          onChange={() => setDuration(d)}
                          className="sr-only"
                        />
                        <span className="tabular-nums">{d} minutes</span>
                        <span
                          className={cn(
                            "text-sm tabular-nums",
                            duration === d ? "text-cream/70" : "text-muted",
                          )}
                        >
                          ${priceFor(d)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </Fieldset>
            ) : null}

            {/* ── Step 2: enhancements ───────────────────────────────────── */}
            {step === "extras" ? (
              <Fieldset
                legend="Add an enhancement?"
                hint="Entirely optional. Skip it now and decide when we talk."
              >
                <div className="flex flex-col gap-10">
                  {enhancementCategories.map((cat) => (
                    <div key={cat.id}>
                      <h3 className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
                        {cat.name}
                      </h3>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {enhancements
                          .filter((e) => e.category === cat.id)
                          .map((e) => {
                            const on = extras.includes(e.slug);
                            const free = e.price === 0;
                            return (
                              <label
                                key={e.slug}
                                className={cn(
                                  "flex gap-4 rounded-lg border p-5 transition-all duration-200",
                                  free
                                    ? "border-stone/70 bg-sand/50"
                                    : on
                                      ? "cursor-pointer border-cocoa bg-sand shadow-soft"
                                      : "cursor-pointer border-stone bg-cream hover:border-cocoa/45",
                                )}
                              >
                                <input
                                  type="checkbox"
                                  checked={on || free}
                                  disabled={free}
                                  onChange={() =>
                                    setExtras((prev) =>
                                      prev.includes(e.slug)
                                        ? prev.filter((s) => s !== e.slug)
                                        : [...prev, e.slug],
                                    )
                                  }
                                  className="sr-only"
                                />
                                <span
                                  aria-hidden
                                  className={cn(
                                    "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-sm border-2 transition-colors",
                                    on || free
                                      ? "border-cocoa bg-cocoa text-cream"
                                      : "border-stone",
                                  )}
                                >
                                  {on || free ? <CheckIcon className="size-3.5" /> : null}
                                </span>
                                <span className="flex-1">
                                  <span className="flex flex-wrap items-baseline justify-between gap-2">
                                    <span className="font-medium">{e.name}</span>
                                    <span className="text-sm tabular-nums text-cocoa">
                                      {free ? "Included" : `+$${e.price}`}
                                    </span>
                                  </span>
                                  <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-muted">
                                    {e.blurb}
                                  </span>
                                </span>
                              </label>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              </Fieldset>
            ) : null}

            {/* ── Step 3: date & time ────────────────────────────────────── */}
            {step === "time" ? (
              <Fieldset
                legend="Pick a day and time"
                hint="The next two weeks. Closed Sundays, and Mondays are by request, so send a note and we'll find something."
              >
                {days.length === 0 ? (
                  <p className="text-muted">Loading available days…</p>
                ) : (
                  <>
                    <ul className="flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {days.map((d) => {
                        const f = formatDay(d);
                        const on = dateIso === f.iso;
                        const open = slotsForDate(d, duration).length;
                        return (
                          <li key={f.iso}>
                            <button
                              type="button"
                              onClick={() => {
                                setDateIso(f.iso);
                                setTime(null);
                              }}
                              aria-pressed={on}
                              className={cn(
                                "flex w-[4.75rem] cursor-pointer flex-col items-center gap-1 rounded-lg border py-4 transition-all duration-200",
                                on
                                  ? "border-cocoa bg-cocoa text-cream"
                                  : "border-stone bg-cream hover:border-cocoa/50 hover:bg-sand",
                              )}
                            >
                              <span className={cn("text-[0.6875rem] uppercase tracking-[0.12em]", on ? "text-cream/70" : "text-muted")}>
                                {f.weekday}
                              </span>
                              <span className="font-display text-2xl tabular-nums">{f.day}</span>
                              <span className={cn("text-[0.6875rem]", on ? "text-cream/70" : "text-muted")}>
                                {open} open
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-9">
                      <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
                        {selectedDate
                          ? `Times on ${formatDay(selectedDate).long}`
                          : "Choose a day first"}
                      </p>
                      {selectedDate ? (
                        <div className="mt-4 flex flex-wrap gap-3">
                          {slotsForDate(selectedDate, duration).map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setTime(slot)}
                              aria-pressed={time === slot}
                              className={cn(
                                "inline-flex min-h-12 cursor-pointer items-center rounded-full border px-6 tabular-nums transition-colors duration-200",
                                time === slot
                                  ? "border-cocoa bg-cocoa text-cream"
                                  : "border-stone hover:border-cocoa/50 hover:bg-sand",
                              )}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-4 text-muted">
                          Pick a date above and open times will appear here.
                        </p>
                      )}
                    </div>
                  </>
                )}
              </Fieldset>
            ) : null}

            {/* ── Step 4: details ────────────────────────────────────────── */}
            {step === "details" ? (
              <Fieldset
                legend="A little about you"
                hint="Only what I need to prepare the room and send your confirmation."
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    id="firstName"
                    label="First name"
                    value={details.firstName}
                    error={errors.firstName}
                    onChange={(v) => setDetail("firstName", v)}
                    autoComplete="given-name"
                  />
                  <Field
                    id="lastName"
                    label="Last name"
                    value={details.lastName}
                    error={errors.lastName}
                    onChange={(v) => setDetail("lastName", v)}
                    autoComplete="family-name"
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    value={details.email}
                    error={errors.email}
                    hint="Your confirmation and intake form go here."
                    onChange={(v) => setDetail("email", v)}
                    autoComplete="email"
                  />
                  <Field
                    id="phone"
                    label="Phone"
                    type="tel"
                    value={details.phone}
                    error={errors.phone}
                    hint="Only used if something changes on the day."
                    onChange={(v) => setDetail("phone", v)}
                    autoComplete="tel"
                  />
                </div>

                <fieldset className="mt-8">
                  <legend className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
                    Is this your first visit?
                  </legend>
                  <div className="mt-4 flex gap-3">
                    {[
                      { value: "yes", label: "Yes, first time" },
                      { value: "no", label: "I have been before" },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={cn(
                          "inline-flex min-h-12 cursor-pointer items-center rounded-full border px-6 text-[0.9375rem] transition-colors duration-200",
                          details.firstVisit === opt.value
                            ? "border-cocoa bg-cocoa text-cream"
                            : "border-stone hover:border-cocoa/50 hover:bg-sand",
                        )}
                      >
                        <input
                          type="radio"
                          name="firstVisit"
                          value={opt.value}
                          checked={details.firstVisit === opt.value}
                          onChange={(e) => setDetail("firstVisit", e.target.value)}
                          className="sr-only"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-8">
                  <label
                    htmlFor="focus"
                    className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa"
                  >
                    Anything I should know?
                  </label>
                  <p id="focus-hint" className="mt-2 text-sm text-muted">
                    Areas to focus on, areas to avoid entirely, injuries, pregnancy,
                    or anything that would make the hour feel safer. Optional.
                  </p>
                  <textarea
                    id="focus"
                    rows={4}
                    aria-describedby="focus-hint"
                    value={details.focus}
                    onChange={(e) => setDetail("focus", e.target.value)}
                    className="mt-3 w-full rounded-lg border border-stone bg-cream p-4 text-[0.9375rem] transition-colors duration-200 focus:border-cocoa"
                  />
                </div>

                <div className="mt-8">
                  <label
                    className={cn(
                      "flex cursor-pointer gap-4 rounded-lg border p-6",
                      errors.consent ? "border-alert bg-alert/5" : "border-stone bg-sand/60",
                    )}
                  >
                    <input
                      id="consent"
                      type="checkbox"
                      checked={details.consent}
                      onChange={(e) => setDetail("consent", e.target.checked)}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                      className="sr-only"
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-sm border-2 transition-colors",
                        details.consent ? "border-cocoa bg-cocoa text-cream" : "border-stone",
                      )}
                    >
                      {details.consent ? <CheckIcon className="size-3.5" /> : null}
                    </span>
                    <span className="text-[0.9375rem] text-muted">
                      I have read how my information is handled, and I understand I'll
                      complete a health intake and consent waiver before my session.{" "}
                      <Link href="/privacy" className="text-cocoa underline underline-offset-4">
                        Read the policy
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.consent ? (
                    <p id="consent-error" role="alert" className="mt-2 text-sm text-alert">
                      {errors.consent}
                    </p>
                  ) : null}
                </div>
              </Fieldset>
            ) : null}
          </div>

          {/* Desktop step controls */}
          <div className="mt-12 hidden items-center justify-between gap-4 border-t border-stone pt-8 lg:flex">
            {stepIndex > 0 ? (
              <Button variant="quiet" onClick={back}>
                Back
              </Button>
            ) : (
              <span />
            )}
            {step === "details" ? (
              <Button size="lg" onClick={handleConfirm}>
                Request this appointment
                <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            ) : (
              <Button size="lg" onClick={next} disabled={!canAdvance[step]}>
                {step === "extras" && extras.length === 0 ? "Skip for now" : "Continue"}
                <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </div>

        {/* ── Summary ────────────────────────────────────────────────────── */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-lg border border-stone bg-sand p-7">
            <h2 className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
              Your session
            </h2>

            <p className="mt-5 font-display text-2xl leading-tight">{session.name}</p>
            <p className="mt-1.5 text-sm text-muted">{session.subtitle}</p>

            <dl className="mt-6 flex flex-col gap-3 border-t border-stone pt-5 text-sm">
              <Row label="Length" value={`${duration} minutes`} />
              <Row label="Session fee" value={`$${priceFor(duration)}`} />
              <Row
                label="When"
                value={
                  selectedDate && time
                    ? `${formatDay(selectedDate).month} ${formatDay(selectedDate).day} at ${time}`
                    : "Not chosen yet"
                }
                muted={!(selectedDate && time)}
              />
            </dl>

            {chosenExtras.length > 0 ? (
              <div className="mt-5 border-t border-stone pt-5">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
                  Enhancements
                </p>
                <ul className="mt-3 flex flex-col gap-2 text-sm">
                  {chosenExtras.map((e) => (
                    <li key={e.slug} className="flex justify-between gap-4">
                      <span className="text-muted">{e.name}</span>
                      <span className="tabular-nums">
                        {e.price === 0 ? "—" : `$${e.price}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-6 flex items-baseline justify-between border-t border-stone pt-5">
              <span className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
                Total
              </span>
              <span className="font-display text-3xl text-rust tabular-nums">
                ${total}
              </span>
            </div>

            {extraMinutes > 0 ? (
              <p className="mt-4 flex items-start gap-2 text-[0.8125rem] text-muted">
                <ClockIcon className="mt-0.5 size-4 shrink-0 text-olive" />
                About {extraMinutes} minutes of your session goes to enhancements.
              </p>
            ) : null}

            <p className="mt-5 text-[0.8125rem] leading-relaxed text-muted">
              Nothing is charged online. You pay at the studio after your session, by
              card, cash, HSA or FSA.
            </p>
          </div>
        </aside>
      </div>

      {/* Mobile step controls */}
      <div className="sticky bottom-0 z-30 -mx-5 mt-10 border-t border-stone bg-cream/95 px-5 py-4 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
              Running total
            </p>
            <p className="font-display text-2xl text-rust tabular-nums">${total}</p>
          </div>
          <div className="flex items-center gap-2">
            {stepIndex > 0 ? (
              <Button variant="outline" onClick={back} aria-label="Previous step">
                Back
              </Button>
            ) : null}
            {step === "details" ? (
              <Button onClick={handleConfirm}>Request</Button>
            ) : (
              <Button onClick={next} disabled={!canAdvance[step]}>
                {step === "extras" && extras.length === 0 ? "Skip" : "Continue"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>,
  );
}

/* ── Small pieces ─────────────────────────────────────────────────────────── */

function Fieldset({
  legend,
  hint,
  children,
}: {
  legend: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="text-[clamp(1.6rem,1.25rem+1.4vw,2.25rem)] font-display leading-tight">
        {legend}
      </legend>
      {hint ? <p className="mt-3 max-w-[54ch] text-muted">{hint}</p> : null}
      <div className="mt-8">{children}</div>
    </fieldset>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa"
      >
        {label}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={cn(
          "mt-3 min-h-12 w-full rounded-lg border bg-cream px-4 text-[0.9375rem] transition-colors duration-200",
          error ? "border-alert" : "border-stone focus:border-cocoa",
        )}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className={cn("text-right", muted ? "text-muted/70" : "font-medium")}>{value}</dd>
    </div>
  );
}

function Confirmation({
  session,
  duration,
  dateLabel,
  time,
  total,
  email,
}: {
  session: string;
  duration: number;
  dateLabel: string;
  time: string;
  total: number;
  email: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center" role="status">
      <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-olive/20 text-olive">
        <CheckIcon className="size-8" />
      </span>
      <p className="mt-8 text-lg text-muted">
        A confirmation is on its way to <span className="text-bark">{email}</span>,
        along with the intake and consent form to fill out before you arrive.
      </p>

      <dl className="mt-10 flex flex-col gap-3 rounded-lg border border-stone bg-sand p-8 text-left">
        <Row label="Session" value={`${session} · ${duration} min`} />
        <Row label="When" value={`${dateLabel} at ${time}`} />
        <Row label="Due at the studio" value={`$${total}`} />
      </dl>

      <p className="mt-8 text-sm text-muted">
        This is a design prototype. No appointment has been booked and no email has
        been sent.
      </p>

      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Button href="/">Back to the home page</Button>
        <Button href="/faq" variant="outline">
          What happens at a first visit
        </Button>
      </div>
    </div>
  );
}
