import { describe, it, expect } from 'vitest';
import { isValidPhone, formatPhone } from '@/lib/utils';

describe('isValidPhone', () => {
  it('accepts 11-digit number starting with 7', () => {
    expect(isValidPhone('79991234567')).toBe(true);
  });

  it('accepts 11-digit number starting with 8', () => {
    expect(isValidPhone('89991234567')).toBe(true);
  });

  it('accepts formatted number', () => {
    expect(isValidPhone('+7 (999) 123-45-67')).toBe(true);
  });

  it('rejects short number', () => {
    expect(isValidPhone('123')).toBe(false);
  });

  it('rejects 10-digit number without country code', () => {
    expect(isValidPhone('9991234567')).toBe(false);
  });
});

describe('formatPhone', () => {
  it('formats a raw 11-digit number', () => {
    expect(formatPhone('79991234567')).toBe('+7 999 123 45 67');
  });

  it('returns original if format does not match', () => {
    expect(formatPhone('123')).toBe('123');
  });
});
