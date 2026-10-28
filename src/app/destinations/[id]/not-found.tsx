import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex-1 px-6 py-16 text-center md:py-24">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl md:text-4xl">Destination not found</h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          The destination you are looking for doesn&apos;t exist or may have
          been removed.
        </p>
        <Link
          href="/destinations"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/85"
        >
          Back to Destinations
        </Link>
      </div>
    </main>
  );
}
