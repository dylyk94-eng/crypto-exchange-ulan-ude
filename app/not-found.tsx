import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Страница не найдена | Криптообмен',
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6f1e8] px-6 text-center">
      <div className="max-w-md">
        <div className="text-7xl font-bold text-[rgba(15,118,110,0.18)]">404</div>
        <h1 className="mt-4 text-3xl font-semibold text-[rgba(31,26,20,0.95)]">
          Страница не найдена
        </h1>
        <p className="mt-4 text-base leading-7 text-[rgba(106,90,73,0.82)]">
          Такой страницы не существует или она была перемещена.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[rgba(15,118,110,0.9)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[rgba(15,118,110,1)]"
          >
            На главную
          </Link>
          <a
            href="https://t.me/Crypto_u_u"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[rgba(73,53,35,0.14)] bg-white px-6 py-3 text-sm font-semibold text-[rgba(31,26,20,0.88)] transition hover:bg-[rgba(246,241,232,0.8)]"
          >
            Написать в Telegram
          </a>
        </div>
      </div>
    </div>
  );
}
