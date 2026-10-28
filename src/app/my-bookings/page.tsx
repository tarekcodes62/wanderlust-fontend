import BookingCard from '@/components/BookingCard';
import { auth } from '@/lib/auth';
import { getTokenFromServer } from '@/lib/getTokenFromServer';
import { headers } from 'next/headers';

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

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const token = await getTokenFromServer();

  if (!user?.email) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-medium">My Bookings</h1>
        <p className="mt-3 text-sm text-gray-500">
          Please sign in to view your bookings.
        </p>
      </main>
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-booking/${encodeURIComponent(user.email)}`,
    {
      cache: 'no-store',
      headers: { authorization: `bearer ${token}` },
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }

  const bookingsData: Booking[] = await res.json();

  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5">
          <h1 className="text-2xl font-medium tracking-tight text-gray-900">
            My Bookings
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            Manage and view your upcoming travel plans
          </p>
        </div>

        {bookingsData.length > 0 ? (
          <div className="space-y-2">
            {bookingsData.map(booking => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-gray-300 py-16 text-center">
            <h2 className="text-lg font-medium text-gray-800">
              No bookings found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              You don&apos;t have any bookings yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookingsPage;
