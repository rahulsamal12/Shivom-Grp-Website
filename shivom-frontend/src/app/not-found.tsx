import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4">
      <div className="text-brand-orange text-8xl font-bold mb-4">404</div>
      <h2 className="text-3xl font-bold text-brand-navy mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md text-center">
        The infrastructure page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <Button size="lg">Return Home</Button>
      </Link>
    </div>
  );
}
