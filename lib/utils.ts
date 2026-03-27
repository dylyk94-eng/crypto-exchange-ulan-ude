import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  return /^7\d{10}$/.test(cleaned) || /^8\d{10}$/.test(cleaned);
}

export function formatPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^7?(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+7 ${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }
  return phone;
}

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
};
