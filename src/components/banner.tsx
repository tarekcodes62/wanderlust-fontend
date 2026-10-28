import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", hint: "Address, City Or Zip" },
  { label: "Date/Duration", hint: "Anytime/3 Days" },
  { label: "Budget", hint: "$0-$3000" },
  { label: "People", hint: "5-10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-[560px] flex-col overflow-hidden md:min-h-[640px]">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" aria-hidden />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-32 pt-20 text-center">
        <h1 className="font-display max-w-3xl text-5xl leading-[1.1] text-white sm:text-6xl md:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2 rounded-md bg-brand px-7 py-3.5 text-xs font-semibold tracking-widest text-white uppercase transition-colors hover:bg-brand/85 sm:text-sm"
          >
            Explore Now
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex items-center rounded-md bg-white/25 px-7 py-3.5 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/35 sm:text-sm"
          >
            View Destination
          </Link>
        </div>
      </div>

      <div className="relative z-10 grid w-full grid-cols-2 border-t border-white/15 bg-black/45 backdrop-blur-md md:grid-cols-[repeat(4,1fr)_auto]">
        {searchFields.map((field) => (
          <div
            key={field.label}
            className="flex flex-col justify-center gap-1 border-white/15 px-6 py-5 transition-colors hover:bg-white/5 md:border-l md:first:border-l-0"
          >
            <span className="text-sm font-semibold text-white md:text-base">
              {field.label}
            </span>
            <span className="text-xs text-white/60 md:text-sm">
              {field.hint}
            </span>
          </div>
        ))}
        <button
          type="button"
          className="col-span-2 bg-brand px-12 py-4 text-base font-semibold text-white transition-colors hover:bg-brand/85 md:col-span-1 md:py-5 md:text-lg"
        >
          Search
        </button>
      </div>
    </section>
  );
}
