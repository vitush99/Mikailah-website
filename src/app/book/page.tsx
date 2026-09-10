import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking-flow";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Book therapeutic massage in Burnsville, MN in about a minute. Choose a session, a length, any enhancements, and a time.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string; minutes?: string }>;
}) {
  const { session, minutes } = await searchParams;

  return (
    <BookingFlow
      initialSession={session}
      initialMinutes={minutes ? Number(minutes) : undefined}
    />
  );
}
