import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Check, MapPin, Star } from 'lucide-react';

import type { Destination } from '@/components/destinations-explorer';
import EditDestinationDialog from './EditDestinationDialog';
import DeleteDestinationDilog from './DeleteDestinationDilog';
import DestinationDetailSide from './DestinationDetailSide';

const highlightsByCategory: Record<string, string[]> = {
  beach: [
    'Luxury beachfront accommodation',
    'Visit Uluwatu Temple at sunset',
    'Traditional Balinese spa treatment',
    'Private beach dinner experience',
    'Sunrise trek to Mount Batur',
  ],
  adventure: [
    'Guided mountain trek',
    'White-water rafting session',
    'Camping under the stars',
    'Local village homestay',
    'Certified adventure guide',
  ],
  cultural: [
    'UNESCO heritage site tour',
    'Traditional cooking class',
    'Local craft workshop',
    'Folk dance performance',
    'Ancient temple visit',
  ],
  city: [
    'Iconic landmarks tour',
    'Rooftop city views',
    'Local street food crawl',
    'Nightlife experience',
    'Shopping district visit',
  ],
  nature: [
    'National park entry',
    'Guided nature trail',
    'Birdwatching session',
    'Waterfall excursion',
    'Eco-lodge stay',
  ],
  luxury: [
    'Five-star resort stay',
    'Private pool villa',
    'Gourmet fine dining',
    'Spa and wellness package',
    'Chauffeur transfers',
  ],
  wildlife: [
    'Safari game drive',
    'Naturalist wildlife guide',
    'Jungle trek',
    'Wildlife photography spots',
    'Bird sanctuary visit',
  ],
  budget: [
    'Comfortable hostel stay',
    'Local market tours',
    'Public transport pass',
    'Group activities',
    'Affordable eats guide',
  ],
};

const defaultHighlights = [
  'Hand-picked accommodations',
  'Local guided tours',
  'Authentic local cuisine',
  'Hassle-free transfers',
  '24/7 trip support',
];

export function DestinationDetail({
  destination,
}: {
  destination: Destination;
}) {
  const highlights =
    highlightsByCategory[destination.category] ?? defaultHighlights;
  const rating = destination.rating ?? 4.9;
  const reviews = destination.reviews ?? 234;

  return (
    <>
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2 text-sm transition-colors hover:text-brand"
          >
            <ArrowLeft
              className="size-4 transition-transform group-hover:-translate-x-1"
              aria-hidden
            />
            Back to Destinations
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <EditDestinationDialog destination={destination} />

            <DeleteDestinationDilog id={destination._id} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-6 pb-14">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl md:aspect-2/1">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            priority
            sizes="(min-width: 1280px) 1232px, calc(100vw - 48px)"
            className="object-cover"
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="min-w-0 lg:col-span-2">
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" aria-hidden />
              {destination.country}
            </p>

            <h1 className="mt-2 text-4xl md:text-5xl">{destination.name}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5">
                <Star
                  className="size-4 fill-green-500 text-green-500"
                  aria-hidden
                />
                <span className="font-semibold">{rating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({reviews} reviews)
                </span>
              </span>

              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="size-4" aria-hidden />
                {destination.duration}
              </span>
            </div>

            <section className="mt-8">
              <h2 className="text-lg font-semibold">Overview</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                {destination.description}
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-lg font-semibold">Highlights</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                {destination.description}
              </p>

              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {highlights.map(highlight => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-green-500"
                      aria-hidden
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <DestinationDetailSide destination={destination} />
        </div>
      </div>
    </>
  );
}
