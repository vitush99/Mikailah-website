"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, cn } from "./ui";
import { CheckIcon } from "./icons";

const topics = ["Booking a session", "A specific injury or condition", "Gift cards", "Something else"];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    topic: topics[0],
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-start gap-5 rounded-lg border border-stone bg-sand p-8">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-olive/20 text-olive">
          <CheckIcon className="size-6" />
        </span>
        <div>
          <h3 className="font-display text-2xl">Message sent.</h3>
          <p className="mt-3 text-muted">
            I read these myself and usually reply the same day, sooner if it's about
            an appointment this week.
          </p>
          <p className="mt-4 text-sm text-muted">
            Prototype only. Nothing was delivered.
          </p>
        </div>
      </div>
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Please add your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email))
      next.email = "Please enter an email I can reply to.";
    if (values.message.trim().length < 10)
      next.message = "A sentence or two so I know what to answer.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    setSent(true);
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="name"
          label="Your name"
          value={values.name}
          error={errors.name}
          autoComplete="name"
          onChange={(v) => setValues((s) => ({ ...s, name: v }))}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          value={values.email}
          error={errors.email}
          autoComplete="email"
          onChange={(v) => setValues((s) => ({ ...s, email: v }))}
        />
      </div>

      <div>
        <label
          htmlFor="topic"
          className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa"
        >
          What is it about?
        </label>
        <select
          id="topic"
          value={values.topic}
          onChange={(e) => setValues((s) => ({ ...s, topic: e.target.value }))}
          className="mt-3 min-h-12 w-full rounded-lg border border-stone bg-cream px-4 text-[0.9375rem] transition-colors duration-200 focus:border-cocoa"
        >
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cocoa"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          value={values.message}
          onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            "mt-3 w-full rounded-lg border bg-cream p-4 text-[0.9375rem] transition-colors duration-200",
            errors.message ? "border-rust" : "border-stone focus:border-cocoa",
          )}
        />
        {errors.message ? (
          <p id="message-error" role="alert" className="mt-2 text-sm text-alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <Button type="submit" size="lg">
          Send message
        </Button>
        <p className="text-sm text-muted">
          Your address is used to reply and nothing else.{" "}
          <Link href="/privacy" className="text-cocoa underline underline-offset-4">
            Privacy
          </Link>
        </p>
      </div>
    </form>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
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
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
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
