import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { DestinationDetail } from '@/components/destination-detail';
import type { Destination } from '@/components/destinations-explorer';
import { getTokenFromServer } from '@/lib/getTokenFromServer';

// The API stores MongoDB ObjectIds; anything else can never match.
const OBJECT_ID_PATTERN = /^[0-9a-f]{24}$/i;

async function getDestination(id: string): Promise<{
  destination: Destination | null;
  error: string | null;
}> {
  const token = await getTokenFromServer();

  if (!OBJECT_ID_PATTERN.test(id)) {
    return { destination: null, error: null };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`,
      {
        headers: {
          authorization: `bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      return {
        destination: null,
        error: `The destinations API responded with status ${res.status}.`,
      };
    }

    let data: unknown;
    try {
      data = await res.json();
    } catch {
      // Empty or invalid body means the backend found no matching destination.
      return { destination: null, error: null };
    }

    if (!data || typeof data !== 'object') {
      return { destination: null, error: null };
    }

    return { destination: data as Destination, error: null };
  } catch {
    return {
      destination: null,
      error:
        'Could not reach the destinations API at localhost:5000. Make sure the backend server is running.',
    };
  }
}

export async function generateMetadata({
  params,
}: PageProps<'/destinations/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const { destination } = await getDestination(id);

  if (!destination) {
    return { title: 'Destination Not Found' };
  }

  return {
    title: destination.name,
    description: destination.description,
  };
}

export default async function DestinationPage({
  params,
}: PageProps<'/destinations/[id]'>) {
  const { id } = await params;
  const { destination, error } = await getDestination(id);

  if (error) {
    return (
      <main className="flex-1 px-6 py-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          <div
            role="alert"
            className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
          >
            <p>{error}</p>
            <Link
              href="/destinations"
              className="mt-3 inline-block font-semibold underline underline-offset-4"
            >
              Back to Destinations
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!destination) {
    notFound();
  }

  return (
    <main className="flex-1">
      <DestinationDetail destination={destination} />
    </main>
  );
}
