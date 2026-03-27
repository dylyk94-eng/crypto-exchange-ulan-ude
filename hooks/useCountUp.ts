'use client';

import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  duration?: number;
  decimals?: number;
  enabled?: boolean;
}

export function useCountUp(
  target: number,
  { duration = 1200, decimals = 0, enabled = true }: UseCountUpOptions = {}
) {
  const [value, setValue] = useState(0);
  const prevTarget = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!enabled || target === 0) {
      setValue(target);
      return;
    }

    const from = prevTarget.current;
    const to = target;
    prevTarget.current = target;

    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutExpo for snappy feel
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const current = from + (to - from) * eased;
      setValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, enabled]);

  return decimals > 0 ? Number(value.toFixed(decimals)) : Math.round(value);
}
