"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ── Button ───────────────────────────────────────────────────────────────── */

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "quiet" | "light" | "outlineLight";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium tracking-wide " +
  "transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-[var(--ease-calm)] " +
  "cursor-pointer disabled:cursor-not-allowed disabled:opacity-45 active:translate-y-px";

const variants = {
  primary: "bg-cocoa text-cream hover:bg-bark shadow-soft hover:shadow-lift",
  outline: "border border-stone bg-transparent text-bark hover:border-cocoa hover:bg-sand",
  quiet: "text-cocoa underline decoration-stone underline-offset-[6px] hover:decoration-cocoa",
  // For dark photographic backgrounds — declared here rather than patched in
  // via className, so two competing background utilities never race.
  light: "bg-cream text-bark hover:bg-sand shadow-soft hover:shadow-lift",
  outlineLight:
    "border border-cream/40 bg-transparent text-cream hover:border-cream hover:bg-cream/10",
};

const sizes = {
  md: "min-h-11 px-6 text-[0.9375rem]",
  lg: "min-h-13 px-8 text-base",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    variant === "quiet" ? "min-h-11 px-1" : sizes[size],
    className,
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  );
}

/* ── Typographic helpers ──────────────────────────────────────────────────── */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-cocoa",
        className,
      )}
    >
      <span aria-hidden className="h-px w-6 bg-rust" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={cn("flex flex-col gap-5", centered && "items-center text-center", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <div
        className={cn(
          // Side by side on wide screens so the headline is not marooned in the
          // left half of an 80rem container.
          !centered &&
            Boolean(intro) &&
            "grid gap-x-14 gap-y-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end",
        )}
      >
        <h2 className={cn("text-[clamp(1.9rem,1.3rem+2.4vw,3.1rem)]", !centered && "max-w-[19ch]")}>
          {title}
        </h2>
        {intro ? (
          <p className={cn("max-w-[52ch] text-lg text-muted", centered && "mx-auto")}>{intro}</p>
        ) : null}
      </div>
    </div>
  );
}

/* ── Scroll reveal ────────────────────────────────────────────────────────── */

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // One shared ref type across div/section/li/article keeps the callsites simple.
  const Element = Tag as unknown as React.FC<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement | null> }
  >;

  return (
    <Element
      ref={ref}
      data-visible={visible}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={cn("reveal", className)}
    >
      {children}
    </Element>
  );
}

/* ── Accordion (FAQ) ──────────────────────────────────────────────────────── */

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-stone">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className="border-b border-stone">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-cocoa"
              >
                <span className="font-display text-xl leading-snug">{item.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-1.5 shrink-0 text-rust transition-transform duration-300 ease-[var(--ease-calm)]",
                    isOpen && "rotate-45",
                  )}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              hidden={!isOpen}
              className="pb-7 pr-10 text-muted"
            >
              <p className="max-w-[62ch]">{item.a}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
