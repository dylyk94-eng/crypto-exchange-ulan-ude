import { NextResponse } from 'next/server';
import logger from '@/lib/logger';

type CoinGeckoResponse = {
  bitcoin?: { rub?: number; last_updated_at?: number };
  ethereum?: { rub?: number; last_updated_at?: number };
  tether?: { rub?: number; last_updated_at?: number };
  litecoin?: { rub?: number; last_updated_at?: number };
  tron?: { rub?: number; last_updated_at?: number };
  binancecoin?: { rub?: number; last_updated_at?: number };
};

const MARKUP_MIN = 0;
const MARKUP_MAX = 50;

function parseMarkup(envVar: string | undefined, fallback: number): number {
  const val = Number(envVar ?? fallback);
  if (isNaN(val) || val < MARKUP_MIN || val > MARKUP_MAX) {
    logger.warn(
      { envVar, fallback },
      `Invalid markup value "${envVar}" — using fallback ${fallback}%`
    );
    return fallback;
  }
  return val;
}

const MARKUPS = {
  BTC: parseMarkup(process.env.RATE_MARKUP_BTC, 1.8),
  ETH: parseMarkup(process.env.RATE_MARKUP_ETH, 1.8),
  USDT: parseMarkup(process.env.RATE_MARKUP_USDT, 1.2),
  LTC: parseMarkup(process.env.RATE_MARKUP_LTC, 1.6),
  TRX: parseMarkup(process.env.RATE_MARKUP_TRX, 1.4),
  BNB: parseMarkup(process.env.RATE_MARKUP_BNB, 1.7),
};

function applyMarkup(price: number, percent: number) {
  return price * (1 + percent / 100);
}

export async function GET() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,litecoin,tron,binancecoin&vs_currencies=rub&include_last_updated_at=true',
      {
        headers: { accept: 'application/json' },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      logger.error({ status: response.status }, 'CoinGecko request failed');
      throw new Error(`Rates request failed with status ${response.status}`);
    }

    const data = (await response.json()) as CoinGeckoResponse;

    const btc = data.bitcoin?.rub;
    const eth = data.ethereum?.rub;
    const usdt = data.tether?.rub;
    const ltc = data.litecoin?.rub;
    const trx = data.tron?.rub;
    const bnb = data.binancecoin?.rub;

    if (!btc || !eth || !usdt || !ltc || !trx || !bnb) {
      throw new Error('Rates response is missing required currencies');
    }

    const lastUpdatedAt =
      data.bitcoin?.last_updated_at ??
      data.ethereum?.last_updated_at ??
      data.tether?.last_updated_at ??
      Math.floor(Date.now() / 1000);

    const updatedAt = new Date(lastUpdatedAt * 1000).toISOString();

    logger.info({ updatedAt }, 'Rates fetched successfully');

    return NextResponse.json(
      {
        updatedAt,
        disclaimer:
          'Курс предварительный. Точные условия подтверждаются менеджером перед сделкой.',
        rates: [
          { symbol: 'BTC', label: 'Биткоин', market: btc, from: applyMarkup(btc, MARKUPS.BTC), markup: MARKUPS.BTC },
          { symbol: 'ETH', label: 'Эфир', market: eth, from: applyMarkup(eth, MARKUPS.ETH), markup: MARKUPS.ETH },
          { symbol: 'USDT', label: 'Тезер', market: usdt, from: applyMarkup(usdt, MARKUPS.USDT), markup: MARKUPS.USDT },
          { symbol: 'LTC', label: 'Лайткоин', market: ltc, from: applyMarkup(ltc, MARKUPS.LTC), markup: MARKUPS.LTC },
          { symbol: 'TRX', label: 'Трон', market: trx, from: applyMarkup(trx, MARKUPS.TRX), markup: MARKUPS.TRX },
          { symbol: 'BNB', label: 'BNB', market: bnb, from: applyMarkup(bnb, MARKUPS.BNB), markup: MARKUPS.BNB },
        ],
      },
      {
        headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=120' },
      }
    );
  } catch (error) {
    logger.error({ error }, 'Rates route error');
    return NextResponse.json({ error: 'Не удалось загрузить курсы' }, { status: 503 });
  }
}
