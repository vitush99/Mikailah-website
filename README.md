# Mikailah's House of Healing

Front-end for a licensed massage practice in Burnsville, MN. Next.js 16 (App
Router) + React 19 + Tailwind v4, no database, no external services.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start        # serve the production build
```

No hosting provider is wired up. The only dependencies are `next`, `react` and
`react-dom` (plus TypeScript, Tailwind and ESLint for the build) — no analytics,
no SDKs, no platform-specific config. It will run anywhere that can run Node.

The one thing to set wherever it eventually lands is `NEXT_PUBLIC_SITE_URL`,
which feeds `sitemap.xml`, `robots.txt` and the page metadata. See
[`src/lib/site.ts`](src/lib/site.ts).

## Pages

| Route | What it is |
|---|---|
| `/` | Hero → meet Mikailah → three sessions → pricing → enhancements → reviews → trust/privacy → shop teaser → closing CTA |
| `/services` | Full detail on each session, then the three price cards |
| `/enhancements` | Four add-on categories, 14 enhancements (modelled on the "Enhancements" page she liked at thenowmassage.com) |
| `/about` | Her longer story, credentials and training |
| `/book` | Four-step booking flow (see below) |
| `/shop` | Gift cards / packages / oils / jewelry, gated behind a waitlist |
| `/faq` | Eight questions in an accordion |
| `/privacy` | Legality, privacy, consent, draping, scope of practice |
| `/contact` | Hours, details, message form, map placeholder |

## Editing content

**Almost everything lives in [`src/lib/data.ts`](src/lib/data.ts)** — business
details, hours, the "meet Mikailah" intro, prices, the three sessions, every
enhancement, reviews, FAQ answers, shop items and the nav. Search that file for
`TODO:` to find every value that still needs her real information:

- the final business name (currently "Mikailah's House of Healing")
- street address, phone, email, Instagram
- licence number and year established
- the 90 and 120 minute prices — $85 for 60 minutes is her number, the other two are proposals
- real reviews (currently written from the brief, marked as placeholders)
- HSA/FSA confirmation in the FAQ
- her longer story paragraphs in `src/app/about/page.tsx`

## Pricing

One price per length, the same for every session on the menu — no tiers, no
sliding scale, nothing to choose between beyond how long you want.

| Length | Price |
|---|---|
| 60 minutes | $85 |
| 90 minutes | $120 |
| 120 minutes | $155 |

Enhancements are added on top and priced individually ($0–$30). Change any of
this in the `pricing` array in `src/lib/data.ts`; every page and the booking
flow read from it.

## What is real and what is mocked

Everything is a working front end; three things are deliberately not wired to a
backend, because no provider has been chosen yet:

| Thing | Where | To make it real |
|---|---|---|
| Booking availability | `slotsForDate()` in `src/components/booking-flow.tsx` | Replace with a fetch against MassageBook / Square / Acuity / Cal.com |
| Booking submission | `handleConfirm()`, same file | POST to the provider, or hand off to its checkout URL |
| Newsletter signup | `src/components/newsletter.tsx` | Mailchimp, Buttondown or Resend |
| Contact form | `src/components/contact-form.tsx` | Any transactional email API |

The booking flow shows a "this is a design prototype" note on its confirmation
screen — remove that line once it actually books.

## Design system

Palette (`src/app/globals.css`, `@theme`) — "70's Vibes", muted earthy base with
rust, marigold, avocado and a single teal accent:

| Token | Hex | Use | Contrast on cream |
|---|---|---|---|
| `cream` | `#FBF5E9` | page background | — |
| `sand` | `#F3E7D3` | raised surfaces, alternating bands | — |
| `stone` | `#E2D2B4` | borders and rules | — |
| `rust` | `#B04E1B` | primary action, accents, large numerals | 4.9:1 |
| `cocoa` | `#5A3A24` | dark buttons, small caps labels | 9.4:1 |
| `bark` | `#33241A` | body text, dark sections | 13.7:1 |
| `muted` | `#77604B` | secondary text | 5.4:1 |
| `olive` | `#6E6B2E` | secondary accent, icons | 5.1:1 |
| `marigold` | `#E9A227` | **accent on dark sections only** | 2.0:1 on cream, 6.9:1 on bark |
| `avocado` | `#B9BE7A` | **decorative / on dark only** | 1.8:1 on cream, 7.6:1 on bark |
| `teal` | `#5FB9A0` | **decorative / on dark only** | 2.0:1 on cream, 6.3:1 on bark |
| `alert` | `#9A2E1E` | form errors | 6.6:1 |

The rule that keeps it readable: rust/cocoa/olive carry light backgrounds,
marigold/avocado/teal carry dark ones. Nothing under 24px uses a token below
4.5:1 on its own background.

Type is Fraunces (display) over Karla (body), both via `next/font`.

Motion is a single `Reveal` component using IntersectionObserver. The hidden
state is scoped to `html[data-js]`, set by an inline script, so a scripting
failure renders the page plainly visible rather than blank. All motion is
disabled under `prefers-reduced-motion`.

## Photography

`public/images/mikailah.jpg` is her own headshot, cropped out of the staff photo
on her current practice's website — it is only ~380px at source, so it should be
reshot before launch.

Everything else is temporary stock from Pexels, used under the
[Pexels licence](https://www.pexels.com/license/) (free for commercial use, no
attribution required), colour-graded to one warm key by the `.grade` utility.
Replace them with her own photographs at the same aspect ratios and update the
`imageAlt` strings in `src/lib/data.ts`.
