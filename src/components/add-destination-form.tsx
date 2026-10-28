'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { Check, Plus, X, LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getTokenFromClient } from '@/lib/getTokenFromClient';

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
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type FormStatus = 'idle' | 'submitting' | 'success';

const emptyValues: FormValues = {
  name: '',
  country: '',
  category: '',
  price: '',
  duration: '',
  departureDate: '',
  imageUrl: '',
  description: '',
};

// Validation
function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Destination name is required.';
  } else if (values.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters.';
  }

  if (!values.country) {
    errors.country = 'Please select a country.';
  }

  if (!values.category) {
    errors.category = 'Please select a category.';
  }

  if (!values.price) {
    errors.price = 'Please select a price.';
  } else if (
    !Number.isFinite(Number(values.price)) ||
    Number(values.price) <= 0
  ) {
    errors.price = 'Please select a valid price.';
  }

  if (!values.duration) {
    errors.duration = 'Please select a duration.';
  }

  if (!values.departureDate) {
    errors.departureDate = 'Departure date is required.';
  }

  if (!values.imageUrl.trim()) {
    errors.imageUrl = 'Image URL is required.';
  } else {
    try {
      const url = new URL(values.imageUrl.trim());

      if (!['http:', 'https:'].includes(url.protocol)) {
        errors.imageUrl = 'Use a valid HTTP or HTTPS URL.';
      }
    } catch {
      errors.imageUrl = 'Please enter a valid image URL.';
    }
  }

  if (!values.description.trim()) {
    errors.description = 'Description is required.';
  } else if (values.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters.';
  }

  return errors;
}

// Reusable field
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  const errorId = `${id}-error`;

  return (
    <div className="min-w-0 space-y-2">
      <Label htmlFor={id}>{label}</Label>

      {children}

      {error && (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function controlProps(id: string, error?: string) {
  return {
    id,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
  } as const;
}

// Main component
export function AddDestinationForm() {
  const [values, setValues] = useState<FormValues>({
    ...emptyValues,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState('');

  function setField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues(previous => ({
      ...previous,
      [key]: value,
    }));

    setErrors(previous => ({
      ...previous,
      [key]: undefined,
    }));

    setFormError('');
    setStatus('idle');
  }

  function handleCancel() {
    setValues({ ...emptyValues });
    setErrors({});
    setFormError('');
    setStatus('idle');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = await getTokenFromClient();
    if (status === 'submitting') return;

    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setFormError('');
    setStatus('submitting');
    console.log('first');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-destination`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${token}`,
          },
          body: JSON.stringify({
            ...values,
            name: values.name.trim(),
            description: values.description.trim(),
            imageUrl: values.imageUrl.trim(),
            price: Number(values.price),
          }),
        },
      );
      const data = await res.json();

      console.log('API response:', res.status, data);

      if (!res.ok) {
        throw new Error(data?.message || `Request failed (${res.status})`);
      }
      // Reset form after successful response
      setValues({ ...emptyValues });
      setErrors({});
      setFormError('');
      setStatus('success');
    } catch (error) {
      console.error('Failed to add destination:', error);

      setFormError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      );

      setStatus('idle');
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-card p-5 shadow-sm sm:p-6 md:p-8"
    >
      {status === 'success' && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-400"
        >
          <Check className="size-5 shrink-0" />
          <p>Travel package added successfully.</p>
        </div>
      )}

      {formError && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {formError}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Destination Name" error={errors.name}>
          <Input
            {...controlProps('name', errors.name)}
            placeholder="Bali Paradise"
            value={values.name}
            onChange={e => setField('name', e.target.value)}
            disabled={status === 'submitting'}
          />
        </Field>

        <Field id="country" label="Country" error={errors.country}>
          <Select
            value={values.country}
            onValueChange={value => setField('country', value ?? '')}
            disabled={status === 'submitting'}
          >
            <SelectTrigger
              {...controlProps('country', errors.country)}
              className="w-full"
            >
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
        </Field>

        <Field id="category" label="Category" error={errors.category}>
          <Select
            value={values.category}
            onValueChange={value => setField('category', value ?? '')}
            disabled={status === 'submitting'}
          >
            <SelectTrigger
              {...controlProps('category', errors.category)}
              className="w-full"
            >
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
        </Field>

        <Field id="price" label="Price (USD)" error={errors.price}>
          <Select
            value={values.price}
            onValueChange={value => {
              setField('price', value ?? '');
            }}
            disabled={status === 'submitting'}
          >
            <SelectTrigger
              {...controlProps('price', errors.price)}
              className="w-full"
            >
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
        </Field>

        <Field id="duration" label="Duration" error={errors.duration}>
          <Select
            value={values.duration}
            onValueChange={value => setField('duration', value ?? '')}
            disabled={status === 'submitting'}
          >
            <SelectTrigger
              {...controlProps('duration', errors.duration)}
              className="w-full"
            >
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
        </Field>

        <Field
          id="departureDate"
          label="Departure Date"
          error={errors.departureDate}
        >
          <Input
            {...controlProps('departureDate', errors.departureDate)}
            type="date"
            value={values.departureDate}
            min={new Date().toLocaleDateString('en-CA')}
            onChange={e => setField('departureDate', e.target.value)}
            disabled={status === 'submitting'}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field id="imageUrl" label="Image URL" error={errors.imageUrl}>
            <Input
              {...controlProps('imageUrl', errors.imageUrl)}
              type="url"
              placeholder="https://example.com/image.jpg"
              value={values.imageUrl}
              onChange={e => setField('imageUrl', e.target.value)}
              disabled={status === 'submitting'}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field
            id="description"
            label="Description"
            error={errors.description}
          >
            <Textarea
              {...controlProps('description', errors.description)}
              placeholder="Describe the travel experience..."
              className="min-h-28 resize-y"
              value={values.description}
              onChange={e => setField('description', e.target.value)}
              disabled={status === 'submitting'}
            />
          </Field>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          className="gap-2"
        >
          <X className="size-4" />
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={status === 'submitting'}
          className="gap-2"
        >
          {status === 'submitting' ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <Plus className="size-4" />
              Add Travel Package
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
