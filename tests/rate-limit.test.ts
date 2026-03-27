import { describe, it, expect, beforeEach, vi } from 'vitest';

// Reset module state between tests
beforeEach(() => {
  vi.resetModules();
});

describe('rateLimit', () => {
  it('allows requests within the limit', async () => {
    const { rateLimit } = await import('@/lib/rate-limit');
    const result = rateLimit('1.2.3.4', { limit: 5, windowMs: 60_000 });
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it('blocks after exceeding the limit', async () => {
    const { rateLimit } = await import('@/lib/rate-limit');
    const ip = '5.6.7.8';
    for (let i = 0; i < 5; i++) {
      rateLimit(ip, { limit: 5, windowMs: 60_000 });
    }
    const result = rateLimit(ip, { limit: 5, windowMs: 60_000 });
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('resets after the window expires', async () => {
    vi.useFakeTimers();
    const { rateLimit } = await import('@/lib/rate-limit');
    const ip = '9.10.11.12';

    for (let i = 0; i < 5; i++) {
      rateLimit(ip, { limit: 5, windowMs: 1_000 });
    }

    vi.advanceTimersByTime(2_000);

    const result = rateLimit(ip, { limit: 5, windowMs: 1_000 });
    expect(result.allowed).toBe(true);

    vi.useRealTimers();
  });
});
