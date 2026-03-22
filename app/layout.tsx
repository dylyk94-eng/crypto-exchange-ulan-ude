import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "CryptoX — Криптообмен будущего",
  description: "Премиальный криптообмен в Улан-Удэ и Чите. USDT, BTC, ETH, оплата услуг, недвижимости и товаров в Таиланде. Фиксированные курсы, персональное сопровождение.",
  keywords: ["криптообмен", "USDT", "BTC", "ETH", "Улан-Удэ", "Чита", "Таиланд", "Alipay", "WeChat"],
  authors: [{ name: "CryptoX" }],
  openGraph: {
    title: "CryptoX — Криптообмен будущего",
    description: "Премиальный криптообмен в Улан-Удэ и Чите.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <a href="#main" className="skip-link">
          Перейти к основному содержанию
        </a>
        {children}
      </body>
    </html>
  );
}
