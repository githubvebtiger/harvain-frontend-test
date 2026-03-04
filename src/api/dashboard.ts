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
  fullDate?: string;
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

// Generate chart data based on satellite balance transitions
const generateChartFromSatellite = (): ChartDataPoint[] => {
  try {
    const satellite = JSON.parse(localStorage.getItem('satellite') || '{}');
    const block = parseFloat(satellite.block_balance) || 0;
    const active = parseFloat(satellite.active_balance) || 0;
    const withdrawal = parseFloat(satellite.withdrawal) || 0;
    const depositAmount = parseFloat(satellite.deposit) || (block + active + withdrawal);
    const totalCurrent = block + active + withdrawal;
    
    const formatTime = (dateStr: string): string => {
      const d = new Date(dateStr);
      return d.toLocaleString('en-US', { 
        month: 'short', day: 'numeric', 
        hour: '2-digit', minute: '2-digit',
        hour12: false 
      });
    };
    
    // All balances zero — flat line
    if (totalCurrent <= 0) {
      return [{ date: 'Now', value: 0 }];
    }
    
    const points: ChartDataPoint[] = [];
    
    // === Point 0: $0 start ===
    if (satellite.deposit_time) {
      const depTime = new Date(satellite.deposit_time);
      const startPoint = new Date(depTime.getTime() - 60 * 60 * 1000);
      points.push({ date: formatTime(startPoint.toISOString()), value: 0 });
    } else if (satellite.created_at) {
      points.push({ date: formatTime(satellite.created_at), value: 0 });
    }
    
    // === Point 1: Deposit ===
    if (satellite.deposit_time) {
      points.push({ date: formatTime(satellite.deposit_time), value: depositAmount });
    } else if (satellite.created_at) {
      points.push({ date: formatTime(satellite.created_at), value: depositAmount });
    }
    
    // === Point 2: Block → Active migration ===
    if (satellite.migration_time && (active > 0 || withdrawal > 0)) {
      points.push({ date: formatTime(satellite.migration_time), value: active + withdrawal });
    }
    
    // === Point 3: Active → Withdrawal migration (money leaving) ===
    if (satellite.second_migration_time && withdrawal > 0) {
      points.push({ date: formatTime(satellite.second_migration_time), value: 0 });
    }
    
    // Fallback if no timestamps available
    if (points.length === 0) {
      points.push({ date: 'Now', value: block + active });
    }
    
    return points;
  } catch {
    return [{ date: 'Now', value: 0 }];
  }
};

const createMockDashboardData = (): DashboardData => {
  const balance = getBalanceFromSatellite();
  return {
    stats: {
      balance: balance,
      currency: 'USD',
      profitability_day: 0,
      profitability_month: 0,
      profitability_total: 0,
      risk_level: 'medium',
    },
    chart_data: generateChartFromSatellite(),
  };
};

export const fetchDashboardData = async (): Promise<DashboardData> => {
  const satelliteId = getSatelliteId();
  
  // Если нет satellite_id — не дёргаем API, сразу mock data
  if (!satelliteId) {
    console.warn('No satellite_id, using mock data');
    return createMockDashboardData();
  }

  try {
    const response = await axiosClient.get('/api/frontend/dashboard/', {
      params: { satellite_id: satelliteId },
      headers: { 'X-Satellite-ID': satelliteId },
    });
    return response.data;
  } catch (error) {
    console.warn('Dashboard API error, using mock data');
    return createMockDashboardData();
  }
};

// Получить баланс из satellite данных (рабочий капитал)
export const getBalanceFromSatellite = (): number => {
  try {
    const satellite = JSON.parse(localStorage.getItem('satellite') || '{}');
    const block = parseFloat(satellite.block_balance) || 0;
    const active = parseFloat(satellite.active_balance) || 0;
    return block + active;
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
