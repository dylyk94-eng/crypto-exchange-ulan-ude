import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price with currency
 * @param value - Price value
 * @param currency - Currency symbol (default: ₽)
 * @returns Formatted price string
 */
export function formatPrice(value: number, currency: string = '₽') {
  if (value < 100) {
    return value.toFixed(1) + ' ' + currency;
  }
  return Math.floor(value).toLocaleString('ru-RU') + ' ' + currency;
}

/**
 * Format percentage change
 * @param value - Percentage value
 * @returns Formatted percentage string
 */
export function formatChange(value: number) {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

/**
 * Format date to locale string
 * @param date - Date object
 * @returns Formatted date string
 */
export function formatDate(date: Date) {
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Format time to locale string
 * @param date - Date object
 * @returns Formatted time string
 */
export function formatTime(date: Date) {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Debounce function
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Validate phone number (Russian format)
 * @param phone - Phone number string
 * @returns True if valid
 */
export function isValidPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  return /^7\d{10}$/.test(cleaned) || /^8\d{10}$/.test(cleaned);
}

/**
 * Format phone number
 * @param phone - Phone number string
 * @returns Formatted phone number
 */
export function formatPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^7?(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+7 ${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }
  return phone;
}

/**
 * Get initials from name
 * @param name - Full name
 * @returns Initials
 */
export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text
 */
export function truncate(text: string, length: number = 100) {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Slugify string
 * @param text - Text to slugify
 * @returns Slugified string
 */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

/**
 * Generate random color
 * @returns Random hex color
 */
export function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

/**
 * Calculate percentage
 * @param value - Value
 * @param total - Total
 * @returns Percentage
 */
export function calculatePercentage(value: number, total: number) {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Sleep function
 * @param ms - Milliseconds to sleep
 * @returns Promise
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise<boolean>
 */
export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Get currency symbol
 * @param code - Currency code
 * @returns Currency symbol
 */
export function getCurrencySymbol(code: string) {
  const symbols: { [key: string]: string } = {
    RUB: '₽',
    USD: '$',
    EUR: '€',
    BTC: '₿',
    ETH: 'Ξ',
    USDT: '₮',
  };
  return symbols[code] || code;
}

/**
 * Check if element is in viewport
 * @param element - Element to check
 * @returns True if in viewport
 */
export function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Scroll to element smoothly
 * @param element - Element to scroll to
 * @param offset - Offset from top (default: 0)
 */
export function scrollToElement(element: HTMLElement, offset: number = 0) {
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * Get relative time (e.g., "2 hours ago")
 * @param date - Date
 * @returns Relative time string
 */
export function getRelativeTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'} назад`;
  if (hours > 0) return `${hours} ${hours === 1 ? 'час' : hours < 5 ? 'часа' : 'часов'} назад`;
  if (minutes > 0) return `${minutes} ${minutes === 1 ? 'минута' : minutes < 5 ? 'минуты' : 'минут'} назад`;
  return 'только что';
}

/**
 * Check if device is mobile
 * @returns True if mobile device
 */
export function isMobile() {
  return window.innerWidth < 768;
}

/**
 * Check if device is tablet
 * @returns True if tablet device
 */
export function isTablet() {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

/**
 * Check if device is desktop
 * @returns True if desktop device
 */
export function isDesktop() {
  return window.innerWidth >= 1024;
}

/**
 * Generate ID
 * @returns Random ID
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Parse query params from URL
 * @param url - URL string
 * @returns Query params object
 */
export function parseQueryParams(url: string) {
  const params = new URLSearchParams(new URL(url).search);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

/**
 * Build URL with query params
 * @param baseUrl - Base URL
 * @param params - Query params object
 * @returns URL with query params
 */
export function buildUrl(baseUrl: string, params: Record<string, string>) {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
}

/**
 * Local storage helpers
 */
export const storage = {
  get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },

  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  },
};
