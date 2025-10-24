import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to combine Tailwind classes.
 * Accepts strings, arrays, or conditional class objects (like clsx)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
