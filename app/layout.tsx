import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Криптообмен | Улан-Удэ',
  description:
    'Покупка и продажа криптовалюты за наличные в Улан-Удэ. USDT, BTC, ETH — курс фиксируем до встречи. Международные переводы.',
  keywords: [
    'купить криптовалюту Улан-Удэ',
    'обмен USDT на рубли',
    'продать биткоин за наличные',
    'криптообмен',
    'USDT',
    'BTC',
    'ETH',
    'Улан-Удэ',
    'международные переводы',
  ],
  authors: [{ name: 'Криптообмен' }],
  openGraph: {
    title: 'Криптообмен | Покупка и продажа криптовалюты в Улан-Удэ',
    description:
      'Покупка и продажа криптовалюты за наличные. Курс фиксируем до встречи, обмен от 15 минут.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <a href="#main" className="skip-link">
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
