/**
 * Line icons, drawn to a shared 24px grid with a 1.25 stroke so they sit
 * quietly next to Karla at label sizes. Decorative by default — every icon is
 * aria-hidden and paired with a real text label in the markup.
 */
type IconProps = { className?: string };

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export const LeafIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M20 4c0 8-5 13-12 13H4c0-8 5-13 12-13h4Z" />
    <path d="M4 20c3-5 6-8 11-10" />
  </svg>
);

export const HandIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M8 12V5.5a1.5 1.5 0 0 1 3 0V11" />
    <path d="M11 10.5V4.5a1.5 1.5 0 0 1 3 0V11" />
    <path d="M14 11V6.5a1.5 1.5 0 0 1 3 0V14" />
    <path d="M8 12v-1a1.5 1.5 0 0 0-3 0v4.5A5.5 5.5 0 0 0 10.5 21h1a5.5 5.5 0 0 0 5.5-5.5V14" />
  </svg>
);

export const FlameIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 3s5 4.5 5 9a5 5 0 0 1-10 0c0-2 1-3.2 2-4.5.6 1.2 1.4 1.8 2 1.8 0-2.5 1-5 1-6.3Z" />
  </svg>
);

export const StoneIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <ellipse cx="12" cy="16.5" rx="8" ry="3.5" />
    <ellipse cx="12" cy="11" rx="6" ry="2.8" />
    <ellipse cx="12" cy="6" rx="4" ry="2" />
  </svg>
);

export const ClockIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </svg>
);

export const ShieldIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 3 4.5 6v5.6c0 4.4 3 8 7.5 9.4 4.5-1.4 7.5-5 7.5-9.4V6L12 3Z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </svg>
);

export const CalendarIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3.5v4M16 3.5v4" />
  </svg>
);

export const MapPinIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const MailIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const PhoneIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M6 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.6 6.6l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.7 2 2 0 0 1 6 3.5Z" />
  </svg>
);

export const ArrowIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const CheckIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

export const QuoteIcon = ({ className }: IconProps) => (
  <svg {...base} className={className} strokeWidth={1}>
    <path d="M9.5 6c-3 1.5-4.5 4-4.5 7.5V18h5.5v-5.5H7c0-2.5.8-4.2 2.5-5.2V6ZM19 6c-3 1.5-4.5 4-4.5 7.5V18H20v-5.5h-3.5c0-2.5.8-4.2 2.5-5.2V6Z" />
  </svg>
);

export const LockIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </svg>
);

export const SparkIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 3.5c0 4 1.5 5.5 5.5 5.5-4 0-5.5 1.5-5.5 5.5 0-4-1.5-5.5-5.5-5.5 4 0 5.5-1.5 5.5-5.5Z" />
    <path d="M18 15.5c0 2 .8 2.8 2.8 2.8-2 0-2.8.8-2.8 2.8 0-2-.8-2.8-2.8-2.8 2 0 2.8-.8 2.8-2.8Z" />
  </svg>
);
