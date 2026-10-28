"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person1.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person2.png",
  },
];

// Duplicated so the looped carousel always has slides to scroll to, even
// when two cards already fit on screen.
const slides = [...testimonials, ...testimonials];

function CarouselArrows() {
  const { scrollPrev, scrollNext } = useCarousel();

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        aria-label="Previous testimonials"
        className="size-10 rounded-full"
        onClick={scrollPrev}
      >
        <ArrowLeft className="size-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Next testimonials"
        className="size-10 rounded-full"
        onClick={scrollNext}
      >
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Carousel opts={{ align: "start", loop: true }}>
          <div className="flex items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                Real experiences from our happy travelers
              </p>
            </div>
            <CarouselArrows />
          </div>

          <CarouselContent className="mt-8 md:-ml-6">
            {slides.map((testimonial, index) => (
              <CarouselItem
                key={index}
                aria-hidden={index >= testimonials.length}
                className="md:basis-1/2 md:pl-6"
              >
                <figure className="flex h-full gap-5 rounded-xl border border-border bg-white p-5 md:p-6">
                  <div className="flex flex-1 flex-col justify-between">
                    <blockquote className="font-display text-sm leading-relaxed md:text-base">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                    <figcaption className="mt-5">
                      <p className="text-sm font-medium">
                        <span aria-hidden className="text-brand">
                          —{" "}
                        </span>
                        {testimonial.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </figcaption>
                  </div>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={160}
                    height={192}
                    className="h-48 w-40 shrink-0 rounded-lg object-cover md:h-[13.5rem] md:w-[11.25rem]"
                  />
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
