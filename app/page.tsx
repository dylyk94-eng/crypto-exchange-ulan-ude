'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Cities from '@/components/Cities';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import NeonCursor from '@/components/NeonCursor';
import Particles from '@/components/Particles';

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Effects Layer */}
      <Particles />
      <NeonCursor />

      {/* Main Content */}
      <main id="main" className="relative z-10" tabIndex={-1}>
        <Hero />
        <div className="divider-neon" />
        <Cities />
        <div className="divider-neon" />
        <Services />
        <div className="divider-neon" />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
