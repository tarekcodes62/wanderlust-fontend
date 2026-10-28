'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { redirect } from 'next/navigation';
import { getTokenFromClient } from '@/lib/getTokenFromClient';

const DeleteDestinationDilog = ({ id }: { id: string }) => {
  const handleDeleteDestination = async () => {
    const token = await getTokenFromClient();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`,
      {
        method: 'DELETE',
        headers: { authorization: `bearer ${token}` },
      },
    );
    const data = await res.json();
    redirect('/destinations');
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          nativeButton={false}
          className="gap-2 border-destructive/50 px-3.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="size-4" aria-hidden />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Button
          className="gap-2 border-destructive/50 px-3.5 text-destructive hover:bg-destructive/10 hover:text-destructive bg-white"
          onClick={handleDeleteDestination}
        >
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDestinationDilog;
