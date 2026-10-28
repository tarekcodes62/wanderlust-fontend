import type { Metadata } from 'next';
import { AddDestinationForm } from '@/components/add-destination-form';

export const metadata: Metadata = {
  title: 'Add New Travel Package',
  description: 'Create a new travel package for the Wanderlast catalog.',
};

export default function AddDestinationPage() {
  return (
    <main className="flex-1 px-6 py-10 md:px-16 md:py-14">
      <h1 className="text-4xl md:text-4xl">Add New Travel Package</h1>
      <div className="mx-auto mt-8 w-full max-w-xl">
        <AddDestinationForm />
      </div>
    </main>
  );
}
