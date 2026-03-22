'use client';

import { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const requestRef = useRef<number>();

  // Check if device supports hover (desktop)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsMobile(!mediaQuery.matches);
  }, []);

  // Show cursor after mouse movement
  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Track mouse position with requestAnimationFrame for performance
  useEffect(() => {
    if (isMobile || !isVisible) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      setCursorPosition({ x: mouseX, y: mouseY });

      // Delay dot for trailing effect
      setTimeout(() => {
        setDotPosition({ x: mouseX, y: mouseY });
      }, 50);

      animationFrameId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, isVisible]);

  // Hover state detection with better performance
  useEffect(() => {
    if (isMobile || !isVisible) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElements = target.closest('button, a, input, select, textarea, [role="button"]');

      if (interactiveElements) {
        setIsHovering(true);
        document.body.style.cursor = 'none';
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElements = target.closest('button, a, input, select, textarea, [role="button"]');

      if (interactiveElements) {
        setIsHovering(false);
        document.body.style.cursor = 'auto';
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMobile, isVisible]);

  // Don't render custom cursor on mobile or when not visible
  if (isMobile || !isVisible) return null;

  return (
    <>
      <div
        className="custom-cursor pointer-events-none fixed z-[9999] transition-all duration-75 ease-out"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
        }}
        aria-hidden="true"
      >
        <div
          className={`w-5 h-5 border-2 border-indigo-500 rounded-full transition-all duration-200 ${
            isHovering ? 'w-7 h-7 border-pink-500 scale-150' : ''
          }`}
        />
      </div>

      <div
        className="custom-cursor-dot pointer-events-none fixed z-[9999] transition-transform duration-75 ease-out"
        style={{
          left: dotPosition.x,
          top: dotPosition.y,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
        }}
        aria-hidden="true"
      >
        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
      </div>
    </>
  );
}
