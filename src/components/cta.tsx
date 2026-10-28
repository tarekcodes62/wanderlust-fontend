import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Cta() {
  return (
    <section className="relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center md:min-h-[400px] md:py-24">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden />

      <div className="relative z-10">
        <h2 className="font-display text-4xl text-white md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-sm text-white/85 md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-3 rounded-md bg-white px-8 py-4 text-xs font-semibold tracking-widest text-foreground uppercase transition-colors hover:bg-white/90 sm:text-sm"
          >
            Book Your Trip Today
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
