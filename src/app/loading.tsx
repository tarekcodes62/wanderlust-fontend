import { Compass, MapPin } from 'lucide-react';

export default function Loading() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-background px-4 py-12">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        {/* Animated icon */}
        <div className="relative mb-7 flex size-24 items-center justify-center rounded-full bg-cyan-500/10">
          <div className="absolute inset-0 animate-ping rounded-full border border-cyan-500/30" />

          <Compass
            className="size-12 animate-spin text-cyan-600"
            strokeWidth={1.5}
          />

          <MapPin className="absolute -right-1 -top-1 size-7 rounded-full bg-background p-1 text-cyan-600" />
        </div>

        {/* Loading text */}
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Preparing Your Journey
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Discovering amazing destinations for you...
        </p>

        {/* Animated progress bar */}
        <div className="mt-7 h-1.5 w-full max-w-56 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/3 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-cyan-600" />
        </div>

        <p className="mt-4 animate-pulse text-xs text-muted-foreground">
          Please wait a moment
        </p>
      </div>

      <style>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </main>
  );
}
