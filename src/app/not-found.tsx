import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[80rem] flex-col items-start px-5 pb-24 pt-32 sm:px-8">
      <span className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-cocoa">
        404
      </span>
      <h1 className="mt-6 max-w-[16ch] text-[clamp(2.4rem,1.5rem+3.6vw,4.5rem)]">
        This page went somewhere quieter.
      </h1>
      <p className="mt-6 max-w-[48ch] text-lg text-muted">
        The link may be old, or it may be something I haven't built yet. The
        booking page is where most people are heading anyway.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="/book" size="lg">
          Book a session
        </Button>
        <Button href="/" size="lg" variant="outline">
          Back to the home page
        </Button>
      </div>
    </section>
  );
}
