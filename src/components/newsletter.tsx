"use client";

import { useState } from "react";
import { Button } from "./ui";
import { CheckIcon } from "./icons";

export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");

  const dark = tone === "dark";

  if (state === "done") {
    return (
      <p
        className={`flex items-center gap-3 text-[0.9375rem] ${dark ? "text-cream/90" : "text-cocoa"}`}
        role="status"
      >
        <CheckIcon className="size-5 shrink-0 text-rust" />
        You&rsquo;re on the list. Look for something slow and seasonal, about once a month.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Prototype only — wire to Mailchimp / Buttondown / Resend before launch.
        setState("done");
      }}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={`min-h-12 w-full rounded-full border px-5 text-[0.9375rem] transition-colors duration-200 ${
            dark
              ? "border-cream/30 bg-cream/10 text-cream placeholder:text-cream/50 focus:border-cream/70"
              : "border-stone bg-cream text-bark placeholder:text-muted/70 focus:border-cocoa"
          }`}
        />
      </div>
      <Button type="submit" variant={dark ? "light" : "primary"}>
        Sign up
      </Button>
    </form>
  );
}
