'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Главная', href: '/' },
    { label: 'Города', href: '#cities' },
    { label: 'Услуги', href: '#services' },
    { label: 'Контакты', href: '#contact' },
  ];

  const socialLinks = [
    {
      platform: 'Telegram',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.121.099.154.232.169.325.015.093.034.305.019.471z"/>
        </svg>
      ),
      url: 'https://t.me/Crypto_u_u',
      color: 'neon-cyan',
    },
    {
      platform: 'Email',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      url: 'mailto:info@cryptox.ru',
      color: 'neon-purple',
    },
    {
      platform: 'Phone',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2z" />
        </svg>
      ),
      url: 'tel:+7999999999',
      color: 'neon-pink',
    },
  ];

  return (
    <footer className="relative py-16 px-6 border-t border-white/5">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Content */}
        <div className="grid md:grid-cols-12 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-pink rounded-xl flex items-center justify-center shadow-neon-cyan group-hover:scale-110 transition-all duration-300">
                  <span className="text-void-bg font-black text-2xl font-bold">C</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-pink rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white group-hover:text-neon-cyan transition-colors">CRYPTO</span>
                <span className="text-2xl font-black text-white group-hover:text-neon-purple transition-colors">EXCHANGE</span>
              </div>
            </Link>
            <p className="text-text-secondary text-base leading-relaxed mb-6">
              Премиальный криптообмен в Улан-Удэ и Чите. Обмен криптовалюты, международные платежи, консультации и обучение.
            </p>
            <div className="flex gap-3">
              {[
                { label: 'USDT', color: 'neon-cyan' },
                { label: 'BTC', color: 'neon-purple' },
                { label: 'ETH', color: 'neon-pink' },
              ].map((coin) => (
                <div
                  key={coin.label}
                  className={`px-4 py-2 bg-${coin.color}/10 border border-${coin.color}/30 rounded-lg text-sm font-bold text-${coin.color} hover:bg-${coin.color}/20 transition-all`}
                >
                  {coin.label}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-neon-cyan font-bold text-lg mb-6 uppercase tracking-widest">
              Навигация
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-neon-cyan transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-2 h-2 bg-neon-cyan/30 rounded-full group-hover:bg-neon-cyan transition-colors" />
                    {link.label}
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h3 className="text-neon-purple font-bold text-lg mb-6 uppercase tracking-widest">
              Услуги
            </h3>
            <ul className="space-y-3">
              {[
                'Обмен криптовалюты',
                'Международные платежи',
                'Консультации',
                'Обучение',
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-text-secondary hover:text-neon-purple transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-2 h-2 bg-neon-purple/30 rounded-full group-hover:bg-neon-purple transition-colors" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-neon-pink font-bold text-lg mb-6 uppercase tracking-widest">
              Связаться
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neon-cyan/20 border border-neon-cyan/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <a href="https://t.me/Crypto_u_u" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neon-cyan transition-colors font-semibold">
                    @Crypto_u_u
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neon-purple/20 border border-neon-purple/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <a href="mailto:info@cryptox.ru" className="text-white hover:text-neon-purple transition-colors font-semibold">
                    info@cryptox.ru
                  </a>
                </div>
              </li>
            </ul>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  className={`w-12 h-12 bg-${social.color}/20 border border-${social.color}/30 rounded-xl flex items-center justify-center hover:bg-${social.color}/30 hover:border-${social.color}/50 hover:scale-110 transition-all duration-300`}
                  aria-label={social.platform}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-neon mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-tertiary text-sm text-center md:text-left">
            © {currentYear} Crypto Exchange. Все права защищены.
          </p>
          <div className="flex gap-6 text-sm text-text-tertiary">
            <a href="#" className="hover:text-neon-cyan transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-neon-purple transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
