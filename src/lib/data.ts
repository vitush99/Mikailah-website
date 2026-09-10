/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit this one file to change almost everything on the site.
 *
 *  Every price, service description, add-on, review, FAQ answer and hour of
 *  operation lives here. Nothing below requires touching the layout code.
 *  Placeholder copy is marked with  // TODO:  where Mikailah's real words go.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const business = {
  name: "Mikailah's House of Healing", // TODO: confirm the final business name
  shortName: "House of Healing",
  owner: "Mikailah",
  credential: "LMT",
  licenseNumber: "MN Licensed Massage Therapist", // TODO: add licence number
  tagline: "Bodywork that meets you where you are.",
  city: "Minneapolis",
  state: "MN",
  addressLine: "Minneapolis, Minnesota", // TODO: full street address
  phone: "(952) 000-0000", // TODO
  email: "mikailahc@yahoo.com", // TODO
  instagram: "https://instagram.com/", // TODO
  established: 2019, // TODO
};

export const hours = [
  { day: "Monday", value: "By appointment" },
  { day: "Tuesday", value: "10:00a – 7:00p" },
  { day: "Wednesday", value: "10:00a – 7:00p" },
  { day: "Thursday", value: "10:00a – 7:00p" },
  { day: "Friday", value: "10:00a – 5:00p" },
  { day: "Saturday", value: "9:00a – 3:00p" },
  { day: "Sunday", value: "Closed" },
];

/* ── Meet Mikailah (home page intro) ──────────────────────────────────────── */

export const intro = {
  eyebrow: "Meet your therapist",
  heading: "Hi, I’m Mikailah.",
  // Adapted from her bio on her current practice's website — reword in her
  // own voice before launch.
  body: [
    "I’m a licensed massage therapist in Burnsville, trained across a wide range of therapeutic techniques. I came to this work through a plain desire to help people heal, in body, mind and spirit.",
    "Massage is both therapeutic and deeply restorative. Whether you want to fully unwind, work on chronic tension or pain, or move toward a specific physical goal, my job is to make a safe, intentional space where your body can reset, rebalance and recover.",
    "Massage keeps proving to be one of the most powerful forms of healing I know, and I’d be honored to walk part of your path with you.",
  ],
  portrait: "/images/mikailah.jpg",
  portraitAlt: "Mikailah, licensed massage therapist, smiling outdoors in front of blossoming branches",
  // TODO: swap for a higher-resolution photo — this one is lifted from her
  // current site and only about 380px across at source.
  techniques: [
    "Swedish massage",
    "Lymphatic drainage",
    "Myofascial release",
    "Hot stone therapy",
    "Cupping",
    "Deep tissue work",
    "Muscle energy techniques",
    "Postural retraining",
  ],
};

/* ── Pricing ──────────────────────────────────────────────────────────────── */

export type Price = {
  minutes: number;
  price: number;
  blurb: string;
};

/** One price per length. Same price for every session on the menu. */
// TODO: confirm the 90 and 120 minute prices — $85 for 60 is Mikailah's number.
export const pricing: Price[] = [
  {
    minutes: 60,
    price: 85,
    blurb: "Enough for a full-body session, or focused work on one or two areas.",
  },
  {
    minutes: 90,
    price: 120,
    blurb: "The one most people settle into. Full body and real time on the trouble spots.",
  },
  {
    minutes: 120,
    price: 155,
    blurb: "Room for full-body work and a long stretch on whatever needs it most. Pairs well with an enhancement or two.",
  },
];

export const priceFor = (minutes: number) =>
  pricing.find((p) => p.minutes === minutes)?.price ?? pricing[0].price;

export const pricingNote =
  "One price per length, the same for every session on the menu. Nothing is charged online. You pay at the studio afterwards, by card, cash, HSA or FSA.";

/* ── Sessions ─────────────────────────────────────────────────────────────── */

export type Session = {
  slug: string;
  name: string;
  subtitle: string;
  summary: string;
  description: string;
  bestFor: string[];
  pressure: string;
  durations: number[];
  image: string;
  imageAlt: string;
};

export const sessions: Session[] = [
  {
    slug: "grounding",
    name: "The Grounding",
    subtitle: "Slow, full-body, nervous-system work",
    summary:
      "Unhurried Swedish-style bodywork for a body that has been running on adrenaline. Long strokes, steady pressure, nowhere to be.",
    description:
      "This is the session for a nervous system that's forgotten how to stand down. Warm oil, long connected strokes, and enough time that your breathing changes without you deciding to. Pressure stays light to medium the whole way through. The aim is to convince your body it's safe to let go.",
    bestFor: ["Stress and burnout", "Trouble sleeping", "First-time massage", "Anxiety in the body"],
    pressure: "Light – medium",
    durations: [60, 90, 120],
    image: "/images/session-grounding.jpg",
    imageAlt: "Therapist's hands resting on a client's upper back during slow, full-body bodywork",
  },
  {
    slug: "release",
    name: "The Release",
    subtitle: "Focused deep tissue and trigger point",
    summary:
      "Specific, patient work into the places that have been holding for years. Deep, but never a fight. We go at the speed your tissue allows.",
    description:
      "Deep tissue that goes slowly instead of just leaning harder. We spend the session on the two or three areas asking for it, usually neck, shoulders, low back and hips, using sustained pressure, trigger point work, muscle energy techniques and stretching. You stay in conversation with me the whole time, and you set the depth.",
    bestFor: ["Desk-job neck and shoulders", "Low back and hips", "Old injuries", "Athletes in training"],
    pressure: "Medium – firm",
    durations: [60, 90, 120],
    image: "/images/session-release.jpg",
    imageAlt: "Close-up of hands applying firm, focused pressure along a client's shoulder",
  },
  {
    slug: "integrative",
    name: "The Integrative",
    subtitle: "Built around what your body brings that day",
    summary:
      "No fixed script. We talk first, then blend myofascial work, lymphatic drainage, cupping and stretching around whatever showed up.",
    description:
      "Some days you arrive and the plan you made two weeks ago isn't the session you need. This one starts with a real conversation and stays flexible: myofascial release, lymphatic drainage, cupping, assisted stretching, postural retraining, whatever the body in front of me is asking for. Good for people managing something ongoing, and for anyone who'd rather be met than treated.",
    bestFor: ["Chronic pain", "Pregnancy and postpartum", "Post-surgical swelling", "Return clients"],
    pressure: "Your call, adjusted throughout",
    durations: [60, 90, 120],
    image: "/images/session-integrative.jpg",
    imageAlt: "Therapist working slowly through a client's hand and forearm in warm light",
  },
];

/* ── Enhancements ─────────────────────────────────────────────────────────── */

export type Enhancement = {
  slug: string;
  name: string;
  price: number;
  minutes: number | null;
  blurb: string;
  category: string;
};

export const enhancementCategories = [
  {
    id: "botanicals",
    name: "Aromatherapy & Botanicals",
    image: "/images/enh-aroma.jpg",
    imageAlt: "Amber glass essential-oil bottles scattered with dried herbs and eucalyptus",
    intro:
      "Scent reaches the nervous system faster than touch does. Everything here is blended in small batches, in-house.",
  },
  {
    id: "heat",
    name: "Heat & Hot Stone",
    image: "/images/enh-stone.jpg",
    imageAlt: "Warm basalt stones resting along a client's oiled back",
    intro:
      "Heat does half the work before my hands arrive. Tissue softens, guarding drops, and everything after goes deeper with less pressure.",
  },
  {
    id: "focus",
    name: "Targeted Focus",
    image: "/images/enh-focus.jpg",
    imageAlt: "Therapist's hands cradling a client's head during scalp and face work",
    intro:
      "Small areas that carry a disproportionate amount. Add one when you know exactly where you're holding it.",
  },
  {
    id: "tools",
    name: "Tools & Techniques",
    image: "/images/enh-tools.jpg",
    imageAlt: "Jade gua sha stone and roller arranged on a dark wooden tray",
    intro:
      "Modalities that ask something different of the tissue than hands alone can. Added inside your session, never rushed.",
  },
];

export const enhancements: Enhancement[] = [
  {
    slug: "custom-blend",
    name: "Custom Oil Blend",
    price: 15,
    minutes: null,
    category: "botanicals",
    blurb: "We pick a blend from the shelf together and I mix it fresh into your oil. Grounding, clearing, or something for sleep.",
  },
  {
    slug: "herbal-compress",
    name: "Warm Herbal Compress",
    price: 25,
    minutes: 15,
    category: "botanicals",
    blurb: "Steamed muslin bundles of ginger, lemongrass and eucalyptus, pressed and rolled along the back and shoulders.",
  },
  {
    slug: "aroma-steam",
    name: "Eucalyptus Steam Towel",
    price: 10,
    minutes: 5,
    category: "botanicals",
    blurb: "A hot eucalyptus towel over the face and sinuses when you turn over. People tend to ask for it every visit after the first.",
  },
  {
    slug: "hot-stone",
    name: "Hot Stone Integration",
    price: 30,
    minutes: 20,
    category: "heat",
    blurb: "Heated basalt worked into the back and shoulders rather than placed on you and left to sit.",
  },
  {
    slug: "back-warmth",
    name: "Warm Towel Wrap",
    price: 15,
    minutes: 10,
    category: "heat",
    blurb: "Layered hot towels across the back or low belly while I work somewhere else.",
  },
  {
    slug: "heated-table",
    name: "Heated Table & Blanket",
    price: 0,
    minutes: null,
    category: "heat",
    blurb: "Always included, never an upcharge. Say the word if you run cold and I'll turn it up before you arrive.",
  },
  {
    slug: "scalp-face",
    name: "Scalp & Face Work",
    price: 20,
    minutes: 15,
    category: "focus",
    blurb: "Jaw, temples, scalp, and the small muscles behind the ears. For clenchers, screen-starers, and headache people.",
  },
  {
    slug: "foot-scrub",
    name: "Peppermint Foot Scrub",
    price: 20,
    minutes: 15,
    category: "focus",
    blurb: "Sea salt and peppermint, then a hot towel and a proper foot massage.",
  },
  {
    slug: "extended-focus",
    name: "Extended Focus Area",
    price: 25,
    minutes: 20,
    category: "focus",
    blurb: "Twenty more minutes spent entirely on one region. Useful when one shoulder has been the whole story for a year.",
  },
  {
    slug: "hand-arm",
    name: "Hand & Forearm Detail",
    price: 20,
    minutes: 15,
    category: "focus",
    blurb: "Detailed work through the forearms, palms and each finger. For nurses, hairstylists, climbers, and everyone who types.",
  },
  {
    slug: "cupping",
    name: "Cupping",
    price: 30,
    minutes: 20,
    category: "tools",
    blurb: "Silicone and glass cupping to lift and decompress tissue. Marks are normal, painless, and gone within a week.",
  },
  {
    slug: "lymphatic",
    name: "Lymphatic Drainage",
    price: 25,
    minutes: 15,
    category: "tools",
    blurb: "Light, rhythmic work along the lymphatic pathways to move fluid and reduce swelling. The pressure stays very light throughout.",
  },
  {
    slug: "dry-brushing",
    name: "Dry Brushing",
    price: 15,
    minutes: 10,
    category: "tools",
    blurb: "A brisk full-body brush before oil, following lymphatic flow. Wakes the skin up and gets things moving.",
  },
  {
    slug: "cbd-arnica",
    name: "CBD or Arnica Balm",
    price: 20,
    minutes: null,
    category: "tools",
    blurb: "Applied to the areas doing the most complaining. Choose CBD, arnica, or both. Non-psychoactive, third-party tested.",
  },
];

/* ── Reviews ──────────────────────────────────────────────────────────────── */
// TODO: replace with real reviews pulled from MassageBook / Google

export const reviews = [
  {
    quote:
      "I've had a lot of massages and this was the first one where someone asked what I wanted out of the hour before starting. I said my neck. She spent most of the time on my hips, told me why, and she was right.",
    name: "Marissa K.",
    context: "Client since 2022",
  },
  {
    quote:
      "Found the spot in my shoulder that three other people had worked around. Then explained what was going on in there, which nobody had bothered to do.",
    name: "Devon R.",
    context: "The Release, 90 min",
  },
  {
    quote:
      "Deep tissue that didn't wreck me for three days afterwards. She checked in about pressure the whole way through, which I wasn't used to.",
    name: "Anh T.",
    context: "The Release, 60 min",
  },
  {
    quote:
      "I came in five months pregnant and pretty nervous about the whole thing. The bolsters were already set up when I walked in and she knew exactly how to position me. I booked the next one before I left.",
    name: "Sara L.",
    context: "The Integrative, 90 min",
  },
  {
    quote:
      "Add the hot stones. Book the 90.",
    name: "Jordan P.",
    context: "The Release + Hot Stone",
  },
];

/* ── FAQ ──────────────────────────────────────────────────────────────────── */

export const faqs = [
  {
    q: "What does a session cost?",
    a: "$85 for 60 minutes, $120 for 90, and $155 for two hours, the same price whichever session you book. Enhancements are priced individually on top, mostly between $10 and $30. Nothing is charged when you book. You pay at the studio afterwards.",
  },
  {
    q: "What should I expect at my first visit?",
    a: "Arrive a few minutes early to fill out a short health intake and consent form. We talk for five to ten minutes about what brought you in, what you want out of the session, and anywhere you'd rather I not work. Then I step out, you get comfortable under the sheet, and we begin.",
  },
  {
    q: "Do I have to undress completely?",
    a: "No. Undress to whatever level you're comfortable with. Plenty of clients keep underwear on, and some stay fully clothed for certain work. You're draped with a sheet the entire session, and only the area being worked on is uncovered.",
  },
  {
    q: "Is this a spa or a clinic?",
    a: "Somewhere in between. The room is warm and quiet like a spa, and the work is specific and therapeutic like a clinic. You won't get an assembly-line hour here.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Give me 24 hours' notice if you can, so I can offer the time to someone else. There's no cancellation fee. Things come up last minute, and I'd much rather get a text than sit with an empty room, so let me know either way.",
  },
  {
    q: "Can I book a massage while pregnant?",
    a: "Yes, after the first trimester, with side-lying positioning and proper bolstering. Book The Integrative and mention it in your notes so I can set the room up ahead of time. If you have a high-risk pregnancy, please bring clearance from your provider.",
  },
  {
    q: "Do you take insurance or HSA/FSA?",
    a: "I don't bill insurance directly, but I can give you an itemized receipt for reimbursement. HSA and FSA cards are accepted for medically necessary massage. Check with your plan first.", // TODO: confirm
  },
  {
    q: "How often should I come in?",
    a: "For general stress and maintenance, every four to six weeks holds well. If we're working on a specific injury or chronic pattern, weekly or biweekly for the first month or two moves things much faster. I'll tell you when you no longer need to come as often.",
  },
];

/* ── Shop (coming soon) ───────────────────────────────────────────────────── */

export const shopItems = [
  {
    name: "Gift Cards",
    blurb: "Any amount, or a specific session. Delivered by email or printed on cotton paper for handing over in person.",
    status: "Coming soon",
    image: "/images/shop-gift.jpg",
    imageAlt: "A single eucalyptus sprig casting a soft shadow on cream linen",
  },
  {
    name: "Session Packages",
    blurb: "Three or six sessions, prepaid at a reduced rate, shareable with someone in your household.",
    status: "Coming soon",
    image: "/images/texture-linen.jpg",
    imageAlt: "Folds of natural cream linen in soft light",
  },
  {
    name: "Small-Batch Oils",
    blurb: "The same blends I use on the table, bottled in amber glass. Grounding, clearing, and rest.",
    status: "Coming soon",
    image: "/images/shop-oils.jpg",
    imageAlt: "Amber glass oil bottles surrounded by dried botanicals",
  },
  {
    name: "Jewelry & Stones",
    blurb: "Hand-selected pieces made in small runs, priced so people can afford them.",
    status: "Coming soon",
    image: "/images/texture-ceramic.jpg",
    imageAlt: "Smooth pale stones and ceramic vessels arranged on a warm surface",
  },
];

/* ── Navigation ───────────────────────────────────────────────────────────── */

export const nav = [
  { href: "/services", label: "Sessions" },
  { href: "/enhancements", label: "Enhancements" },
  { href: "/about", label: "About Mikailah" },
  { href: "/shop", label: "Shop" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Visit" },
];
