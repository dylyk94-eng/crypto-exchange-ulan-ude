'use client';

import { useEffect, useMemo, useState } from 'react';

type RateItem = {
  symbol: string;
  label: string;
  from: number;
};

type RatesResponse = {
  rates?: RateItem[];
};

const fiatCurrency = { symbol: 'RUB', label: 'Российский рубль' };
const cryptoDefaults: RateItem[] = [
  { symbol: 'USDT', label: 'Tether', from: 95 },
  { symbol: 'BTC', label: 'Bitcoin', from: 6500000 },
  { symbol: 'ETH', label: 'Ethereum', from: 230000 },
];

const rateFormatter = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 });

function parseNumeric(input: string) {
  const normalized = input.replace(',', '.').replace(/[^\d.]/g, '');
  const value = Number(normalized);
  return Number.isFinite(value) ? value : 0;
}

function normalizeAmount(value: number, digits = 8) {
  if (!Number.isFinite(value) || value <= 0) {
    return '0';
  }

  return value
    .toFixed(digits)
    .replace(/\.0+$/, '')
    .replace(/(\.\d*?)0+$/, '$1');
}

export default function ExchangeCalculator({ city }: { city: string }) {
  const [rates, setRates] = useState<RateItem[]>(cryptoDefaults);
  const [fromAmount, setFromAmount] = useState('1500000');
  const [toAmount, setToAmount] = useState('0');
  const [toSymbol, setToSymbol] = useState('ETH');
  const [activeSide, setActiveSide] = useState<'from' | 'to'>('from');
  const [loadingRates, setLoadingRates] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchRates = async () => {
      setLoadingRates(true);
      try {
        const response = await fetch('/api/rates', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to load rates');
        }

        const data = (await response.json()) as RatesResponse;
        if (!ignore && data.rates?.length) {
          setRates(data.rates);
        }
      } catch (error) {
        console.error('Rates fetch failed:', error);
      } finally {
        if (!ignore) {
          setLoadingRates(false);
        }
      }
    };

    void fetchRates();

    return () => {
      ignore = true;
    };
  }, []);

  const selectedRate = useMemo(() => {
    return rates.find((item) => item.symbol === toSymbol) ?? rates[0] ?? cryptoDefaults[0];
  }, [rates, toSymbol]);

  useEffect(() => {
    if (!selectedRate) {
      return;
    }

    if (activeSide === 'from') {
      const rubAmount = parseNumeric(fromAmount);
      const result = rubAmount / selectedRate.from;
      setToAmount(normalizeAmount(result));
      return;
    }

    const cryptoAmount = parseNumeric(toAmount);
    const result = cryptoAmount * selectedRate.from;
    setFromAmount(normalizeAmount(result, 2));
  }, [fromAmount, toAmount, selectedRate, activeSide]);

  return (
    <section className="section-shell section-tint py-16 md:py-20">
      <div className="section-inner">
        <div className="section-head fade-in">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Дополнительный блок
          </div>
          <h2 className="max-w-3xl text-4xl font-semibold leading-tight text-[rgba(31,26,20,0.95)] md:text-5xl">
            Предварительный калькулятор обмена
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            Отдельный расчетный блок для {city}. Здесь пользователь может быстро прикинуть сумму до перехода к заявке.
          </p>
        </div>

        <div className="surface-accent fade-in overflow-hidden p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:items-start">
            <div className="space-y-5">
              <span className="section-kicker">Быстрый расчет</span>
              <h3 className="text-3xl font-semibold leading-tight text-[rgba(31,26,20,0.95)]">
                Обменять средства
              </h3>
              <p className="text-base leading-7 text-muted">
                Курс обновляется автоматически. Точные условия менеджер подтвердит перед сделкой.
              </p>
              <div className="rounded-[22px] border border-[rgba(73,53,35,0.12)] bg-[rgba(255,255,255,0.62)] px-4 py-4 text-sm font-medium text-[rgba(31,26,20,0.82)]">
                {loadingRates ? 'Обновляем курс...' : `1 ${selectedRate.symbol} = ${rateFormatter.format(selectedRate.from)} RUB`}
              </div>
              <a href="#contact" className="btn-primary w-full md:inline-flex md:w-auto">
                Перейти к заявке
              </a>
            </div>

            <div className="grid gap-4">
              <div className="surface-strong p-5 md:p-6">
                <label className="field-label">Отдаете</label>
                <div className="grid gap-3 sm:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)]">
                  <select className="input-base" value={fiatCurrency.symbol} disabled>
                    <option>{fiatCurrency.symbol}</option>
                  </select>
                  <input
                    className="input-base"
                    inputMode="decimal"
                    value={fromAmount}
                    onChange={(e) => {
                      setActiveSide('from');
                      setFromAmount(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(17,94,89,0.14)] bg-[rgba(15,118,110,0.12)] text-lg text-[rgba(17,94,89,0.92)]">
                ⇄
              </div>

              <div className="surface-strong p-5 md:p-6">
                <div className="flex items-center justify-between gap-2">
                  <label className="field-label">Получаете</label>
                  <span className="text-xs font-medium uppercase tracking-wider text-[rgba(17,94,89,0.64)]">приблизительная сумма</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)]">
                  <select
                    className="input-base"
                    value={toSymbol}
                    onChange={(e) => {
                      setToSymbol(e.target.value);
                      setActiveSide('from');
                    }}
                  >
                    {rates.map((item) => (
                      <option key={item.symbol} value={item.symbol}>
                        {item.label} ({item.symbol})
                      </option>
                    ))}
                  </select>
                  <input
                    className="input-base"
                    inputMode="decimal"
                    value={toAmount}
                    onChange={(e) => {
                      setActiveSide('to');
                      setToAmount(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
