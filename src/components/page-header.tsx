import Image from "next/image";
import { Eyebrow } from "./ui";

export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <header className="relative isolate overflow-hidden border-b border-stone bg-sand">
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="grade -z-20 object-cover opacity-30"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(241,231,218,0.72),rgba(241,231,218,0.94))]"
          />
        </>
      ) : null}

      <div className="mx-auto max-w-[80rem] px-5 pb-16 pt-28 sm:px-8 sm:pb-14 sm:pt-32">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-[17ch] text-[clamp(2.4rem,1.5rem+3.6vw,4.5rem)]">
          {title}
        </h1>
        {intro ? (
          <p className="mt-7 max-w-[58ch] text-lg text-muted">{intro}</p>
        ) : null}
      </div>
    </header>
  );
}
