'use client';

import { useEffect, useRef } from 'react';

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Start hidden
    el.classList.add('reveal-hidden');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible');
          observer.unobserve(el);
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return ref;
}

export function useRevealChildren<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; staggerMs?: number } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    const stagger = options.staggerMs ?? 80;

    children.forEach((child, i) => {
      child.classList.add('reveal-hidden');
      child.style.transitionDelay = `${i * stagger}ms`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child) => {
            child.classList.add('reveal-visible');
          });
          observer.unobserve(container);
        }
      },
      { threshold: options.threshold ?? 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [options.threshold, options.staggerMs]);

  return ref;
}
