'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-strong py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="CryptoX - Главная"
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
              <span className="text-white font-bold text-lg" aria-hidden="true">C</span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-300" aria-hidden="true" />
          </div>
          <span className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
            CryptoX
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Основная навигация">
          <Link
            href="#cities"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
            aria-label="Города"
          >
            Города
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300" aria-hidden="true" />
          </Link>
          <Link
            href="#services"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
            aria-label="Условия"
          >
            Условия
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300" aria-hidden="true" />
          </Link>
          <Link
            href="#contacts"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
            aria-label="Контакты"
          >
            Контакты
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300" aria-hidden="true" />
          </Link>
        </nav>

        {/* Desktop CTA */}
        <Link
          href="#contact"
          className="btn-primary text-sm py-2.5 px-6 hidden md:block"
          aria-label="Связаться с нами"
        >
          Связаться
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
            aria-hidden="true"
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
            aria-hidden="true"
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Menu Content */}
        <nav
          className="absolute top-0 right-0 h-full w-72 bg-gradient-to-b from-[#111118] to-[#0a0a0f] border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-out"
          style={{
            transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          }}
          aria-label="Мобильное меню"
        >
          <div className="p-6">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Закрыть меню"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-semibold text-white">CryptoX</span>
            </div>

            {/* Nav Links */}
            <div className="space-y-4">
              <Link
                href="#cities"
                className="block text-lg font-medium text-white/90 hover:text-indigo-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Города
              </Link>
              <Link
                href="#services"
                className="block text-lg font-medium text-white/90 hover:text-indigo-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Условия
              </Link>
              <Link
                href="#contacts"
                className="block text-lg font-medium text-white/90 hover:text-indigo-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Контакты
              </Link>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="#contact"
                className="btn-primary w-full py-3 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Связаться
              </Link>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <a
                href="https://t.me/Crypto_u_u"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.121.099.154.232.169.325.015.093.034.305.019.471z"/>
                </svg>
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
