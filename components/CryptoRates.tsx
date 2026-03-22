'use client';

import { useState, useEffect } from 'react';

interface Rate {
  symbol: string;
  name: string;
  price: number;
  change: number;
  positive: boolean;
}

interface CryptoRatesProps {
  compact?: boolean;
}

export default function CryptoRates({ compact = false }: CryptoRatesProps) {
  const [rates, setRates] = useState<Rate[]>([
    { symbol: 'BTC', name: 'Bitcoin', price: 6532000, change: 2.3, positive: true },
    { symbol: 'ETH', name: 'Ethereum', price: 352000, change: 1.8, positive: true },
    { symbol: 'USDT', name: 'Tether', price: 92.3, change: -0.1, positive: false },
  ]);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Fix hydration - only set timestamp on client
  useEffect(() => {
    setMounted(true);
    setLastUpdate(new Date());
  }, []);

  const fetchRates = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,USDT&tsyms=RUB', {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.BTC?.RUB && data.ETH?.RUB && data.USDT?.RUB) {
        const newRates: Rate[] = [
          {
            symbol: 'BTC',
            name: 'Bitcoin',
            price: data.BTC.RUB,
            change: rates[0]?.change || 2.3,
            positive: true,
          },
          {
            symbol: 'ETH',
            name: 'Ethereum',
            price: data.ETH.RUB,
            change: rates[1]?.change || 1.8,
            positive: true,
          },
          {
            symbol: 'USDT',
            name: 'Tether',
            price: data.USDT.RUB,
            change: rates[2]?.change || -0.1,
            positive: false,
          },
        ];

        setRates(newRates);
        setLastUpdate(new Date());
        setError(null);
      } else {
        throw new Error('Invalid data format from API');
      }
    } catch (err) {
      console.error('Failed to fetch rates:', err);
      setError('Ошибка загрузки курсов. Используем кешированные данные.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!mounted) return;

    fetchRates();
    const interval = setInterval(fetchRates, 30000);

    return () => clearInterval(interval);
  }, [mounted]);

  const formatPrice = (value: number) => {
    if (value < 100) {
      return value.toFixed(1);
    }
    return Math.floor(value).toLocaleString('ru-RU');
  };

  const formatChange = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  return (
    <aside className={`glass-panel rounded-3xl p-6 relative overflow-hidden ${compact ? 'p-4.5' : ''}`}>
      {/* Glow effect */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Live Курсы
        </h3>
        <div className="flex items-center gap-2">
          {error && (
            <div
              className="text-xs text-red-400 flex items-center gap-1 cursor-help"
              title={error}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          )}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
            <span className="text-xs font-medium text-green-400">Live</span>
          </div>
        </div>
      </div>

      {/* Rates List */}
      <div className="space-y-3">
        {rates.map((rate, index) => (
          <div
            key={rate.symbol}
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/30 transition-all">
                <span className="text-white font-bold text-sm">{rate.symbol.slice(0, 2)}</span>
              </div>
              <div>
                <span className="font-bold text-white text-lg">{rate.symbol}</span>
                {!compact && (
                  <div className="text-sm text-white/50">{rate.name}</div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className={`font-bold text-xl font-mono ${isLoading ? 'animate-pulse' : ''}`}>
                {formatPrice(rate.price)} ₽
              </div>
              <div className={`text-sm font-semibold flex items-center gap-1 ${
                rate.positive ? 'text-green-400' : 'text-red-400'
              }`}>
                {rate.positive ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {formatChange(rate.change)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {!compact && (
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {mounted && lastUpdate && `Обновлено: ${lastUpdate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`}
          </div>
          {isLoading && (
            <div className="flex items-center gap-1.5 text-indigo-400">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} aria-hidden="true" />
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} aria-hidden="true" />
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} aria-hidden="true" />
            </div>
          )}
        </div>
      )}

      {/* Retry button on error */}
      {error && (
        <button
          onClick={fetchRates}
          className="mt-4 w-full py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
          aria-label="Повторить загрузку курсов"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Обновить
        </button>
      )}
    </aside>
  );
}
