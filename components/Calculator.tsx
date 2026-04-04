'use client';

import { useEffect, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { useCountUp } from '@/hooks/useCountUp';

type Rate = {
  symbol: string;
  label: string;
  market: number;
  from: number;
  markup: number;
};

// ─── Направление обмена ───────────────────────────────────────────────────────
type Direction = 'buy' | 'sell';

// ─── Тиерная структура комиссий ───────────────────────────────────────────────
type Tier = {
  label: string;
  maxAmount: number | null; // null = без ограничения
  markup: number;           // в процентах (положительный = наценка, отрицательный = скидка)
};

// При покупке (рубли → крипта): клиент платит рыночный курс + наценка
const BUY_TIERS: Tier[] = [
  { label: 'до 500$',        maxAmount: 500,  markup: 3   },
  { label: '500–2 000$',     maxAmount: 2000, markup: 2   },
  { label: '2 000–8 000$',   maxAmount: 8000, markup: 1.5 },
  { label: '8 000$+',        maxAmount: null, markup: 1   },
];

// При продаже (крипта → рубли): клиент получает рыночный курс − наценка
const SELL_TIERS: Tier[] = [
  { label: 'до 500$',        maxAmount: 500,  markup: -3  },
  { label: '500$+',          maxAmount: null, markup: -2  },
];

function getTier(amountUsd: number, direction: Direction): Tier {
  const tiers = direction === 'buy' ? BUY_TIERS : SELL_TIERS;
  return tiers.find((t) => t.maxAmount === null || amountUsd < t.maxAmount) ?? tiers[tiers.length - 1];
}

/** Возвращает курс с учётом тиерной наценки (или скидки) поверх рыночного */
function getRateWithTier(marketRate: number, amountCrypto: number, direction: Direction): number {
  const tier = getTier(amountCrypto, direction);
  return marketRate * (1 + tier.markup / 100);
}

// ─── Форматирование ───────────────────────────────────────────────────────────
function formatRub(value: number) {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: value < 1000 ? 2 : 0,
  }).format(value);
}

function AnimatedResult({ value, suffix, decimals }: { value: number; suffix: string; decimals: number }) {
  const animated = useCountUp(value, { duration: 600, decimals, enabled: value > 0 });
  if (value === 0) return <>0{suffix}</>;
  const formatted =
    decimals > 0
      ? new Intl.NumberFormat('ru-RU', {
          minimumFractionDigits: 2,
          maximumFractionDigits: decimals,
        }).format(animated)
      : formatRub(animated);
  return <>{formatted}{suffix}</>;
}

// ─── Компонент калькулятора ───────────────────────────────────────────────────
export default function Calculator() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState('USDT');
  const [cryptoAmount, setCryptoAmount] = useState('1000');
  const [rubAmount, setRubAmount] = useState('');
  const [activeField, setActiveField] = useState<'crypto' | 'rub'>('crypto');
  const [direction, setDirection] = useState<Direction>('buy');
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useReveal();

  useEffect(() => {
    fetch('/api/rates', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (data.rates) setRates(data.rates);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const selectedRate = rates.find((r) => r.symbol === selectedSymbol);
  const currentTiers = direction === 'buy' ? BUY_TIERS : SELL_TIERS;

  // Получаем текущий тир и курс с учётом суммы и направления
  const cryptoNum = parseFloat(cryptoAmount) || 0;
  const rubNum = parseFloat(rubAmount) || 0;
  const currentTier = getTier(
    activeField === 'crypto' ? cryptoNum : rubNum / (selectedRate?.market ?? 1),
    direction
  );
  const effectiveRate = selectedRate ? getRateWithTier(selectedRate.market, cryptoNum, direction) : 0;

  // ─── Вспомогательная: определяем тир из суммы рублей ─────────────────────
  function getTierFromRub(rubVal: number, market: number, dir: Direction): Tier {
    const tiers = dir === 'buy' ? BUY_TIERS : SELL_TIERS;
    for (const t of tiers) {
      if (t.maxAmount === null) return t;
      const rateForTier = market * (1 + t.markup / 100);
      const cryptoForTier = rubVal / rateForTier;
      if (cryptoForTier < t.maxAmount) return t;
    }
    return tiers[tiers.length - 1];
  }

  // ─── Обработчики полей ──────────────────────────────────────────────────────
  const handleCryptoChange = (value: string, dir: Direction = direction) => {
    setActiveField('crypto');
    setCryptoAmount(value);
    if (selectedRate) {
      const num = parseFloat(value) || 0;
      const rate = getRateWithTier(selectedRate.market, num, dir);
      setRubAmount(num > 0 ? (num * rate).toFixed(2) : '');
    }
  };

  const handleRubChange = (value: string, dir: Direction = direction) => {
    setActiveField('rub');
    setRubAmount(value);
    if (selectedRate) {
      const num = parseFloat(value) || 0;
      if (num === 0) { setCryptoAmount(''); return; }
      const tier = getTierFromRub(num, selectedRate.market, dir);
      const rate = selectedRate.market * (1 + tier.markup / 100);
      setCryptoAmount((num / rate).toFixed(8));
    }
  };

  const handleSymbolChange = (symbol: string) => {
    setSelectedSymbol(symbol);
    setActiveField('crypto');
    const rate = rates.find((r) => r.symbol === symbol);
    if (rate) {
      const num = parseFloat(cryptoAmount) || 0;
      const effectiveRate = getRateWithTier(rate.market, num, direction);
      setRubAmount(num > 0 ? (num * effectiveRate).toFixed(2) : '');
    }
  };

  const handleDirectionChange = (dir: Direction) => {
    setDirection(dir);
    // Пересчитываем с новым направлением
    if (selectedRate) {
      if (activeField === 'crypto') {
        const num = parseFloat(cryptoAmount) || 0;
        const rate = getRateWithTier(selectedRate.market, num, dir);
        setRubAmount(num > 0 ? (num * rate).toFixed(2) : '');
      } else {
        const num = parseFloat(rubAmount) || 0;
        if (num > 0) {
          const tier = getTierFromRub(num, selectedRate.market, dir);
          const rate = selectedRate.market * (1 + tier.markup / 100);
          setCryptoAmount((num / rate).toFixed(8));
        }
      }
    }
  };

  // Инициализация при загрузке курсов
  const marketRate = selectedRate?.market ?? 0;
  useEffect(() => {
    if (marketRate > 0 && activeField === 'crypto') {
      const num = parseFloat(cryptoAmount) || 0;
      const rate = getRateWithTier(marketRate, num, direction);
      setRubAmount(num > 0 ? (num * rate).toFixed(2) : '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketRate]);

  // Разница с рыночным курсом
  const marketRubAmount = cryptoNum * (selectedRate?.market ?? 0);
  const effectiveRubAmount = parseFloat(rubAmount) || 0;
  const rubDifference = Math.abs(effectiveRubAmount - marketRubAmount);

  const isBuy = direction === 'buy';

  return (
    <section className="section-shell">
      <div className="section-inner">
        <div ref={sectionRef} className="surface-strong reveal p-6 md:p-10">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Калькулятор
          </div>
          <h2 className="mt-3 fluid-heading font-semibold text-[rgba(31,26,20,0.95)] md:text-3xl lg:text-4xl">
            Рассчитать обмен
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            Укажите сумму — мы покажем, сколько получите по текущему курсу с учётом наценки.
          </p>

          {/* ─── Переключатель направления ───────────────────────────────── */}
          <div className="mt-6 inline-flex rounded-xl border border-[rgba(73,53,35,0.12)] bg-[rgba(255,255,255,0.5)] p-1 gap-1">
            <button
              type="button"
              onClick={() => handleDirectionChange('buy')}
              className={`rounded-lg px-5 py-2 text-sm font-medium transition-all duration-200 ${
                isBuy
                  ? 'bg-[rgba(15,118,110,0.9)] text-white shadow-sm'
                  : 'text-muted hover:text-[rgba(31,26,20,0.8)]'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Покупка
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleDirectionChange('sell')}
              className={`rounded-lg px-5 py-2 text-sm font-medium transition-all duration-200 ${
                !isBuy
                  ? 'bg-[rgba(120,53,15,0.85)] text-white shadow-sm'
                  : 'text-muted hover:text-[rgba(31,26,20,0.8)]'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                Продажа
              </span>
            </button>
          </div>

          {/* ─── Подпись под переключателем ──────────────────────────────── */}
          <p className="mt-2 text-xs text-muted">
            {isBuy
              ? 'Вы платите рублями → получаете криптовалюту'
              : 'Вы отдаёте криптовалюту → получаете рубли'}
          </p>

          {/* ─── Тиеры (наглядная шкала) ─────────────────────────────────── */}
          <div className={`mt-6 grid gap-2 ${isBuy ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'}`}>
            {currentTiers.map((tier) => {
              const isActive = currentTier.label === tier.label;
              return (
                <div
                  key={tier.label}
                  className={`rounded-xl border px-3 py-2 text-center transition-all duration-300 ${
                    isActive
                      ? isBuy
                        ? 'border-[rgba(15,118,110,0.5)] bg-[rgba(15,118,110,0.1)] text-[rgba(17,94,89,0.95)]'
                        : 'border-[rgba(120,53,15,0.4)] bg-[rgba(120,53,15,0.08)] text-[rgba(120,53,15,0.95)]'
                      : 'border-[rgba(73,53,35,0.1)] bg-[rgba(255,255,255,0.4)] text-muted'
                  }`}
                >
                  <div className="text-xs font-medium">{tier.label}</div>
                  <div
                    className={`text-base font-semibold ${
                      isActive
                        ? isBuy ? 'text-[rgba(17,94,89,0.95)]' : 'text-[rgba(120,53,15,0.95)]'
                        : 'text-muted'
                    }`}
                  >
                    {tier.markup > 0 ? '+' : ''}{tier.markup}%
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* ─── Поля ввода ───────────────────────────────────────────── */}
            <div className="space-y-4">
              <div>
                <label htmlFor="calc-crypto" className="field-label">
                  Криптовалюта
                </label>
                <select
                  id="calc-crypto"
                  value={selectedSymbol}
                  onChange={(e) => handleSymbolChange(e.target.value)}
                  className="input-base"
                >
                  {(rates.length > 0 ? rates : [{ symbol: 'USDT', label: 'Тезер' }]).map((r) => (
                    <option key={r.symbol} value={r.symbol}>
                      {r.label} ({r.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="calc-amount-crypto" className="field-label">
                  {isBuy
                    ? `Хочу получить (${selectedSymbol})`
                    : `Отдаю (${selectedSymbol})`}
                </label>
                <input
                  id="calc-amount-crypto"
                  type="number"
                  min="0"
                  step="any"
                  value={cryptoAmount}
                  onChange={(e) => handleCryptoChange(e.target.value)}
                  onFocus={() => setActiveField('crypto')}
                  className="input-base"
                  placeholder="0"
                />
              </div>

              <div className="flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(73,53,35,0.12)] bg-[rgba(255,255,255,0.7)] text-muted md:h-10 md:w-10">
                  {/* Стрелка: при покупке — вниз (рубли → крипта), при продаже — вверх */}
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d={isBuy
                        ? 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4'
                        : 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4'} />
                  </svg>
                </div>
              </div>

              <div>
                <label htmlFor="calc-amount-rub" className="field-label">
                  {isBuy ? 'Плачу (₽)' : 'Получу (₽)'}
                </label>
                <input
                  id="calc-amount-rub"
                  type="number"
                  min="0"
                  step="any"
                  value={rubAmount}
                  onChange={(e) => handleRubChange(e.target.value)}
                  onFocus={() => setActiveField('rub')}
                  className="input-base"
                  placeholder="0"
                />
              </div>
            </div>

            {/* ─── Результат ────────────────────────────────────────────── */}
            <div
              className={`flex flex-col justify-center rounded-[var(--radius-lg,24px)] p-6 md:p-8 ${
                isBuy ? 'bg-[rgba(15,118,110,0.1)]' : 'bg-[rgba(120,53,15,0.08)]'
              }`}
            >
              {isLoading ? (
                <div className="space-y-3">
                  <div className="shimmer h-4 w-32" />
                  <div className="shimmer h-10 w-48" />
                  <div className="shimmer h-4 w-40" />
                </div>
              ) : selectedRate ? (
                <>
                  <div className="text-sm font-medium text-muted">Приблизительная сумма</div>
                  <div className="text-xs text-muted mt-1">
                    {isBuy
                      ? (activeField === 'crypto' ? 'Вы заплатите' : 'Вы получите')
                      : (activeField === 'crypto' ? 'Вы получите' : 'Вам нужно отдать')}
                  </div>
                  <div className="mt-3 text-3xl font-semibold text-[rgba(31,26,20,0.95)] md:text-4xl">
                    {activeField === 'crypto' ? (
                      <AnimatedResult value={parseFloat(rubAmount) || 0} suffix=" ₽" decimals={0} />
                    ) : (
                      <AnimatedResult
                        value={parseFloat(cryptoAmount) || 0}
                        suffix={` ${selectedSymbol}`}
                        decimals={selectedSymbol === 'BTC' ? 8 : selectedSymbol === 'USDT' ? 2 : 6}
                      />
                    )}
                  </div>

                  <div className="mt-4 space-y-1 text-sm text-muted">
                    <div>
                      Рыночный курс: {formatRub(selectedRate.market)} ₽ за 1 {selectedSymbol}
                    </div>
                    <div>
                      Ваш курс: {formatRub(effectiveRate)} ₽ за 1 {selectedSymbol}
                    </div>

                    {/* Разница с рыночным курсом */}
                    {cryptoNum > 0 && (
                      <div className="text-xs text-muted">
                        Наша комиссия: ≈ {formatRub(rubDifference)} ₽
                      </div>
                    )}

                    {/* Активный тир */}
                    <div
                      className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                        isBuy
                          ? 'bg-[rgba(15,118,110,0.12)] text-[rgba(17,94,89,0.9)]'
                          : 'bg-[rgba(120,53,15,0.1)] text-[rgba(120,53,15,0.9)]'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isBuy ? 'bg-[rgba(17,94,89,0.7)]' : 'bg-[rgba(120,53,15,0.7)]'
                        }`}
                      />
                      Тариф {currentTier.label} — {currentTier.markup > 0 ? '+' : ''}{currentTier.markup}%
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-sm text-muted">Курсы временно недоступны</div>
              )}
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-muted">
            Итоговый курс фиксируется менеджером в момент подтверждения сделки.
          </p>
        </div>
      </div>
    </section>
  );
}