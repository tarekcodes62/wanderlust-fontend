import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
} from 'lucide-react';

interface Destination {
  _id: string;
  name: string;
  country: string;
  imageUrl: string;
  price: number;
  duration: string;
  rating?: number;
  slug?: string;
}

const FeaturesDestination = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/features`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch featured destinations');
  }

  const featuresData: Destination[] = await res.json();

  return (
    <section className="overflow-hidden bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Featured Destinations
            </h2>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="inline-flex shrink-0 items-center gap-2 border border-cyan-500 px-3 py-2 text-xs font-medium text-cyan-700 transition hover:bg-cyan-600 hover:text-white sm:px-4"
          >
            All Destinations
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Destination Cards */}
        {featuresData.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
            No featured destinations available right now.
          </div>
        ) : (
          <div className="grid grid-flow-col auto-cols-[85%] gap-4 overflow-x-auto pb-4 snap-x snap-mandatory sm:auto-cols-[48%] lg:auto-cols-[32%]">
            {featuresData.map(destination => (
              <article
                key={destination._id}
                className="group min-w-0 snap-start"
              >
                {/* Image */}
                <Link
                  href={`/destinations/${destination.slug ?? destination._id}`}
                  className="relative block aspect-[4/3] overflow-hidden bg-muted"
                >
                  <Image
                    src={destination.imageUrl}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 32vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-sm bg-white/95 px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm">
                    {destination.rating ?? '4.5'}
                    <Star className="size-3 fill-yellow-400 text-yellow-400" />
                  </span>

                  <span className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-white text-gray-900 opacity-0 transition group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>

                {/* Details */}
                <div className="pt-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      {destination.country}
                    </p>

                    <p className="shrink-0 text-sm font-semibold text-foreground">
                      ${destination.price.toLocaleString('en-US')}
                      <span className="text-[10px] font-normal text-muted-foreground">
                        /Person
                      </span>
                    </p>
                  </div>

                  <h3 className="mt-1 truncate text-lg font-medium text-foreground">
                    {destination.name}
                  </h3>

                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    {destination.duration}
                  </p>

                  <Link
                    href={`/destinations/${destination.slug ?? destination._id}`}
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-cyan-700 transition hover:text-cyan-900"
                  >
                    Book Now
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Footer / Carousel navigation */}
        <div className="mt-3 flex items-center gap-4 border-t border-border pt-4">
          <p className="shrink-0 text-sm text-muted-foreground">
            {featuresData.length > 0
              ? `1–${featuresData.length} destinations`
              : '0 destinations'}
          </p>

          <div className="h-px flex-1 bg-border" />

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Previous destinations"
              disabled
              className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground disabled:opacity-50"
            >
              <ChevronLeft className="size-4" />
            </button>

            <button
              type="button"
              aria-label="Next destinations"
              className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-cyan-600 hover:text-cyan-600"
              onClick={undefined}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesDestination;
