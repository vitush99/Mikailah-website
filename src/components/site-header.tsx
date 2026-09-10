"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business, nav } from "@/lib/data";
import { cn } from "./ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Only the home page has a full-bleed dark hero to sit on top of.
  const overlay = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const light = overlay && !scrolled && !menuOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-cocoa focus:px-5 focus:py-3 focus:text-cream"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-calm)]",
          light
            ? "bg-transparent"
            : "bg-cream/92 shadow-[0_1px_0_0_var(--color-stone)] backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[80rem] items-center justify-between gap-6 px-5 sm:px-8 lg:h-20">
          <Link
            href="/"
            className={cn(
              "font-display text-[1.0625rem] leading-tight tracking-[0.01em] transition-colors duration-300 sm:text-lg",
              light ? "text-cream" : "text-bark",
            )}
          >
            <span className="block">Mikailah&rsquo;s</span>
            <span
              className={cn(
                "block text-[0.6875rem] font-sans font-semibold uppercase tracking-[0.28em]",
                light ? "text-marigold" : "text-cocoa",
              )}
            >
              House of Healing
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-[0.9375rem] transition-colors duration-200",
                    light ? "text-cream/85 hover:text-cream" : "text-muted hover:text-bark",
                    active && (light ? "text-cream" : "text-bark"),
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-[var(--ease-calm)]",
                      active && "scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/book"
              className={cn(
                "hidden min-h-11 items-center rounded-full px-6 text-[0.9375rem] font-medium transition-all duration-200 ease-[var(--ease-calm)] sm:inline-flex",
                light
                  ? "border border-cream/45 text-cream hover:bg-cream hover:text-bark"
                  : "bg-cocoa text-cream shadow-soft hover:bg-bark hover:shadow-lift",
              )}
            >
              Book a session
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={cn(
                "-mr-2 inline-flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors lg:hidden",
                light ? "text-cream hover:bg-cream/15" : "text-bark hover:bg-sand",
              )}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                <path
                  d={menuOpen ? "M4 4l14 14M18 4L4 18" : "M2.5 7h17M2.5 15h17"}
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-0 z-40 bg-cream pt-[4.5rem] lg:hidden"
      >
        <nav aria-label="Mobile" className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-6">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-stone">
                <Link
                  href={item.href}
                  className="flex items-baseline gap-4 py-5 font-display text-3xl text-bark"
                >
                  <span className="font-sans text-xs text-cocoa tabular-nums">
                    0{i + 1}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/book"
            className="mt-9 inline-flex min-h-14 items-center justify-center rounded-full bg-cocoa px-8 text-cream shadow-soft"
          >
            Book a session
          </Link>
          <p className="mt-8 text-sm text-muted">
            {business.addressLine} &middot;{" "}
            <a href={`tel:${business.phone.replace(/\D/g, "")}`} className="underline underline-offset-4">
              {business.phone}
            </a>
          </p>
        </nav>
      </div>
    </>
  );
}
