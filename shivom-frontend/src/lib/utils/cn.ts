import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge Tailwind class names.
 * This is a plain utility — no "use client" needed.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
