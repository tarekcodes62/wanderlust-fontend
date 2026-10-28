import Link from 'next/link';
import { ArrowLeft, ArrowRight, Compass, MapPin } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background px-4 py-16 sm:px-6">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-2xl text-center">
        {/* Illustration */}
        <div className="relative mx-auto mb-8 flex size-36 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/5 sm:size-44">
          <div className="absolute inset-3 rounded-full border border-dashed border-cyan-500/30" />

          <Compass
            className="size-20 text-cyan-600 sm:size-24"
            strokeWidth={1.2}
          />

          <div className="absolute right-2 top-5 flex size-10 items-center justify-center rounded-full bg-cyan-600 text-white shadow-lg sm:right-3">
            <MapPin className="size-5" />
          </div>
        </div>

        {/* Error code */}
        <p className="text-7xl font-extrabold tracking-tight text-cyan-600 sm:text-8xl">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops! You’re Lost
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
          Looks like this destination doesn’t exist. The page you’re looking for
          may have been moved or removed. Let’s get you back on the right track!
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>

          <Link
            href="/destinations"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
          >
            Explore Destinations
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <p className="mt-10 text-xs text-muted-foreground sm:text-sm">
          Lost your way? Every great journey starts somewhere.
        </p>
      </div>
    </main>
  );
}
