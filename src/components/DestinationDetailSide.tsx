'use client';
import { Button } from './ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { Input } from './ui/input';
import { useSession } from '@/lib/auth-client';
import { getTokenFromClient } from '@/lib/getTokenFromClient';

const bookingBenefits = [
  'Free cancellation up to 7 days',
  'Travel insurance included',
  '24/7 customer support',
];

interface DestinationType {
  category: string;
  country: string;
  departureDate: string;
  description: string;
  duration: string;
  imageUrl: string;
  name: string;
  price: number;
  _id: string;
}

const DestinationDetailSide = ({
  destination,
}: {
  destination: DestinationType;
}) => {
  const { data: session } = useSession();
  const user = session?.user;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const departureDate = formData.get('departureDate');
    const token = await getTokenFromClient();
    const data = {
      userName: user?.name,
      email: user?.email,
      image: user?.image,
      ...destination,
      departureDate: departureDate,
      bookingDate: new Date(),
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    console.log(resData);
  };
  return (
    <aside className="h-fit rounded-xl border bg-card p-5">
      <p className="text-sm text-muted-foreground">Starting from</p>
      <p className="mt-1 text-4xl font-semibold text-brand">
        ${destination.price.toLocaleString('en-US')}
      </p>
      <p className="text-xs text-muted-foreground">per person</p>

      <form onSubmit={handleSubmit}>
        <Input
          type="date"
          className="mt-4"
          name="departureDate"
          defaultValue={destination.departureDate}
        />

        <Button
          size="lg"
          type="submit"
          className="mt-4 w-full gap-2 bg-brand cursor-pointer text-white hover:bg-brand/85"
        >
          Book Now
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </form>

      <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
        {bookingBenefits.map(benefit => (
          <li key={benefit} className="flex items-start gap-2">
            <Check
              className="mt-0.5 size-4 shrink-0 text-green-500"
              aria-hidden
            />
            {benefit}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DestinationDetailSide;
