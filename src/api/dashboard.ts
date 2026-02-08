import axiosClient from "./axiosClient";

// Типы данных для Dashboard
export interface DashboardStats {
  balance: number;
  currency: string;
  profitability_day: number;
  profitability_month: number;
  profitability_total: number;
  risk_level: 'low' | 'medium' | 'high';
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface DashboardData {
  stats: DashboardStats;
  chart_data: ChartDataPoint[];
}

// Получить satellite ID из localStorage
const getSatelliteId = (): string | null => {
  try {
    const satellite = JSON.parse(localStorage.getItem('satellite') || '{}');
    return satellite.id ? String(satellite.id) : null;
  } catch {
    return null;
  }
};

// Mock данные (если API не готов)
const mockDashboardData: DashboardData = {
  stats: {
    balance: 49595.015,
    currency: 'USD',
    profitability_day: 0.8,
    profitability_month: 12.5,
    profitability_total: 45.2,
    risk_level: 'high',
  },
  chart_data: [
    { date: '2024-01', value: 15000 },
    { date: '2024-02', value: 18500 },
    { date: '2024-03', value: 22000 },
    { date: '2024-04', value: 28000 },
    { date: '2024-05', value: 32500 },
    { date: '2024-06', value: 38000 },
    { date: '2024-07', value: 45000 },
    { date: '2024-08', value: 49595 },
  ],
};

export const fetchDashboardData = async (): Promise<DashboardData> => {
  const satelliteId = getSatelliteId();
  
  // Если нет satellite_id — не дёргаем API, сразу mock data
  if (!satelliteId) {
    console.warn('No satellite_id, using mock data');
    const balance = getBalanceFromSatellite();
    if (balance > 0) {
      mockDashboardData.stats.balance = balance;
    }
    return mockDashboardData;
  }

  try {
    const response = await axiosClient.get('/api/frontend/dashboard/', {
      params: { satellite_id: satelliteId },
      headers: { 'X-Satellite-ID': satelliteId },
    });
    return response.data;
  } catch (error) {
    console.warn('Dashboard API error, using mock data');
    const balance = getBalanceFromSatellite();
    if (balance > 0) {
      mockDashboardData.stats.balance = balance;
    }
    return mockDashboardData;
  }
};

// Получить баланс из satellite данных
export const getBalanceFromSatellite = (): number => {
  try {
    const satellite = JSON.parse(localStorage.getItem('satellite') || '{}');
    return parseFloat(satellite.active_balance) || 0;
  } catch {
    return 0;
  }
};

// Получить все балансы satellite
export interface SatelliteBalances {
  block_balance: number;
  active_balance: number;
  withdrawal: number;
}

export const getSatelliteBalances = (): SatelliteBalances => {
  try {
    const satellite = JSON.parse(localStorage.getItem('satellite') || '{}');
    return {
      block_balance: parseFloat(satellite.block_balance) || 0,
      active_balance: parseFloat(satellite.active_balance) || 0,
      withdrawal: parseFloat(satellite.withdrawal) || 0,
    };
  } catch {
    return { block_balance: 0, active_balance: 0, withdrawal: 0 };
  }
};
