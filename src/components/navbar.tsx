'use client';
import Image from 'next/image';
import Link from 'next/link';
import { User } from 'lucide-react';
import { redirect, usePathname } from 'next/navigation';
import { signOut, useSession } from '@/lib/auth-client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from './ui/button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Add Destination', href: '/add-destination' },
  { label: 'My Bookings', href: '/my-bookings' },
];

const authLinks = [
  { label: 'Login', href: '/login' },
  { label: 'Sign Up', href: '/sign-up' },
];

const linkClassName = 'text-[15px] transition-colors hover:text-brand';

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    const { data, error } = await signOut();
    if (data) {
      redirect('/');
    }
    if (error) {
      console.log(error);
    }
  };
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="relative flex h-16 items-center justify-between px-5 sm:px-8">
        <nav className="flex items-center gap-6" aria-label="Main">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={index === 0 ? 'page' : undefined}
              className={
                link.href === pathname
                  ? 'text-[15px] text-brand underline underline-offset-4'
                  : linkClassName
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-label="Wanderlast home"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            priority
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        <nav className="flex items-center gap-6" aria-label="Account">
          <Link
            href="/profile"
            className={`flex items-center gap-1.5 ${linkClassName}`}
          >
            <User className="size-4" aria-hidden />
            Profile
          </Link>

          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <Avatar className={'cursor-pointer'}>
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image as string}
                    />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                }
              ></PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{user?.name}</PopoverTitle>
                  <PopoverDescription>{user?.email}</PopoverDescription>
                  <Button
                    variant={'destructive'}
                    onClick={handleSignOut}
                    className={'cursor-pointer'}
                  >
                    Sign Out
                  </Button>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              {authLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    link.href === pathname
                      ? 'text-[15px] text-brand underline underline-offset-4'
                      : linkClassName
                  }
                >
                  {link.label}
                </Link>
              ))}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
