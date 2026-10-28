import Link from 'next/link';
import { auth } from '@/lib/auth';
import { getTokenFromServer } from '@/lib/getTokenFromServer';
import { headers } from 'next/headers';
import {
  CalendarDays,
  Globe,
  Plane,
  DollarSign,
  Pencil,
  Clock,
  Mail,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';

interface Booking {
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

const ProfilePage = async () => {
  // Get authenticated user (authentication handled by proxy)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session!.user;
  const token = await getTokenFromServer();

  // Fetch bookings from backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-booking/${encodeURIComponent(user.email)}`,
    {
      cache: 'no-store',
      headers: {
        authorization: `bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }

  const bookingsData: Booking[] = await res.json();

  // Calculate travel statistics
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const upcomingTrips = bookingsData.filter(booking => {
    const departure = new Date(booking.departureDate);

    return !Number.isNaN(departure.getTime()) && departure >= today;
  });

  const countriesVisited = new Set(
    bookingsData.map(booking => booking.country?.trim()).filter(Boolean),
  ).size;

  const totalSpent = bookingsData.reduce(
    (total, booking) => total + (Number(booking.price) || 0),
    0,
  );

  const memberSince =
    'createdAt' in user && user.createdAt
      ? new Date(user.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })
      : 'Member';

  const profileImage =
    'image' in user && typeof user.image === 'string' ? user.image : null;

  const stats = [
    {
      title: 'Total Bookings',
      value: bookingsData.length.toLocaleString(),
      icon: Plane,
      color: 'bg-cyan-50 text-cyan-600',
    },
    {
      title: 'Countries Visited',
      value: countriesVisited.toLocaleString(),
      icon: Globe,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Upcoming Trips',
      value: upcomingTrips.length.toLocaleString(),
      icon: CalendarDays,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      title: 'Total Spent',
      value: `$${totalSpent.toLocaleString('en-US')}`,
      icon: DollarSign,
      color: 'bg-fuchsia-50 text-fuchsia-600',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your account settings and travel preferences
          </p>
        </div>

        {/* Profile and Statistics */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* Profile Card */}
          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col items-center px-6 pb-6 pt-8">
              {/* Profile Image */}
              <div className="relative mb-3">
                {profileImage ? (
                  <Image
                    width={200}
                    height={200}
                    src={profileImage}
                    alt={user.name || 'Profile photo'}
                    className="size-24 rounded-full border-4 border-white object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex size-24 items-center justify-center rounded-full bg-cyan-100 text-3xl font-semibold text-cyan-700">
                    {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                {user.name || 'Traveler'}
              </h2>

              <p className="mt-1 flex max-w-full items-center gap-1.5 text-sm text-gray-500">
                <Mail className="size-3.5 shrink-0" />
                <span className="break-all">{user.email}</span>
              </p>

              <div className="my-5 w-full border-t border-gray-100" />

              {/* Profile Information */}
              <div className="w-full space-y-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Member since</span>
                  <span className="font-medium text-gray-900">
                    {memberSince}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Total bookings</span>
                  <span className="font-medium text-gray-900">
                    {bookingsData.length}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Countries booked</span>
                  <span className="font-medium text-gray-900">
                    {countriesVisited}
                  </span>
                </div>
              </div>

              <Link
                href="/profile/edit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-cyan-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-cyan-700"
              >
                <Pencil className="size-4" />
                Edit Profile
              </Link>
            </div>
          </section>

          {/* Statistics and Trips */}
          <section className="min-w-0">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Travel Statistics
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {stats.map(stat => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="flex min-h-28 items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="min-w-0">
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <p className="mt-2 break-words text-2xl font-semibold tracking-tight text-gray-900">
                        {stat.value}
                      </p>
                    </div>

                    <div
                      className={`flex size-11 shrink-0 items-center justify-center rounded-full ${stat.color}`}
                    >
                      <Icon className="size-5" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Upcoming Trips */}
            <div className="mt-8">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  Upcoming Trips
                </h2>

                <Link
                  href="/my-bookings"
                  className="text-sm font-medium text-cyan-700 transition hover:text-cyan-900"
                >
                  View bookings
                </Link>
              </div>

              {upcomingTrips.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-10 text-center">
                  <Plane className="mx-auto size-9 text-gray-400" />

                  <h3 className="mt-3 font-medium text-gray-800">
                    No upcoming trips
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Your upcoming bookings will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingTrips.slice(0, 3).map(booking => (
                    <div
                      key={booking._id}
                      className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                        <MapPin className="size-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-gray-900">
                          {booking.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {booking.country}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="size-4 shrink-0" />

                        <span>
                          {new Date(booking.departureDate).toLocaleDateString(
                            'en-US',
                            {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
