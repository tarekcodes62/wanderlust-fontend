'use client';

import { useState, type FormEvent } from 'react';
import { Plus, X, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getTokenFromClient } from '@/lib/getTokenFromClient';
import { redirect, useRouter } from 'next/navigation';

// Options
const categories = [
  { value: 'beach', label: 'Beach' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'city', label: 'City' },
  { value: 'nature', label: 'Nature' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'wildlife', label: 'Wildlife' },
  { value: 'budget', label: 'Budget' },
];

const countries = [
  'Bangladesh',
  'Indonesia',
  'Thailand',
  'Malaysia',
  'Maldives',
  'Singapore',
  'Japan',
  'India',
  'Nepal',
  'United Arab Emirates',
  'Switzerland',
  'France',
  'Italy',
  'United States',
];

const prices = [
  '199',
  '299',
  '499',
  '699',
  '999',
  '1299',
  '1499',
  '1999',
  '2499',
  '2999',
];

const durations = [
  '2 Days / 1 Night',
  '3 Days / 2 Nights',
  '4 Days / 3 Nights',
  '5 Days / 4 Nights',
  '6 Days / 5 Nights',
  '7 Days / 6 Nights',
  '8 Days / 7 Nights',
  '10 Days / 9 Nights',
  '14 Days / 13 Nights',
];

// Types
type FormValues = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const EditDestinationDialog = ({
  destination,
}: {
  destination: FormValues;
}) => {
  const [values, setValues] = useState<FormValues>(destination);
  const router = useRouter();

  function setField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues(previous => ({
      ...previous,
      [key]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = await getTokenFromClient();
    try {
      const { _id, ...updateData } = values;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destination/${destination._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        },
      );
      const data = await res.json();
      if (data.modifiedCount > 0) {
        router.refresh();
      }

      if (!res.ok) {
        throw new Error(data?.message || `Request failed (${res.status})`);
      }
    } catch (error) {
      console.error('Failed to add destination:', error);
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button
            variant="outline"
            nativeButton={false}
            className="gap-2 px-3.5"
          >
            <Pencil className="size-4" aria-hidden />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className={'min-w-2xl'}>
          <DialogHeader>
            <DialogTitle>Edit Destination</DialogTitle>
            <DialogDescription>
              <form
                noValidate
                onSubmit={handleSubmit}
                className="space-y-6 rounded-xl border bg-card p-5 shadow-sm sm:p-6 md:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    placeholder="Bali Paradise"
                    value={values.name}
                    onChange={e => setField('name', e.target.value)}
                  />

                  <Select
                    value={values.country}
                    onValueChange={value => setField('country', value ?? '')}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>

                    <SelectContent>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={values.category}
                    onValueChange={value => setField('category', value ?? '')}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={values.price}
                    onValueChange={value => {
                      setField('price', value ?? Number(''));
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select price" />
                    </SelectTrigger>

                    <SelectContent>
                      {prices.map(price => (
                        <SelectItem key={price} value={price}>
                          ${Number(price).toLocaleString('en-US')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={values.duration}
                    onValueChange={value => setField('duration', value ?? '')}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>

                    <SelectContent>
                      {durations.map(duration => (
                        <SelectItem key={duration} value={duration}>
                          {duration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="date"
                    value={values.departureDate}
                    min={new Date().toLocaleDateString('en-CA')}
                    onChange={e => setField('departureDate', e.target.value)}
                  />

                  <div className="sm:col-span-2">
                    <Input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={values.imageUrl}
                      onChange={e => setField('imageUrl', e.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Textarea
                      placeholder="Describe the travel experience..."
                      className="min-h-28 resize-y"
                      value={values.description}
                      onChange={e => setField('description', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
                  <Button type="button" variant="outline" className="gap-2">
                    <X className="size-4" />
                    Cancel
                  </Button>

                  <DialogTrigger>
                    <Button type="submit" className="gap-2">
                      <>
                        <Plus className="size-4" />
                        Edit Travel Package
                      </>
                    </Button>
                  </DialogTrigger>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditDestinationDialog;
