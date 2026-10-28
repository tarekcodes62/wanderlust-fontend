'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { UserRound, Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn, signUp } from '@/lib/auth-client';
import { redirect } from 'next/navigation';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const image = String(formData.get('image') || '').trim();
    const password = String(formData.get('password') || '');
    const confirmPassword = String(formData.get('confirmPassword') || '');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await signUp.email({
        name,
        email,
        password,
        image,
      });

      if (data) {
        redirect('/');
      }
      if (error) {
        setError(error.message as string);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // signin with google
  const handleGoogleSignIn = async () => {
    const { data, error } = await signIn.social({
      provider: 'google',
    });
    if (data) {
      console.log('SignIn with Google', data);
      redirect('/');
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb] px-4 py-10">
      <div className="w-full max-w-90">
        {/* Heading */}
        <div className="mb-5 text-center">
          <h1 className="font-serif text-2xl tracking-tight text-[#171717]">
            Create Account
          </h1>

          <p className="mt-1 text-[11px] text-gray-500">
            Start your adventure with Wanderlust
          </p>
        </div>

        {/* Signup Card */}
        <div className="border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Full Name */}
            <div className="space-y-1">
              <Label
                htmlFor="name"
                className="text-[11px] font-medium text-gray-800"
              >
                Full Name
              </Label>

              <div className="relative">
                <UserRound className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-gray-400" />

                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  className="h-9 rounded-none border-gray-200 bg-[#f8f9fb] pl-7 text-xs shadow-none placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-cyan-600"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="text-[11px] font-medium text-gray-800"
              >
                Email Address
              </Label>

              <div className="relative">
                <Mail className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-gray-400" />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="h-9 rounded-none border-gray-200 bg-[#f8f9fb] pl-7 text-xs shadow-none placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-cyan-600"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="image"
                className="text-[11px] font-medium text-gray-800"
              >
                Image URL
              </Label>

              <div className="relative">
                <Input
                  id="image"
                  name="image"
                  type="text"
                  placeholder="Enter your image url"
                  autoComplete="image"
                  required
                  className="h-9 rounded-none border-gray-200 bg-[#f8f9fb] pl-7 text-xs shadow-none placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-cyan-600"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label
                htmlFor="password"
                className="text-[11px] font-medium text-gray-800"
              >
                Password
              </Label>

              <div className="relative">
                <LockKeyhole className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-gray-400" />

                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="h-9 rounded-none border-gray-200 bg-[#f8f9fb] pl-7 pr-9 text-xs shadow-none placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-cyan-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="size-3.5" />
                  ) : (
                    <Eye className="size-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <Label
                htmlFor="confirmPassword"
                className="text-[11px] font-medium text-gray-800"
              >
                Confirm Password
              </Label>

              <div className="relative">
                <LockKeyhole className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-gray-400" />

                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                  className="h-9 rounded-none border-gray-200 bg-[#f8f9fb] pl-7 pr-9 text-xs shadow-none placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-cyan-600"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? 'Hide confirm password'
                      : 'Show confirm password'
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-3.5" />
                  ) : (
                    <Eye className="size-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p role="alert" className="text-xs text-red-600">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="h-9 w-full rounded-none bg-[#18a0b8] text-xs font-medium text-white hover:bg-[#12899f]"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-2 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[10px] text-gray-500">Or sign up with</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google Signup */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            className="h-9 w-full gap-2 rounded-none border-gray-200 bg-white text-xs font-medium text-gray-800 shadow-none hover:bg-gray-50 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="size-3.5"
              aria-hidden="true"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.16 13.22l7.98 6.19C12.85 13.72 17.95 9.5 24 9.5Z"
                transform="translate(0 4)"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.91 46.98 31.84 46.98 24.55Z"
              />
              <path
                fill="#FBBC05"
                d="M10.14 28.59A14.4 14.4 0 0 1 9.36 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.55 2.58 10.78l7.56-6.19Z"
                transform="translate(0 4)"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.89 2.3-8.18 2.3-6.05 0-11.16-4.22-12.98-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
              />
            </svg>
            Sign Up With Google
          </Button>

          {/* Sign In Link */}
          <p className="mt-4 text-center text-[11px] text-gray-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-[#0891b2] hover:text-[#0e7490] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
