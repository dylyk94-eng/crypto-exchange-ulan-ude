import Link from 'next/link';

const navItems = [
  { href: '#cities', label: 'Города' },
  { href: '#services', label: 'Услуги' },
  { href: '#faq', label: 'Вопросы' },
  { href: '#contact', label: 'Контакты' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer mt-10 bg-[rgba(246,239,229,0.96)] text-[rgba(84,68,53,0.8)]">
      <div className="footer-separator" />
      <div className="mx-auto grid max-w-[74rem] gap-10 p-6 md:grid-cols-3 md:p-10">
        <div>
          <h2 className="text-lg font-bold text-[rgba(36,28,20,0.96)]">Криптообмен</h2>
          <p className="mt-3 text-sm">Покупка и продажа криптовалюты за наличные в Улан-Удэ. Международные переводы.</p>
          <p className="mt-4 text-xs text-[rgba(84,68,53,0.62)]">© {year} Криптообмен. Все права защищены.</p>
          <Link href="/privacy" className="footer-link mt-2 block text-xs text-[rgba(84,68,53,0.62)]">
            Политика конфиденциальности
          </Link>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-[rgba(17,94,89,0.88)]">Навигация</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-[rgba(17,94,89,0.88)]">Контакты</h3>
          <div className="mt-3 space-y-2 text-sm">
            <a href="https://t.me/Crypto_u_u" target="_blank" rel="noreferrer" className="footer-link block">
              Telegram: @Crypto_u_u
            </a>
            <a href="tel:+79999999999" className="footer-link block">
              Телефон: +7 (999) 999-99-99
            </a>
            <a href="mailto:info@cryptoexchange.ru" className="footer-link block">
              Почта: info@cryptoexchange.ru
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
