import { NextResponse } from 'next/server';

type AssetSymbol = 'BTC' | 'ETH' | 'USDT' | 'LTC' | 'TRX' | 'BNB';

type RateItem = {
  symbol: AssetSymbol;
  label: string;
  market: number;
  from: number;
  markup: number;
};

type CoinGeckoResponse = {
  bitcoin?: { rub?: number; last_updated_at?: number };
  ethereum?: { rub?: number; last_updated_at?: number };
  tether?: { rub?: number; last_updated_at?: number };
  litecoin?: { rub?: number; last_updated_at?: number };
  tron?: { rub?: number; last_updated_at?: number };
  binancecoin?: { rub?: number; last_updated_at?: number };
};

type GenericRecord = Record<string, unknown>;

const DEFAULT_MARKUPS: Record<AssetSymbol, number> = {
  BTC: Number(process.env.RATE_MARKUP_BTC ?? '1.8'),
  ETH: Number(process.env.RATE_MARKUP_ETH ?? '1.8'),
  USDT: Number(process.env.RATE_MARKUP_USDT ?? '1.2'),
  LTC: Number(process.env.RATE_MARKUP_LTC ?? '1.6'),
  TRX: Number(process.env.RATE_MARKUP_TRX ?? '1.4'),
  BNB: Number(process.env.RATE_MARKUP_BNB ?? '1.7'),
};

const ASSET_META: Record<AssetSymbol, { label: string; defaultMarketIds: string[] }> = {
  BTC: { label: 'Биткоин', defaultMarketIds: ['btcrub', 'btc-rub', 'btc_rub', 'BTCRUB', 'BTC-RUB'] },
  ETH: { label: 'Эфир', defaultMarketIds: ['ethrub', 'eth-rub', 'eth_rub', 'ETHRUB', 'ETH-RUB'] },
  USDT: { label: 'Тезер', defaultMarketIds: ['usdtrub', 'usdt-rub', 'usdt_rub', 'USDTRUB', 'USDT-RUB'] },
  LTC: { label: 'Лайткоин', defaultMarketIds: ['ltcrub', 'ltc-rub', 'ltc_rub', 'LTCRUB', 'LTC-RUB'] },
  TRX: { label: 'Трон', defaultMarketIds: ['trxrub', 'trx-rub', 'trx_rub', 'TRXRUB', 'TRX-RUB'] },
  BNB: { label: 'BNB', defaultMarketIds: ['bnbrub', 'bnb-rub', 'bnb_rub', 'BNBRUB', 'BNB-RUB'] },
};

const PROVIDER = (process.env.RATES_PROVIDER ?? 'coingecko').toLowerCase();
const REQUEST_TIMEOUT_MS = Number(process.env.RATES_REQUEST_TIMEOUT_MS ?? '8000');
const GRINEX_API_URL =
  process.env.GRINEX_API_URL ?? 'https://api.grinex.io/public/markets/tickers';
const GRINEX_API_KEY = process.env.GRINEX_API_KEY;

function applyMarkup(price: number, percent: number) {
  return price * (1 + percent / 100);
}

function parseNumber(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.replace(',', '.').trim();
    const parsed = Number(normalized);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function extractPrice(entry: unknown): number | null {
  if (entry == null) {
    return null;
  }

  const direct = parseNumber(entry);
  if (direct && direct > 0) {
    return direct;
  }

  if (typeof entry !== 'object') {
    return null;
  }

  const record = entry as GenericRecord;

  const candidates = [
    record.last,
    record.price,
    record.close,
    record.avg_price,
    record.last_price,
    record.ticker,
  ];

  for (const candidate of candidates) {
    if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
      const nested = candidate as GenericRecord;
      const nestedPrice =
        parseNumber(nested.last) ??
        parseNumber(nested.price) ??
        parseNumber(nested.close) ??
        parseNumber(nested.avg_price);

      if (nestedPrice && nestedPrice > 0) {
        return nestedPrice;
      }
    }

    const price = parseNumber(candidate);
    if (price && price > 0) {
      return price;
    }
  }

  return null;
}

function normalizeTickerMap(payload: unknown) {
  if (Array.isArray(payload)) {
    return payload.reduce<Record<string, unknown>>((acc, item) => {
      if (!item || typeof item !== 'object') {
        return acc;
      }

      const record = item as GenericRecord;
      const marketId =
        typeof record.market === 'string'
          ? record.market
          : typeof record.symbol === 'string'
            ? record.symbol
            : typeof record.id === 'string'
              ? record.id
              : null;

      if (marketId) {
        acc[marketId] = item;
      }

      return acc;
    }, {});
  }

  if (!payload || typeof payload !== 'object') {
    throw new Error('Unsupported ticker payload');
  }

  const record = payload as GenericRecord;

  if (record.data && typeof record.data === 'object') {
    return normalizeTickerMap(record.data);
  }

  if (record.tickers && typeof record.tickers === 'object') {
    return normalizeTickerMap(record.tickers);
  }

  return record;
}

function getConfiguredMarketIds(symbol: AssetSymbol) {
  const raw = process.env[`GRINEX_MARKET_${symbol}`];
  if (!raw) {
    return ASSET_META[symbol].defaultMarketIds;
  }

  return raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

function buildRates(rates: Record<AssetSymbol, number>) {
  return (Object.keys(ASSET_META) as AssetSymbol[]).map<RateItem>((symbol) => ({
    symbol,
    label: ASSET_META[symbol].label,
    market: rates[symbol],
    from: applyMarkup(rates[symbol], DEFAULT_MARKUPS[symbol]),
    markup: DEFAULT_MARKUPS[symbol],
  }));
}

async function fetchJson(url: string, headers: HeadersInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        ...headers,
      },
      next: { revalidate: 60 },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function loadRatesFromCoinGecko() {
  const data = (await fetchJson(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,litecoin,tron,binancecoin&vs_currencies=rub&include_last_updated_at=true'
  )) as CoinGeckoResponse;

  const btc = data.bitcoin?.rub;
  const eth = data.ethereum?.rub;
  const usdt = data.tether?.rub;
  const ltc = data.litecoin?.rub;
  const trx = data.tron?.rub;
  const bnb = data.binancecoin?.rub;

  if (!btc || !eth || !usdt || !ltc || !trx || !bnb) {
    throw new Error('CoinGecko response is missing required currencies');
  }

  const lastUpdatedAt =
    data.bitcoin?.last_updated_at ||
    data.ethereum?.last_updated_at ||
    data.tether?.last_updated_at ||
    Math.floor(Date.now() / 1000);

  return {
    updatedAt: new Date(lastUpdatedAt * 1000).toISOString(),
    provider: 'coingecko',
    rates: buildRates({
      BTC: btc,
      ETH: eth,
      USDT: usdt,
      LTC: ltc,
      TRX: trx,
      BNB: bnb,
    }),
  };
}

async function loadRatesFromGrinex() {
  const headers: HeadersInit = {};

  if (GRINEX_API_KEY) {
    headers.Authorization = `Bearer ${GRINEX_API_KEY}`;
  }

  const payload = await fetchJson(GRINEX_API_URL, headers);
  const tickerMap = normalizeTickerMap(payload);
  const marketRates = {} as Record<AssetSymbol, number>;

  for (const symbol of Object.keys(ASSET_META) as AssetSymbol[]) {
    const marketIds = getConfiguredMarketIds(symbol);
    const entry = marketIds
      .map((marketId) => tickerMap[marketId])
      .find((candidate) => candidate !== undefined);

    const price = extractPrice(entry);
    if (!price || price <= 0) {
      throw new Error(`Grinex ticker is missing a RUB market for ${symbol}`);
    }

    marketRates[symbol] = price;
  }

  return {
    updatedAt: new Date().toISOString(),
    provider: 'grinex',
    rates: buildRates(marketRates),
  };
}

export async function GET() {
  try {
    const preferredLoader = PROVIDER === 'grinex' ? loadRatesFromGrinex : loadRatesFromCoinGecko;
    const fallbackLoader = PROVIDER === 'grinex' ? loadRatesFromCoinGecko : null;

    let result;

    try {
      result = await preferredLoader();
    } catch (primaryError) {
      if (!fallbackLoader) {
        throw primaryError;
      }

      console.error('Primary rates provider failed, using fallback:', primaryError);
      result = await fallbackLoader();
    }

    return NextResponse.json(
      {
        updatedAt: result.updatedAt,
        provider: result.provider,
        disclaimer: 'Курс предварительный. Точные условия подтверждаются менеджером перед сделкой.',
        rates: result.rates,
      },
      {
        headers: {
          'Cache-Control': 's-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error('Rates route error:', error);

    return NextResponse.json(
      {
        error: 'Не удалось загрузить курсы',
      },
      { status: 503 }
    );
  }
}
