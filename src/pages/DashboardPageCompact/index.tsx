import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import WrapperPage from "../../components/WrapperPage";
import Header from "../../components/Header";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { fetchDashboardData, DashboardData, getBalanceFromSatellite, getSatelliteBalances, SatelliteBalances } from "../../api/dashboard";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";

// ===== STRATEGIES WIDGET CONFIG =====
// Вариант A: Компактный список
const STRATEGIES_WIDGET_VARIANT: 'compact' | 'with-chart' = 'compact';

// Mock данные стратегий (потом заменить на API)
const mockStrategies = [
  { id: '1', name: 'Арбитраж', allocation: 45, profitability: 24.5, color: '#3B82F6' },
  { id: '2', name: 'Spot Trading', allocation: 25, profitability: 18.2, color: '#22C55E' },
  { id: '3', name: 'Futures', allocation: 20, profitability: 31.8, color: '#F59E0B' },
  { id: '4', name: 'DeFi Yield', allocation: 10, profitability: 12.4, color: '#8B5CF6' },
];

type ChartType = "linear" | "candlestick" | "area";

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  }).format(value);
};

const formatPercent = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
};

export default function DashboardPageCompact() {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState<ChartType>("linear");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);
  const [dateRange] = useState({ start: '2024-01', end: '2024-08' });
  const [strategies] = useState(mockStrategies);
  const [satelliteBalances, setSatelliteBalances] = useState<SatelliteBalances>({ 
    block_balance: 0, 
    active_balance: 0, 
    withdrawal: 0 
  });

  // Данные для мини pie chart
  const pieData = strategies.map(s => ({ name: s.name, value: s.allocation, color: s.color }));

  const formatProfitability = (value: number): string => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const dashboardData = await fetchDashboardData();
      const realBalance = getBalanceFromSatellite();
      if (realBalance > 0) {
        dashboardData.stats.balance = realBalance;
      }
      setData(dashboardData);
      
      // Загружаем балансы satellite
      const balances = getSatelliteBalances();
      setSatelliteBalances(balances);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const tooltipStyle = {
    background: "#0A1330",
    border: "1px solid #1a1a3e",
    borderRadius: 8,
    color: "#fff",
    padding: "12px 16px",
  };

  const getChartData = () => {
    if (!data) return [];
    return data.chart_data.map((item, index) => {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      // Пробуем разные форматы даты
      let dateLabel = '';
      if (item.date && item.date.includes('-')) {
        const parts = item.date.split('-');
        if (parts.length >= 2) {
          const monthIdx = parseInt(parts[1]) - 1;
          const day = parts[2] ? parseInt(parts[2]) : index + 1;
          const monthName = monthNames[monthIdx] || 'Jan';
          dateLabel = `${monthName} ${day || index + 1}`;
        }
      } else {
        // Fallback - просто номер точки
        dateLabel = `Day ${index + 1}`;
      }
      
      return {
        month: dateLabel,
        value: item.value,
        fullDate: item.date,
      };
    });
  };

  if (loading) {
    return (
      <div className="dashboard-page-wrapper">
        <div className="hide-on-mobile">
          <Header disableContainer isAuth />
        </div>
        <WrapperPage>
          <div className="dashboard-page">
            <h2>Dashboard <span style={{fontSize: '14px', color: '#8C89B4', fontWeight: 400}}>(Variant A: Compact)</span></h2>
            <div className="skeleton balance-card-skeleton"></div>
            <div className="skeleton chart-card-skeleton"></div>
          </div>
        </WrapperPage>
      </div>
    );
  }

  if (!data) return null;

  const chartData = getChartData();

  return (
    <div className="dashboard-page-wrapper">
      <div className="hide-on-mobile">
        <Header disableContainer isAuth />
      </div>
      <WrapperPage>
        <div className="dashboard-page">
          <h2>Dashboard <span style={{fontSize: '14px', color: '#8C89B4', fontWeight: 400}}>(Variant A: Compact)</span></h2>

          <div className="balance-card">
            <div className="balance-info">
              <span className="balance-label">Overall balance</span>
              <div className="balance-row">
                <span className="balance-value">{formatCurrency(data.stats.balance)}</span>
                <span className="balance-change positive">
                  +{data.stats.profitability_day.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="currency-selector">
              <button className="currency-btn">
                {data.stats.currency} <span className="arrow">▼</span>
              </button>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Capital growth chart</h3>
              <div className="chart-controls">
                <div className="date-picker">
                  <CalendarIcon className="calendar-icon" />
                  <span>{dateRange.start.replace('-', ' ')} - {dateRange.end.replace('-', ' ')}</span>
                </div>
                <div className="chart-type-btns">
                  <button 
                    className={chartType === "linear" ? "chart-type-btn active" : "chart-type-btn"} 
                    onClick={() => setChartType("linear")}
                  >
                    Linear
                  </button>
                  <button 
                    className={chartType === "candlestick" ? "chart-type-btn active" : "chart-type-btn"} 
                    onClick={() => setChartType("candlestick")}
                  >
                    Candlestick
                  </button>
                  <button 
                    className={chartType === "area" ? "chart-type-btn active" : "chart-type-btn"} 
                    onClick={() => setChartType("area")}
                  >
                    Area
                  </button>
                </div>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A56DB" stopOpacity={chartType === "area" ? 0.4 : 0.2} />
                      <stop offset="95%" stopColor="#1A56DB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a3e" vertical={false} />
                  <XAxis dataKey="month" stroke="#8C89B4" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#8C89B4" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}K`} />
                  <Tooltip 
                    contentStyle={tooltipStyle} 
                    formatter={(value: number) => [formatCurrency(value), "Balance"]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#1A56DB" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorValue)"
                    dot={chartType === "linear" ? { fill: "#1A56DB", strokeWidth: 2, r: 4, stroke: "#0A1330" } : false}
                    activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ===== ACCOUNT OVERVIEW ===== */}
          <div className="account-overview">
            <div className="overview-card">
              <div className="card-icon block">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div className="card-content">
                <span className="card-label">Block Balance</span>
                <span className="card-value">{formatCurrency(satelliteBalances.block_balance)}</span>
              </div>
            </div>
            <div className="overview-arrow">→</div>
            <div className="overview-card active">
              <div className="card-icon active">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="card-content">
                <span className="card-label">Active Balance</span>
                <span className="card-value">{formatCurrency(satelliteBalances.active_balance)}</span>
              </div>
            </div>
            <div className="overview-arrow">→</div>
            <div className="overview-card withdrawal">
              <div className="card-icon withdrawal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </div>
              <div className="card-content">
                <span className="card-label">Available to Withdraw</span>
                <span className="card-value">{formatCurrency(satelliteBalances.withdrawal)}</span>
              </div>
            </div>
          </div>

          {/* ===== STRATEGIES WIDGET ===== */}
          {STRATEGIES_WIDGET_VARIANT === 'compact' ? (
            // Вариант A: Компактный список
            <div className="strategies-widget compact">
              <div className="widget-header">
                <h3>Strategies</h3>
                <button className="view-all-btn" onClick={() => navigate('/strategies')}>
                  View all →
                </button>
              </div>
              <div className="strategies-grid-compact">
                {strategies.map((strategy) => (
                  <div key={strategy.id} className="strategy-item-compact">
                    <span className="dot" style={{ backgroundColor: strategy.color }}></span>
                    <span className="name">{strategy.name}</span>
                    <span className="allocation">{strategy.allocation}%</span>
                    <span className={`profitability ${strategy.profitability >= 0 ? 'positive' : 'negative'}`}>
                      {formatProfitability(strategy.profitability)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Вариант B: С мини-диаграммой
            <div className="strategies-widget with-chart">
              <div className="widget-header">
                <h3>Strategies</h3>
                <button className="view-all-btn" onClick={() => navigate('/strategies')}>
                  View all →
                </button>
              </div>
              <div className="widget-content">
                <div className="mini-pie-container">
                  <PieChart width={140} height={140}>
                    <Pie
                      data={pieData}
                      cx={70}
                      cy={70}
                      innerRadius={35}
                      outerRadius={60}
                      dataKey="value"
                      stroke="none"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
                <div className="strategies-list-mini">
                  {strategies.map((strategy) => (
                    <div key={strategy.id} className="strategy-row-mini">
                      <div className="row-left">
                        <span className="dot" style={{ backgroundColor: strategy.color }}></span>
                        <span className="name">{strategy.name}</span>
                      </div>
                      <div className="row-right">
                        <span className="allocation">{strategy.allocation}%</span>
                        <span className={`profitability ${strategy.profitability >= 0 ? 'positive' : 'negative'}`}>
                          {formatProfitability(strategy.profitability)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </WrapperPage>
    </div>
  );
}
