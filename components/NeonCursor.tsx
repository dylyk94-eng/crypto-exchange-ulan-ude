'use client';

import { useState, useEffect, useRef } from 'react';

export default function NeonCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsMobile(!mediaQuery.matches);
  }, []);

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

  useEffect(() => {
    if (isMobile || !isVisible) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElements = target.closest('button, a, input, select, textarea, [role="button"]');

      if (interactiveElements) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElements = target.closest('button, a, input, select, textarea, [role="button"]');

      if (interactiveElements) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMobile, isVisible]);

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

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <div
        className={`neon-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
        aria-hidden="true"
      />

      {/* Cursor Dot */}
      <div
        className="neon-cursor-dot"
        style={{
          left: dotPosition.x,
          top: dotPosition.y,
        }}
        aria-hidden="true"
      />
    </>
  );
}
