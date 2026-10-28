'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, CalendarDays, MapPin, Star } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type Destination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  rating?: number;
  reviews?: number;
};

type FilterOption = {
  value: string;
  label: string;
};

type PriceRangeOption = FilterOption & {
  min?: number;
  max?: number;
};

const categoryOptions: FilterOption[] = [
  { value: '', label: 'All Categories' },
  { value: 'beach', label: 'Beach' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'city', label: 'City' },
  { value: 'nature', label: 'Nature' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'wildlife', label: 'Wildlife' },
  { value: 'budget', label: 'Budget' },
];

const priceRangeOptions: PriceRangeOption[] = [
  { value: '', label: 'All Prices' },
  { value: 'under-500', label: 'Under $500', min: 0, max: 500 },
  { value: '500-999', label: '$500 - $999', min: 500, max: 1000 },
  { value: '1000-1999', label: '$1,000 - $1,999', min: 1000, max: 2000 },
  { value: '2000-plus', label: '$2,000 & above', min: 2000 },
];

const sortOptions: FilterOption[] = [
  { value: '', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

function getVisibleDestinations(
  destinations: Destination[],
  filters: { category: string; priceRange: string; sort: string },
) {
  const range = priceRangeOptions.find(
    option => option.value === filters.priceRange,
  );

  const visible = destinations.filter(destination => {
    if (filters.category && destination.category !== filters.category) {
      return false;
    }
    if (range?.min != null && destination.price < range.min) return false;
    if (range?.max != null && destination.price >= range.max) return false;
    return true;
  });

  switch (filters.sort) {
    case 'price-asc':
      visible.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      visible.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      visible.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      visible.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  return visible;
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={next => onChange(next ?? '')}>
      <SelectTrigger
        aria-label={label}
        className="h-10 w-full justify-between rounded-md pl-3 pr-2.5 font-medium tracking-wider uppercase data-[size=default]:h-10"
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.label} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function DestinationCard({ destination }: { destination: Destination }) {
  const rating = destination.rating ?? 4.5;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl transition-shadow duration-300 hover:shadow-md">
      <div className="relative aspect-16/10 w-full overflow-hidden">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-sm font-semibold text-black shadow-sm">
          {rating.toFixed(1)}
          <Star className="size-3.5 fill-current" aria-hidden />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0" aria-hidden />
          {destination.country}
        </p>

        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <h2 className="min-w-0 flex-1 text-base leading-snug font-semibold">
            {destination.name}
          </h2>
          <p className="shrink-0 text-base font-semibold">
            ${destination.price.toLocaleString('en-US')}
            <span className="text-[10px] font-normal text-muted-foreground">
              /person
            </span>
          </p>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="size-4 shrink-0" aria-hidden />
          {destination.duration}
        </p>

        <Link
          href={`/destinations/${destination._id}`}
          className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold tracking-wider text-brand uppercase transition-colors hover:text-brand/80"
        >
          Book Now
          <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function DestinationsExplorer({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sort, setSort] = useState('');

  const visible = getVisibleDestinations(destinations, {
    category,
    priceRange,
    sort,
  });

  return (
    <div className="mt-8">
      <div className="grid gap-3 sm:grid-cols-3">
        <FilterSelect
          label="Category"
          value={category}
          options={categoryOptions}
          onChange={setCategory}
        />
        <FilterSelect
          label="Price Range"
          value={priceRange}
          options={priceRangeOptions}
          onChange={setPriceRange}
        />
        <FilterSelect
          label="Sort By"
          value={sort}
          options={sortOptions}
          onChange={setSort}
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Showing {visible.length}{' '}
        {visible.length === 1 ? 'destination' : 'destinations'}
      </p>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            {destinations.length === 0
              ? 'No destinations available yet.'
              : 'No destinations match your filters. Try adjusting your filters.'}
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {visible.map(destination => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      )}
    </div>
  );
}
