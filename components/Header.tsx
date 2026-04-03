'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '#office', label: 'Офис' },
  { href: '#services', label: 'Услуги' },
  { href: '#contact', label: 'Контакты' },
  { href: '#faq', label: 'Вопросы' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = window.localStorage.getItem('theme');
    const initial: 'light' | 'dark' =
      saved === 'dark' || saved === 'light'
        ? saved
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';

    setTheme(initial);
    document.body.classList.toggle('theme-dark', initial === 'dark');
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.body.classList.toggle('theme-dark', next === 'dark');
    window.localStorage.setItem('theme', next);
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(73,53,35,0.08)] bg-[rgba(248,243,235,0.78)] backdrop-blur-xl">
      <div
        className={`mx-auto flex items-center justify-between px-4 py-3 transition md:py-4 md:px-8 ${isScrolled ? 'shadow-[0_16px_36px_rgba(77,57,37,0.08)]' : ''}`}
      >
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logos/logo.png"
            alt="Логотип"
            className="h-10 w-10 rounded-full object-cover shadow-[0_12px_28px_rgba(17,94,89,0.22)] md:h-11 md:w-11"
          />
          <div>
            <p className="text-sm font-black text-[rgba(36,28,20,0.96)] sm:text-base">Криптообмен</p>
            <p className="text-xs text-[rgba(84,68,53,0.72)] hidden sm:block">Крипто за наличные в Улан-Удэ</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-[rgba(73,53,35,0.08)] bg-[rgba(255,255,255,0.42)] p-1.5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[rgba(36,28,20,0.74)] transition hover:bg-[rgba(255,255,255,0.7)] hover:text-[rgba(17,94,89,1)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[rgba(73,53,35,0.12)] bg-[rgba(255,255,255,0.6)] px-4 text-sm font-semibold text-[rgba(36,28,20,0.84)] transition hover:bg-[rgba(255,255,255,0.78)]"
            aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'}
          >
            <span>{theme === 'dark' ? '☀' : '✦'}</span>
            <span className="hidden lg:inline">{theme === 'dark' ? 'Светлая' : 'Тёмная'}</span>
          </button>
          <a href="https://t.me/Crypto_u_u" target="_blank" rel="noreferrer" className="btn-primary">
            Написать в Telegram
          </a>
        </div>

        <button
          type="button"
          className="relative flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-full border border-[rgba(73,53,35,0.14)] bg-[rgba(255,255,255,0.5)] p-0 md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="flex h-5 w-5 flex-col items-center justify-center gap-1.5">
            <span className={`block h-0.5 w-5 bg-[rgba(36,28,20,0.88)] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-5 bg-[rgba(36,28,20,0.88)] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-[rgba(36,28,20,0.88)] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </span>
        </button>
      </div>

      <div
        className={`fixed inset-x-0 top-full z-40 border-b border-[rgba(73,53,35,0.08)] bg-[rgba(248,243,235,0.98)] p-4 transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'}`}
      >
        <div className="mx-auto max-w-lg space-y-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-2xl border border-[rgba(73,53,35,0.12)] bg-[rgba(255,255,255,0.45)] px-4 py-4 text-left text-sm font-semibold text-[rgba(36,28,20,0.82)] hover:bg-[rgba(255,255,255,0.7)] active:scale-[0.98] transition-all"
          >
            <span className="flex h-8 w-8 min-h-8 min-w-8 items-center justify-center rounded-full bg-[rgba(15,118,110,0.1)]">
              {theme === 'dark' ? '☀' : '✦'}
            </span>
            <span>{theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}</span>
          </button>

          <div className="my-2 h-px bg-[rgba(73,53,35,0.1)]" />

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className="flex items-center gap-3 rounded-2xl border border-transparent bg-[rgba(255,255,255,0.35)] px-4 py-4 text-base font-medium text-[rgba(36,28,20,0.82)] hover:border-[rgba(73,53,35,0.08)] hover:bg-[rgba(255,255,255,0.65)] active:scale-[0.98] transition-all"
            >
              {item.label}
            </Link>
          ))}

          <a
            href="https://t.me/Crypto_u_u"
            target="_blank"
            rel="noreferrer"
            className="btn-primary flex items-center justify-center gap-2 py-4 text-base font-semibold"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.56 1.17-1.16 1.17-.66 0-1.15-.65-1.15-1.65 0-1.58.9-2.48 1.13-2.48.36 0 .63-.09.63-.35 0-.48-.4-.48-1.1-.52-1.1-.52-.35 0-.66.36-1.07.76-.83 1.06-.83 1.06-1.32 1.06-.84 0-1.39-.68-1.39-1.33 0-2.21 1.35-4.38 2.7-5.6 2.35-1.97 2.68-2.2 2.68-4.28 0-.7-.11-1.07-.45-1.32-.3-.21-.63-.24-.94-.26-1.23-.03-.52.25-1.02.74-1.5.56-.55.92-1.1.92-1.1 1.73 0 2.8 1.08 2.8 2.8 0 .46-.18.84-.54.84-.83 0-.23-.16-.4-.53-.4-1.07-.08-.48-.3-.92-.61-1.29-.07-.25-.05-.48.06-.68.18-.41.43-.5.94-.5 1.47 0 1.09.7 2.02 1.68 2.78 1.55 1.25 2.55 2.87 2.55 4.65 0 .92-.26 1.78-.71 2.5-.38.63-.9 1.05-1.57 1.05-.54 0-.96-.25-1.28-.74-.3-.46-.3-1.2.13-1.75.74-1.04 1.66-1.63 2.63-1.63 1.32 0 2.4 1.1 2.4 2.42 0 .4-.15.8-.46.8-.6 0-.22-.15-.4-.44-.4-.92-.1-.41-.33-.8-.63-1.16-.08-.21-.09-.42.03-.62.2-.49.5-.95.7-1.34.8-1.53 1.03-2.53 1.03-4.03 0-.96-.29-1.85-.78-2.58-.41-.66-.97-1.08-1.67-1.08-.56 0-1 .29-1.27.8-1.72.52-.47.93-.73 1.57-.73 1.43 0 2.32-1.1 2.32-2.75 0-.44-.17-.81-.51-.81-.57 0-.23-.15-.41-.42-.41-.87-.1-.39-.31-.76-.59-1.12-.08-.21-.08-.42.02-.61.19-.48.48-.93.68-1.32.8-1.53 1.04-2.53 1.04-4.03 0-.96-.29-1.85-.78-2.58-.41-.66-.97-1.08-1.67-1.08-.56 0-1 .29-1.27.8-1.72.52-.47.93-.73 1.57-.73z"/>
            </svg>
            Написать в Telegram
          </a>
        </div>
      </div>
    </header>
  );
}
