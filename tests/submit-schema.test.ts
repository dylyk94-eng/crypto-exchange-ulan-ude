import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Re-define the schema here to test it independently
const submitSchema = z.object({
  city: z.string().min(1).max(100),
  name: z.string().min(1, 'Укажите имя').max(100),
  phone: z
    .string()
    .min(1, 'Укажите телефон')
    .regex(/^[\d\s\+\-\(\)]{7,20}$/, 'Некорректный формат телефона'),
  telegram: z.string().max(100).optional(),
  currency: z.string().max(20).optional(),
  amount: z.string().min(1, 'Укажите сумму').max(100),
  message: z.string().max(1000).optional(),
});

const validPayload = {
  city: 'Улан-Удэ',
  name: 'Иван',
  phone: '+7 999 123 45 67',
  amount: '100000',
};

describe('submit API schema', () => {
  it('accepts a valid payload', () => {
    expect(submitSchema.safeParse(validPayload).success).toBe(true);
  });

  it('rejects missing name', () => {
    const result = submitSchema.safeParse({ ...validPayload, name: '' });
    expect(result.success).toBe(false);
  });

  it('rejects missing phone', () => {
    const result = submitSchema.safeParse({ ...validPayload, phone: '' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid phone characters', () => {
    const result = submitSchema.safeParse({ ...validPayload, phone: 'abc' });
    expect(result.success).toBe(false);
  });

  it('rejects missing amount', () => {
    const result = submitSchema.safeParse({ ...validPayload, amount: '' });
    expect(result.success).toBe(false);
  });

  it('rejects message over 1000 chars', () => {
    const result = submitSchema.safeParse({ ...validPayload, message: 'x'.repeat(1001) });
    expect(result.success).toBe(false);
  });

  it('accepts optional fields as absent', () => {
    const result = submitSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });
});
