import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes safely
 * Combines clsx (conditional classes) with tailwind-merge (dedup conflicting classes)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price string for display
 * If already has ₹ symbol, return as-is. Otherwise prepend ₹.
 */
export function formatPrice(price: string): string {
  if (!price) return "₹0";
  const cleaned = price.trim();
  if (cleaned.startsWith("₹")) return cleaned;
  return `₹${cleaned}`;
}

/**
 * Calculate total price from array of price strings
 * Extracts numbers from strings like "₹1,499" or "1499"
 */
export function calculateTotalPrice(prices: string[]): string {
  const total = prices.reduce((sum, price) => {
    // Remove ₹ symbol, commas, and spaces, then parse
    const numericString = price.replace(/[₹,\s]/g, "");
    const value = parseFloat(numericString);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  return `₹${total.toLocaleString("en-IN")}`;
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

/**
 * Validate username format
 * Rules: lowercase, alphanumeric + underscore, 3-20 characters
 */
export function isValidUsername(username: string): boolean {
  const regex = /^[a-z][a-z0-9_]{2,19}$/;
  return regex.test(username);
}

/**
 * Slugify a string (for generating usernames from display names)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 20);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Strip HTML tags from input (basic sanitization)
 */
export function sanitizeText(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

/**
 * Generate stagger delay for animations
 * Used for outfit card staggered fade-in
 */
export function getStaggerDelay(index: number): string {
  return `${index * 0.05}s`;
}
