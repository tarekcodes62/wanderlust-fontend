import type { Metadata } from 'next';

import {
  DestinationsExplorer,
  type Destination,
} from '@/components/destinations-explorer';

export const metadata: Metadata = {
  title: 'Explore All Destinations',
  description:
    'Find your perfect travel experience from our curated collection.',
};

// Always fetch fresh listings at request time instead of baking them in at build.
export const dynamic = 'force-dynamic';

async function getDestinations(): Promise<{
  destinations: Destination[];
  error: string | null;
}> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`);

    if (!res.ok) {
      return {
        destinations: [],
        error: `The destinations API responded with status ${res.status}.`,
      };
    }

    const data: unknown = await res.json();

    return {
      destinations: Array.isArray(data) ? (data as Destination[]) : [],
      error: null,
    };
  } catch {
    return {
      destinations: [],
      error:
        'Could not reach the destinations API at localhost:5000. Make sure the backend server is running.',
    };
  }
}

export default async function DestinationsPage() {
  const { destinations, error } = await getDestinations();

  return (
    <main className="flex-1 px-6 py-10 md:py-14">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl md:text-4xl">Explore All Destinations</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Find your perfect travel experience from our curated collection
        </p>

        {error ? (
          <div
            role="alert"
            className="mt-8 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
          >
            {error}
          </div>
        ) : (
          <DestinationsExplorer destinations={destinations} />
        )}
      </div>
    </main>
  );
}
