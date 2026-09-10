"use client";

import { useRef } from "react";
import { reviews } from "@/lib/data";
import { QuoteIcon } from "./icons";
import { Reveal } from "./ui";

export function Reviews() {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : 340;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div>
      <ul
        ref={trackRef}
        // No auto-rotation: nothing moves unless the reader asks it to.
        className="-mr-5 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pr-5 sm:-mr-8 sm:pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review, i) => (
          <Reveal
            as="li"
            key={review.name}
            delay={i * 60}
            className="w-[min(85vw,26rem)] shrink-0 snap-start"
          >
            <figure className="flex h-full flex-col rounded-lg border border-stone bg-cream p-8 shadow-soft">
              <QuoteIcon className="size-7 text-rust" />
              <blockquote className="mt-5 flex-1 font-display text-[1.3rem] leading-[1.45] text-bark">
                {review.quote}
              </blockquote>
              <figcaption className="mt-7 border-t border-stone pt-5 text-sm">
                <span className="block font-medium text-bark">{review.name}</span>
                <span className="block text-muted">{review.context}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous reviews"
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-stone text-bark transition-colors duration-200 hover:border-cocoa hover:bg-sand"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="More reviews"
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-stone text-bark transition-colors duration-200 hover:border-cocoa hover:bg-sand"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
