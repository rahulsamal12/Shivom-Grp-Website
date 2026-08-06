'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
      <h2 className="text-3xl font-bold text-brand-navy mb-4">Something went wrong</h2>
      <p className="text-gray-500 mb-8 max-w-md text-center">
        We apologize, but an error occurred while loading this section. Please try again.
      </p>
      <Button onClick={() => reset()} size="lg">
        Try again
      </Button>
    </div>
  );
}
