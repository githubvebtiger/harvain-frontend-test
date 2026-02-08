import axiosClient from "./axiosClient";

// Типы данных для Assets
export interface AssetItem {
  name: string;
  value: number;
  color: string;
  amount?: number;
  price?: number;
  quantity?: number;
  symbol?: string;
}

export interface StrategyItem {
  name: string;
  value: number;
  color: string;
}

export interface AssetsData {
  assets: AssetItem[];
  strategies: StrategyItem[];
  total_value: number;
}

export interface CryptoPrices {
  [key: string]: number;
}

// Маппинг названий к CoinGecko IDs
const COINGECKO_IDS: Record<string, string> = {
  BTC: 'bitcoin',
  Bitcoin: 'bitcoin',
  ETH: 'ethereum',
  Ethereum: 'ethereum',
  SOL: 'solana',
  BNB: 'binancecoin',
  XRP: 'ripple',
  ADA: 'cardano',
  DOGE: 'dogecoin',
  DOT: 'polkadot',
  MATIC: 'matic-network',
  LINK: 'chainlink',
  UNI: 'uniswap',
  AVAX: 'avalanche-2',
  ATOM: 'cosmos',
};

// Символы валют
const ASSET_SYMBOLS: Record<string, string> = {
  BTC: 'BTC',
  Bitcoin: 'BTC',
  ETH: 'ETH',
  Ethereum: 'ETH',
  SOL: 'SOL',
  BNB: 'BNB',
  XRP: 'XRP',
  ADA: 'ADA',
  DOGE: 'DOGE',
  USD: 'USD',
  USDT: 'USDT',
  USDC: 'USDC',
  Stablecoins: 'USD',
  Altcoins: 'ALT',
};

// Получить satellite ID из localStorage
const getSatelliteId = (): string | null => {
  try {
    const satellite = JSON.parse(localStorage.getItem('satellite') || '{}');
    return satellite.id ? String(satellite.id) : null;
  } catch {
    return null;
  }
};

// Получить баланс из satellite
const getBalanceFromSatellite = (): number => {
  try {
    const satellite = JSON.parse(localStorage.getItem('satellite') || '{}');
    return parseFloat(satellite.active_balance) || 0;
  } catch {
    return 0;
  }
};

// Цвета для активов
const ASSET_COLORS: Record<string, string> = {
  BTC: '#F7931A',
  ETH: '#627EEA',
  Altcoins: '#14CA74',
  Stablecoins: '#26A17B',
  USD: '#85BB65',
  USDT: '#26A17B',
  USDC: '#2775CA',
  SOL: '#9945FF',
  BNB: '#F3BA2F',
};

// Цвета для стратегий
const STRATEGY_COLORS: Record<string, string> = {
  'Арбитраж': '#627EEA',
  'Arbitrage': '#627EEA',
  'Деривативы': '#14CA74',
  'Derivatives': '#14CA74',
  'DeFi': '#F7931A',
  'Spot': '#26A17B',
  'Staking': '#9945FF',
};

// Получить курсы криптовалют с CoinGecko
export const fetchCryptoPrices = async (): Promise<CryptoPrices> => {
  try {
    const ids = Object.values(COINGECKO_IDS).join(',');
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
    );
    
    if (!response.ok) {
      throw new Error('CoinGecko API error');
    }
    
    const data = await response.json();
    
    // Преобразуем в удобный формат { BTC: 97000, ETH: 3500, ... }
    const prices: CryptoPrices = {};
    for (const [symbol, geckoId] of Object.entries(COINGECKO_IDS)) {
      if (data[geckoId]?.usd) {
        prices[symbol] = data[geckoId].usd;
      }
    }
    
    // Stablecoins всегда $1
    prices['USD'] = 1;
    prices['USDT'] = 1;
    prices['USDC'] = 1;
    prices['Stablecoins'] = 1;
    
    return prices;
  } catch (error) {
    console.warn('CoinGecko API error, using fallback prices');
    // Fallback цены
    return {
      BTC: 97000,
      ETH: 3450,
      SOL: 190,
      BNB: 680,
      USD: 1,
      USDT: 1,
      USDC: 1,
      Stablecoins: 1,
    };
  }
};

// Mock данные
const getMockAssetsData = (): AssetsData => {
  const totalValue = getBalanceFromSatellite() || 49595.015;
  return {
    total_value: totalValue,
    assets: [
      { name: 'BTC', value: 40, color: ASSET_COLORS.BTC, amount: totalValue * 0.4, symbol: 'BTC' },
      { name: 'ETH', value: 25, color: ASSET_COLORS.ETH, amount: totalValue * 0.25, symbol: 'ETH' },
      { name: 'Altcoins', value: 15, color: ASSET_COLORS.Altcoins, amount: totalValue * 0.15, symbol: 'ALT' },
      { name: 'Stablecoins', value: 10, color: ASSET_COLORS.Stablecoins, amount: totalValue * 0.1, symbol: 'USD' },
      { name: 'USD', value: 10, color: ASSET_COLORS.USD, amount: totalValue * 0.1, symbol: 'USD' },
    ],
    strategies: [
      { name: 'Арбитраж', value: 60, color: STRATEGY_COLORS['Арбитраж'] },
      { name: 'Деривативы', value: 25, color: STRATEGY_COLORS['Деривативы'] },
      { name: 'DeFi', value: 15, color: STRATEGY_COLORS.DeFi },
    ],
  };
};

export const fetchAssetsData = async (): Promise<AssetsData> => {
  const satelliteId = getSatelliteId();
  
  // Если нет satellite_id — не дёргаем API, сразу mock data
  if (!satelliteId) {
    console.warn('No satellite_id, using mock data for assets');
    return getMockAssetsData();
  }

  try {
    const response = await axiosClient.get('/api/frontend/assets/', {
      params: { satellite_id: satelliteId },
      headers: { 'X-Satellite-ID': satelliteId },
    });
    
    // Добавляем цвета и символы если их нет в ответе
    const data = response.data;
    data.assets = data.assets.map((asset: AssetItem) => ({
      ...asset,
      color: asset.color || ASSET_COLORS[asset.name] || '#8C89B4',
      symbol: asset.symbol || ASSET_SYMBOLS[asset.name] || asset.name,
    }));
    data.strategies = data.strategies.map((strategy: StrategyItem) => ({
      ...strategy,
      color: strategy.color || STRATEGY_COLORS[strategy.name] || '#8C89B4',
    }));
    
    return data;
  } catch (error) {
    console.warn('Assets API error, using mock data');
    return getMockAssetsData();
  }
};

// Рассчитать количество криптовалюты
export const calculateQuantity = (amountUsd: number, price: number): number => {
  if (!price || price === 0) return 0;
  return amountUsd / price;
};

// Форматировать количество криптовалюты
export const formatQuantity = (quantity: number, symbol: string): string => {
  if (symbol === 'BTC') {
    return quantity.toFixed(6);
  } else if (symbol === 'ETH') {
    return quantity.toFixed(4);
  } else if (['USD', 'USDT', 'USDC', 'ALT'].includes(symbol)) {
    return quantity.toFixed(2);
  }
  return quantity.toFixed(4);
};

// Форматировать цену
export const formatPrice = (price: number): string => {
  if (price >= 1000) {
    return price.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export { ASSET_COLORS, STRATEGY_COLORS, ASSET_SYMBOLS };
