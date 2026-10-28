'use client';
import Link from 'next/link';
import { CalendarDays, Eye, MapPin } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getTokenFromClient } from '@/lib/getTokenFromClient';

export interface Booking {
  bookingDate: string;
  category: string;
  country: string;
  departureDate: string;
  description: string;
  duration: string;
  email: string;
  image: string;
  imageUrl: string;
  name: string;
  price: number;
  userName: string;
  _id: string;
}

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const handleDelete = async () => {
    const token = await getTokenFromClient();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${booking._id}`,
      {
        method: 'DELETE',
        headers: { authorization: `bearer ${token}` },
      },
    );
    const data = await res.json();
    console.log(data);
    redirect('/my-bookings');
  };
  return (
    <article className="flex flex-col gap-4 border border-gray-200 p-3 transition hover:shadow-sm sm:flex-row sm:items-center sm:gap-5">
      <Image
        width={222}
        height={222}
        src={booking.imageUrl}
        alt={booking.name}
        className="h-44 w-full rounded-sm object-cover sm:h-25 sm:w-37.5 sm:shrink-0"
      />

      <div className="min-w-0 flex-1">
        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-[10px] font-medium text-green-600">
          Confirmed
        </span>

        <h2 className="mt-1 text-lg font-semibold text-gray-900">
          {booking.name}
        </h2>

        <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
          <CalendarDays size={13} />
          Departure: {booking.departureDate}
        </p>

        <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
          <MapPin size={13} />
          Booking ID: {booking._id}
        </p>

        <p className="mt-1 text-xl font-semibold text-cyan-600">
          ${booking.price}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:self-end">
        <button
          onClick={handleDelete}
          type="button"
          className="border cursor-pointer border-red-300 px-3 py-2 text-xs text-red-500 transition hover:bg-red-50"
        >
          Cancel
        </button>

        <Link
          href={`/my-bookings/${booking._id}`}
          className="inline-flex items-center gap-1 bg-cyan-600 px-3 py-2 text-xs text-white transition hover:bg-cyan-700"
        >
          <Eye size={13} />
          View
        </Link>
      </div>
    </article>
  );
}
